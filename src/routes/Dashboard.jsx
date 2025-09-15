import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'
import ChatsPage from '../pages/chats'
import StatusPage from '../pages/status'
import ChannelsPage from '../pages/channels'
import CommunityPage from '../pages/community'
import ChatbotPage from '../pages/chatbot'
import MeetingPage from '../pages/meeting'
import ProfilePage from '../pages/profile'
import SettingsPage from '../pages/settings'
import SchedulePage from '../pages/schedule'
import UpgradePage from '../pages/upgrade'
import { useUI } from '../store/useUI'

const Dashboard = () => {
  const location = useLocation()
  const { isMobileView, setMobileView, mobileSidebarOpen, closeMobileSidebar } = useUI()

  // Check if screen is mobile size
  useEffect(() => {
    const checkMobileView = () => {
      const isMobile = window.innerWidth < 640 // sm breakpoint
      setMobileView(isMobile)
    }

    checkMobileView()
    window.addEventListener('resize', checkMobileView)
    
    return () => window.removeEventListener('resize', checkMobileView)
  }, [setMobileView])

  const isChatbot = location.pathname.includes('/dashboard/chatbot')
  return (
    <div className={`flex h-[100svh] ${isChatbot ? 'bg-black' : 'bg-gray-50'} overflow-x-hidden`}>
      <Sidebar />
      
      {/* Mobile Overlay */}
      {isMobileView && mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileSidebar}
        />
      )}
      
      <div className="flex-1 flex flex-col min-w-0 min-h-0 sm:pl-64">
        {!(location.pathname.includes('/dashboard/chatbot')) && <Topbar />}
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-h-0">
          <Routes>
            <Route index element={<Navigate to="chats" replace />} />
            <Route path="chats/*" element={<ChatsPage />} />
            <Route path="status" element={<StatusPage />} />
            <Route path="channels" element={<ChannelsPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="chatbot" element={<ChatbotPage />} />
            <Route path="meeting" element={<MeetingPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="schedule/*" element={<SchedulePage />} />
            <Route path="upgrade" element={<UpgradePage />} />
          </Routes>
        </main>
      </div>
      {/* Safe-area filler to avoid bottom gap on mobile */}
      <div className={`fixed bottom-0 left-0 right-0 h-[env(safe-area-inset-bottom)] bg-black sm:hidden pointer-events-none`} />
    </div>
  )
}

export default Dashboard
