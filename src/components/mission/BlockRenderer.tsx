import { FolderNote } from "./blocks/FolderNote";
import ImageBlock from "./blocks/ImageBlock";
import { StickyNote } from "./blocks/StickyNote";
import TextBlock from "./blocks/TextBlock";
import { TextNote } from "./blocks/TextNote";
import { TextNote2 } from "./blocks/TextNote2";
import { MissionBlock } from "./MissionRenderer";

export default function BlockRenderer({ block }: { block: MissionBlock }) {
  switch (block.preset) {
    case "LETTE":
      return (
        <>
          <FolderNote text={block.text} />
        </>
      );
    case "Sticky":
      return <StickyNote text={block.text} />;

    case "IMAGE":
      return <ImageBlock text={block.text} />;

    case "TEXT":
      return <TextBlock text={block.text} />;

    case "NOTE2":
      return <TextNote2 text={block.text} />;

    //오디오추가

    default:
      return <TextNote text={block.text} />;
  }
}
