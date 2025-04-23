import Home from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import MissionPage from "./pages/MissionPage";
import ResultPage from "./pages/ResultPage";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission" element={<MissionPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
