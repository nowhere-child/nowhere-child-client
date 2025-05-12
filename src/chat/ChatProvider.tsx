// src/chat/ChatProvider.tsx
import { useMissionStore } from "@/store/missionStore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatMessage } from "./types";

const ChatCtx = createContext<{
  messages: ChatMessage[];
  send: (content: string) => void;
} | null>(null);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { code } = useMissionStore(); // 팀 인증코드 = 채널 ID
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const ws = useRef<WebSocket | null>(null);

  /** ── ➊ 연결 ────────────────────────── */
  useEffect(() => {
    if (!code) return;
    ws.current = new WebSocket(`${import.meta.env.VITE_WS_URL}/chat/${code}`);
    ws.current.onopen = () => console.log("🔗 WS connected");
    ws.current.onmessage = (e) => {
      const msg = JSON.parse(e.data) as ChatMessage;
      setMessages((prev) => [...prev, msg]);
    };
    ws.current.onerror = () => toast.error("채팅 서버 오류");
    ws.current.onclose = () => console.log("WS closed");
    return () => ws.current?.close();
  }, [code]);

  /** ── ➋ 전송 함수 ───────────────────── */
  const send = (content: string) => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
      toast.error("연결되지 않았습니다");
      return;
    }
    const msg: ChatMessage = { author: "ME", content, ts: Date.now() };
    ws.current.send(JSON.stringify(msg));
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <ChatCtx.Provider value={{ messages, send }}>{children}</ChatCtx.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used within ChatProvider");
  return ctx;
};
