// src/components/mission/DPadLock.tsx
import { cn } from "@/lib/utils";
import { Circle } from "lucide-react";
import { useRef, useState } from "react";

export type Direction = "UP" | "RIGHT" | "DOWN" | "LEFT";

interface Props {
  solution: Direction[];
  maxAttempts?: number;
  onSuccess: () => void;
  onFail?: (remain: number) => void;
}

/* -------------------------------------- */
export default function DPadLock({
  solution,
  maxAttempts = 5,
  onSuccess,
  onFail,
}: Props) {
  /* ───────── state & refs ───────── */
  const [trail, setTrail] = useState<Direction[]>([]);
  const [handlePos, setHandlePos] = useState({ x: 0, y: 0 }); // 상대 이동량
  const attempts = useRef(0);
  const start = useRef<{ x: number; y: number } | null>(null);

  /* ───────── consts ───────── */
  const PAD = 160; // 패드 전체 영역
  const ARM = 36; // 팔(가로·세로) 두께
  const R = PAD / 2 - 40; // 핸들 최대 이동 반경
  const clamp = (v: number) => Math.max(-R, Math.min(R, v));

  /* ───────── helpers ───────── */
  const dominantDir = (dx: number, dy: number): Direction | null => {
    const t = 30; // dead-zone
    if (Math.abs(dx) < t && Math.abs(dy) < t) return null;
    return Math.abs(dx) > Math.abs(dy)
      ? dx > 0
        ? "RIGHT"
        : "LEFT"
      : dy > 0
        ? "DOWN"
        : "UP";
  };

  const addDir = (dir: Direction) => {
    const next = [...trail, dir].slice(0, solution.length);
    setTrail(next);

    if (next.length < solution.length) return;

    if (next.every((d, i) => d === solution[i])) {
      onSuccess();
    } else {
      attempts.current += 1;
      setTrail([]);
      navigator.vibrate?.(120);
      onFail?.(Math.max(0, maxAttempts - attempts.current));
    }
  };

  const resetAll = () => {
    setTrail([]);
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

    if (dom === "LEFT" || dom === "RIGHT") {
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
              i < trail.length ? "bg-primary" : "bg-zinc-400/40"
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
            className="absolute bg-zinc-700/40 rounded-md"
            style={{ width: PAD, height: ARM }}
          />
          {/* 세로 막대 */}
          <div
            className="absolute bg-zinc-700/40 rounded-md"
            style={{ width: ARM, height: PAD }}
          />
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
          <Circle />
        </div>
      </div>

      {/* 남은 시도 & 리셋 */}
      <div className="flex items-center gap-4 mt-1">
        <p className="text-xs text-zinc-400">
          남은 시도 {Math.max(0, maxAttempts - attempts.current)}
        </p>
        <button onClick={resetAll} className="text-xs text-primary underline">
          리셋
        </button>
      </div>
    </div>
  );
}
