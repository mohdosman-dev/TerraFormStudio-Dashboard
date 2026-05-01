import { create } from 'zustand'
import { settingsApi, type SystemSettings } from '../api/settings'

interface SettingsState {
  settings: SystemSettings | null
  isLoading: boolean
  error: string | null
  fetchSettings: () => Promise<void>
  updateSettings: (settings: Partial<SystemSettings>) => Promise<void>
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: null,
  isLoading: false,
  error: null,
  fetchSettings: async () => {
    set({ isLoading: true, error: null })
    try {
      const settings = await settingsApi.getSettings()
      set({ settings, isLoading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch settings', isLoading: false })
    }
  },
  updateSettings: async (updatedData: Partial<SystemSettings>) => {
    set({ isLoading: true, error: null })
    try {
      const settings = await settingsApi.updateSettings(updatedData)
      set({ settings, isLoading: false })
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update settings', isLoading: false })
    }
  }
}))
