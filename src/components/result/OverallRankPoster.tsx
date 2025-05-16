/* src/components/rank/OverallRankPoster.tsx */
"use client";

import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

/**
 * 게임 클리어 후 보여주는 메인 랭크 포스터.
 * - 9:16 비율 고정
 * - 디자인 이미지 / 텍스트를 props 로 주입해도 됨.
 */
export default function OverallRankPoster() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* aspect-[9/16] 으로 세로형 비율 고정 */}
      <Card className="relative aspect-[9/16] rounded-[28px] bg-black/90 overflow-hidden">
        {/* ↓ 필요하면 배경 이미지‧텍스트 삽입 */}
        {/* <img src={bg} className="absolute inset-0 object-cover" /> */}

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
