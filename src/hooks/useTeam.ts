// src/hooks/useTeam.ts
import * as TeamAPI from "@/api/team";
import { useMutation } from "@tanstack/react-query";

/** 팀 이름 중복 확인 */
export const useCheckTeamName = (teamName: string) => {
  console.log("팀명 중복 확인", teamName);
  return useMutation({
    mutationFn: () => TeamAPI.checkTeamName(teamName),
  });
};

/** 팀 생성 */
export const useIssueTeam = () => {
  return useMutation({
    mutationFn: TeamAPI.issueTeam,
  });
};
