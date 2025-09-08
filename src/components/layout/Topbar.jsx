import React from 'react'
import { Search, Bell, Settings, Menu } from 'lucide-react'
import { useAuth } from '../../store/useAuth'
import { useUI } from '../../store/useUI'
import { useNotifStore } from '../../store/useNotif'
import Avatar from '../ui/Avatar'

const Topbar = () => {
  const { user } = useAuth()
  const { isMobileView, toggleMobileSidebar } = useUI()
  const { unreadCount, clear } = useNotifStore()

  return (
    <header className="bg-black border-b border-gray-800 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        {/* Mobile Menu Button */}
        {isMobileView && (
          <button
            onClick={toggleMobileSidebar}
            className="p-2 text-gray-300 hover:text-red-500 hover:bg-gray-900 rounded-xl transition-all mr-2 flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        
        {/* Search */}
        <div className="flex-1 max-w-md w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations, contacts..."
              className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 text-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-600/40 focus:border-red-600 transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
          <button onClick={clear} className="relative p-2 text-gray-300 hover:text-red-500 hover:bg-gray-900 rounded-2xl transition-all">
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button className="p-2 text-gray-300 hover:text-red-500 hover:bg-gray-900 rounded-2xl transition-all">
            <Settings className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <Avatar
              src={user?.avatar}
              name={user?.name || 'User'}
              size="sm"
            />
            <div className="text-sm min-w-0">
              <p className="font-medium text-white truncate">{user?.name || 'John Doe'}</p>
              <p className="text-gray-400 text-xs sm:text-sm">Online</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Topbar
