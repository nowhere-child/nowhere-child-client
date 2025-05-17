// src/components/mission/AnswerInput.tsx
import { ArrowRight } from "lucide-react";

interface AnswerInputProps {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}

/** 스타일 전용 Input (검증‧제출 로직은 외부에서) */
export default function AnswerInput({
  value,
  placeholder = "답을 입력해주세요.",
  onChange,
}: AnswerInputProps) {
  return (
    <div className="flex items-center w-full rounded-[24px] bg-[#1E1E1E]/80 px-6 py-4 mb-20">
      <input
        className="flex-1 bg-transparent outline-none text-[17px] text-main
                   placeholder:text-gray-500"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />

      <div className="mx-4 h-6 w-px bg-gray-700" />

      {/* 화살표 아이콘(버튼 아님) – 제출은 form 자체에서 Enter or submit버튼으로 */}
      <button type="submit">
        <ArrowRight size={24} strokeWidth={2} className="text-gray-400" />
      </button>
    </div>
  );
}
