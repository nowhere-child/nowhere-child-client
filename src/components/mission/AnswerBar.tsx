// src/components/mission/AnswerBar.tsx
import { useSubmitAnswer } from "@/hooks/useAnswer";
import { useMissionStore } from "@/store/missionStore";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import AnswerInput from "./answer/AnswerInput";
import DPadLock from "./answer/DPadLock";
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
  const { mutateAsync: finishMission } = useSubmitAnswer();

  const { missionId, setMissionId } = useMissionStore();
  const qc = useQueryClient();
  const navigate = useNavigate();

  /* ② 정답 성공 시 */
  const handleNext = async (submittedAnswer?: string) => {
    const answerToSubmit = submittedAnswer ?? v;
    if (!answerToSubmit) {
      toast.error("정답을 입력해주세요.");
      return;
    }

    const res = await finishMission({
      gameId: 1,
      missionOrder: missionId ?? 0,
      answer: answerToSubmit,
      language: "KO",
    });
    setV("");
    if (missionId === 10) {
      navigate("/result");
      return;
    }
    if (res.correct === true) {
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
    } else {
      toast.error("정답이 아닙니다.");
    }
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
    case "DIRECTION_LOCK":
      return (
        <div className="px-5 pb-6 safe-bottom">
          <DPadLock
            onSuccess={handleNext}
            setV={setV}
            solution={["R", "D", "L", "D", "R"]}
          />
        </div>
      );

    /* INPUT_DPAD 등은 나중에 추가 */
    default:
      return null;
  }
}
