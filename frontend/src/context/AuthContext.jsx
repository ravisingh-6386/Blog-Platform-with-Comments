import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getMe, loginUser, registerUser } from "../api/authApi";
import { setAuthToken } from "../api/client";

const AuthContext = createContext(null);
const TOKEN_KEY = "blog_auth_token";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setAuthToken(token);

    const initAuth = async () => {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const response = await getMe();
        setUser(response.user);
      } catch (_error) {
        localStorage.removeItem(TOKEN_KEY);
        setAuthToken(null);
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, [token]);

  const persistAuth = (authData) => {
    localStorage.setItem(TOKEN_KEY, authData.token);
    setAuthToken(authData.token);
    setToken(authData.token);
    setUser(authData.user);
  };

  const register = async (payload) => {
    const authData = await registerUser(payload);
    persistAuth(authData);
  };

  const login = async (payload) => {
    const authData = await loginUser(payload);
    persistAuth(authData);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setAuthToken(null);
    setToken(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(user),
      isLoading,
      register,
      login,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
