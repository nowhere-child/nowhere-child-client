// src/components/MissionProgressBar.tsx
import { useMissionStore } from "@/store/missionStore";

const MissionProgressBar = () => {
  const { missionId, totalMissions } = useMissionStore();

  return (
    <div className="flex justify-center gap-1 pt-2 pb-4 min-h-[32px]">
      {missionId &&
        Array.from({ length: totalMissions }).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === missionId - 1 ? "bg-white" : "bg-neutral-500"
            }`}
          />
        ))}
    </div>
  );
};

export default MissionProgressBar;
