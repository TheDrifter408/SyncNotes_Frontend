import type { User } from "@/types/User";
import { create } from "zustand";

type GlobalState = {
  user: User | null;
};

type StoreActions = {
  setUser: (user: User | null) => void;
  getUser: () => User | null;
};

export const useGlobalStore = create<GlobalState & StoreActions>(
  (set, get) => ({
    user: null,
    setUser: (user: User | null) => {
      set({ user });
    },
    getUser: () => {
      return get().user;
    },
  }),
);
