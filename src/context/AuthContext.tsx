import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'student' | 'company' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  avatarUrl?: string;
  branch?: string;
  department?: string;
  companyId?: string;
  companyName?: string;
  designation?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: AuthUser, token?: string) => void;
  logout: () => void;
}

const AUTH_STORAGE_KEY = 'careerlens_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as AuthUser;
      }
    } catch (e) {
      console.warn('Failed to parse stored auth user', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const role: UserRole = user?.role || 'student';
  const isAuthenticated = !!user;

  const login = (authUser: AuthUser) => {
    setUser(authUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    } catch (e) {
      console.warn('Failed to store auth user session', e);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear auth user session', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

