import React, { useState, useEffect } from 'react'
import { Hash, Bell, Pin, Plus, ArrowLeft } from 'lucide-react'
import Card from '../../components/layout/Card'

const ChannelsPage = () => {
  // Default channels - ye hamesha rahenge
  const defaultChannels = [
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

  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [newChannelTitle, setNewChannelTitle] = useState("")
  const [newChannelContent, setNewChannelContent] = useState("")

  // 🚀 Load from localStorage on first render
  useEffect(() => {
    const savedCustomChannels = JSON.parse(localStorage.getItem("customChannels")) || []
    setChannels([...defaultChannels, ...savedCustomChannels])
  }, [])

  const handleCreateChannel = () => {
    if (!newChannelTitle.trim()) return
    const newChannel = {
      id: Date.now(),
      title: newChannelTitle,
      content: newChannelContent || "No description yet",
      author: "You",
      timestamp: "just now",
      pinned: false
    }

    // ✅ Add new channel to state
    const updatedChannels = [...channels, newChannel]
    setChannels(updatedChannels)

    // ✅ Save only custom channels (id > 3) to localStorage immediately
    const customChannels = updatedChannels.filter(ch => ch.id > 3)
    localStorage.setItem("customChannels", JSON.stringify(customChannels))

    // clear input
    setNewChannelTitle("")
    setNewChannelContent("")
  }

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* If channel is opened */}
        {selectedChannel ? (
          <div>
            <button 
              onClick={() => setSelectedChannel(null)} 
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 mb-4"
            >
              <ArrowLeft size={18} /> Back to Channels
            </button>
            
            <Card className="p-6 bg-black border border-gray-800">
              <h2 className="text-xl font-bold text-red-600 mb-2">{selectedChannel.title}</h2>
              <p className="text-gray-300 mb-4">{selectedChannel.content}</p>
              <div className="text-gray-500 text-sm">
                <span>{selectedChannel.author}</span> • <span>{selectedChannel.timestamp}</span>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">Channels</h1>
                <p className="text-sm sm:text-base text-gray-400">Stay updated or create your own channel</p>
              </div>
              
              <button className="p-2 sm:p-3 text-gray-400 hover:text-red-500 hover:bg-red-600/10 rounded-xl sm:rounded-2xl transition-all">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Create Channel Form */}
            <Card className="mb-6 bg-black border border-gray-800 p-4 sm:p-6">
              <h2 className="text-lg font-semibold text-red-600 mb-3 flex items-center gap-2">
                <Plus size={18} /> Create Channel
              </h2>
              <input
                type="text"
                placeholder="Channel Title"
                value={newChannelTitle}
                onChange={(e) => setNewChannelTitle(e.target.value)}
                className="w-full mb-3 p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200"
              />
              <textarea
                placeholder="Channel Description"
                value={newChannelContent}
                onChange={(e) => setNewChannelContent(e.target.value)}
                className="w-full mb-3 p-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-200"
              />
              <button 
                onClick={handleCreateChannel}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Create
              </button>
            </Card>

            {/* Channels List */}
            <div className="space-y-3 sm:space-y-4">
              {channels.map((ch) => (
                <Card 
                  key={ch.id} 
                  hover 
                  className="p-4 sm:p-6 bg-black border border-gray-800 cursor-pointer"
                  onClick={() => setSelectedChannel(ch)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-600/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Hash className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-100 text-sm sm:text-base">{ch.title}</h3>
                        {ch.pinned && (
                          <Pin className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-gray-400 mb-3 text-sm sm:text-base line-clamp-2">{ch.content}</p>
                      
                      <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500">
                        <span>{ch.author}</span>
                        <span>•</span>
                        <span>{ch.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChannelsPage
