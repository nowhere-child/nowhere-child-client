// src/components/mission/HintDialog.tsx
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useHint } from "@/hooks/useHint";
import { cn } from "@/lib/utils"; // shadcn helper
import { useMissionStore } from "@/store/missionStore";

interface Props {
  /** 버튼(아이콘)을 그대로 children 으로 넘기면 됩니다. */
  children: React.ReactNode;
}

export default function HintDialog({ children }: Props) {
  const { missionId, hints, usedHintCount, setHint } = useMissionStore();
  const { mutateAsync: fetchHint } = useHint();
  const hintOrderMap = ["FIRST", "SECOND", "THIRD"] as const;

  /** 이번 스텝에서 이미 사용한 힌트 개수 */
  if (!missionId) return null;

  const used = usedHintCount[missionId] ?? 0;
  const remain = 3 - used;
  const missionHints = hints[missionId] ?? [];

  /** 힌트 버튼 클릭 */
  const handleGetHint = async () => {
    if (!missionId || remain <= 0) return;

    const nextIndex = used; // used: 0,1,2 → hintOrder: FIRST, SECOND, THIRD
    const nextHintOrder = hintOrderMap[nextIndex];

    if (missionHints.length >= used + 1) return;
    try {
      const data = await fetchHint({
        missionId,
        gameId: 1, // 🔁 필요 시 가져오기
        hintOrder: nextHintOrder,
      });
      setHint(missionId, data.hint); // ✅ 힌트 저장
    } catch (e) {
      console.error("힌트 가져오기 실패", e);
    }
  };

  /** 회색 점(●) 진행 표시용 */
  const StepDot = ({ idx }: { idx: number }) => (
    <div
      className={cn(
        "size-7 rounded-full flex items-center justify-center text-sm font-semibold",
        used >= idx ? "bg-[#3182F6] text-white" : "bg-zinc-300 text-white/90"
      )}
    >
      {idx}
    </div>
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-[340px] bg-transparent border-none p-0">
        {/* 카드 */}
        <div className="relative w-full mb-12 rounded-3xl bg-zinc-700">
          {/* 상단 진행 바 */}
          <div className="mx-3 mt-10 mb-3 p-[18px] rounded-[20px] bg-white">
            <div className="bg-zinc-100 rounded-[20px] mx-[18px] px-10 py-5">
              <div className="flex items-center justify-between">
                <StepDot idx={1} />
                <div className="h-px flex-1 bg-zinc-300 mx-1" />
                <StepDot idx={2} />
                <div className="h-px flex-1 bg-zinc-300 mx-1" />
                <StepDot idx={3} />
              </div>
            </div>

            {/* 설명 */}
            <p className="text-center text-zinc-600 text-[17px] font-medium mt-9 px-8 leading-snug">
              문제 하나 당 <span className="font-semibold">3개의 힌트</span>만
              사용 가능합니다.
            </p>

            {/* 폴더 일러스트 (svg inline – 색상 연하게) */}
            <div className="flex justify-center ">
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                fill="none"
                className="opacity-70"
              >
                <circle cx="80" cy="80" r="70" fill="#F5F5F5" />
                <rect
                  x="50"
                  y="60"
                  width="60"
                  height="50"
                  rx="4"
                  fill="#E0E0E0"
                />
                <path
                  d="M46 95a4 4 0 0 1 4-4h60a4 4 0 0 1 4 4v22H46V95Z"
                  fill="#D4D4D4"
                />
              </svg>
            </div>

            {/* 힌트 버튼 */}
            <div className="p-2">
              <Button
                disabled={remain <= 0}
                onClick={handleGetHint}
                className="w-full h-12 text-lg text-white rounded-[14px] bg-[#3182F6]"
              >
                {remain > 0 ? `힌트 보기` : "모든 힌트 사용했어요"}
              </Button>
            </div>
          </div>
          {missionHints.length > 0 && (
            <div className="mt-6 px-6 space-y-2">
              {missionHints.map((hint, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-blue-50 border border-blue-200 text-blue-800 rounded-xl text-sm whitespace-pre-wrap"
                >
                  <span className="font-semibold">힌트 {idx + 1}:</span> {hint}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
