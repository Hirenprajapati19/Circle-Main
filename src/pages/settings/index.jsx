import React, { useState } from 'react'
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
import Modal from '../../components/ui/Modal'
import Toast from '../../components/ui/Toast'
import Switch from '../../components/ui/Switch'

const SettingsPage = () => {
  const { user, logout, updateUser } = useAuth()
  const [showPersonal, setShowPersonal] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showChats, setShowChats] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSupport, setShowSupport] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [online, setOnline] = useState(true)
  const [friendReq, setFriendReq] = useState(true)
  const [receipts, setReceipts] = useState(true)
  const [typingIndicators, setTypingIndicators] = useState(true)
  const [autoDownloadMedia, setAutoDownloadMedia] = useState(false)
  const [archiveOnMute, setArchiveOnMute] = useState(false)
  const [notifPush, setNotifPush] = useState(true)
  const [notifEmail, setNotifEmail] = useState(false)
  const [notifSound, setNotifSound] = useState(true)
  const [supportEmail, setSupportEmail] = useState('')
  const [supportMessage, setSupportMessage] = useState('')
  const [toast, setToast] = useState(null)

  const openPersonal = () => {
    setName(user?.name || '')
    setEmail(user?.email || '')
    setBio(user?.bio || '')
    setShowPersonal(true)
  }

  const openPrivacy = () => {
    setOnline(true)
    setFriendReq(true)
    setReceipts(true)
    setShowPrivacy(true)
  }

  const openChats = () => {
    setTypingIndicators(true)
    setAutoDownloadMedia(false)
    setArchiveOnMute(false)
    setShowChats(true)
  }

  const openNotifications = () => {
    setNotifPush(true)
    setNotifEmail(false)
    setNotifSound(true)
    setShowNotifications(true)
  }

  const openSupport = () => {
    setSupportEmail(user?.email || '')
    setSupportMessage('')
    setShowSupport(true)
  }

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
    <>
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-el-blue-500">Customize your Circle experience</p>
        </div>

        {/* Search */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search settings..."
            className="pl-8 sm:pl-10 text-sm border border-gray-700 rounded-xl sm:rounded-2xl bg-gray-900 text-white placeholder-gray-500"
          />
        </div>

        {/* Profile Preview */}
        <Card className="p-4 sm:p-6 mb-4 sm:mb-6 bg-gray-900 border border-gray-800">
          <div className="flex items-center gap-3 sm:gap-4">
            <Avatar size="md" name={user?.name} status="online" />
            <div>
              <h3 className="font-semibold text-red-600 text-sm sm:text-base">{user?.name || 'John Doe'}</h3>
              <p className="text-xs sm:text-sm text-gray-400">{user?.email || 'john@example.com'}</p>
              <p className="text-xs text-el-blue-500 font-medium">Circle One Member</p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-4 sm:space-y-6">
          {settingsSections.map((section) => (
            <Card key={section.title} className="p-4 sm:p-6 bg-gray-900 border border-gray-700">
              <h3 className="text-base sm:text-lg font-semibold text-red-600 mb-3 sm:mb-4">{section.title}</h3>
              
              <div className="space-y-2 sm:space-y-3">
                {section.items.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      if (item.label === 'Personal Information') openPersonal()
                      if (item.label === 'Privacy & Security') openPrivacy()
                      if (item.label === 'Chats & Messages') openChats()
                      if (item.label === 'Notifications') openNotifications()
                      if (item.label === 'Help & Feedback') openSupport()
                    }}
                    className="w-full flex items-center gap-3 sm:gap-4 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-gray-800 transition-colors text-left text-white"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-50 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm sm:text-base">{item.label}</p>
                      <p className="text-xs sm:text-sm text-gray-400">{item.description}</p>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Logout */}
        <Card className="p-4 sm:p-6 mt-4 sm:mt-6 bg-gray-900 border border-red-600">
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
    {/* Personal Information Modal */}
    <Modal
      isOpen={showPersonal}
      onClose={() => setShowPersonal(false)}
      title="Personal Information"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Tell us about yourself"
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowPersonal(false)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => { updateUser({ name, email, bio }); setShowPersonal(false); setToast({ type: 'success', message: 'Profile updated successfully' }) }}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>

    {/* Privacy & Security Modal */}
    <Modal
      isOpen={showPrivacy}
      onClose={() => setShowPrivacy(false)}
      title="Privacy & Security"
    >
      <div className="space-y-3 text-white">
        <div className="flex items-center justify-between">
          <span>Show online status</span>
          <Switch checked={online} onChange={(e) => setOnline(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Allow friend requests</span>
          <Switch checked={friendReq} onChange={(e) => setFriendReq(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Read receipts</span>
          <Switch checked={receipts} onChange={(e) => setReceipts(e.target.checked)} />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowPrivacy(false)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            Close
          </button>
          <button
            onClick={() => { setShowPrivacy(false); setToast({ type: 'success', message: 'Privacy settings saved' }) }}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>

    {/* Support - Help & Feedback Modal */}
    <Modal
      isOpen={showSupport}
      onClose={() => setShowSupport(false)}
      title="Help & Feedback"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Your Email</label>
          <Input value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
          <textarea
            value={supportMessage}
            onChange={(e) => setSupportMessage(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Describe your issue or share feedback..."
          />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowSupport(false)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={() => { setShowSupport(false); setToast({ type: 'success', message: 'Thanks! We received your feedback.' }) }}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
            disabled={!supportEmail || !supportMessage}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>

    {/* Chats & Messages Modal */}
    <Modal
      isOpen={showChats}
      onClose={() => setShowChats(false)}
      title="Chats & Messages"
    >
      <div className="space-y-3 text-white">
        <div className="flex items-center justify-between">
          <span>Show typing indicators</span>
          <Switch checked={typingIndicators} onChange={(e) => setTypingIndicators(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Auto-download media</span>
          <Switch checked={autoDownloadMedia} onChange={(e) => setAutoDownloadMedia(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Archive chats when muted</span>
          <Switch checked={archiveOnMute} onChange={(e) => setArchiveOnMute(e.target.checked)} />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowChats(false)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            Close
          </button>
          <button
            onClick={() => { setShowChats(false); setToast({ type: 'success', message: 'Chat preferences saved' }) }}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>

    {/* Notifications Modal */}
    <Modal
      isOpen={showNotifications}
      onClose={() => setShowNotifications(false)}
      title="Notifications"
    >
      <div className="space-y-3 text-white">
        <div className="flex items-center justify-between">
          <span>Push notifications</span>
          <Switch checked={notifPush} onChange={(e) => setNotifPush(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Email notifications</span>
          <Switch checked={notifEmail} onChange={(e) => setNotifEmail(e.target.checked)} />
        </div>
        <div className="flex items-center justify-between">
          <span>Sound</span>
          <Switch checked={notifSound} onChange={(e) => setNotifSound(e.target.checked)} />
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={() => setShowNotifications(false)}
            className="flex-1 px-4 py-2 rounded-xl bg-gray-800 text-white border border-gray-700"
          >
            Close
          </button>
          <button
            onClick={() => { setShowNotifications(false); setToast({ type: 'success', message: 'Notification settings saved' }) }}
            className="flex-1 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
    {/* Toast */}
    {toast && (
      <div className="fixed bottom-4 right-4 z-50">
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      </div>
    )}
    </>
  )
}

export default SettingsPage
