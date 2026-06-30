// client/store/authStore.ts
import { create } from "zustand";
import { User } from "@/types/index";
import api from "@/lib/api";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  fetchMe: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchMe: async () => {
    try {
      const res = await api.get("/api/auth/me");
      set({ user: res.data.data, loading: false });
    } catch {
      set({ user: null, loading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/api/auth/logout");
      set({ user: null });
    } catch {
      set({ user: null });
    }
  },
}));
