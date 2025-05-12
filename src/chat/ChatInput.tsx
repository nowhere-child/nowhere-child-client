// ChatInput.tsx
import { Send } from "lucide-react";
import { useState } from "react";
import { useChat } from "./ChatProvider";

export default function ChatInput() {
  const { send } = useChat();
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    send(value.trim());
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-zinc-100">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 rounded-full bg-white px-4 py-2"
        placeholder="메시지 입력"
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="p-1 rounded-full text-white disabled:opacity-50"
        disabled={!value.trim()}
      >
        <Send className="w-8 h-8 bg-black rounded-4xl p-1.5" />
      </button>
    </div>
  );
}
