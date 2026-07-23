'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await axios.get('/api/auth/me');
      if (res.data.success) {
        setUser(res.data.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    refreshUser().finally(() => setLoading(false));
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      if (res.data.success) {
        setUser(res.data.data.user);
        return { success: true };
      }
      return { success: false, error: res.data.message || 'Login failed' };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return { success: false, error: err.response?.data?.message || 'Login failed' };
      }
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      const res = await axios.post('/api/auth/signup', { name, email, password });
      if (res.data.success) {
        setUser(res.data.data.user);
        return { success: true };
      }
      return { success: false, error: res.data.message || 'Signup failed' };
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        return { success: false, error: err.response?.data?.message || 'Signup failed' };
      }
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout');
    } finally {
      setUser(null);
      window.location.href = '/login';
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser }}>
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
