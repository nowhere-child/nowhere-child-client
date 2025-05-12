// src/store/missionStore.ts
import { create } from "zustand";

interface MissionState {
  code: string;
  nickname: string;
  missionId: number | null; // 현재 미션 ID
  totalMissions: number;
  hintsUsed: Record<number, number>;
  startedAt: number | null;
  role: "ROLE_USER" | "ROLE_ADMIN";

  setCode: (code: string) => void;
  setNickname: (name: string) => void;
  setMission: (missionId: number) => void;
  goNextMission: (missionId: number) => void;
  useHint: () => void;
  hydrate: (data: Partial<MissionState>) => void;
  reset: () => void;
  setRole: (role: "ROLE_USER" | "ROLE_ADMIN") => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  code: "",
  nickname: "",
  missionId: null,
  totalMissions: 8,
  hintsUsed: {},
  startedAt: null,
  role: "ROLE_USER",

  setCode: (code) => set({ code }),
  setNickname: (nickname) => set({ nickname }),
  setMission: (missionId) => set({ missionId }),
  goNextMission: (nextId) => set({ missionId: nextId }),
  useHint: () => {
    const id = get().missionId;
    if (id == null) return;
    const prev = get().hintsUsed[id] || 0;
    if (prev < 3) {
      set((state) => ({
        hintsUsed: { ...state.hintsUsed, [id]: prev + 1 },
      }));
    }
  },
  setRole: (role) => set({ role }),
  hydrate: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      code: "",
      nickname: "",
      missionId: null,
      hintsUsed: {},
      startedAt: null,
    }),
}));
