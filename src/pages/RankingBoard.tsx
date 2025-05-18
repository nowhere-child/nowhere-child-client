import bg from "@/assets/ranking-bg.png";
import BigRankingCard from "@/components/result/BigRankingCard";
import { Button } from "@/components/ui/button";
import { useTeamRanking } from "@/hooks/useRecord";
import { useState } from "react";
import { TeamRecord } from "./ResultPage";

function RankingBoardPage() {
  const { data: rankingResponse } = useTeamRanking(1);
  const rankingData: TeamRecord[] = rankingResponse || [];
  console.log("rankingData", rankingData);
  console.log(
    "firstMemberDepartment:",
    JSON.stringify(rankingData[0].firstMemberDepartment)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // 페이지당 5개 항목 표시

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

  return (
    <div
      className="w-full mx-auto h-full text-white p-4 px-1 rounded-lg"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <h1 className="text-[170px] text-center font-nightcore font-bold mb-4">
        RANK
      </h1>
      <div className="mx-24 bg-zinc-900/70 rounded-xl p-4 px-8">
        <h2 className="text-3xl font-semibold mb-4 mt-6">
          서울시립대학교 TOP 3
        </h2>
        <section className="space-y-2 justify-center flex">
          <div className="flex gap-4 overflow-x-auto pb-4 pt-4">
            {rankingData &&
              rankingData
                .slice(0, 3)
                .map((t, i) => (
                  <BigRankingCard
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
              className={`grid grid-cols-[48px_1fr_72px_minmax(0,1fr)] items-center px-2 py-6 rounded-lg text-xl
                ${i % 2 === 0 ? "bg-inherit" : "bg-[#404040]"}`}
            >
              <span className="ml-2">{startIndex + i + 1}</span>{" "}
              {/* 전체 순위 표시 */}
              <span className="truncate text-xl">{r.teamName}</span>
              <span className="text-left text-xl">{r.score}점</span>{" "}
              {/* "점" 추가 */}
              {/* 학과 표시를 div로 감싸고 flex와 오른쪽 정렬 적용 */}
              <div className="flex justify-start items-center space-x-1 overflow-hidden">
                <div
                  // variant="secondary" // variant 대신 직접 스타일링
                  className="text-xl px-2 py-1 whitespace-nowrap bg-zinc-900 text-white border-none rounded-lg"
                >
                  {r.firstMemberDepartment}
                </div>
                {r.secondMemberDepartment && (
                  <div
                    // variant="secondary" // variant 대신 직접 스타일링
                    className="text-xl px-2 py-1 whitespace-nowrap bg-zinc-900 text-white border-none rounded-lg"
                  >
                    {r.secondMemberDepartment}
                  </div>
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
    </div>
  );
}

export default RankingBoardPage;
