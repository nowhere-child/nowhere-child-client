// src/components/MissionProgressBar.tsx
import { useMissionStore } from "@/store/missionStore";

const MissionProgressBar = () => {
  const { currentStep, totalSteps } = useMissionStore();

  return (
    <div className="flex justify-center gap-1 pt-2 pb-4 min-h-[32px]">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full ${
            i === currentStep ? "bg-white" : "bg-neutral-500"
          }`}
        />
      ))}
    </div>
  );
};

export default MissionProgressBar;
