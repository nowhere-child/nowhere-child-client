import Home from "@/pages/Home";
import Mission from "@/pages/Mission";
import Result from "@/pages/Result";
import { Route, Routes } from "react-router-dom";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mission/:id" element={<Mission />} />
      <Route path="/result" element={<Result />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
