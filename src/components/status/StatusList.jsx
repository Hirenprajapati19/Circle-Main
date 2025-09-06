import React from 'react'
import { Eye, Heart } from 'lucide-react'
import Card from '../layout/Card'
import Avatar from '../ui/Avatar'
import { mockStatuses } from '../../mock/statuses.json'
import { formatTime } from '../../lib/format'

const StatusList = ({ onViewStatus }) => {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Recent Updates</h3>
      
      <div className="space-y-4">
        {mockStatuses.map((status) => (
          <button
            key={status.id}
            onClick={() => onViewStatus(status)}
            className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors text-left"
          >
            <div className="relative">
              <Avatar src={status.user.avatar} name={status.user.name} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-el-blue-500 border-2 border-white rounded-full" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{status.user.name}</h4>
              <p className="text-sm text-gray-600">{formatTime(status.timestamp)}</p>
            </div>
            
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {status.views}
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {status.likes}
              </span>
            </div>
          </button>
        ))}
      </div>
    </Card>
  )
}

export default StatusList