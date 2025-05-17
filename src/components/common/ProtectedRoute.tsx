import { useAuth } from "@/contexts/AuthContext";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { isAuthenticated, isLoading } = useAuth(); // isLoading 상태 가져오기

  if (isLoading) {
    return <div>Loading...</div>; // 로딩 중일 때 로딩 표시
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
}
