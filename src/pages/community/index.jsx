import React, { useState } from 'react'
import { Plus, MessageSquare, Users, TrendingUp } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/ui/Input'

const CommunityPage = () => {
  const [showNewCommunity, setShowNewCommunity] = useState(false)
  const [newCommunityName, setNewCommunityName] = useState('')

  const communities = [
    {
      id: 1,
      name: "General Discussion",
      description: "Talk about anything and everything",
      members: 1234,
      posts: 45,
      lastPost: "2 minutes ago",
      trending: true
    },
    {
      id: 2,
      name: "Tech Talk",
      description: "Discussions about technology and development",
      members: 856,
      posts: 23,
      lastPost: "1 hour ago",
      trending: false
    },
    {
      id: 3,
      name: "Design & Creativity",
      description: "Share your creative work and get feedback",
      members: 642,
      posts: 18,
      lastPost: "3 hours ago",
      trending: false
    }
  ]

  const handleCreateCommunity = () => {
    if (newCommunityName.trim()) {
      setNewCommunityName('')
      setShowNewCommunity(false)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 mb-2">Community</h1>
            <p className="text-sm sm:text-base text-gray-600">Connect with like-minded people in various topics</p>
          </div>
          
          <Button onClick={() => setShowNewCommunity(true)} className="flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Community</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>

        {/* Communities Grid */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-el-blue-600" />
            Trending Communities
          </h2>
          
          <div className="grid gap-3 sm:gap-4">
            {communities.map((community) => (
              <Card key={community.id} hover className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-el-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-el-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                          {community.name}
                          {community.trending && (
                            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-orange-500 flex-shrink-0" />
                          )}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600">{community.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                        {community.members.toLocaleString()} members
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
                        {community.posts} posts today
                      </span>
                      <span className="hidden sm:inline">Last post: {community.lastPost}</span>
                    </div>
                  </div>
                  
                  <Button variant="secondary" size="sm" className="w-full sm:w-auto">
                    Join
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* New Community Modal */}
        <Modal
          isOpen={showNewCommunity}
          onClose={() => setShowNewCommunity(false)}
          title="Create New Community"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Community Name
              </label>
              <Input
                type="text"
                placeholder="Enter community name"
                value={newCommunityName}
                onChange={(e) => setNewCommunityName(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button onClick={handleCreateCommunity} className="flex-1">
                Create Community
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setShowNewCommunity(false)}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default CommunityPage