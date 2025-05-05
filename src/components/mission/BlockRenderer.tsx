import { Block } from "@/types/mission";
import { TextNote } from "./blocks/TextNote";

export default function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "TXT":
      return <TextNote text={block.text} />;
    case "IMG":
      return (
        <img
          src={block.src}
          alt={block.alt ?? ""}
          style={{ height: block.height ?? "auto" }}
          className="rounded-lg mx-auto"
        />
      );
    case "CAR":
      return (
        <div className="flex overflow-x-auto gap-4">
          {block.images.map((src) => (
            <img key={src} src={src} className="h-48 rounded-lg" />
          ))}
        </div>
      );
    case "CODE":
      return (
        <pre className="bg-neutral-900 p-4 rounded-md font-mono">
          {block.text}
        </pre>
      );
    default:
      return null;
  }
}
