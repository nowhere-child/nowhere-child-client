/* ───────── src/chat/ChatProvider.tsx ───────── */
import * as ChatAPI from "@/api/chat";
import { ChatMessage, WSChatPayload, WSChatResponse } from "@/chat/types";
import { useMissionStore } from "@/store/missionStore";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

/* ---------- Context 타입 ---------- */
interface ChatCtxProps {
  messages: ChatMessage[];
  send: (text: string) => void;
  loadMore: () => Promise<void>;
}
const ChatCtx = createContext<ChatCtxProps | null>(null);

/* ---------- Provider ---------- */
export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  /* 전역 스토어 값 */
  const { roomNumber, setRoomNumber } = useMissionStore();
  const token = localStorage.getItem("accessToken");
  const gameId = 1;

  /* 상태 & refs */
  const [messages, setMsgs] = useState<ChatMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  // const mountedOnce = useRef(false); // StrictMode 중복 마운트 방지

  /* ========== 1. 과거 기록 ========== */
  const loadMore = useCallback(async () => {
    try {
      const { history: history, roomNumber: fetchedRoomNumber } =
        await ChatAPI.fetchHistory(gameId);
      console.log("history", history);
      setMsgs(history); // 전체 갱신
      if (fetchedRoomNumber !== undefined) {
        // roomNumber가 유효한 경우
        setRoomNumber(fetchedRoomNumber); // 전역 스토어의 roomNumber 업데이트
      }
    } catch (err) {
      console.error("[chat] history fail", err);
      toast.error("채팅 기록을 불러오지 못했습니다");
    }
  }, [gameId]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  /* ========== 2. WebSocket ========== */
  useEffect(() => {
    // /* StrictMode: 두 번째 실행 때는 mountedOnce 가 true → 넘어감 */
    // if (mountedOnce.current) return;
    // mountedOnce.current = true;

    const base = import.meta.env.VITE_WS_URL.replace(/\/+$/, "");
    const url = `${base}/wss/chat?roomNumber=${roomNumber}&token=${token}`;
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => console.log("🔗 chat WS OPEN", url);
    ws.onerror = (e) => {
      if (import.meta.env.DEV) console.error("[chat] WS error", e);
    };
    ws.onclose = (e) => {
      if (import.meta.env.DEV)
        console.warn("[chat] WS close", e.code, e.reason);
    };

    ws.onmessage = (e) => {
      const data: WSChatResponse = JSON.parse(e.data);
      if (!data.msg) return;
      /* 2-① 내가 방금 보낸 echo 라면 skip */
      // if (data.sessionId && data.sessionId === lastSendId.current) return;

      const newMsg: ChatMessage = {
        memberName: String(data.memberName),
        msg: data.msg,
        roomNumber: Number(data.roomNumber),
        createdAt: Date.now(),
      };
      setMsgs((prev) => [...prev, newMsg]);
    };

    return () => ws.close();
  }, [roomNumber]);

  /* ========== 3. 전송 ========== */
  const send = (text: string) => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      toast.error("연결되지 않았습니다");
      return;
    }

    const payload: WSChatPayload = {
      msg: text,
      roomNumber: String(roomNumber),
    };
    console.log("send", payload);

    // ws.send(JSON.stringify(payload));
    try {
      console.log(JSON.stringify(payload));
      ws.send(JSON.stringify(payload));
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("메시지 전송 중 오류가 발생했습니다.");
    }
    // lastSendId.current = sessionId; // echo 필터용

    /* 낙관적 렌더링 */
    // setMsgs((prev) => [
    //   ...prev,
    //   // {
    //   //   // memberName: nickname || "익명",
    //   //   msg: text,
    //   //   // createdAt: Date.now(),
    //   //   roomNumber: roomNumber,
    //   // },
    // ]);
  };

  return (
    <ChatCtx.Provider value={{ messages, send, loadMore }}>
      {children}
    </ChatCtx.Provider>
  );
};

export const useChat = () => {
  const ctx = useContext(ChatCtx);
  if (!ctx) throw new Error("useChat must be used within <ChatProvider>");
  return ctx;
};
