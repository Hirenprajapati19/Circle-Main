import React from 'react'
import { Plus, Camera } from 'lucide-react'
import { useAuth } from '../../store/useAuth'
import Card from '../layout/Card'
import Avatar from '../ui/Avatar'

const MyStatus = () => {
  const { user } = useAuth()

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">My Status</h3>
      
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Avatar size="xl" name={user?.name} />
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-el-blue-500 text-white rounded-full flex items-center justify-center hover:bg-el-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">Add to your status</p>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-el-blue-500 hover:bg-el-blue-50 transition-colors flex flex-col items-center gap-2">
            <Camera className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Photo</span>
          </button>
          
          <button className="p-3 border-2 border-dashed border-gray-300 rounded-2xl hover:border-el-blue-500 hover:bg-el-blue-50 transition-colors flex flex-col items-center gap-2">
            <div className="w-5 h-5 bg-gray-600 rounded"></div>
            <span className="text-xs text-gray-600">Text</span>
          </button>
        </div>
      </div>
    </Card>
  )
}

export default MyStatus