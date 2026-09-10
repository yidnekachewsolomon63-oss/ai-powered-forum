import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth/auth.service.js';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = authService.getStoredToken();
    const storedUser = authService.getStoredUser();
    if (token && storedUser) setUser(storedUser);
    setLoading(false);
  }, []);

  const register = async data => authService.register(data);

  const login = async credentials => {
    setLoading(true);
    try {
      const result = await authService.login(credentials);
      setUser(result.user);
      return result;
    } finally { setLoading(false); }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/auth', { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout, isAuthenticated: Boolean(user) }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
