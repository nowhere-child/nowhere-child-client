// src/components/mission/MissionEngine.tsx
import { useAnswer } from "@/hooks/useAnswer";
import { useMission } from "@/hooks/useMission";
import { usePersonalRecord } from "@/hooks/useRecord";
import { useMissionStore } from "@/store/missionStore";
import { useEffect } from "react";
import StickyBottomBar from "../common/BottomBar";
import MissionProgressBar from "../common/MissionProgressBar";
import MissionRenderer from "./MissionRenderer";

export default function MissionEngine() {
  const { missionId, setMissionId } = useMissionStore();
  console.log("missionId", missionId);
  const { data: recordData } = usePersonalRecord(1);

  /* ① 재접속 시 진행 상황 복원 ------------------------------ */
  useEffect(() => {
    console.log("recordData", recordData);
    if (recordData && missionId == null) {
      console.log("recordData", recordData);
      setMissionId(recordData.missionOrder);
    }
  }, [recordData, missionId, setMissionId]);

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

  console.log("missionData", missionData);
  console.log("answerdata", answerData);

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
