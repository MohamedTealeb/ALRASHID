import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useAuth = () => {
  const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  };

  const getUserRole = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('user_role');
  };

  const getToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_role');
    }
  };

  const setAuth = (token, role) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
      localStorage.setItem('user_role', role);
    }
  };

  return {
    isAuthenticated,
    getUserRole,
    getToken,
    logout,
    setAuth
  };
};