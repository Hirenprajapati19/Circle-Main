import React from 'react'
import { Lock, Crown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import { useAuth } from '../../store/useAuth'

const FeatureGate = ({ 
  feature, 
  children, 
  fallback = null, 
  showUpgradeButton = true,
  className = '' 
}) => {
  const { canUseFeature, isProUser } = useAuth()
  const navigate = useNavigate()

  if (canUseFeature(feature)) {
    return children
  }

  if (fallback) {
    return fallback
  }

  return (
    <div className={`text-center p-6 ${className}`}>
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
        <Lock className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">Pro Feature</h3>
      <p className="text-gray-400 text-sm mb-4">
        This feature is available for Pro users only. Upgrade to unlock unlimited access to all features.
      </p>
      {showUpgradeButton && (
        <Button
          onClick={() => navigate('/dashboard/upgrade')}
          className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2 mx-auto"
        >
          <Crown className="w-4 h-4" />
          Upgrade to Pro
        </Button>
      )}
    </div>
  )
}

export default FeatureGate
