// 채팅 참가자가 보내고-받는 메시지
export interface ChatMessage {
  /** 작성자 닉네임 (백엔드에서 내려주지 않는 경우 클라이언트에서 매핑) */
  author: string;
  /** 실제 내용 */
  content: string;
  /** epoch(ms) */
  ts: number;
  /** 숫자 ID – DB foreign key */
  memberId: number;
}

/** WebSocket 으로 주고-받는 JSON 스펙 (서버 문서에 맞춰 조정) */
export interface WSChatPayload {
  msg: string;
  roomNumber: string;
  memberId: string; // 서버가 문자열로 요구
  sessionId: string;
  type?: string; // 필요 없으면 제거
}
