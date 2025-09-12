import React from 'react'
import { useAuth } from '../../store/useAuth'

const CreditDebug = () => {
  const { user, getCredits, isProUser } = useAuth()
  
  if (process.env.NODE_ENV !== 'development') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-3 rounded-lg text-xs z-50">
      <div>User: {user?.name || 'No user'}</div>
      <div>Plan: {user?.plan || 'No plan'}</div>
      <div>Credits: {getCredits()}</div>
      <div>Is Pro: {isProUser() ? 'Yes' : 'No'}</div>
      <div>Raw Credits: {user?.credits}</div>
    </div>
  )
}

export default CreditDebug
