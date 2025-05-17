/* ───────── src/components/mission/TextNote2.tsx ───────── */
import React from "react";

interface TextNote2Props {
  text: string;
}

const NOTE_LH = 28; // 한 행 높이(px)
const LINE_COLOR = "#d9d9d9"; // 줄 색
const PAPER_COLOR = "#f5ba97"; // 종이 배경

/** 재사용 가능한 스타일 객체 */
export const linePaperStyle: React.CSSProperties = {
  lineHeight: `${NOTE_LH}px`,
  backgroundColor: PAPER_COLOR,
  /* 한 블록(행) 안에 위쪽 1px 을 선, 나머지는 투명 → repeat‑y */
  backgroundImage: `linear-gradient(${LINE_COLOR} 0 1px, transparent 1px)`,
  backgroundSize: `100% ${NOTE_LH}px`,
  /* baseline 바로 아래에 선이 오도록 Y 오프셋 */
  backgroundPosition: `0 ${NOTE_LH + 17}px`,
  backgroundRepeat: "repeat-y",
  fontFamily: "'Jihye', sans-serif", // 폰트 직접 적용
};

export const TextNote2: React.FC<TextNote2Props> = ({ text }) => {
  const paragraphs = text.split("\n");

  return (
    <div className="px-5 py-5 rounded-[10px] mb-[94px] " style={linePaperStyle}>
      {paragraphs.map((para, i) => (
        <p key={i} className="text-xl text-[#313131] break-keep">
          {para}
        </p>
      ))}
    </div>
  );
};
