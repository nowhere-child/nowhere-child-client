// src/components/mission/AnswerBar.tsx
import { submitAnswer } from "@/api/answer";
import { useMissionStore } from "@/store/missionStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import AnswerInput from "./answer/AnswerInput";
import GPS from "./answer/GPS";
import SingleButton from "./answer/SingleButton";

export interface AnswerData {
  gameId: number;
  order: number;
  answerBlockType: string;
  language: string;
  answer?: string;
}
interface Props {
  config: AnswerData;
}

export default function AnswerBar({ config }: Props) {
  const [v, setV] = useState("");

  /* ① 성공 기록 업로드 */
  const { mutateAsync: finishMission } = useMutation({
    mutationFn: () =>
      submitAnswer({
        memberId: 1,
        gameId: 1,
        missionOrder: missionId!,
        language: "KO",
        answer: v,
      }),
  });

  const { missionId, setMissionId } = useMissionStore();
  const qc = useQueryClient();

  /* ② 정답 성공 시 */
  const handleNext = async () => {
    const res = await finishMission(); // AnswerBar로 넘김
    setV("");
    console.log("res", res);

    const next = (missionId ?? 0) + 1;
    setMissionId(next); // store 갱신 → MissionEngine re-fetch
    qc.invalidateQueries({
      // 캐시 갱신
      queryKey: ["mission", next],
    });
    qc.invalidateQueries({
      queryKey: ["answer", next],
    });
    window.scrollTo(0, 0);
  };

  switch (config.answerBlockType) {
    case "INPUT_STRING":
      return (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNext();
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
      return <SingleButton handleNext={handleNext} setV={setV} />;
    case "GPS":
      return (
        <div className="px-5 pb-6 safe-bottom">
          <GPS onSuccess={handleNext} config={config} setV={setV} />
        </div>
      );

    /* INPUT_DPAD 등은 나중에 추가 */
    default:
      return null;
  }
}
