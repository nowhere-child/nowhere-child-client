import { FolderNote } from "./blocks/FolderNote";
import { StickyNote } from "./blocks/StickyNote";
import { TextNote } from "./blocks/TextNote";
import { MissionBlock } from "./MissionRenderer";

export default function BlockRenderer({ block }: { block: MissionBlock }) {
  switch (block.preset) {
    case "Letter":
      return (
        <>
          <FolderNote text={block.text} />
        </>
      );
    case "Sticky":
      return <StickyNote text={block.text} />;

    default:
      return <TextNote text={block.text} />;
  }
}
