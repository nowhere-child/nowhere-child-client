// src/api/hint.ts
import { z } from "zod";
import { api } from "./client";

/* ----------------------- 타입 ----------------------- */
export const HintResponseSchema = z.object({
  code: z.literal(200),
  message: z.string(),
  data: z.object({
    gameId: z.number(),
    missionId: z.number(),
    hintOrder: z.string(),
    hint: z.string(),
  }),
});

export type HintResponse = z.infer<typeof HintResponseSchema>;

export interface UseHintParams {
  gameId: number;
  missionId: number;
  memberId: number;
  hintOrder: string; // e.g. "1", "2", "3"
}

export interface CreateHintParams {
  gameId: number;
  missionId: number;
  hintOrder: string;
  hint: string;
}

/* ----------------------- API 호출 ----------------------- */

// 힌트 사용
export const getHint = async (params: UseHintParams) => {
  const { data } = await api.post("/hints/use", params);
  return HintResponseSchema.parse(data).data;
};

// 힌트 생성/수정
export const createHint = async (params: CreateHintParams) => {
  const { data } = await api.post("/hints/create", params);
  return HintResponseSchema.parse(data).data;
};
