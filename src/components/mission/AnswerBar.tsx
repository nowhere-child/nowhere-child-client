// src/components/mission/AnswerBar.tsx
import { AnswerBarConfig } from "@/types/mission";
import { useState } from "react";
import AnswerInput from "./answer/AnswerInput";

interface Props {
  config: AnswerBarConfig;
  onSuccess: () => void;
}

export default function AnswerBar({ config, onSuccess }: Props) {
  const [v, setV] = useState("");

  switch (config.mode) {
    case "INPUT_TEXT":
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (v.trim().toUpperCase() === config.solution!.toUpperCase()) {
              onSuccess();
            }
          }}
          className="px-5 pb-6 safe-bottom"
        >
          <AnswerInput
            value={v}
            onChange={setV}
            placeholder={config.placeholder}
          />
        </form>
      );

    case "BUTTON":
      return (
        <div className="px-5 pb-6 safe-bottom">
          <button
            onClick={onSuccess}
            className="w-full py-4 rounded-[20px] bg-primary text-white text-lg"
          >
            {config.label ?? "확인"}
          </button>
        </div>
      );

    /* INPUT_DPAD 등은 나중에 추가 */
    default:
      return null;
  }
}
