/* ───── src/chat/ChatInput.tsx ───── */
import { Send } from "lucide-react";
import { useState } from "react";
import { useChat } from "./ChatProvider";

export default function ChatInput() {
  const { send } = useChat();
  const [value, setValue] = useState("");

  /* ========== 안전 전송 래퍼 ========== */
  const safeSend = () => {
    const msg = value.trim();
    if (!msg) return;
    send(msg);
    setValue("");
  };

  /* ========== 키 이벤트 ========== */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    /* ① IME 조합 중이면 무시 */
    if ((e.nativeEvent as any).isComposing) return;

    /* ② Enter → 전송, 단 shift+enter 는 줄바꿈 용으로 남겨두려면 e.shiftKey 체크 */
    if (e.key === "Enter") {
      e.preventDefault(); // submit / click 버블 방지
      safeSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-zinc-100">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-full bg-white px-4 py-2"
        placeholder="메시지 입력"
      />

      <button
        type="button"
        onClick={safeSend}
        className="p-1 rounded-full text-white disabled:opacity-50"
        disabled={!value.trim()}
      >
        <Send className="w-8 h-8 bg-black rounded-4xl p-1.5" />
      </button>
    </div>
  );
}
