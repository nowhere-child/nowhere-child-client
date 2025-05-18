// 채팅 참가자가 보내고-받는 메시지
export interface ChatMessage {
  /** 작성자 닉네임 (백엔드에서 내려주지 않는 경우 클라이언트에서 매핑) */
  memberName?: string;
  roomNumber?: number;
  /** 실제 내용 */
  msg: string;
  /** epoch(ms) */
  createdAt?: number;
  /** 숫자 ID – DB foreign key */
}

/** WebSocket 으로 주고-받는 JSON 스펙 (서버 문서에 맞춰 조정) */
export interface WSChatPayload {
  msg: string;
  // memberName: string;
  roomNumber: string;
  // sessionId?: string;
  // createdAt: number;
}

export interface WSChatResponse {
  msg: string;
  memberName: string;
  roomNumber: string;
  // sessionId?: string;
  createdAt: number;
}
