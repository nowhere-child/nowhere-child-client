/* src/pages/ResultPage.tsx */
"use client";

import OverallRankPoster from "@/components/result/OverallRankPoster";
import RankingBoard, { RankItem } from "@/components/result/RankingBoard";
import RankingCard from "@/components/result/RankingCard";
import { useTeamRanking, useTeamRecord } from "@/hooks/useRecord";

/* ---------------- 임시 목업 데이터 ---------------- */
const topTeams = [
  { place: 1, name: "Nowhere child", score: 423, tags: ["컴공", "디학"] },
  { place: 2, name: "Nowhere child", score: 423, tags: ["컴공", "디학"] },
  { place: 3, name: "Nowhere child", score: 423, tags: ["컴공", "디학"] },
];

const myList: RankItem[] = Array.from({ length: 10 }, (_, i) => ({
  rank: 990 + i,
  name: "Nowhere child",
  score: 423,
  department: "화생공",
  isMe: i === 2,
}));
/* ------------------------------------------------ */

export default function ResultPage() {
  const { data: rankingData } = useTeamRanking(1);
  const { data: myRankingData } = useTeamRecord(1);
  console.log(rankingData);
  console.log(myRankingData);
  return (
    <div className="flex flex-col h-dvh bg-[#1A1A1A] text-white">
      <main className="flex-1 overflow-y-auto p-4 space-y-12">
        {/* 1) 메인 랭크 포스터 */}
        <OverallRankPoster myRankingData={myRankingData} />

        {/* 2) 상위 팀 카드 슬라이더 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold mb-2">시립대학교 랭킹</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {topTeams.map((t) => (
              <RankingCard
                key={t.place}
                place={t.place}
                teamName={t.name}
                score={t.score}
                tags={t.tags}
              />
            ))}
          </div>
        </section>

        {/* 3) 내 순위 테이블 */}
        <RankingBoard data={myList} />
      </main>
    </div>
  );
}
