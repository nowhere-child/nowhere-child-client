import * as MemberAPI from "@/api/member";
import { LoginParams, SignupParams } from "@/api/member";
import { useMutation, useQuery } from "@tanstack/react-query";

/* 인증코드 확인 훅 */
export const useCheckAuthCode = (authenticateCode: number) =>
  useQuery({
    queryKey: ["authCode", authenticateCode],
    queryFn: () => MemberAPI.checkAuthCode(authenticateCode),
    enabled: !!authenticateCode, // 코드가 존재할 때만 실행
  });

/* 로그인 훅 */
export const useLogin = () =>
  useMutation({
    mutationFn: (params: LoginParams) => MemberAPI.login(params),
  });

/* 회원가입 훅 */
export const useSignup = () =>
  useMutation({
    mutationFn: (params: SignupParams) => MemberAPI.signup(params),
  });
