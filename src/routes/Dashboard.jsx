import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import { useUI } from '../store/useUI'

const Dashboard = () => {
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

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      <Sidebar />
      
      {/* Mobile Overlay */}
      {isMobileView && mobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileSidebar}
        />
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <div className="sticky top-0 z-30">
          <Topbar />
        </div>
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
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
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default Dashboard