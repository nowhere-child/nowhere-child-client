/* src/components/rank/OverallRankPoster.tsx */
"use client";

import rankAssets from "@/assets/rank/index";
import bg from "@/assets/ResultBg.png";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

/**
 * 게임 클리어 후 보여주는 메인 랭크 포스터.
 * - 9:16 비율 고정
 * - 디자인 이미지 / 텍스트를 props 로 주입해도 됨.
 */

interface OverallRankPosterProps {
  myRankingData: {
    gameId: number;
    hintCount: number;
    score: number;
    playTime: number;
    teamName: string;
    firstMemberDepartment: string;
    secondMemberDepartment?: string;
    grade: string;
  };
}
export default function OverallRankPoster(
  myRankingData: OverallRankPosterProps
) {
  console.log(myRankingData);

  const gradeToImageMap: { [key: string]: string } = {
    "A+": rankAssets.Aprank,
    A: rankAssets.Arank,
    S: rankAssets.Srank,
    SS: rankAssets.SSrank,
    SSS: rankAssets.SSSrank,
  };
  const rankImageSrc =
    gradeToImageMap[myRankingData.myRankingData.grade] || rankAssets.Arank; // 기본값으로 Arank 설정 또는 다른 기본 이미지
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* aspect-[9/16] 으로 세로형 비율 고정 */}
      <Card
        className="relative aspect-[9/16] rounded-[28px] overflow-hidden border-none bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <p className="font-jihye text-center">
          서울시립대학교 SUNBURST 야외방탈출
        </p>
        <h2 className="font-nightcore relative z-10 text-white text-center pt-8 text-6xl">
          Rank
        </h2>
        <h4 className="font-moonofmercury text-white text-center text-4xl mt-2">
          {`SCORE:${myRankingData.myRankingData.score}`}
        </h4>
        <div className="mx-10 p-4 bg-[#707070]/50 rounded-2xl gap-1 flex flex-col">
          <div className="flex justify-between items-center">
            <span className="font-nightcore text-xl text-white">
              Clear Time:
            </span>
            <span className="font-moonofmercury text-2xl text-white">
              {myRankingData.myRankingData.playTime}
            </span>
          </div>
          <div className="border-b border-gray-400 mb-2" />
          <div className="flex justify-between items-center">
            <span className="font-nightcore text-xl text-white">HINT USED</span>
            <span className="font-moonofmercury text-2xl text-white">
              {myRankingData.myRankingData.hintCount}
            </span>
          </div>
          <div className="border-b border-gray-400 mb-2" />
          <div className="flex justify-between items-center">
            <span className="font-nightcore text-xl text-white">Team Name</span>
            <span className="font-moonofmercury text-2xl text-white">
              {myRankingData.myRankingData.teamName}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <img src={rankImageSrc} className="w-36" />
        </div>

        {/* 오른쪽 아래 저장 버튼 */}
        <button
          className="absolute bottom-5 right-5 size-12 rounded-full bg-primary
                     flex items-center justify-center text-white shadow-lg"
          aria-label="이미지 저장"
          onClick={() => {
            /* TODO: 캔버스 캡처 or 서버 생성 이미지 다운로드 */
          }}
        >
          <Download size={24} />
        </button>
      </Card>
    </div>
  );
}
