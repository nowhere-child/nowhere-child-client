import Home from "@/pages/Home";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import MissionPage from "./pages/MissionPage";
import ProfilePage from "./pages/ProfilePage";
import ResultPage from "./pages/ResultPage";
export default function AppRoutes() {
  useEffect(() => {
    const updateVH = () => {
      // window.visualViewport.height 가 키보드 오픈/클로즈 시점을 정확히 반영
      const vh = window.visualViewport?.height ?? window.innerHeight;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    updateVH();
    window.visualViewport?.addEventListener("resize", updateVH);
    // iOS Safari에서는 visualViewport 지원이 없으면 window.resize 로 대체
    window.addEventListener("resize", updateVH);

    return () => {
      window.visualViewport?.removeEventListener("resize", updateVH);
      window.removeEventListener("resize", updateVH);
    };
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/mission" element={<MissionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
