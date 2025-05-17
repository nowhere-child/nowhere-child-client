/* src/components/rank/OverallRankPoster.tsx */
"use client";

import rankAssets from "@/assets/rank/index";
import bg from "@/assets/ResultBg.png";
import { Card } from "@/components/ui/card";
import html2canvas from "html2canvas-pro";
import { Download } from "lucide-react";
import { useRef } from "react";

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

  const cardRef = useRef<HTMLDivElement>(null); // Card 참조를 위한 ref 생성
  const downloadButtonRef = useRef<HTMLButtonElement>(null); // 다운로드 버튼 ref 추가

  const handleCaptureAndDownload = () => {
    if (cardRef.current && downloadButtonRef.current) {
      const button = downloadButtonRef.current;
      const originalDisplay = button.style.display; // 원래 display 스타일 저장
      button.style.display = "none"; // 버튼 숨기기

      try {
        // html2canvas 옵션을 조정하여 oklab 색상 처리 오류 방지
        const options = {
          useCORS: true,
          allowTaint: true,
          logging: false, // 디버그 로깅 비활성화
          scale: 2, // 더 높은 해상도로 렌더링
          removeContainer: true, // 임시 컨테이너 제거
        };

        // 스타일 복사 대신 직접 DOM 요소 사용
        html2canvas(cardRef.current, options)
          .then((canvas) => {
            const image = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = image;
            link.download = "rank-poster.png";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          })
          .catch((error) => {
            console.error("이미지 캡처 중 오류가 발생했습니다:", error);
            alert("이미지 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
          })
          .finally(() => {
            button.style.display = originalDisplay; // 버튼 다시 보이게 하기
          });
      } catch (error) {
        console.error("캡처 시도 중 오류가 발생했습니다:", error);
        alert("이미지 저장 중 오류가 발생했습니다. 다시 시도해주세요.");
        button.style.display = originalDisplay; // 오류 발생 시에도 버튼 다시 보이게 하기
      }
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* aspect-[9/16] 으로 세로형 비율 고정 */}
      <Card
        ref={cardRef} // Card 컴포넌트에 ref 연결
        className="relative aspect-[9/16] rounded-[28px] overflow-hidden border-none bg-cover bg-center gap-3"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <p className="font-jihye text-center">
          서울시립대학교 SUNBURST 야외방탈출
        </p>
        <h2 className="font-nightcore relative z-10 text-white text-center pt-8 text-6xl mb-2">
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
        <div className="flex justify-center items-center">
          <img src={rankImageSrc} className="w-48" />
        </div>

        {/* 오른쪽 아래 저장 버튼 */}
        <button
          ref={downloadButtonRef} // 버튼에 ref 연결
          className="absolute bottom-5 right-5 size-12 rounded-full bg-primary
                     flex items-center justify-center text-white shadow-lg"
          aria-label="이미지 저장"
          onClick={handleCaptureAndDownload} // onClick 핸들러 변경
        >
          <Download size={24} />
        </button>
      </Card>
    </div>
  );
}
