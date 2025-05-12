import * as MemberAPI from "@/api/member";
import { LoginParams, SignupParams } from "@/api/member";
import { useMutation } from "@tanstack/react-query";

/* 인증코드 확인 훅 */
export const useCheckAuthCode = () =>
  useMutation({
    mutationFn: (authenticateCode: number) =>
      MemberAPI.checkAuthCode(authenticateCode),
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
