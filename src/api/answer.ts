// src/api/answer.ts
import { z } from "zod";
import { api } from "./client";

export const AnswerSchema = z.object({
  gameId: z.number(),
  order: z.number(),
  answerBlockType: z.string(),
  language: z.string(),
});

export const SubmitAnswerSchema = z.object({
  correct: z.boolean(),
});

export const fetchAnswer = async (params: {
  gameId: number;
  missionOrder: number;
  language: string;
}) => {
  const { data } = await api.get("/answers", { params });
  return AnswerSchema.parse(data.data);
};

export const submitAnswer = async (params: {
  gameId: number;
  memberId: number;
  missionOrder: number;
  language: string;
  answer: string;
}) => {
  const { data } = await api.get("/answers/submit", { params });
  return SubmitAnswerSchema.parse(data.data);
};
