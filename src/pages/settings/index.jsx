import React from 'react'
import { 
  Search, 
  User, 
  Shield, 
  MessageCircle, 
  Bell, 
  HelpCircle, 
  LogOut,
  ChevronRight
} from 'lucide-react'
import { useAuth } from '../../store/useAuth'
import Card from '../../components/layout/Card'
import Input from '../../components/ui/Input'
import Avatar from '../../components/ui/Avatar'

const SettingsPage = () => {
  const { user, logout } = useAuth()

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Personal Information', description: 'Update your profile details' },
        { icon: Shield, label: 'Privacy & Security', description: 'Manage your privacy settings' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: MessageCircle, label: 'Chats & Messages', description: 'Configure chat preferences' },
        { icon: Bell, label: 'Notifications', description: 'Manage notification settings' }
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help & Feedback', description: 'Get help or report issues' }
      ]
    }
  ]

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-gray-600">Customize your Circle experience</p>
        </div>

        {/* Search */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search settings..."
            className="pl-8 sm:pl-10 text-sm"
          />
        </div>

        {/* Profile Preview */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-gradient-to-r from-el-blue-50 to-el-blue-100 border-el-blue-200">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar size="md" name={user?.name} status="online" />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{user?.name || 'John Doe'}</h3>
              <p className="text-xs sm:text-sm text-gray-600">{user?.email || 'john@example.com'}</p>
              <p className="text-xs text-el-blue-600 font-medium">Circle One Member</p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {settingsSections.map((section) => (
            <Card key={section.title} className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">{section.title}</h3>
              
              <div className="space-y-2 sm:space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors text-left"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-el-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-el-blue-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{item.label}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{item.description}</p>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4 sm:p-6 mt-4 sm:mt-6">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-red-50 transition-colors text-left text-red-600"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm sm:text-base">Sign Out</p>
              <p className="text-xs sm:text-sm text-red-500">Sign out of your Circle account</p>
            </div>
          </button>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage