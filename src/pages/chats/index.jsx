import React, { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { Routes, Route } from 'react-router-dom'
import ChatList from '../../components/chat/ChatList'
import ChatWindow from '../../components/chat/ChatWindow'
import { useChatStore } from '../../store/useChat'

const ChatsPage = () => {
  const { 
    selectedChat, 
    isMobileView, 
    showChatWindow, 
    setMobileView, 
    setShowChatWindow 
  } = useChatStore()

  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 640 
      setMobileView(isMobile)
      
      if (isMobile && !selectedChat) {
        setShowChatWindow(false)
      }
    }

    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    
    return () => window.removeEventListener('resize', checkMobileView)
  }, [selectedChat, setMobileView, setShowChatWindow])

  if (isMobileView) {
    return (
      <div className="h-full">
        {showChatWindow && selectedChat ? (
          <ChatWindow />
        ) : (
          <ChatList />
        )}
      </div>
    )
  }

  // Desktop view: show both side by side
  return (
    <div className="h-full flex flex-col sm:flex-row">
      <div className="w-full sm:w-80 border-r border-gray-200 bg-white flex-shrink-0">
        <ChatList />
      </div>
      
      <div className="flex-1 min-w-0">
        <Routes>
          <Route index element={
            <div className="h-full flex items-center justify-center text-gray-500 p-4">
              <div className="text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <p className="text-sm sm:text-base">Select a conversation to start messaging</p>
              </div>
            </div>
          } />
          <Route path=":chatId" element={<ChatWindow />} />
        </Routes>
      </div>
    </div>
  )
}

export default ChatsPage