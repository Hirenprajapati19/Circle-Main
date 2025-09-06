import React, { createContext, useContext, useState } from 'react'

const UIContext = createContext()

export const useUI = () => {
  const context = useContext(UIContext)
  if (!context) {
    throw new Error('useUI must be used within a UIProvider')
  }
  return context
}

export const UIProvider = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [modals, setModals] = useState({})

  const toggleSidebar = () => setSidebarCollapsed(prev => !prev)
  
  const toggleMobileSidebar = () => setMobileSidebarOpen(prev => !prev)
  
  const closeMobileSidebar = () => setMobileSidebarOpen(false)
  
  const setMobileView = (isMobile) => {
    setIsMobileView(isMobile)
    // Close mobile sidebar when switching to desktop
    if (!isMobile) {
      setMobileSidebarOpen(false)
    }
  }
  
  const addNotification = (notification) => {
    const id = Date.now()
    setNotifications(prev => [...prev, { ...notification, id }])
    setTimeout(() => removeNotification(id), 5000)
  }

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  const openModal = (id, props = {}) => {
    setModals(prev => ({ ...prev, [id]: { isOpen: true, ...props } }))
  }

  const closeModal = (id) => {
    setModals(prev => ({ ...prev, [id]: { ...prev[id], isOpen: false } }))
  }

  const value = {
    sidebarCollapsed,
    toggleSidebar,
    mobileSidebarOpen,
    toggleMobileSidebar,
    closeMobileSidebar,
    isMobileView,
    setMobileView,
    notifications,
    addNotification,
    removeNotification,
    modals,
    openModal,
    closeModal
  }

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  )
}
