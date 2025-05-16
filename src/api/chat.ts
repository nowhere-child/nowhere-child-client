import { api } from "@/api/client";
import { ChatMessage, WSChatPayload } from "@/chat/types";
import { z } from "zod";

/* ---------- ① 히스토리 ---------- */
export async function fetchHistory(memberId: number, gameId: number) {
  // /chats/room?memberId=1&gameId=1
  const { data } = await api.get("/chats/room", {
    params: { memberId, gameId },
  });

  /* Swagger 응답을 zod로 검증 */
  const Schema = z.object({
    code: z.literal(200),
    message: z.string(),
    data: z.object({
      roomNumber: z.number(),
      teamId: z.number(),
      messages: z.array(
        z.object({
          memberId: z.number(),
          roomNumber: z.number(),
          msg: z.string(),
          createdAt: z.string(),
        })
      ),
    }),
  });

  const parsed = Schema.parse(data);
  /* createdAt → epoch(ms) 로 변환 + author 는 memberId 로 임시 설정 */
  const history: ChatMessage[] = parsed.data.messages.map((m) => ({
    memberId: m.memberId,
    author: String(m.memberId),
    content: m.msg,
    ts: Date.parse(m.createdAt),
  }));
  return history;
}

/* ---------- ② WebSocket Payload 타입 재-export ---------- */
export type { WSChatPayload };
