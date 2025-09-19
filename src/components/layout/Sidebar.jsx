import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  MessageCircle, 
  Circle,
  Radio,
  Hash,
  Users,
  Bot,
  Video,
  User,
  Calendar,
  Sparkles
} from 'lucide-react'
import { useUI } from '../../store/useUI'

const Sidebar = () => {
  const { isMobileView, mobileSidebarOpen, closeMobileSidebar } = useUI()
  
  const navigation = [
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Meeting', href: '/dashboard/meeting', icon: Video },
    { name: 'Chatbot AI', href: '/dashboard/chatbot', icon: Bot },
    { name: 'Chats', href: '/dashboard/chats', icon: MessageCircle },
    { name: 'Groups', href: '/dashboard/groups', icon: Users },
    { name: 'Community', href: '/dashboard/community', icon: Users },
    { name: 'Channels', href: '/dashboard/channels', icon: Hash },
    { name: 'Status', href: '/dashboard/status', icon: Radio },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    // { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Upgrade Pro', href: '/dashboard/upgrade', icon: Sparkles },

  ]

  const mainNavigation = navigation.filter(item => item.name !== 'Upgrade Pro')
  const upgradeItem = navigation.find(item => item.name === 'Upgrade Pro')

  // Sidebar classes for mobile/desktop
  const getSidebarClasses = () => {
    if (isMobileView) {
      // Mobile
      return `fixed inset-y-0 left-0 z-50 w-56 sm:w-64 transform transition-transform duration-300 ease-in-out will-change-transform ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-black border-r border-red-800 flex flex-col`
    } else {
      // Desktop
      return 'fixed inset-y-0 left-0 z-40 w-16 sm:w-64 bg-black border-r border-red-800 flex flex-col transition-all duration-300'
    }
  }

  return (
    <div className={getSidebarClasses()}>
      {/* Logo */}
      <div className="p-2 sm:p-5 border-b border-gray-800">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-5 h-5 sm:w-8 sm:h-8 bg-red-600 rounded-full flex items-center justify-center shadow-md shadow-red-600/40">
            <Circle className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-sm sm:text-xl font-bold font-poppins text-white">
            Circle
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-1 sm:p-4 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {mainNavigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                onClick={() => isMobileView && closeMobileSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                      : 'text-gray-300 hover:bg-gray-900 hover:text-red-500'
                  }`
                }
                title={item.name}
              >
                <item.icon className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium text-xs sm:text-base">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Pinned Upgrade */}
      {upgradeItem && (
        <div className="p-1 sm:p-4 border-t border-gray-800">
          <NavLink
            to={upgradeItem.href}
            onClick={() => isMobileView && closeMobileSidebar()}
            className={({ isActive }) =>
              `flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-2xl transition-all duration-200 group ${
                isActive
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-red-500'
              }`
            }
            title={upgradeItem.name}
          >
            <upgradeItem.icon className="w-3 h-3 sm:w-5 sm:h-5 flex-shrink-0" />
            <span className="font-medium text-xs sm:text-base">{upgradeItem.name}</span>
          </NavLink>
        </div>
      )}
    </div>
  )
}

export default Sidebar
