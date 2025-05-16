// src/components/mission/MissionRenderer.tsx
import AnswerBar, { AnswerData } from "./AnswerBar";
import BlockRenderer from "./BlockRenderer";

export interface MissionBlock {
  text: string;
  preset: string;
}

export interface MissionData {
  blocks: MissionBlock[];
  gameId: number;
  id: number;
  order: number;
  language: string;
  missionBlockType: string;
}

export default function MissionRenderer({
  blocks,
  answer,
}: {
  blocks: MissionBlock[];
  answer: AnswerData | undefined; // TODO: Define the type for answer
}) {
  // const goNextMission = useMissionStore((s) => s.goNextMission);

  return (
    <section className="h-dvh flex flex-col overflow-x-hidden bg-[#1A1A1A] px-5">
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory scroll-smooth space-y-4 justify-center items-center [&::-webkit-scrollbar]:hidden">
        {blocks.map((block, i) => (
          <div
            key={i}
            className="snap-start overflow-x-hidden min-h-full flex items-center flex-col justify-center gap-5"
          >
            {block.preset === "Letter" && <div className="h-20" />}
            <BlockRenderer block={block} />
            {i === blocks.length - 1 && (
              <>{answer && <AnswerBar config={answer} />}</>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
