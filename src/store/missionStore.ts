// src/store/missionStore.ts
import { create } from "zustand";

interface MissionState {
  code: string;
  nickname: string;
  missionId: number | null; // 현재 미션 ID
  totalMissions: number;
  usedHintCount: Record<number, number>; // missionId → count
  hints: Record<number, string[]>; // missionId → hints array
  startedAt: number | null;
  role: "ROLE_USER" | "ROLE_ADMIN";
  isLeader: boolean;

  setCode: (code: string) => void;
  setNickname: (name: string) => void;
  setMission: (missionId: number) => void;
  goNextMission: (missionId: number) => void;
  useHint: () => void;
  setHint: (missionId: number, hint: string) => void;
  hydrate: (data: Partial<MissionState>) => void;
  reset: () => void;
  setRole: (role: "ROLE_USER" | "ROLE_ADMIN") => void;
  setMissionId: (id: number) => void;
  setLeader: (isLeader: boolean) => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  code: "",
  nickname: "",
  missionId: null,
  totalMissions: 9,
  hintsUsed: {},
  startedAt: null,
  role: "ROLE_USER",
  isLeader: false,

  setLeader: (isLeader) => set({ isLeader }),
  setCode: (code) => set({ code }),
  setNickname: (nickname) => set({ nickname }),
  setMission: (missionId) => set({ missionId }),
  goNextMission: (nextId) => set({ missionId: nextId }),
  setRole: (role) => set({ role }),
  setMissionId: (missionId) => set({ missionId }),
  hydrate: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      code: "",
      nickname: "",
      missionId: null,
      startedAt: null,
    }),
  usedHintCount: {},
  hints: {},
  useHint: () => {
    const missionId = get().missionId;
    if (missionId == null) return;

    const used = get().usedHintCount[missionId] ?? 0;
    if (used >= 3) return;

    const hintOrder = (used + 1).toString();

    // ✅ useHint 내부에서 직접 API 호출은 하지 말고 HintDialog에서 trigger
  },
  setHint: (missionId, hint) => {
    set((state) => {
      const prev = state.hints[missionId] ?? [];
      const nextHints = [...prev, hint];
      return {
        hints: {
          ...state.hints,
          [missionId]: nextHints,
        },
        usedHintCount: {
          ...state.usedHintCount,
          [missionId]: nextHints.length,
        },
      };
    });
  },
}));
