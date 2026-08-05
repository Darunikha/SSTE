import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginApi, registerApi, getMeApi } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('srisastha_token');
      if (token) {
        try {
          const res = await getMeApi();
          if (res.data.success) {
            setUser(res.data.data);
          }
        } catch (err) {
          localStorage.removeItem('srisastha_token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (credentials) => {
    const res = await loginApi(credentials);
    if (res.data.success) {
      localStorage.setItem('srisastha_token', res.data.data.token);
      setUser(res.data.data);
    }
    return res.data;
  };

  const register = async (userData) => {
    const res = await registerApi(userData);
    if (res.data.success) {
      localStorage.setItem('srisastha_token', res.data.data.token);
      setUser(res.data.data);
    }
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('srisastha_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
