// src/components/mission/StickyNote.tsx
import React from "react";

interface StickyNoteProps {
  /**
   * 노트 안에 들어갈 텍스트.
   * \n 으로 줄 바꿈을 구분합니다.
   */
  text: string;
  /**
   * 외부에서 추가로 클래스 붙여야 할 때 사용하세요.
   */
  className?: string;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  text,
  className = "",
}) => {
  // \n 단위로 분리해서 <p>로 감싸면,
  // 공백 줄도 살려주고 가독성도 좋아집니다.
  const paragraphs = text.split("\n");

  return (
    <div
      className={`
        inline-block
        bg-gradient-to-b from-[#f4df78] to-[#f9c751]  
        p-6             
        rounded-lg      
        shadow-xl           
        transform rotate-1
        origin-bottom-left
        max-w-[95%]
        ${className}
      `}
    >
      {paragraphs.map((line, i) => (
        <p
          key={i}
          className="whitespace-pre-line text-xl font-jihye leading-relaxed text-[#3a2c1c]"
        >
          {line}
        </p>
      ))}
    </div>
  );
};
