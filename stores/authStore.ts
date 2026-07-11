import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "mechanic" | "guest";
}

interface AuthState {
  user: User | null;
  loading: boolean;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,

  setUser: (user) => set({ user }),

  setLoading: (loading) => set({ loading }),
}));