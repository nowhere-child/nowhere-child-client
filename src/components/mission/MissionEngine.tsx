import { demoMission as scenario } from "@/data/demoMission";
import { useMissionStore } from "@/store/missionStore";

import StickyBottomBar from "../common/BottomBar";
import MissionProgressBar from "../common/MissionProgressBar";
import MissionRenderer from "./MissionRenderer";
import { FolderNote } from "./blocks/FolderNote";

/* MissionEngine.tsx */
export default function MissionEngine() {
  const { currentStep } = useMissionStore();

  return (
    <div className="flex flex-col h-screen-vh bg-background text-main">
      <MissionProgressBar />
      <div className="h-100" />
      <FolderNote
        text={`정확히 말하자면, 오늘은 매우 중요한 날이야.\n보통의 날이 아니야, 뭔가 특별한 일이 일어날 거야.`}
      />
      <div className="overflow-y-auto pt-[34px]">
        <MissionRenderer step={scenario.steps[currentStep]} />
      </div>

      <StickyBottomBar />
    </div>
  );
}
