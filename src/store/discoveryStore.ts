import { create } from "zustand";
import { discoveryApi, type HomeConfiguration } from "../api/discovery";

interface DiscoveryState {
  config: HomeConfiguration | null;
  isLoading: boolean;
  error: string | null;
  fetchConfig: () => Promise<void>;
  updateConfig: (updates: Partial<HomeConfiguration>) => Promise<void>;
  updateSection: (sectionType: string, updates: any) => Promise<void>;
}

export const useDiscoveryStore = create<DiscoveryState>((set, get) => ({
  config: null,
  isLoading: false,
  error: null,
  fetchConfig: async () => {
    set({ isLoading: true, error: null });
    try {
      const config = await discoveryApi.getActiveHome();
      set({ config, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch homepage config",
        isLoading: false,
      });
    }
  },
  updateConfig: async (updates: Partial<HomeConfiguration>) => {
    const { config } = get();
    if (!config) return;

    set({ isLoading: true, error: null });
    try {
      const updated = await discoveryApi.updateHomeConfiguration(
        config._id,
        updates,
      );
      set({ config: updated, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update config",
        isLoading: false,
      });
    }
  },
  updateSection: async (sectionType: string, sectionUpdates: any) => {
    const { config } = get();
    if (!config) return;

    const updatedSections = config.sections.map((s) =>
      s.type === sectionType ? { ...s, ...sectionUpdates } : s,
    );

    set({ isLoading: true, error: null });
    try {
      const updated = await discoveryApi.updateHomeConfiguration(config._id, {
        sections: updatedSections,
      });
      set({ config: updated, isLoading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update section",
        isLoading: false,
      });
    }
  },
}));
