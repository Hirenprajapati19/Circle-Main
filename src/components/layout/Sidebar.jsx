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
  Settings,
  Calendar
} from 'lucide-react'
import { useUI } from '../../store/useUI'

const Sidebar = () => {
  const { isMobileView, mobileSidebarOpen, closeMobileSidebar } = useUI()
  
  const navigation = [
    { name: 'Chats', href: '/dashboard/chats', icon: MessageCircle },
    { name: 'Status', href: '/dashboard/status', icon: Radio },
    { name: 'Channels', href: '/dashboard/channels', icon: Hash },
    { name: 'Community', href: '/dashboard/community', icon: Users },
    { name: 'Chatbot AI', href: '/dashboard/chatbot', icon: Bot },
    { name: 'Meeting', href: '/dashboard/meeting', icon: Video },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  // Determine sidebar classes based on mobile/desktop view
  const getSidebarClasses = () => {
    if (isMobileView) {
      // Mobile: Fixed positioned sidebar that slides in/out
      return `fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
        mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-white border-r border-gray-200 flex flex-col`
    } else {
      // Desktop: Always visible sidebar
      return 'w-16 sm:w-64 bg-white border-r border-gray-200 flex flex-col transition-all duration-300'
    }
  }

  return (
    <div className={getSidebarClasses()}>
      {/* Logo */}
      <div className="p-3 sm:p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-el-blue-500 rounded-full flex items-center justify-center">
            <Circle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl font-bold font-poppins text-gray-900">
            Circle
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 sm:p-4">
        <ul className="space-y-1">
          {navigation.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                onClick={() => isMobileView && closeMobileSidebar()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-el-blue-50 text-el-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                title={item.name}
              >
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar