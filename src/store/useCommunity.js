import { create } from 'zustand'

export const useCommunityStore = create((set, get) => ({
  communities: [
    {
      id: 'general',
      name: 'General Discussion',
      description: 'Talk about anything and everything',
      members: 1234,
      posts: 45,
      lastPost: '2 minutes ago',
      trending: true,
      joined: false
    },
    {
      id: 'tech',
      name: 'Tech Talk',
      description: 'Discussions about technology and development',
      members: 856,
      posts: 23,
      lastPost: '1 hour ago',
      trending: false,
      joined: false
    },
    {
      id: 'design',
      name: 'Design & Creativity',
      description: 'Share your creative work and get feedback',
      members: 642,
      posts: 18,
      lastPost: '3 hours ago',
      trending: false,
      joined: false
    }
  ],

  createCommunity: (name) => set((state) => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `c-${Date.now()}`
    const newCommunity = {
      id,
      name,
      description: 'New community',
      members: 1,
      posts: 0,
      lastPost: 'just now',
      trending: false,
      joined: true
    }
    return { communities: [newCommunity, ...state.communities] }
  }),

  joinCommunity: (id) => set((state) => ({
    communities: state.communities.map(c => c.id === id ? { ...c, joined: true, members: c.members + 1 } : c)
  })),

  leaveCommunity: (id) => set((state) => ({
    communities: state.communities.map(c => c.id === id ? { ...c, joined: false, members: Math.max(0, c.members - 1) } : c)
  }))
}))


