import React from 'react'
import { Hash, Bell, Pin } from 'lucide-react'
import Card from '../../components/layout/Card'

const ChannelsPage = () => {
  const announcements = [
    {
      id: 1,
      title: "Welcome to Circle One!",
      content: "We're excited to have you here. Check out all the amazing features available.",
      author: "Circle Team",
      timestamp: "2 hours ago",
      pinned: true
    },
    {
      id: 2,
      title: "New Features Released",
      content: "AR Meeting rooms are now available in beta. Try them out and let us know your feedback!",
      author: "Product Team",
      timestamp: "1 day ago",
      pinned: false
    },
    {
      id: 3,
      title: "Maintenance Window",
      content: "Scheduled maintenance this weekend from 2-4 AM EST. Some features may be temporarily unavailable.",
      author: "Engineering Team",
      timestamp: "3 days ago",
      pinned: false
    }
  ]

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">Channels</h1>
            <p className="text-sm sm:text-base text-gray-400">Stay updated with official announcements</p>
          </div>
          
          <button className="p-2 sm:p-3 text-gray-400 hover:text-red-500 hover:bg-red-600/10 rounded-xl sm:rounded-2xl transition-all">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Admin Banner */}
        <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-gray-900/60 to-black border border-gray-800 p-4 sm:p-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-red-500 text-sm sm:text-base">Official Channel</h3>
              <p className="text-xs sm:text-sm text-gray-400">Updates and announcements from the Circle team</p>
            </div>
          </div>
        </Card>

        {/* Announcements */}
        <div className="space-y-3 sm:space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} hover className="p-4 sm:p-6 bg-black border border-gray-800">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-100 text-sm sm:text-base">{announcement.title}</h3>
                    {announcement.pinned && (
                      <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-3 text-sm sm:text-base">{announcement.content}</p>
                  
                  <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                    <span>{announcement.author}</span>
                    <span>•</span>
                    <span>{announcement.timestamp}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChannelsPage
