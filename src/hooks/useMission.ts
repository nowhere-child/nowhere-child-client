// src/hooks/useMission.ts
import * as MissionAPI from "@/api/mission";
import { FetchMissionParams } from "@/api/type";
import { useQuery } from "@tanstack/react-query";

/* 미션 1건 */
export const useMission = ({
  gameId,
  missionOrder,
  language,
}: FetchMissionParams) =>
  useQuery({
    queryKey: ["mission", gameId, missionOrder],
    queryFn: () => MissionAPI.fetchMission({ gameId, missionOrder, language }),
  });
