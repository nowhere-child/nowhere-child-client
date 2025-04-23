// src/store/missionStore.ts
import { create } from "zustand";

interface MissionState {
  code: string;
  nickname: string;
  currentStep: number;
  totalSteps: number;
  hintsUsed: Record<number, number>;
  startedAt: number | null;

  setCode: (code: string) => void;
  setNickname: (name: string) => void;
  setStep: (step: number) => void;
  goNext: () => void;
  useHint: () => void;
  hydrate: (data: Partial<MissionState>) => void;
  reset: () => void;
}

export const useMissionStore = create<MissionState>((set, get) => ({
  code: "",
  nickname: "",
  currentStep: 0,
  totalSteps: 5,
  hintsUsed: {},
  startedAt: null,

  setCode: (code) => set({ code }),
  setNickname: (nickname) => set({ nickname }),
  setStep: (currentStep) => set({ currentStep }),
  goNext: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  useHint: () => {
    const step = get().currentStep;
    const prev = get().hintsUsed[step] || 0;
    if (prev < 3) {
      set((state) => ({
        hintsUsed: { ...state.hintsUsed, [step]: prev + 1 },
      }));
    }
  },
  hydrate: (data) => set((state) => ({ ...state, ...data })),
  reset: () =>
    set({
      code: "",
      nickname: "",
      currentStep: 0,
      hintsUsed: {},
      startedAt: null,
    }),
}));
