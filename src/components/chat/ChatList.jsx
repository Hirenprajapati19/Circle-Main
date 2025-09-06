import React from 'react'
import { Search, Plus } from 'lucide-react'
import ChatItem from './ChatItem'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { mockChats } from '../../mock/chats.json'

const ChatList = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">Chats</h2>
          <Button 
            variant="ghost" 
            size="sm"
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search conversations..."
            className="pl-10 pr-4 py-2.5 sm:py-3 text-sm bg-gray-50 border-gray-200 rounded-xl focus:bg-white focus:border-el-blue-500 focus:ring-2 focus:ring-el-blue-500/20 transition-all"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="p-2 sm:p-3 space-y-1">
          {mockChats.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatList