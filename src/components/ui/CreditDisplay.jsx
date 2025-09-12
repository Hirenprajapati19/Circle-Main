import React from 'react'
import { Coins, Crown, ArrowUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../store/useAuth'
import Button from './Button'

const CreditDisplay = ({ className = '' }) => {
  const { getCredits, isProUser } = useAuth()
  const navigate = useNavigate()
  const credits = getCredits()

  if (isProUser()) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Crown className="w-4 h-4 text-yellow-500" />
        <span className="text-sm font-medium text-yellow-500">Pro - Unlimited</span>
      </div>
    )
  }

  // Show upgrade button only when credits are 0
  if (credits === 0) {
    return (
      <Button
        onClick={() => navigate('/dashboard/upgrade')}
        className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 text-xs px-3 py-1"
      >
        <ArrowUp className="w-3 h-3" />
        Upgrade to Pro
      </Button>
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Coins className="w-4 h-4 text-blue-500" />
      <span className="text-sm font-medium text-white">
        {credits} Credits
      </span>
    </div>
  )
}

export default CreditDisplay
