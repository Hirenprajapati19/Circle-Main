import React from 'react'
import { PhoneOff, Mic } from 'lucide-react'
import Button from '../ui/Button'

const CallBanner = ({ onClose }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-red-600 text-white p-4 shadow-lg">
      <div className="flex items-center justify-between">
        {/* Call Info */}
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="font-medium">Voice Call Active</span>
          <span className="text-gray-200">05:23</span>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white hover:bg-black/30 rounded-full"
          >
            <Mic className="w-4 h-4" />
          </Button>
          <Button 
            onClick={onClose} 
            variant="danger" 
            size="sm" 
            className="bg-black hover:bg-gray-900 text-white rounded-full"
          >
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CallBanner
