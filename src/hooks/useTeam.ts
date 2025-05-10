// src/hooks/useTeam.ts
import * as TeamAPI from "@/api/team";
import { useMutation, useQuery } from "@tanstack/react-query";

/** 팀 이름 중복 확인 */
export const useCheckTeamName = (teamName: string) => {
  return useQuery({
    queryKey: ["checkTeamName", teamName],
    queryFn: () => TeamAPI.checkTeamName(teamName),
    enabled: !!teamName, // 빈 문자열이면 호출 방지
  });
};

/** 팀 생성 */
export const useIssueTeam = () => {
  return useMutation({
    mutationFn: TeamAPI.issueTeam,
  });
};
