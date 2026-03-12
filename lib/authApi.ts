import type { User } from '../context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export interface LoginResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
}

export interface ProfileResponse {
  user: User;
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Login failed');
  }

  return res.json();
}

export async function registerApi(fullName: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Registration failed');
  }

  return res.json();
}

export async function getProfile(): Promise<ProfileResponse> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  const res = await fetch(`${API_URL}/api/auth/profile`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized - please login again');
    }
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to fetch profile');
  }

  return res.json();
}

export async function logoutApi() {
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
  await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  }).catch(console.error); // Logout may fail if invalid token, ignore
}

export async function refreshTokenApi() {
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  
  const res = await fetch(`${API_URL}/api/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error('Token refresh failed');
  }

  return res.json();
}

