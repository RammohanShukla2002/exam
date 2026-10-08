import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import {
  getCurrentUser,
  setCurrentUser,
  findUserByEmail,
  saveUser,
  getStoredUsers
} from '../utils/storage';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  signup: (fullName: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure initial storage initialization
    getStoredUsers();
    const sessionUser = getCurrentUser();
    setUser(sessionUser);
    setIsLoading(false);
  }, []);

  const login = (email: string, password: string): { success: boolean; error?: string } => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    const existingUser = findUserByEmail(trimmedEmail);
    if (!existingUser) {
      return { success: false, error: 'No account found with this email address.' };
    }

    if (existingUser.password !== password) {
      return { success: false, error: 'Invalid password. Please check and try again.' };
    }

    setCurrentUser(existingUser);
    setUser(existingUser);
    return { success: true };
  };

  const signup = (
    fullName: string,
    email: string,
    password: string
  ): { success: boolean; error?: string } => {
    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      return { success: false, error: 'Full name is required.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, error: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long.' };
    }

    const existing = findUserByEmail(trimmedEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in instead.' };
    }

    const newUser: User = {
      id: 'user-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
      fullName: trimmedName,
      email: trimmedEmail,
      password: password,
      createdAt: new Date().toISOString()
    };

    saveUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
