// src/pages/MissionPage.tsx

import StickyBottomBar from "@/components/common/BottomBar";
import MissionProgressBar from "@/components/common/MissionProgressBar";
import { useMissionStore } from "@/store/missionStore";
import MissionStep1 from "./steps/MissionStep1";

const MissionPage = () => {
  const { currentStep, totalSteps, setStep } = useMissionStore();
  console.log(currentStep, totalSteps);
  const click = () => {
    setStep(2);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <MissionProgressBar />
      <div className="flex-1 relative overflow-y-auto">
        {currentStep === 0 && <MissionStep1 />}
        {/* 추가 미션도 이런 식으로 */}
      </div>
      <StickyBottomBar />
      <button onClick={click}>asd</button>
    </div>
  );
};

export default MissionPage;
