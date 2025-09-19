import React, { useMemo, useState } from 'react'
import { Search, Plus, Users } from 'lucide-react'
import ChatItem from './ChatItem'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { mockChats } from '../../mock/chats.json'
import { GroupsList } from '../../pages/groups'

const ChatList = () => {
  const [tab, setTab] = useState('chats')

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-6 border-b border-gray-800 bg-black shadow-md">
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => setTab('chats')} className={`px-3 py-1.5 rounded-full text-sm ${tab === 'chats' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}>Chats</button>
            <button onClick={() => setTab('groups')} className={`px-3 py-1.5 rounded-full text-sm ${tab === 'groups' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}>Groups</button>
          </div>
          {tab === 'chats' && (
            <Button 
              variant="ghost" 
              size="sm"
              className="p-2 hover:bg-gray-900 rounded-full"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </Button>
          )}
        </div>
        
        {tab === 'chats' && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search conversations..." className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600 transition-all text-sm sm:text-base" />
          </div>
        )}
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto thin-scroll bg-gray-950 min-h-0">
        {tab === 'chats' ? (
          <div className="p-2 sm:p-3 space-y-1">
            {mockChats.map((chat) => (
              <ChatItem key={chat.id} chat={chat} />
            ))}
          </div>
        ) : (
          <div className="p-2 sm:p-3">
            <GroupsList />
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatList
