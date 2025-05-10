import {
  createHint,
  CreateHintParams,
  getHint,
  UseHintParams,
} from "@/api/hint";
import { useMutation } from "@tanstack/react-query";

// 힌트 사용
export const useHint = () => {
  //   const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: UseHintParams) => getHint(params),
    onSuccess: () => {
      // 필요시 invalidateQueries
    },
  });
};

// 힌트 생성/수정
export const useCreateHint = () => {
  //   const qc = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateHintParams) => createHint(params),
    onSuccess: () => {
      // 필요시 invalidateQueries
    },
  });
};
