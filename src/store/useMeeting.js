import { create } from 'zustand'

const generateMeetingId = () => {
  // 10-digit numeric ID for simplicity
  const digits = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10)).join('')
  return digits
}

export const useMeetingStore = create((set, get) => ({
  scheduledMeetings: [],
  currentMeeting: null,

  scheduleMeeting: ({ title, scheduledAt, password }) => {
    const id = generateMeetingId()
    const meeting = {
      id,
      title: title || 'Meeting',
      scheduledAt: scheduledAt || new Date().toISOString(),
      password: password || '',
      createdAt: new Date().toISOString(),
      participantCount: 0
    }
    set((state) => ({ scheduledMeetings: [meeting, ...state.scheduledMeetings] }))
    return meeting
  },

  joinMeeting: ({ id, password }) => {
    if (!id || !password) {
      return { ok: false, error: 'Meeting ID and password are required' }
    }

    const byId = (get().scheduledMeetings || []).find((m) => m.id === id)
    if (byId) {
      if (byId.password && byId.password !== password) {
        return { ok: false, error: 'Invalid password' }
      }
    }

    set({ currentMeeting: { id, password, participantCount: 1 } })
    return { ok: true }
  },

  leaveMeeting: () => set({ currentMeeting: null }),

  setParticipantCount: (count) => {
    const cm = get().currentMeeting
    if (!cm) return
    set({ currentMeeting: { ...cm, participantCount: Math.max(0, count | 0) } })
  }
}))


