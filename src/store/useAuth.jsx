import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load auth state from localStorage on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('circle.user')
      const savedAuth = localStorage.getItem('circle.isAuthenticated')
      
      if (savedUser && savedAuth === 'true') {
        setUser(JSON.parse(savedUser))
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Error loading auth state:', error)
      // Clear invalid data
      localStorage.removeItem('circle.user')
      localStorage.removeItem('circle.isAuthenticated')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    try {
      localStorage.setItem('circle.user', JSON.stringify(userData))
      localStorage.setItem('circle.isAuthenticated', 'true')
    } catch (error) {
      console.error('Error saving auth state:', error)
    }
  }

  const register = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    try {
      localStorage.setItem('circle.user', JSON.stringify(userData))
      localStorage.setItem('circle.isAuthenticated', 'true')
    } catch (error) {
      console.error('Error saving auth state:', error)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    try {
      localStorage.removeItem('circle.user')
      localStorage.removeItem('circle.isAuthenticated')
    } catch (error) {
      console.error('Error clearing auth state:', error)
    }
  }

  const updateUser = (updates) => {
    const newUser = { ...user, ...updates }
    setUser(newUser)
    try {
      localStorage.setItem('circle.user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  const upgradeToPro = () => {
    const newUser = { ...user, plan: 'pro', upgradedAt: new Date().toISOString() }
    setUser(newUser)
    try {
      localStorage.setItem('circle.user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Error upgrading user:', error)
    }
  }

  const isProUser = () => {
    return user?.plan === 'pro'
  }

  const canUseFeature = (feature) => {
    if (!user) return false
    
    // Define feature requirements
    const featureRequirements = {
      'unlimited_meetings': 'pro',
      'ai_features': 'pro',
      'priority_support': 'pro',
      'advanced_security': 'pro',
      'basic_chat': 'free',
      'community_access': 'free',
      'status_updates': 'free'
    }
    
    const requiredPlan = featureRequirements[feature]
    if (!requiredPlan) return false
    
    const planHierarchy = { 'free': 0, 'pro': 1, 'team': 2 }
    const userPlanLevel = planHierarchy[user.plan] || 0
    const requiredPlanLevel = planHierarchy[requiredPlan] || 0
    
    return userPlanLevel >= requiredPlanLevel
  }

  const resetToFree = () => {
    const newUser = { ...user, plan: 'free', upgradedAt: null }
    setUser(newUser)
    try {
      localStorage.setItem('circle.user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Error resetting user plan:', error)
    }
  }

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    upgradeToPro,
    isProUser,
    canUseFeature,
    resetToFree
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
