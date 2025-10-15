import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from '../api/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default mock user for demo mode (no login required)
  const defaultUser = {
    id: 1,
    name: 'Demo User',
    email: 'demo@example.com',
    role: 'ADMIN', // Set as admin to access all pages including Roles
  };

  const [user, setUser] = useState(defaultUser);
  const [token, setToken] = useState('demo-token');
  const [loading, setLoading] = useState(false);

  // Initialize auth state from localStorage or use default
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    } else {
      // Set default user for demo mode
      setToken('demo-token');
      setUser(defaultUser);
    }
    setLoading(false);
  }, []);

  // Login function (MOCK - No backend required)
  const login = async (email, password) => {
    try {
      // Mock login - accept any credentials
      const authToken = 'mock-token-' + Date.now();
      const userData = {
        id: 1,
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        email: email,
        role: email.includes('admin') ? 'ADMIN' : 'USER',
      };

      // Store in state
      setToken(authToken);
      setUser(userData);

      // Store in localStorage
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));

      toast.success(`Welcome back, ${userData.name}!`);
      return { success: true };
    } catch (error) {
      const message = 'Login failed. Please check your credentials.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Register function (MOCK - No backend required)
  const register = async (name, email, password) => {
    try {
      // Mock registration - always succeeds
      toast.success('Registration successful! Please login.');
      return { success: true };
    } catch (error) {
      const message = 'Registration failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.info('Logged out successfully.');
  };

  // Check if user is authenticated (as a property, not function)
  const isAuthenticated = !!token && !!user;

  // Check if user is admin (as a property, not function)
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'admin';

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
