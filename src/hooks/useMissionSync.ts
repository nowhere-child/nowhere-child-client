// src/hooks/useMissionSync.ts
import { api } from "@/lib/api"; // axios 래퍼
import { useMissionStore } from "@/store/missionStore";
import { useEffect } from "react";

export function useMissionSync() {
  const hydrate = useMissionStore((s) => s.hydrate);
  const { currentStep, hintsUsed } = useMissionStore();

  /* ➊ 최초 진입 시 상태 불러오기 */
  useEffect(() => {
    api.get("/me/progress").then(({ data }) => hydrate(data));
  }, []);

  /* ➋ 스텝 변경·힌트 사용 시 서버에 PATCH */
  useEffect(() => {
    api.patch("/me/progress", { currentStep, hintsUsed });
  }, [currentStep, hintsUsed]);
}
