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
        const userData = JSON.parse(savedUser)
        const plan = userData?.plan || 'free'
        const needsCredits = plan === 'free' && (userData?.credits === undefined || userData?.credits === null)
        const normalized = needsCredits ? { ...userData, plan, credits: 30 } : { ...userData, plan }
        setUser(normalized)
        setIsAuthenticated(true)
        if (JSON.stringify(normalized) !== savedUser) {
          localStorage.setItem('circle.user', JSON.stringify(normalized))
        }
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
    // Ensure defaults on login
    const plan = (userData && userData.plan) ? userData.plan : 'free'
    const needsCredits = plan === 'free' && (userData?.credits === undefined || userData?.credits === null)
    const normalized = needsCredits ? { ...userData, plan, credits: 30 } : { ...userData, plan }
    setUser(normalized)
    setIsAuthenticated(true)
    try {
      localStorage.setItem('circle.user', JSON.stringify(normalized))
      localStorage.setItem('circle.isAuthenticated', 'true')
    } catch (error) {
      console.error('Error saving auth state:', error)
    }
  }

  const register = (userData) => {
    // Ensure defaults on register
    const plan = (userData && userData.plan) ? userData.plan : 'free'
    const needsCredits = plan === 'free' && (userData?.credits === undefined || userData?.credits === null)
    const normalized = needsCredits ? { ...userData, plan, credits: 30 } : { ...userData, plan }
    setUser(normalized)
    setIsAuthenticated(true)
    try {
      localStorage.setItem('circle.user', JSON.stringify(normalized))
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
    
    // Pro features can be used by Pro users OR free users with credits
    if (requiredPlan === 'pro') {
      // Pro users have unlimited access
      if (user.plan === 'pro') {
        return true
      }
      
      // Free users can use Pro features with credits
      // This allows free users to access Pro features using their credits
      return true
    }
    
    // Free features are always available
    return true
  }

  const resetToFree = () => {
    const newUser = { ...user, plan: 'free', upgradedAt: null, credits: 30 }
    setUser(newUser)
    try {
      localStorage.setItem('circle.user', JSON.stringify(newUser))
    } catch (error) {
      console.error('Error resetting user plan:', error)
    }
  }

  // Credit management functions
  const initializeCredits = () => {
    if (!user) return
    if (user.plan === 'free' && user.credits === undefined) {
      const newUser = { ...user, credits: 30 }
      setUser(newUser)
      try {
        localStorage.setItem('circle.user', JSON.stringify(newUser))
      } catch (error) {
        console.error('Error initializing credits:', error)
      }
    }
  }

  const deductCredits = (amount) => {
    if (!user) return { success: false, error: 'User not found' }
    
    // Pro users have unlimited credits
    if (user.plan === 'pro') {
      return { success: true, credits: 'unlimited' }
    }
    
    // Free users need credits
    if (user.credits < amount) {
      return { success: false, error: 'Insufficient credits', credits: user.credits }
    }
    
    const newCredits = user.credits - amount
    const newUser = { ...user, credits: newCredits }
    setUser(newUser)
    try {
      localStorage.setItem('circle.user', JSON.stringify(newUser))
      return { success: true, credits: newCredits }
    } catch (error) {
      console.error('Error deducting credits:', error)
      return { success: false, error: 'Failed to update credits' }
    }
  }

  const getCredits = () => {
    if (!user) return 0
    if ((user.plan || 'free') === 'pro') return 'unlimited'
    
    // If user is free but doesn't have credits initialized, initialize them
    if ((user.plan || 'free') === 'free' && (user.credits === undefined || user.credits === null)) {
      initializeCredits()
      return 30
    }
    
    return user.credits || 0
  }

  const canUseCredits = (amount) => {
    if (!user) return false
    if (user.plan === 'pro') return true
    return (user.credits || 0) >= amount
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
    resetToFree,
    initializeCredits,
    deductCredits,
    getCredits,
    canUseCredits
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
