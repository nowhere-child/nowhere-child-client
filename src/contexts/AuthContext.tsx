// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { tokenStorage } from "../utils/tokenStorage";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // isLoading 상태 추가
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // isLoading 초기값을 true로 설정

  // 초기화 시 토큰 존재 여부로 인증 상태 결정
  useEffect(() => {
    const token = tokenStorage.getAccessToken();
    setIsAuthenticated(!!token);
    setIsLoading(false); // 토큰 확인 후 isLoading을 false로 설정
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    tokenStorage.setTokens(accessToken, refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    tokenStorage.clearTokens();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
