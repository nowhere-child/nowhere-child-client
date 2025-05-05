/* src/components/FolderNote.tsx */
import folderUrl from "@/assets/folderImg.svg";
// src/components/FolderNote.tsx
import React from "react";

interface FolderNoteProps {
  text: string; // \n 으로 분할된 텍스트
}

export const FolderNote: React.FC<FolderNoteProps> = ({ text }) => {
  const lines = text.split("\n");

  return (
    <label className="relative block w-80 sm:w-96 select-none">
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
          h-6 peer-checked:h-48
          transition-[height] duration-500 ease-out
          z-10
        "
      >
        {/* 실제 종이 */}
        <div
          className="
            w-[90%] mx-auto h-48
            bg-white rounded-xl shadow-lg
            px-5 py-4
            font-hand text-gray-900 leading-6
            whitespace-pre-line

            /* 줄노트 배경 */
            bg-[length:100%_24px]
            bg-[repeating-linear-gradient(to bottom,transparent_0_23px,#d9d9d9_23px_24px)]
          "
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
