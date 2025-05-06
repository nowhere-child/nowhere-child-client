import { useMissionStore } from "@/store/missionStore";
import { Step } from "@/types/mission";
import { useEffect, useRef } from "react";
import AnswerBar from "./AnswerBar";
import BlockRenderer from "./BlockRenderer";

export default function MissionRenderer({ step }: { step: Step }) {
  const goNext = useMissionStore((s) => s.goNext);

  const scrollRef = useRef<HTMLDivElement>(null);

  // step 이 바뀔 때마다 내부 스크롤 컨테이너를 맨 위로
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);
  return (
    <section className="h-dvh flex flex-col overflow-x-hidden bg-[#1A1A1A] px-5">
      {/* 스냅 컨테이너 */}
      <h2 className="text-xl">{step.title}</h2>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth space-y-4 justify-center items-center [&::-webkit-scrollbar]:hidden"
      >
        {step.blocks.map((block, i) => (
          <div
            key={i}
            className="snap-start overflow-x-hidden min-h-full flex items-center flex-col justify-center gap-5"
          >
            {block.type == "TXT" && block.preset === "Letter" && (
              <div className="h-20" />
            )}
            {i === step.blocks.length - 1 &&
              block.type == "TXT" &&
              block.preset === "Letter" && <div className="h-16" />}
            <BlockRenderer block={block} />
            {i === step.blocks.length - 1 && (
              <AnswerBar config={step.answerBar} onSuccess={goNext} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
