// src/components/mission/MissionEngine.tsx
import { useAnswer } from "@/hooks/useAnswer";
import { useMission } from "@/hooks/useMission";
import { useMissionStore } from "@/store/missionStore";
import StickyBottomBar from "../common/BottomBar";
import MissionProgressBar from "../common/MissionProgressBar";
import MissionRenderer from "./MissionRenderer";

export default function MissionEngine() {
  const { missionId } = useMissionStore();
  const { data: missionData } = useMission({
    missionOrder: missionId ?? 1, // 기본값 1
    gameId: 1,
    language: "KO",
  });
  const { data: answerdata } = useAnswer({
    missionOrder: missionId ?? 1, // 기본값 1
    gameId: 1,
    language: "KO",
  });
  console.log("missionData", missionData);
  console.log("answerdata", answerdata);

  if (!missionData) return null;

  return (
    <div className="flex flex-col h-screen-vh bg-background text-main">
      <MissionProgressBar />
      <div className="relative flex-1">
        <div key={missionId} className="absolute inset-0 animate-slideUpFadeIn">
          <MissionRenderer
            blocks={missionData.data.blocks}
            answer={answerdata}
          />
        </div>
      </div>
      <StickyBottomBar />
    </div>
  );
}
