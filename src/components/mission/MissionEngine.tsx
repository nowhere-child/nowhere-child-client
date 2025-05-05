import { demoMission as scenario } from "@/data/demoMission";
import { useMissionStore } from "@/store/missionStore";

import StickyBottomBar from "../common/BottomBar";
import MissionProgressBar from "../common/MissionProgressBar";
import MissionRenderer from "./MissionRenderer";

/* MissionEngine.tsx */
export default function MissionEngine() {
  const { currentStep } = useMissionStore();

  return (
    <div className="flex flex-col h-screen-vh bg-background text-main">
      <MissionProgressBar />

      <div className="overflow-y-auto pt-[34px]">
        <MissionRenderer step={scenario.steps[currentStep]} />
      </div>

      <StickyBottomBar />
    </div>
  );
}
