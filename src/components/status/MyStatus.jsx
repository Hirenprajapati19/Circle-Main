import React from 'react'
import { Plus, Camera } from 'lucide-react'
import { useAuth } from '../../store/useAuth'
import Card from '../layout/Card'
import Avatar from '../ui/Avatar'

const MyStatus = () => {
  const { user } = useAuth()

  return (
    <Card className="p-6 bg-black border border-gray-800 shadow-lg rounded-2xl">
      {/* Title */}
      <h3 className="font-semibold text-red-600 mb-4">My Status</h3>
      
      {/* Avatar with add button */}
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Avatar size="xl" name={user?.name} />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-md">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-300 mb-4">Add to your status</p>
        
        {/* Options */}
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 border-2 border-dashed border-gray-500 rounded-2xl hover:border-red-600 hover:bg-red-600/10 transition-colors flex flex-col items-center gap-2">
            <Camera className="w-5 h-5 text-gray-300" />
            <span className="text-xs text-gray-300">Photo</span>
          </button>
          
          <button className="p-3 border-2 border-dashed border-gray-500 rounded-2xl hover:border-red-600 hover:bg-red-600/10 transition-colors flex flex-col items-center gap-2">
            <div className="w-5 h-5 bg-gray-400 rounded"></div>
            <span className="text-xs text-gray-300">Text</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default MyStatus
