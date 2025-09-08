import { create } from 'zustand'

export const useNotifStore = create((set, get) => ({
  unreadCount: 0,
  notifications: [],

  addNotification: (text) => set((state) => ({
    unreadCount: state.unreadCount + 1,
    notifications: [{ id: Math.random().toString(36).slice(2,10), text, createdAt: new Date().toISOString() }, ...state.notifications]
  })),

  clear: () => set({ unreadCount: 0 }),
}))
