"use client";

import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';

export interface User {
  id: number;
  fullName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshTokenVal, setRefreshTokenVal] = useState<string | null>(null);

  // Get token from localStorage
  const getAccessToken = useCallback((): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  }, []);

  const getRefreshToken = useCallback((): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }, []);

  // API helpers with auth
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const apiFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    const token = getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    } as HeadersInit;

    const res = await fetch(`${BASE_URL}${url}`, {
      ...options,
      headers,
    });

    if (res.status === 401) {
      // Try refresh
      await refreshToken();
      const newToken = getAccessToken();
      if (newToken) {
        const retryHeaders = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${newToken}`,
          ...options.headers,
        } as HeadersInit;
        return fetch(`${BASE_URL}${url}`, {
          ...options,
          headers: retryHeaders,
        });
      }
    }

    return res;
  }, [getAccessToken]);

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await res.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    }
    setRefreshTokenVal(data.refreshToken);
    await fetchProfile();
  };

  const fetchProfile = async () => {
    try {
      const res = await apiFetch('/api/auth/profile');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    } catch (err) {
      console.error('Fetch profile error:', err);
      setUser(null);
    }
  };

  const refreshTokenFunc = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token');

    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await res.json();
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', data.accessToken);
    }
    await fetchProfile();
  };

  const refreshToken = useCallback(async () => {
    try {
      await refreshTokenFunc();
    } catch (err) {
      // Refresh failed, logout
      logout();
    }
  }, []);

  const logout = async () => {
    const refreshToken = getRefreshToken();
    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (typeof window !== 'undefined') {
      document.cookie = "accessToken=; path=/; max-age=0";
    }
  }
  setUser(null);
  setRefreshTokenVal(null);
};


  // Init: check persisted login
  useEffect(() => {
    const initAuth = async () => {
      const token = getAccessToken();
      if (token) {
        await fetchProfile();
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    fetchProfile,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

