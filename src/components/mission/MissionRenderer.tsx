import { useMissionStore } from "@/store/missionStore";
import { Step } from "@/types/mission";
import AnswerBar from "./AnswerBar";
import BlockRenderer from "./BlockRenderer";

export default function MissionRenderer({ step }: { step: Step }) {
  const goNext = useMissionStore((s) => s.goNext);

  return (
    <section className="h-dvh flex flex-col bg-[#1A1A1A] px-5">
      {/* 스냅 컨테이너 */}
      <h2 className="text-xl">{step.title}</h2>
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth space-y-4 justify-center w-full items-center">
        {step.blocks.map((block, i) => (
          <div
            key={i}
            className="snap-start min-h-full flex items-center flex-col justify-center gap-5 mb-[66px]"
          >
            <BlockRenderer block={block} />
            {i === step.blocks.length - 1 && (
              <AnswerBar config={step.answerBar} onSuccess={goNext} />
            )}
          </div>
        ))}
      </div>
      {/* 답안 입력 바 */}
      {/* <AnswerBar config={step.answerBar} onSuccess={goNext} /> */}
    </section>
  );
}
