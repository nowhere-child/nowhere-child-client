// src/api/client.ts
import { tokenStorage } from "@/utils/tokenStorage";
import axios, { AxiosError } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "/api",
  // withCredentials: false,
  timeout: 10_000,
});

// 요청 인터셉터: 모든 요청에 인증 헤더 추가
api.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 토큰 만료 처리
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // 토큰 만료 (401) 오류 && 아직 재시도하지 않은 경우
    if (
      error.response?.status === 401 &&
      !originalRequest?.headers["X-Retry"]
    ) {
      try {
        // 리프레시 토큰으로 새 액세스 토큰 발급 요청
        const refreshToken = tokenStorage.getRefreshToken();
        const { data } = await axios.post("/auth/refresh", { refreshToken });

        // 새 토큰 저장
        tokenStorage.setTokens(
          data.accessToken,
          data.refreshToken || refreshToken
        );

        // 원래 요청 재시도
        if (originalRequest) {
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          originalRequest.headers["X-Retry"] = "true";
          return axios(originalRequest);
        }
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 로그아웃 처리
        tokenStorage.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
