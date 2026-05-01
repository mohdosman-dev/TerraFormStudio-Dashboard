import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AuthState,
  User,
  LoginCredentials,
  AuthResponse,
} from "../types/auth";
import api from "../api/axios";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setAuth: (user: User, token: string) =>
        set({ user, token, isAuthenticated: true, error: null }),

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post<AuthResponse>(
            "/auth/login",
            credentials,
          );
          const { user, token } = response.data;
          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (err: any) {
          const errorMessage =
            err.response?.data?.message || "Invalid email or password";
          set({ error: errorMessage, isLoading: false });
          throw new Error(errorMessage, { cause: err });
        }
      },

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false, error: null }),

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      // Only persist user, token, and isAuthenticated
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
