import { tokenStorage } from "@/utils/tokenStorage";
import { z } from "zod";
import { api } from "./client";

// src/api/member.ts
const AuthResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    jwtResponse: z
      .object({
        accessToken: z.string(),
        refreshToken: z.string(),
      })
      .optional(),
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
  if (parsedData.data.jwtResponse) {
    tokenStorage.setTokens(
      parsedData.data.jwtResponse.accessToken,
      parsedData.data.jwtResponse.refreshToken
    );
  }
  // tokenStorage.setTokens(
  //   parsedData.data.jwtResponse.accessToken,
  //   parsedData.data.jwtResponse.refreshToken
  // );

  return parsedData;
};

export type LoginParams = {
  name: string;
  phoneNumber: string;
  role: "ROLE_USER" | "ROLE_ADMIN";
};

export const login = async (params: LoginParams) => {
  const { data } = await api.post("/members/login", params);
  console.log("로그인 응답", data);
  return data; // 단순 응답
};
// export const login = async (params: LoginParams) => {
//   const { data } = await api.request({
//     url: "/members/login",
//     method: "GET",
//     data: params, // ✅ body에 데이터 실음
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return data;
// };

export type SignupParams = {
  name: string;
  phoneNumber: string;
  college: string;
  department: string;
  yearOfAdmission: number;
  authenticateCode: number;
  teamName?: string;
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

export const getInfoResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  data: z.object({
    teamName: z.string(),
    teamId: z.number(),
    startedAt: z.string(),
    totalHintCount: z.number(),
    useHintCount: z.number(),
    memberName: z.string(),
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

export const getInfo = async (gameId: number) => {
  const { data } = await api.get("/members/info", {
    params: { gameId },
  });
  const parsedData = getInfoResponseSchema.parse(data);
  return parsedData;
};
