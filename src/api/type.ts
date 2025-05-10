import { z } from "zod";

export type FetchMissionParams = {
  gameId: number;
  missionOrder: number;
  language: string;
};
export const MissionResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    id: z.number(),
    gameId: z.number(),
    order: z.number(),
    missionBlockType: z.string(),
    language: z.string(),
    block1: z.string(),
    block2: z.string(),
    block3: z.string(),
    block4: z.string(),
  }),
});

export type MissionResponse = z.infer<typeof MissionResponseSchema>;
