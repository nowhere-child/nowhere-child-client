/* src/components/FolderNote.tsx */
import folderUrl from "@/assets/folderImg.svg";
// src/components/FolderNote.tsx
import React from "react";

interface FolderNoteProps {
  text: string; // \n 으로 분할된 텍스트
}

const NOTE_LH = 28; // 한 행 높이(px)
const LINE_COLOR = "#d9d9d9"; // 줄 색
const PAPER_COLOR = "#EFEBE7"; // 종이 배경

export const linePaperStyle: React.CSSProperties = {
  lineHeight: `${NOTE_LH}px`,
  backgroundColor: PAPER_COLOR,
  /* 한 블록(행) 안에 위쪽 1px 을 선, 나머지는 투명 → repeat‑y */
  backgroundImage: `linear-gradient(${LINE_COLOR} 0 1px, transparent 1px)`,
  backgroundSize: `100% ${NOTE_LH}px`,
  /* baseline 바로 아래에 선이 오도록 Y 오프셋 */
  backgroundPosition: `0 ${NOTE_LH + 14}px`,
  backgroundRepeat: "repeat-y",
  fontFamily: "'Jihye', sans-serif", // 폰트 직접 적용
};

export const FolderNote: React.FC<FolderNoteProps> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <label className="relative block w-80 select-none h-[130px]">
      {/* 1) 투명 체크박스: 클릭 영역 전역으로 */}
      <input
        type="checkbox"
        className="
          peer
          absolute inset-0
          w-full h-full
          opacity-0
          cursor-pointer
          z-30
        "
      />

      {/* 2) 종이 wrapper: 초기엔 높이 h-6(24px), 체크되면 h-48(192px) */}
      <div
        className="
          absolute inset-x-0 bottom-20
          overflow-hidden
          h-6 peer-checked:h-[285px]
          transition-[height] duration-500 ease-out
          z-10
        "
      >
        {/* 실제 종이 */}
        <div
          className="
            w-[90%] mx-auto h-[285px]
            bg-white rounded-xl shadow-lg
            px-5 py-4
            font-hand text-gray-900
            whitespace-pre-line

          "
          style={linePaperStyle}
        >
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < lines.length - 1 && "\n"}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 3) 폴더 이미지 */}
      <img
        src={folderUrl}
        alt="folder"
        className="block w-full relative z-20"
      />
    </label>
  );
};
