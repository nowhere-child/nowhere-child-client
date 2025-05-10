// src/hooks/useRecord.ts
import * as RecordAPI from "@/api/record";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

/* ------------------ 1. 팀 기록 조회 ------------------ */
export const useTeamRecord = (gameId: number, memberId: number) => {
  return useQuery({
    queryKey: ["record", "team", gameId, memberId],
    queryFn: () => RecordAPI.getTeamRecord(gameId, memberId),
  });
};

/* ------------------ 2. 팀 랭킹 ------------------ */
export const useTeamRanking = (gameId: number) => {
  return useQuery({
    queryKey: ["record", "ranking", gameId],
    queryFn: () => RecordAPI.getTeamRanking(gameId),
  });
};

/* ------------------ 3. 개인 기록 ------------------ */
export const usePersonalRecord = (gameId: number, memberId: number) => {
  return useQuery({
    queryKey: ["record", "personal", gameId, memberId],
    queryFn: () => RecordAPI.getPersonalRecord(gameId, memberId),
  });
};

/* ------------------ 4. 기록 업데이트 ------------------ */
export const useUpdateRecord = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: RecordAPI.updateRecord,
    onSuccess: (_, variables) => {
      qc.invalidateQueries({
        queryKey: ["record", "team", variables.gameId, variables.memberId],
      });
      qc.invalidateQueries({
        queryKey: ["record", "personal", variables.gameId, variables.memberId],
      });
      qc.invalidateQueries({
        queryKey: ["record", "ranking", variables.gameId],
      });
    },
  });
};
