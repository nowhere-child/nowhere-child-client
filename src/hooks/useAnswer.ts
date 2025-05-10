import * as AnswerAPI from "@/api/answer";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAnswer = (params: {
  gameId: number;
  missionOrder: number;
  language: string;
}) => {
  return useQuery({
    queryKey: ["answer", params.missionOrder],
    queryFn: () => AnswerAPI.fetchAnswer(params),
  });
};

export const useSubmitAnswer = () => {
  return useMutation({
    mutationFn: AnswerAPI.submitAnswer,
  });
};
