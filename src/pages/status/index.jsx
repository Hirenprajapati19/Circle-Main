import React, { useState } from 'react'
import { Plus, Eye } from 'lucide-react'
import MyStatus from '../../components/status/MyStatus'
import StatusList from '../../components/status/StatusList'
import StatusViewer from '../../components/status/StatusViewer'
import Button from '../../components/ui/Button'

const StatusPage = () => {
  const [viewingStatus, setViewingStatus] = useState(null)

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 mb-2">Status Updates</h1>
            <p className="text-sm sm:text-base text-gray-600">Share what's happening in your world</p>
          </div>
          
          <Button className="flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Status</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <MyStatus />
          </div>
          
          <div className="lg:col-span-2">
            <StatusList onViewStatus={setViewingStatus} />
          </div>
        </div>

        {viewingStatus && (
          <StatusViewer
            status={viewingStatus}
            onClose={() => setViewingStatus(null)}
          />
        )}
      </div>
    </div>
  )
}

export default StatusPage