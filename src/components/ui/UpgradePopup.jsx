import React from 'react'
import { X, Crown, Coins, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Modal from './Modal'

const UpgradePopup = ({ isOpen, onClose, feature, creditsNeeded, currentCredits }) => {
  const navigate = useNavigate()

  const handleUpgrade = () => {
    onClose()
    navigate('/dashboard/upgrade')
  }

  const getFeatureInfo = (feature) => {
    switch (feature) {
      case 'chatbot':
        return {
          title: 'Chatbot Message',
          description: 'Send a message to the AI chatbot',
          icon: Zap,
          cost: 3
        }
      case 'meeting':
        return {
          title: 'Join Meeting',
          description: 'Join a video meeting',
          icon: Crown,
          cost: 20
        }
      default:
        return {
          title: 'Feature',
          description: 'Use this feature',
          icon: Coins,
          cost: creditsNeeded
        }
    }
  }

  const featureInfo = getFeatureInfo(feature)

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-900 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center">
              <featureInfo.icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Insufficient Credits</h3>
              <p className="text-sm text-gray-400">You need more credits to use this feature</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">Current Credits</span>
              <span className="text-sm font-medium text-white">{currentCredits}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Required for {featureInfo.title}</span>
              <span className="text-sm font-medium text-red-500">{featureInfo.cost}</span>
            </div>
            <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500 transition-all duration-300"
                style={{ width: `${Math.min((currentCredits / featureInfo.cost) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-300 text-sm mb-4">
              {featureInfo.description} requires <span className="text-red-500 font-medium">{featureInfo.cost} credits</span>.
              <br />
              You currently have <span className="text-white font-medium">{currentCredits} credits</span>.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpgrade}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-2"
          >
            <Crown className="w-4 h-4" />
            Upgrade to Pro
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Pro users get unlimited credits for all features
          </p>
        </div>
      </div>
    </Modal>
  )
}

export default UpgradePopup
