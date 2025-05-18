import ProtectedRoute from "@/components/common/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import Home from "@/pages/Home";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import MissionPage from "./pages/MissionPage";
import ProfilePage from "./pages/ProfilePage";
import ResultPage from "./pages/ResultPage";

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const updateVH = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVH();
    window.visualViewport?.addEventListener("resize", updateVH);
    window.addEventListener("resize", updateVH);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateVH);
      window.removeEventListener("resize", updateVH);
    };
  }, []);

  return (
    <Routes>
      {/* 입장 코드 페이지 */}
      <Route
        path="/"
        element={
          isAuthenticated ? <Navigate to="/mission" replace /> : <Home />
        }
      />

      {/* 인증 필요한 라우트들 */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route
        path="/mission"
        element={
          <ProtectedRoute>
            <MissionPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/result"
        element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          // <ProtectedRoute>
          <Admin />
          // </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={
          <div className="flex justify-center items-center">
            <p>잘못된 접근입니다.</p>
            <button>돌아 가기</button>
          </div>
        }
      />
    </Routes>
  );
}
