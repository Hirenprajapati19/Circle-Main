import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Avatar from '../ui/Avatar'
import { formatTime } from '../../lib/format'
import { useChatStore } from '../../store/useChat'

const ChatItem = ({ chat }) => {
  const navigate = useNavigate()
  const { chatId } = useParams()
  const { isMobileView, selectChatAndNavigate } = useChatStore()
  const isActive = chatId === chat.id.toString()

  const handleChatClick = () => {
    if (isMobileView) {
      // On mobile, use the store to navigate
      selectChatAndNavigate(chat.id.toString())
    } else {
      // On desktop, use normal navigation
      navigate(`/dashboard/chats/${chat.id}`)
    }
  }

  return (
    <button
      onClick={handleChatClick}
      className={`w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left transition-all duration-200 ${
        isActive
          ? 'bg-red-50 border border-red-200 shadow-sm'
          : 'hover:bg-gray-900 hover:shadow-sm'
      }`}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <Avatar
          src={chat.avatar}
          name={chat.name}
          status={chat.isOnline ? 'online' : 'offline'}
          size="sm"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-white truncate text-sm sm:text-base">{chat.name}</h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-gray-400">{formatTime(chat.lastMessage.timestamp)}</span>
              {chat.unreadCount > 0 && (
                <div className="w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                  {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-xs sm:text-sm text-gray-400 truncate leading-relaxed">
            {chat.lastMessage.content}
          </p>
        </div>
      </div>
    </button>
  )
}

export default ChatItem
