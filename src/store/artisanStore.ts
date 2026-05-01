import { create } from "zustand";
import api from "../api/axios";
import type { ArtisanStore } from "../types/artisan";

export const useArtisanStore = create<ArtisanStore>((set) => ({
  artisans: [],
  loading: false,
  error: null,

  fetchArtisans: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get("/artisans");
      // Backend might return _id, we map it to id for frontend consistency
      const data = response.data.map((a: any) => ({
        ...a,
        id: a.id || a._id,
      }));
      set({ artisans: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch artisans",
        loading: false,
      });
    }
  },

  createArtisan: async (formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await api.post("/artisans", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Refresh list after creation
      const response = await api.get("/artisans");
      const data = response.data.map((a: any) => ({
        ...a,
        id: a.id || a._id,
      }));
      set({ artisans: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to create artisan",
        loading: false,
      });
      throw err;
    }
  },

  updateArtisan: async (id: string, formData: FormData) => {
    set({ loading: true, error: null });
    try {
      await api.patch(`/artisans/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // Refresh list after update
      const response = await api.get("/artisans");
      const data = response.data.map((a: any) => ({
        ...a,
        id: a.id || a._id,
      }));
      set({ artisans: data, loading: false });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to update artisan",
        loading: false,
      });
      throw err;
    }
  },
}));
