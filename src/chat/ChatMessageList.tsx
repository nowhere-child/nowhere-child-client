// ChatMessageList.tsx
import clsx from "clsx";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // (선택) 한국어 “1분 전” 표기
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("ko"); // default locale 설정

export interface ChatMessage {
  author: string; // 닉네임
  content: string;
  ts: number; // timestamp
}

const textMessage = [
  {
    author: "ME",
    content: "안녕하세요",
    ts: 1699999999999,
  },
  {
    author: "ME",
    content: "안녕하세요",
    ts: 1699999999999,
  },
];

export default function ChatMessageList({ className = "" }) {
  //   const { messages } = useChat();
  const messages = textMessage;

  return (
    <div className={clsx("space-y-3", className)}>
      {messages.map((m, i) => (
        <div key={i} className="flex flex-col items-start">
          <span className="text-xs text-zinc-400">{m.author}</span>
          <div className="bg-zinc-900 text-white rounded-xl px-4 py-2 max-w-[80%]">
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
