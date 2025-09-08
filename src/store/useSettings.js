import { create } from 'zustand'

export const useSettingsStore = create((set, get) => ({
  profile: {
    name: '',
    email: '',
    bio: ''
  },
  privacy: {
    showOnlineStatus: true,
    allowFriendRequests: true,
    readReceipts: true
  },
  notifications: {
    pushEnabled: true,
    emailEnabled: false,
    sound: true
  },

  updateProfile: (updates) => set((state) => ({ profile: { ...state.profile, ...updates } })),
  updatePrivacy: (updates) => set((state) => ({ privacy: { ...state.privacy, ...updates } })),
  updateNotifications: (updates) => set((state) => ({ notifications: { ...state.notifications, ...updates } }))
}))


