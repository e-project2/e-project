import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { apiService } from '../services/apiService.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    return storageService.getAuth();
  });
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    if (currentUser) {
      storageService.setAuth(currentUser);
    } else {
      storageService.clearAuth();
    }
  }, [currentUser]);

  const login = async (emailOrUsername, password) => {
    try {
      const res = await apiService.login(emailOrUsername, password);
      const token = res.token || res.data?.accessToken;
      if (res && token) {
        const userObj = {
          token,
          user: res.data?.user || res.user || {
            username: emailOrUsername,
            role: emailOrUsername.includes('admin') ? 'admin' : 'reader'
          }
        };
        setCurrentUser(userObj);
        return { success: true, user: userObj };
      }
      return { success: false, message: res.message || 'Invalid credentials' };
    } catch (err) {
      // Mock login for offline demonstration
      if (emailOrUsername.toLowerCase().includes('admin')) {
        const adminUser = {
          token: 'mock-jwt-admin-token-12345',
          user: {
            id: 'usr-admin-demo',
            username: 'admin',
            email: 'admin@bookbridge.com',
            fullName: 'Archival Admin',
            role: 'admin'
          }
        };
        setCurrentUser(adminUser);
        return { success: true, user: adminUser };
      } else {
        const readerUser = {
          token: 'mock-jwt-reader-token-67890',
          user: {
            id: 'usr-reader-demo',
            username: emailOrUsername,
            email: emailOrUsername.includes('@') ? emailOrUsername : `${emailOrUsername}@bookbridge.local`,
            fullName: 'Avid Reader',
            role: 'reader'
          }
        };
        setCurrentUser(readerUser);
        return { success: true, user: readerUser };
      }
    }
  };

  const register = async (username, email, password, fullName) => {
    try {
      const res = await apiService.register(username, email, password, fullName);
      if (res && res.token) {
        const userObj = {
          token: res.token,
          user: res.data?.user || res.user
        };
        setCurrentUser(userObj);
        return { success: true, user: userObj };
      }
    } catch {
      // Offline mock registration
      const newUser = {
        token: 'mock-jwt-newuser-token',
        user: {
          id: 'usr-' + Date.now(),
          username,
          email,
          fullName: fullName || username,
          role: 'reader'
        }
      };
      setCurrentUser(newUser);
      return { success: true, user: newUser };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const isAdmin = currentUser?.user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        authModalOpen,
        setAuthModalOpen,
        authMode,
        setAuthMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
