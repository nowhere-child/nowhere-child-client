import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useGetMemberInfo } from "@/hooks/useMember";
import { useMissionStore } from "@/store/missionStore";
import { differenceInSeconds } from "date-fns";
import { Headset, Menu, Paperclip } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MissionProgressBar = () => {
  const { missionId, totalMissions } = useMissionStore();
  const { data, refetch } = useGetMemberInfo(1);

  const [open, setOpen] = useState(false);
  const [elapsedTime, setElapsedTime] = useState("00:00");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const usedHints = data?.data.useHintCount ?? 0;
  const maxHints = data?.data.totalHintCount; // 상황에 맞게 수정
  const hintRatio = Math.min(usedHints / (maxHints ?? 27), 1);

  const handleSheetOpen = (open: boolean) => {
    setOpen(open);

    if (open) {
      refetch(); // 시트 열릴 때마다 최신 데이터 요청
    }
  };

  useEffect(() => {
    if (open && data?.data?.startedAt) {
      const startedAt = new Date(data.data.startedAt);
      intervalRef.current = setInterval(() => {
        const now = new Date();
        const diffSec = differenceInSeconds(now, startedAt);
        setElapsedTime(formatDuration(diffSec));
      }, 1000);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [open, data?.data?.startedAt]);

  return (
    <div className="flex justify-between gap-1 pt-2 px-4 pb-4 min-h-[32px]">
      <div className="flex items-center gap-1">
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

      <Sheet open={open} onOpenChange={handleSheetOpen}>
        <SheetTrigger asChild>
          <Menu size={24} className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle>{data?.data.teamName}</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col gap-4">
                {/* 진행시간 */}
                <div className="flex flex-col gap-2">
                  <div className="text-lg text-gray-500">진행시간</div>
                  <div className="text-lg text-black bg-[#F2F2F2] p-3 rounded-xl">
                    {elapsedTime}
                  </div>
                </div>

                {/* 힌트 수 */}
                <div className="flex flex-col gap-2">
                  <div className="text-lg text-gray-500">사용한 힌트 수</div>
                  <div className="bg-[#F2F2F2] p-3 rounded-xl">
                    <div className="text-lg text-black mb-2">{usedHints}개</div>
                    <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3182F6] transition-all duration-300"
                        style={{ width: `${hintRatio * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <a
                href="https://yeonnybus.notion.site/1f7cd91a96d4804a9d2fc1e3f51bb3a5?pvs=4"
                target="_blank"
                className="absolute bottom-10 left-4 text-xl flex gap-2"
              >
                <Paperclip size={30} />
                지도 설정 안내
              </a>
              <div className="absolute bottom-10 right-4">
                <a href="https://open.kakao.com/o/scIF82wh" target="_blank">
                  <Headset size={30} />
                </a>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return h > 0
    ? `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default MissionProgressBar;
