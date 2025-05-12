// src/api/client.ts
import axios from "axios";
import { toast } from "sonner";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  // withCredentials: false,
  timeout: 10_000,
});

// 공통 에러 핸들
api.interceptors.response.use(
  (res) => res,
  (err) => {
    toast.error(err.response?.data?.message ?? "네트워크 오류");
    return Promise.reject(err);
  }
);
