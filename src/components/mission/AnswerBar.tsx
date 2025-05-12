// src/components/mission/AnswerBar.tsx
import { useState } from "react";
import AnswerInput from "./answer/AnswerInput";

export interface AnswerData {
  gameId: number;
  order: number;
  answerBlockType: string;
  language: string;
}
interface Props {
  config: AnswerData;
  onSuccess: () => void;
}

export default function AnswerBar({ config, onSuccess }: Props) {
  const [v, setV] = useState("");
  console.log("AnswerBar config", config);

  switch (config.answerBlockType) {
    case "INPUT_STRING":
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSuccess();
          }}
          className="px-5 pb-6 safe-bottom"
        >
          <AnswerInput
            value={v}
            onChange={setV}
            placeholder="정답을 입력하세요"
          />
        </form>
      );

    case "SINGLE_BUTTON":
      return (
        <div className="px-5 pb-6 safe-bottom">
          <button
            onClick={onSuccess}
            className="w-full py-4 rounded-[20px] bg-primary text-white text-lg"
          >
            {"확인"}
          </button>
        </div>
      );
    case "GPS":
      return (
        <div className="px-5 pb-6 safe-bottom">
          <button
            onClick={onSuccess}
            className="w-full py-4 rounded-[20px] bg-primary text-white text-lg"
          >
            {"확인"}
          </button>
        </div>
      );

    /* INPUT_DPAD 등은 나중에 추가 */
    default:
      return null;
  }
}
