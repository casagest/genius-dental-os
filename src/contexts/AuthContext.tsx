import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSecureSession } from '@/hooks/useSecureStorage';
import { generateSecureToken } from '@/lib/security';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'receptionist';
  permissions: string[];
  lastLogin: Date;
  sessionToken: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
  refreshSession: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database - in real app, this would be in your backend
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@medicalcor.ro',
    password: 'admin123', // In real app, this would be hashed
    name: 'Dr. Administrator',
    role: 'admin' as const,
    permissions: ['read:all', 'write:all', 'delete:all', 'admin:settings']
  },
  {
    id: '2',
    email: 'doctor@medicalcor.ro',
    password: 'doctor123',
    name: 'Dr. Maria Popescu',
    role: 'doctor' as const,
    permissions: ['read:patients', 'write:patients', 'read:appointments', 'write:appointments']
  }
];

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { value: session, setValue: setSession, removeValue: clearSession } = useSecureSession();

  const isAuthenticated = !!user;

  // Check session validity
  const validateSession = async (sessionData: any): Promise<boolean> => {
    if (!sessionData || !sessionData.sessionToken || !sessionData.userId) {
      return false;
    }

    // Check if session has expired (24 hours)
    const sessionAge = Date.now() - new Date(sessionData.lastLogin).getTime();
    if (sessionAge > 24 * 60 * 60 * 1000) {
      return false;
    }

    // In real app, validate with backend
    const mockUser = MOCK_USERS.find(u => u.id === sessionData.userId);
    if (!mockUser) return false;

    setUser({
      id: mockUser.id,
      email: mockUser.email,
      name: mockUser.name,
      role: mockUser.role,
      permissions: mockUser.permissions,
      lastLogin: new Date(sessionData.lastLogin),
      sessionToken: sessionData.sessionToken
    });

    return true;
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock database
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        setIsLoading(false);
        return false;
      }

      // Generate session token
      const sessionToken = generateSecureToken();
      const now = new Date();

      const userData: User = {
        id: mockUser.id,
        email: mockUser.email,
        name: mockUser.name,
        role: mockUser.role,
        permissions: mockUser.permissions,
        lastLogin: now,
        sessionToken
      };

      // Save session securely
      await setSession({
        userId: mockUser.id,
        sessionToken,
        lastLogin: now.toISOString()
      });

      setUser(userData);
      setIsLoading(false);
      return true;

    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    clearSession();
  };

  // Check user permissions
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission) || user.permissions.includes('admin:all');
  };

  // Refresh session
  const refreshSession = async (): Promise<boolean> => {
    if (!user) return false;
    
    try {
      // Update session timestamp
      const newSessionToken = generateSecureToken();
      const now = new Date();

      await setSession({
        userId: user.id,
        sessionToken: newSessionToken,
        lastLogin: now.toISOString()
      });

      setUser(prev => prev ? {
        ...prev,
        sessionToken: newSessionToken,
        lastLogin: now
      } : null);

      return true;
    } catch (error) {
      console.error('Session refresh failed:', error);
      logout();
      return false;
    }
  };

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (session) {
        const isValid = await validateSession(session);
        if (!isValid) {
          clearSession();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, [session, clearSession]);

  // Auto-refresh session every 30 minutes
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(() => {
      refreshSession();
    }, 30 * 60 * 1000); // 30 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    hasPermission,
    refreshSession
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Higher-order component for protecting routes
interface ProtectedRouteProps {
  children: ReactNode;
  permission?: string;
  fallback?: ReactNode;
}

export function ProtectedRoute({ children, permission, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, hasPermission, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return fallback || <div>Please log in to access this page.</div>;
  }

  if (permission && !hasPermission(permission)) {
    return <div>You don't have permission to access this page.</div>;
  }

  return <>{children}</>;
}