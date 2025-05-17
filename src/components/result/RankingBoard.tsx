/* src/components/rank/RankingBoard.tsx */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Button 컴포넌트 import
import { useEffect, useState } from "react"; // useState와 useEffect import

export interface RankItem {
  rank: number;
  name: string;
  score: number;
  department: string;
  isMe?: boolean;
}

export default function RankingBoard({
  rankingData,
  nowTeam,
}: {
  rankingData: {
    gameId: number;
    playTime: string;
    hintCount: number;
    teamName: string;
    score: number;
    grade: string;
    firstMemberDepartment: string;
    secondMemberDepartment?: string;
  }[];
  nowTeam: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 5개 항목 표시

  useEffect(() => {
    const userTeamIndex = rankingData.findIndex(
      (item) => item.teamName === nowTeam
    );
    if (userTeamIndex !== -1) {
      setCurrentPage(Math.floor(userTeamIndex / itemsPerPage) + 1);
    }
  }, [rankingData, nowTeam, itemsPerPage]);

  const totalPages = Math.ceil(rankingData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRankingData = rankingData.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleGoToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleGoToLastPage = () => {
    setCurrentPage(totalPages);
  };

  console.log("RankingBoard", rankingData);
  return (
    <div className="w-full mx-auto bg-zinc-900 text-white p-4 px-1 rounded-lg">
      <h2 className="text-xl font-medium mb-5">전체 순위</h2>

      {/* 헤더 */}
      <div className="grid grid-cols-[48px_1fr_72px_1fr] px-2 mb-2 text-zinc-400 text-sm">
        <span />
        <span>팀명</span>
        <span className="text-left">스코어</span>
        <span className="text-left ">학부/학과</span>
      </div>

      {/* <ScrollArea className=""> */}
      <div className="space-y-2 min-h-[270px]">
        {" "}
        {/* 최소 높이 설정으로 레이아웃 유지 */}
        {currentRankingData.map((r, i) => (
          <div
            key={startIndex + i} // key를 전체 데이터 기준으로 변경
            className={`grid grid-cols-[48px_1fr_72px_minmax(0,1fr)] items-center px-2 py-3 rounded-lg
                          ${r.teamName === nowTeam ? "border-2 border-blue-500" : "bg-zinc-800"}`}
          >
            <span className="text-zinc-400">{startIndex + i + 1}</span>{" "}
            {/* 전체 순위 표시 */}
            <span className="truncate">{r.teamName}</span>
            <span className="text-left">{r.score}점</span> {/* "점" 추가 */}
            {/* 학과 표시를 div로 감싸고 flex와 오른쪽 정렬 적용 */}
            <div className="flex justify-start items-center space-x-1 overflow-hidden">
              <Badge
                // variant="secondary" // variant 대신 직접 스타일링
                className="text-xs px-1.5 py-0.5 whitespace-nowrap bg-zinc-700 text-zinc-200 border-none"
              >
                {r.firstMemberDepartment}
              </Badge>
              {r.secondMemberDepartment && (
                <Badge
                  // variant="secondary" // variant 대신 직접 스타일링
                  className="text-xs px-1.5 py-0.5 whitespace-nowrap bg-zinc-700 text-zinc-200 border-none"
                >
                  {r.secondMemberDepartment}
                </Badge>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* </ScrollArea> */}

      {/* 페이지네이션 컨트롤 */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-4">
          <Button
            onClick={handleGoToFirstPage}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="text-white"
          >
            맨 앞
          </Button>
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="outline"
            size="sm"
            className="text-white"
          >
            이전
          </Button>
          <span className="text-sm">
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="text-white"
          >
            다음
          </Button>
          <Button
            onClick={handleGoToLastPage}
            disabled={currentPage === totalPages}
            variant="outline"
            size="sm"
            className="text-white"
          >
            맨 뒤
          </Button>
        </div>
      )}
    </div>
  );
}
