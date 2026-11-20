import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { AdminUser } from '../types/cms';

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  checkSession: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('idtn_admin_token'));
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = useCallback(async () => {
    const savedToken = localStorage.getItem('idtn_admin_token');
    if (!savedToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/me.php', {
        headers: {
          'Authorization': `Bearer ${savedToken}`
        }
      });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.user) {
          setUser(json.user);
          setToken(savedToken);
        } else {
          localStorage.removeItem('idtn_admin_token');
          setUser(null);
          setToken(null);
        }
      } else {
        localStorage.removeItem('idtn_admin_token');
        setUser(null);
        setToken(null);
      }
    } catch {
      // Network error, keep token for now or wait
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch('/api/auth/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        return { success: false, error: json.error || 'Login gagal. Periksa kembali email dan password Anda.' };
      }

      localStorage.setItem('idtn_admin_token', json.token);
      setToken(json.token);
      setUser(json.user);
      return { success: true };
    } catch {
      return { success: false, error: 'Tidak dapat terhubung ke server backend.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('idtn_admin_token');
    setToken(null);
    setUser(null);
    window.location.href = '/admin/login';
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        logout,
        checkSession
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextType => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
