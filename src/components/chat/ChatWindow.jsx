import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Phone, Video, MoreHorizontal, Send, Paperclip, Smile, ArrowLeft } from 'lucide-react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Input from '../ui/Input'
import CallBanner from './CallBanner'
import Composer from './Composer'
import { mockChats } from '../../mock/chats.json'
import { formatTime } from '../../lib/format'
import { useChatStore } from '../../store/useChat'

const ChatWindow = () => {
  const { chatId } = useParams()
  const [showCall, setShowCall] = useState(false)
  const [messages, setMessages] = useState([
    // Sample messages to make chat more realistic
    {
      id: 1,
      content: "Hello! How are you doing today?",
      sender: "other",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      type: 'text'
    },
    {
      id: 2,
      content: "I'm doing great! Thanks for asking. How about you?",
      sender: "me",
      timestamp: new Date(Date.now() - 3500000), // 58 minutes ago
      type: 'text'
    },
    {
      id: 3,
      content: "I'm good too! Just working on some projects. What are you up to?",
      sender: "other",
      timestamp: new Date(Date.now() - 3400000), // 56 minutes ago
      type: 'text'
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const { isMobileView, goBackToChatList, selectedChat } = useChatStore()
  const messagesEndRef = useRef(null)
  
  // Use selectedChat from store on mobile, or chatId from URL on desktop
  const currentChatId = isMobileView ? selectedChat : chatId
  const chat = mockChats.find(c => c.id.toString() === currentChatId)

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        <p>Chat not found</p>
      </div>
    )
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message = {
      id: Date.now(),
      content: newMessage,
      sender: 'me',
      timestamp: new Date(),
      type: 'text'
    }

    setMessages(prev => [...prev, message])
    setNewMessage('')

    // Simulate a response after a short delay
    setTimeout(() => {
      const responses = [
        "That's interesting!",
        "I see what you mean.",
        "Thanks for sharing!",
        "That sounds great!",
        "I agree with you.",
        "Tell me more about that.",
        "That's a good point.",
        "I understand now."
      ]
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]
      
      const responseMessage = {
        id: Date.now() + 1,
        content: randomResponse,
        sender: 'other',
        timestamp: new Date(),
        type: 'text'
      }
      
      setMessages(prev => [...prev, responseMessage])
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  return (
    <div className="h-full flex flex-col relative">
      {showCall && <CallBanner onClose={() => setShowCall(false)} />}
      
      {/* Header (sticky) */}
      <div className="bg-black border-b border-gray-800 px-3 sm:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {/* Back button for mobile */}
            {isMobileView && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goBackToChatList}
                className="mr-1 sm:mr-2 flex-shrink-0 p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Button>
            )}
            
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Avatar
                src={chat.avatar}
                name={chat.name}
                status={chat.isOnline ? 'online' : 'offline'}
                size="sm"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white text-sm sm:text-base truncate">
                  {chat.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {chat.isOnline ? (
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Online
                    </span>
                  ) : (
                    `Last seen ${formatTime(chat.lastSeen)}`
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowCall(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Phone className="w-4 h-4 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Video className="w-4 h-4 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-black">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === 'me'
                  ? 'bg-el-blue-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="whitespace-pre-wrap break-words">{message.content}</p>
              <p className={`text-xs mt-1 ${
                message.sender === 'me' ? 'text-el-blue-100' : 'text-gray-500'
              }`}>
                {formatTime(message.timestamp)}
              </p>
            </div>
          </div>
        ))}
        
        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Composer */}
      <Composer
        value={newMessage}
        onChange={setNewMessage}
        onSend={handleSendMessage}
      />
    </div>
  )
}

export default ChatWindow