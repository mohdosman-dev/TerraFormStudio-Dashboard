import { create } from "zustand";
import { adminApi, type DashboardOverviewResponse } from "../api/admin";

interface AdminState {
  dashboardData: DashboardOverviewResponse | null;
  isLoading: boolean;
  error: string | null;
  fetchDashboardOverview: (range: '6months' | '1year') => Promise<void>;
  clearError: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  dashboardData: null,
  isLoading: false,
  error: null,

  fetchDashboardOverview: async (range: '6months' | '1year') => {
    set({ isLoading: true, error: null });
    try {
      const data = await adminApi.getDashboardOverview(range);
      set({ dashboardData: data, isLoading: false });
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to load dashboard overview. Please try again.";
      set({ error: errorMessage, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
