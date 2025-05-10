import { api } from "./client";
import { FetchMissionParams, MissionResponseSchema } from "./type";

export const fetchMission = async ({
  gameId,
  missionOrder,
  language,
}: FetchMissionParams) => {
  const { data } = await api.get(`/missions`, {
    params: {
      gameId,
      missionOrder,
      language,
    },
  });
  const parsed = MissionResponseSchema.parse(data.data);
  return parsed.data;
};
