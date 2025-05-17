// src/api/record.ts
import { z } from "zod";
import { api } from "./client";

/* ------------------ 공통 타입 ------------------ */
export const RecordResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.any(),
});

/* ------------------ 1. 팀 기록 조회 ------------------ */
export const getTeamRecord = async (gameId: number) => {
  const { data } = await api.get("/records/team", {
    params: { gameId },
  });
  return RecordResponseSchema.parse(data).data;
};

/* ------------------ 2. 팀 랭킹 조회 ------------------ */
export const getTeamRanking = async (gameId: number) => {
  const { data } = await api.get(`/records/ranking/${gameId}`);
  return RecordResponseSchema.parse(data).data;
};

/* ------------------ 3. 개인 기록 조회 ------------------ */
export const getPersonalRecord = async (gameId: number) => {
  const { data } = await api.get("/records/personal", {
    params: { gameId },
  });
  return RecordResponseSchema.parse(data).data;
};

/* ------------------ 4. 기록 업데이트 ------------------ */
export const updateRecord = async (payload: {
  gameId: number;
  missionOrder: number;
}) => {
  const { data } = await api.post("/records/update", payload);
  return RecordResponseSchema.parse(data).data;
};
