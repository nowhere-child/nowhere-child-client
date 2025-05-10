"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

// Sample data for the ranking board
const rankings = [
  { rank: 999, name: "Nowhere child", score: 423, department: "화생공" },
  { rank: 999, name: "Nowhere child", score: 423, department: "화생공" },
  { rank: 999, name: "Nowhere child", score: 423, department: "화생공" },
  { rank: 999, name: "Nowhere child", score: 423, department: "화생공" },
  { rank: 999, name: "Nowhere child", score: 423, department: "화생공" },
];

export default function RankingBoard() {
  return (
    <div className="w-full flex flex-col max-w-md mx-auto bg-zinc-900 text-white p-4 rounded-lg">
      <h2 className="text-xl font-medium mb-6">내 순위</h2>

      {/* Column headers */}
      <div className="grid grid-cols-13 mb-2 px-2 text-zinc-400 text-sm">
        <div className="col-span-2"></div>
        <div className="col-span-4">팀명</div>
        <div className="col-span-2 text-center">스코어</div>
        <div className="col-span-5 text-center">학부/학과</div>
      </div>

      {/* Scrollable ranking list */}
      <ScrollArea className="">
        <div className="space-y-3">
          {rankings.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-13 items-center px-2 py-4 rounded-lg ${
                index === 2 ? "border-2 border-blue-500" : "bg-zinc-800"
              }`}
            >
              <div className="col-span-2 text-zinc-400 text-sm">
                {item.rank}
              </div>
              <div className="col-span-4 text-sm">{item.name}</div>
              <div className="col-span-2 text-center">{item.score}점</div>
              <div className="col-span-5 flex justify-end gap-2">
                <span className="bg-zinc-900 text-white px-1 py-1 rounded-md text-sm">
                  {item.department}
                </span>
                <span className="bg-zinc-900 text-white px-1 py-1 rounded-md text-sm">
                  {item.department}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
