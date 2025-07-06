import { useState, useEffect, useCallback } from 'react';
import { generateSecureToken, hashData } from '@/lib/security';

interface SecureStorageOptions {
  encrypt?: boolean;
  sessionOnly?: boolean;
  maxAge?: number; // in milliseconds
}

interface StoredData {
  value: string;
  timestamp: number;
  hash?: string;
  encrypted?: boolean;
}

/**
 * Secure storage hook that provides encrypted and validated storage
 */
export function useSecureStorage<T>(
  key: string,
  defaultValue: T,
  options: SecureStorageOptions = {}
) {
  const { encrypt = false, sessionOnly = false, maxAge } = options;
  const storage = sessionOnly ? sessionStorage : localStorage;
  const storageKey = `secure_${key}`;

  const [value, setValue] = useState<T>(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  // Simple encryption using Web Crypto API
  const encryptData = useCallback(async (data: string): Promise<string> => {
    if (!encrypt) return data;
    
    try {
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(storageKey.slice(0, 32).padEnd(32, '0')),
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );
      
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        keyMaterial,
        encoder.encode(data)
      );
      
      const combined = new Uint8Array(iv.length + encrypted.byteLength);
      combined.set(iv);
      combined.set(new Uint8Array(encrypted), iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      console.error('Encryption failed:', error);
      return data; // Fallback to unencrypted
    }
  }, [encrypt, storageKey]);

  const decryptData = useCallback(async (encryptedData: string): Promise<string> => {
    if (!encrypt) return encryptedData;
    
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode(storageKey.slice(0, 32).padEnd(32, '0')),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );
      
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(c => c.charCodeAt(0))
      );
      
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        keyMaterial,
        encrypted
      );
      
      return decoder.decode(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      return encryptedData; // Fallback to as-is
    }
  }, [encrypt, storageKey]);

  // Load data from storage
  const loadValue = useCallback(async () => {
    try {
      const item = storage.getItem(storageKey);
      if (!item) {
        setValue(defaultValue);
        setIsLoading(false);
        return;
      }

      const storedData: StoredData = JSON.parse(item);
      
      // Check if data has expired
      if (maxAge && Date.now() - storedData.timestamp > maxAge) {
        storage.removeItem(storageKey);
        setValue(defaultValue);
        setIsLoading(false);
        return;
      }

      // Decrypt if needed
      const decryptedValue = await decryptData(storedData.value);
      
      // Verify data integrity if hash exists
      if (storedData.hash) {
        const currentHash = await hashData(decryptedValue);
        if (currentHash !== storedData.hash) {
          console.warn('Data integrity check failed');
          storage.removeItem(storageKey);
          setValue(defaultValue);
          setIsLoading(false);
          return;
        }
      }

      setValue(JSON.parse(decryptedValue));
    } catch (error) {
      console.error('Failed to load secure storage:', error);
      setValue(defaultValue);
    }
    
    setIsLoading(false);
  }, [storageKey, defaultValue, maxAge, decryptData]);

  // Save data to storage
  const saveValue = useCallback(async (newValue: T) => {
    try {
      const serialized = JSON.stringify(newValue);
      const encrypted = await encryptData(serialized);
      
      const storedData: StoredData = {
        value: encrypted,
        timestamp: Date.now(),
        encrypted: encrypt
      };

      // Add integrity hash
      if (encrypt) {
        storedData.hash = await hashData(serialized);
      }

      storage.setItem(storageKey, JSON.stringify(storedData));
      setValue(newValue);
    } catch (error) {
      console.error('Failed to save secure storage:', error);
      throw new Error('Failed to save data securely');
    }
  }, [storageKey, encryptData, encrypt]);

  // Remove data from storage
  const removeValue = useCallback(() => {
    storage.removeItem(storageKey);
    setValue(defaultValue);
  }, [storageKey, defaultValue]);

  // Clear all expired data
  const clearExpired = useCallback(() => {
    if (!maxAge) return;
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key?.startsWith('secure_')) {
        try {
          const item = storage.getItem(key);
          if (item) {
            const storedData: StoredData = JSON.parse(item);
            if (Date.now() - storedData.timestamp > maxAge) {
              storage.removeItem(key);
            }
          }
        } catch (error) {
          // Invalid data, remove it
          storage.removeItem(key);
        }
      }
    }
  }, [maxAge]);

  // Load data on mount
  useEffect(() => {
    loadValue();
    clearExpired();
  }, [loadValue, clearExpired]);

  return {
    value,
    setValue: saveValue,
    removeValue,
    isLoading,
    clearExpired
  };
}

/**
 * Hook for storing API keys securely
 */
export function useSecureApiKeys() {
  return useSecureStorage('api_keys', {}, {
    encrypt: true,
    sessionOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  });
}

/**
 * Hook for storing user session data
 */
export function useSecureSession() {
  return useSecureStorage('user_session', null, {
    encrypt: true,
    sessionOnly: true,
    maxAge: 60 * 60 * 1000 // 1 hour
  });
}