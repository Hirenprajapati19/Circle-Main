import React from 'react'
import { X, Heart, Share2, MessageCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { formatTime } from '../../lib/format'

const StatusViewer = ({ status, onClose }) => {
  if (!status) return null

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" title="">
      <div className="text-center">
        {/* Status Content */}
        <div className="mb-6">
          {status.type === 'image' && (
            <div className="bg-gray-100 rounded-2xl h-64 flex items-center justify-center mb-4">
              <span className="text-gray-500">Image Content</span>
            </div>
          )}
          
          {status.content && (
            <p className="text-lg text-white mb-4">{status.content}</p>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <Avatar src={status.user.avatar} name={status.user.name} />
          <div>
            <h3 className="font-semibold text-white">{status.user.name}</h3>
            <p className="text-sm text-white">{formatTime(status.timestamp)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="ghost" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Like
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Reply
          </Button>
          
          <Button variant="ghost" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default StatusViewer