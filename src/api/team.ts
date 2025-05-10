// src/api/team.ts
import { z } from "zod";
import { api } from "./client";

/* ==================== 타입 정의 ==================== */
export const TeamNameCheckResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.record(z.never()).optional(),
});

export const IssueTeamResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({ authenticateCodeList: z.array(z.number()) }),
});

export type TeamNameCheckResponse = z.infer<typeof TeamNameCheckResponseSchema>;
export type IssueTeamResponse = z.infer<typeof IssueTeamResponseSchema>;

/* ==================== API 호출 ==================== */

/** 팀 이름 중복 체크 */
export const checkTeamName = async (teamName: string) => {
  const { data } = await api.get("/teams/duplicate", {
    params: { teamName },
  });
  return TeamNameCheckResponseSchema.parse(data);
};

/** 팀 생성 */
export const issueTeam = async ({
  teamSize,
  gameId,
}: {
  teamSize: string;
  gameId: number;
}) => {
  const { data } = await api.post("/teams", { teamSize, gameId });
  return IssueTeamResponseSchema.parse(data);
};
