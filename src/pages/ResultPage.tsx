import OverallRankPoster from "@/components/result/OverallRankPoster";
import RankingBoard from "@/components/result/RankingBoard";
import RankingCard from "@/components/result/RankingCard";
import { useTeamRanking, useTeamRecord } from "@/hooks/useRecord";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export interface TeamRecord {
  gameId: number;
  teamName: string;
  playTime: string; // "HH:MM:SS.sss" 형식의 문자열
  hintCount: number;
  score: number;
  grade: string; // 일부 항목에서는 grade가 없음
  firstMemberDepartment: string;
  secondMemberDepartment?: string; // 일부 항목에서는 secondMemberDepartment가 없음
}

export default function ResultPage() {
  const navigate = useNavigate();
  const { data: rankingResponse } = useTeamRanking(1);
  const rankingData: TeamRecord[] = rankingResponse || [];
  const { data: myRankingData } = useTeamRecord(1);
  console.log("aa", rankingData);
  console.log(myRankingData);
  useEffect(() => {
    if (myRankingData && !myRankingData.score) {
      toast.error("잘못된 접근입니다.");
      navigate("/mission", { replace: true });
    }
  }, [myRankingData, navigate]);
  return (
    <div className="flex flex-col h-dvh bg-[#1A1A1A] text-white">
      <main className="flex-1 overflow-y-auto p-4 space-y-12">
        {/* 1) 메인 랭크 포스터 */}
        {myRankingData && <OverallRankPoster myRankingData={myRankingData} />}

        {/* 2) 상위 팀 카드 슬라이더 */}
        <section className="space-y-2">
          <h2 className="text-lg font-semibold mb-2">시립대학교 랭킹</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 pt-2">
            {rankingData &&
              rankingData
                .slice(0, 3)
                .map((t, i) => (
                  <RankingCard
                    key={t.teamName}
                    place={i + 1}
                    teamName={t.teamName}
                    score={t.score}
                    firstMemberDepartment={t.firstMemberDepartment}
                    secondMemberDepartment={t.secondMemberDepartment}
                  />
                ))}
          </div>
        </section>

        {/* 3) 내 순위 테이블 */}
        {rankingData && myRankingData && (
          <RankingBoard
            rankingData={rankingData}
            nowTeam={myRankingData.teamName}
          />
        )}
      </main>
    </div>
  );
}
