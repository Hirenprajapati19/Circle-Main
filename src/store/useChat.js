import { create } from 'zustand'

export const useChatStore = create((set, get) => ({
  chats: [],
  selectedChat: null,
  messages: {},
  isMobileView: false,
  showChatWindow: false,

  setSelectedChat: (chatId) => set({ selectedChat: chatId }),
  
  setMobileView: (isMobile) => set({ isMobileView: isMobile }),
  
  setShowChatWindow: (show) => set({ showChatWindow: show }),
  
  selectChatAndNavigate: (chatId) => set((state) => ({
    selectedChat: chatId,
    showChatWindow: state.isMobileView ? true : state.showChatWindow
  })),
  
  goBackToChatList: () => set({ showChatWindow: false }),
  
  addMessage: (chatId, message) => set((state) => ({
    messages: {
      ...state.messages,
      [chatId]: [...(state.messages[chatId] || []), message]
    }
  })),

  setChats: (chats) => set({ chats }),
  
  updateChatLastMessage: (chatId, message) => set((state) => ({
    chats: state.chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: message, lastMessageTime: new Date() }
        : chat
    )
  }))
}))