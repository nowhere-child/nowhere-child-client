import { z } from "zod";
import { api } from "./client";

// src/api/member.ts
export const checkAuthCode = async (authenticateCode: number) => {
  const { data } = await api.get("/members", {
    params: { authenticateCode },
  });
  return z
    .object({
      isLeader: z.boolean(),
      memberId: z.number(),
      participated: z.boolean(),
    })
    .parse(data.data);
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

export const signup = async (body: SignupParams) => {
  const { data } = await api.post("/members/sign-up", body);
  return z
    .object({
      accessToken: z.string(),
      refreshToken: z.string(),
    })
    .parse(data.data);
};
