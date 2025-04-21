// src/store/useUser.ts
import { create } from "zustand";

interface State {
  nickname: string;
  setNickname: (name: string) => void;
}

export const useUser = create<State>((set) => ({
  nickname: "",
  setNickname: (name) => set({ nickname: name }),
}));
