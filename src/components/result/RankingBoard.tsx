/* src/components/rank/RankingBoard.tsx */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

export interface RankItem {
  rank: number;
  name: string;
  score: number;
  department: string;
  isMe?: boolean;
}

export default function RankingBoard({ data }: { data: RankItem[] }) {
  return (
    <div className="w-full max-w-md mx-auto bg-zinc-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-medium mb-5">내 순위</h2>

      {/* 헤더 */}
      <div className="grid grid-cols-[48px_1fr_72px_1fr] px-2 mb-2 text-zinc-400 text-sm">
        <span />
        <span>팀명</span>
        <span className="text-right">스코어</span>
        <span className="text-right">학부/학과</span>
      </div>

      <ScrollArea className="max-h-[300px] pr-1">
        <div className="space-y-2">
          {data.map((r) => (
            <div
              key={r.rank}
              className={`grid grid-cols-[48px_1fr_72px_1fr] items-center px-2 py-3 rounded-lg
                          ${r.isMe ? "border-2 border-blue-500" : "bg-zinc-800"}`}
            >
              <span className="text-zinc-400">{r.rank}</span>
              <span className="truncate">{r.name}</span>
              <span className="text-right">{r.score}점</span>
              <span className="text-right truncate">{r.department}</span>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
