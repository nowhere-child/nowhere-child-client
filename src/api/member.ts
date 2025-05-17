import { tokenStorage } from "@/utils/tokenStorage";
import { z } from "zod";
import { api } from "./client";

// src/api/member.ts
const AuthResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    jwtResponse: z.object({
      accessToken: z.string(),
      refreshToken: z.string(),
    }),
    isLeader: z.boolean().optional(),
    participated: z.boolean().optional(),
  }),
});

export const checkAuthCode = async (authenticateCode: number) => {
  const { data } = await api.get("/members", {
    params: { authenticateCode },
  });
  const parsedData = AuthResponseSchema.parse(data);
  // 토큰 저장
  tokenStorage.setTokens(
    parsedData.data.jwtResponse.accessToken,
    parsedData.data.jwtResponse.refreshToken
  );

  return parsedData;
};

export type LoginParams = {
  name: string;
  phoneNumber: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
};

export const login = async (params: LoginParams) => {
  const { data } = await api.get("/members/login", {
    params,
  });
  console.log("로그인 응답", data);
  return data; // 단순 응답
};

export type SignupParams = {
  name: string;
  phoneNumber: string;
  college: string;
  department: string;
  yearOfAdmission: number;
  authenticateCode: number;
  teamName: string;
  gameId: number;
  role: "ROLE_USER" | "ROLE_ADMIN";
};

export const SignUpResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export const signup = async (body: SignupParams) => {
  const { data } = await api.post("/members/sign-up", body);
  const parsedData = SignUpResponseSchema.parse(data);
  // 토큰 저장
  tokenStorage.setTokens(
    parsedData.data.accessToken,
    parsedData.data.refreshToken
  );

  return parsedData;
};
