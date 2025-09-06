import React from 'react'
import { Phone, PhoneOff, Mic, MicOff } from 'lucide-react'
import Button from '../ui/Button'

const CallBanner = ({ onClose }) => {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 bg-el-blue-500 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          <span className="font-medium">Voice Call Active</span>
          <span className="text-el-blue-100">05:23</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Mic className="w-4 h-4" />
          </Button>
          <Button onClick={onClose} variant="danger" size="sm">
            <PhoneOff className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CallBanner