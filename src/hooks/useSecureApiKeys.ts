import { useState, useEffect, useCallback } from 'react';
import { generateSecureToken, hashData } from '@/lib/security';

interface ApiKeyData {
  elevenLabsApiKey: string;
  openAIApiKey: string;
}

interface SecureStorageData {
  value: string;
  timestamp: number;
  hash: string;
  encrypted: boolean;
}

/**
 * Secure API keys hook with encryption and integrity validation
 */
export function useSecureApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKeyData>({
    elevenLabsApiKey: '',
    openAIApiKey: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  // Enhanced encryption using Web Crypto API
  const encryptData = useCallback(async (data: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode('medicalcor_secure_key_32bytes!!'),
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
      throw new Error('Failed to encrypt data');
    }
  }, []);

  const decryptData = useCallback(async (encryptedData: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      
      const keyMaterial = await crypto.subtle.importKey(
        'raw',
        encoder.encode('medicalcor_secure_key_32bytes!!'),
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
      throw new Error('Failed to decrypt data');
    }
  }, []);

  // Load encrypted API keys
  const loadApiKeys = useCallback(async () => {
    try {
      const item = sessionStorage.getItem('secure_api_keys');
      if (!item) {
        setIsLoading(false);
        return;
      }

      const storedData: SecureStorageData = JSON.parse(item);
      
      // Check if data has expired (1 hour)
      if (Date.now() - storedData.timestamp > 60 * 60 * 1000) {
        sessionStorage.removeItem('secure_api_keys');
        setIsLoading(false);
        return;
      }

      // Decrypt and verify integrity
      const decryptedValue = await decryptData(storedData.value);
      const currentHash = await hashData(decryptedValue);
      
      if (currentHash !== storedData.hash) {
        console.warn('API keys integrity check failed');
        sessionStorage.removeItem('secure_api_keys');
        setIsLoading(false);
        return;
      }

      setApiKeys(JSON.parse(decryptedValue));
    } catch (error) {
      console.error('Failed to load API keys:', error);
      sessionStorage.removeItem('secure_api_keys');
    }
    
    setIsLoading(false);
  }, [decryptData]);

  // Save encrypted API keys
  const saveApiKeys = useCallback(async (newKeys: ApiKeyData) => {
    try {
      const serialized = JSON.stringify(newKeys);
      const encrypted = await encryptData(serialized);
      
      const storedData: SecureStorageData = {
        value: encrypted,
        timestamp: Date.now(),
        hash: await hashData(serialized),
        encrypted: true
      };

      sessionStorage.setItem('secure_api_keys', JSON.stringify(storedData));
      setApiKeys(newKeys);
    } catch (error) {
      console.error('Failed to save API keys:', error);
      throw new Error('Failed to save API keys securely');
    }
  }, [encryptData]);

  // Clear API keys
  const clearApiKeys = useCallback(() => {
    sessionStorage.removeItem('secure_api_keys');
    setApiKeys({ elevenLabsApiKey: '', openAIApiKey: '' });
  }, []);

  // Load on mount
  useEffect(() => {
    loadApiKeys();
  }, [loadApiKeys]);

  return {
    apiKeys,
    saveApiKeys,
    clearApiKeys,
    isLoading
  };
}