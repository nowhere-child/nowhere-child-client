// src/components/mission/MissionEngine.tsx
import { useAnswer } from "@/hooks/useAnswer";
import { useMission } from "@/hooks/useMission";
import { usePersonalRecord } from "@/hooks/useRecord";
import { useMissionStore } from "@/store/missionStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StickyBottomBar from "../common/BottomBar";
import MissionProgressBar from "../common/MissionProgressBar";
import MissionRenderer from "./MissionRenderer";

export default function MissionEngine() {
  const { missionId, setMissionId } = useMissionStore();
  const navigate = useNavigate();
  const { data: recordData } = usePersonalRecord(1);

  /* ① 재접속 시 진행 상황 복원 ------------------------------ */
  useEffect(() => {
    if (recordData && missionId == null) {
      setMissionId(recordData.missionOrder);
    }

    if (missionId && missionId > 9) {
      navigate("/result", { replace: true });
    }
  }, [recordData, missionId, setMissionId, navigate]);

  /* ② 현재 미션·정답 로드 ----------------------------------- */
  const { data: missionData, isLoading: mLoading } = useMission({
    missionOrder: missionId ?? 1,
    gameId: 1,
    language: "KO",
  });

  const { data: answerData, isLoading: aLoading } = useAnswer({
    missionOrder: missionId ?? 1,
    gameId: 1,
    language: "KO",
  });

  if (!missionData || !answerData || mLoading || aLoading) return null;

  return (
    <div className="flex flex-col h-screen-vh bg-background text-main">
      <MissionProgressBar />
      <div className="relative flex-1">
        <div key={missionId} className="absolute inset-0 animate-slideUpFadeIn">
          <MissionRenderer
            blocks={missionData.data.blocks}
            answer={answerData}
          />
        </div>
      </div>
      <StickyBottomBar />
    </div>
  );
}
