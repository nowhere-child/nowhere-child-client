// src/components/mission/DPadLock.tsx
import { cn } from "@/lib/utils";
import { Circle, RefreshCcw, Triangle } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export type Direction = "U" | "R" | "D" | "L";

interface Props {
  solution: Direction[];
  maxAttempts?: number;
  onSuccess: (correctAnswer: string) => void; // 변경: string 인자 추가
  onFail?: (remain: number) => void;
  setV: (v: string) => void;
}

/* -------------------------------------- */
export default function DPadLock({
  solution,
  maxAttempts = 999,
  onSuccess,
  setV,
  onFail,
}: Props) {
  /* ───────── state & refs ───────── */
  const [trail, setTrail] = useState<Direction[]>([]);
  const [handlePos, setHandlePos] = useState({ x: 0, y: 0 }); // 상대 이동량
  const attempts = useRef(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  /* ───────── consts ───────── */
  const PAD = 160; // 패드 전체 영역
  const ARM = 48; // 팔(가로·세로) 두께
  const R = PAD / 2 - 30; // 핸들 최대 이동 반경
  const clamp = (v: number) => Math.max(-R, Math.min(R, v));

  /* ───────── helpers ───────── */
  const dominantDir = (dx: number, dy: number): Direction | null => {
    const t = 30; // dead-zone
    if (Math.abs(dx) < t && Math.abs(dy) < t) return null;
    return Math.abs(dx) > Math.abs(dy)
      ? dx > 0
        ? "R"
        : "L"
      : dy > 0
        ? "D"
        : "U";
  };

  const addDir = (dir: Direction) => {
    const nextTrail = [...trail, dir]; // 모든 입력을 trail에 누적
    setTrail(nextTrail);
    setV(nextTrail.join("")); // 모든 입력을 v에 반영

    // setV 실행 후 onSuccess/onFail 호출을 보장 (setTimeout은 최소 지연을 의미)
    setTimeout(() => {
      if (nextTrail.length >= solution.length) {
        const currentAttempt = nextTrail.slice(-solution.length); // 마지막 solution.length 만큼의 입력
        if (currentAttempt.every((d, i) => d === solution[i])) {
          onSuccess(currentAttempt.join("")); // 성공 시, 정답 부분만 전달
        } else {
          // 오답 처리
          attempts.current += 1;
          setTrail([]); // 오답 시 trail 초기화
          setV(""); // v도 초기화
          navigator.vibrate?.(120);
          onFail?.(Math.max(0, maxAttempts - attempts.current));
          toast.error("틀렸습니다. 다시 시도하세요.");
        }
      }
      // solution 길이보다 짧으면 아무것도 하지 않음 (계속 입력 가능)
    }, 0);
  };

  const resetAll = () => {
    setTrail([]);
    setV(""); // v도 초기화
    attempts.current = 0;
    setHandlePos({ x: 0, y: 0 });
  };

  /* ───────── events ───────── */
  const onStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    start.current = { x: t.clientX, y: t.clientY };
  };

  /* ⬇️ onMove: 손가락→핸들 실시간 추적 (축 밖 성분 제거) */
  const onMove = (e: React.TouchEvent) => {
    if (!start.current) return;

    const { clientX, clientY } = e.touches[0];
    const dx = clientX - start.current.x;
    const dy = clientY - start.current.y;
    const dom = dominantDir(dx, dy); // 우세 축

    if (!dom) {
      // dead-zone
      setHandlePos({ x: 0, y: 0 });
      return;
    }

    if (dom === "L" || dom === "R") {
      setHandlePos({ x: clamp(dx), y: 0 }); // x축만 반영
    } else {
      setHandlePos({ x: 0, y: clamp(dy) }); // y축만 반영
    }
  };

  /* onEnd는 중앙 복귀 + 방향 1개 확정 (기존 그대로) */
  const onEnd = (e: React.TouchEvent) => {
    if (!start.current) return;
    const { clientX, clientY } = e.changedTouches[0];
    const dx = clientX - start.current.x;
    const dy = clientY - start.current.y;

    start.current = null;
    setHandlePos({ x: 0, y: 0 }); // 핸들 복귀

    const dir = dominantDir(dx, dy);
    if (dir) addDir(dir);
  };

  /* ───────── UI ───────── */
  return (
    <div className="flex flex-col items-center gap-3 select-none touch-pan-x">
      {/* 진행 점 표시 */}
      <div className="flex gap-1">
        {solution.map((_, i) => (
          <span
            key={i}
            className={cn(
              "w-2 h-2 rounded-full",
              i < trail.length ? "bg-blue-500" : "bg-zinc-400"
            )}
          />
        ))}
      </div>

      <div
        /* 1) 패드 컨테이너 – 정사각형 */
        className={cn(
          "relative isolate", // isolate → z-index 겹침 방지
          "touch-pan-y" // 가로 스크롤 차단
        )}
        style={{ width: PAD, height: PAD }}
        onTouchStart={onStart}
        onTouchMove={onMove}
        onTouchEnd={onEnd}
      >
        {/* 2) 십자 모양 — before = 세로 막대 /  after = 가로 막대 */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* 가로 막대 */}
          <div
            className="absolute bg-zinc-700/40 rounded-md justify-center gap-20 items-center flex"
            style={{ width: PAD, height: ARM }}
          >
            <Triangle size={16} className=" rotate-270" />
            <Triangle size={16} className=" rotate-90" />
          </div>
          {/* 세로 막대 */}
          <div
            className="absolute bg-zinc-700/40 rounded-md justify-center gap-20 items-center flex flex-col"
            style={{ width: ARM, height: PAD }}
          >
            {" "}
            <Triangle size={16} className="" />
            <Triangle size={16} className="rotate-180" />
          </div>
        </div>

        {/* 3) 중앙 핸들 */}
        <div
          className={cn(
            "absolute w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white",
            "transition-transform duration-100 ease-linear"
          )}
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(-50%, -50%) translate(${handlePos.x}px, ${handlePos.y}px)`,
          }}
        >
          {/* 핸들 장식 (점 4개) */}
          <Circle size={60} className=" fill-blue-500" />
        </div>
      </div>

      {/* 남은 시도 & 리셋 */}
      <div className="flex items-center gap-4 mt-1">
        <button onClick={resetAll} className="text-xs text-primary underline">
          <RefreshCcw size={24} />
        </button>
      </div>
    </div>
  );
}
