import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useChat } from "./ChatProvider";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function ChatMessageList({ className = "" }) {
  const { messages } = useChat();

  return (
    <div className={clsx("space-y-3 overflow-y-auto px-4", className)}>
      {messages.map((m, i) => (
        <div key={i} className="flex flex-col items-start">
          <span className="text-xs text-zinc-400">{m.author}</span>
          <div className="bg-zinc-900 text-white rounded-xl px-4 py-2 max-w-[80%] break-all">
            {m.content}
          </div>
          <span className="text-[10px] text-zinc-400 ml-1">
            {dayjs(m.ts).fromNow()}
          </span>
        </div>
      ))}
    </div>
  );
}
