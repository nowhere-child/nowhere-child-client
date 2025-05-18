import { useGetMemberInfo } from "@/hooks/useMember";
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useRef } from "react";
import { useChat } from "./ChatProvider";

dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function ChatMessageList({ className = "" }) {
  const { messages } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { data } = useGetMemberInfo(1);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className={clsx(
        "space-y-3 overflow-y-auto px-4 flex-grow flex flex-col",
        className
      )}
    >
      {messages.map((m, i) => (
        <div
          key={i}
          className={`flex flex-col ${m.memberName === data?.data.memberName ? "items-end" : "items-start"}`}
        >
          <span className="text-xs text-zinc-400">{m.memberName}</span>
          <div className="bg-zinc-900 text-white rounded-xl px-4 py-2 max-w-[80%] break-all">
            {m.msg}
          </div>
          <span className="text-[10px] text-zinc-400 ml-1">
            {dayjs(m.createdAt).fromNow()}
          </span>
        </div>
      ))}
    </div>
  );
}
