import React from 'react'
import { X, Heart, MessageCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { formatTime } from '../../lib/format'

const StatusViewer = ({ status, onClose, isOwn = false, onShowLikes }) => {
  if (!status) return null

  return (
    <Modal isOpen={true} onClose={onClose} size="lg" title="">
      <div className="text-center">
        {/* Status Content */}
        <div className="mb-6">
          {status.type === 'image' && (
            <div className="bg-gray-900 rounded-2xl max-h-[60vh] flex items-center justify-center mb-4 overflow-hidden">
              {status.content ? (
                <img src={status.content} alt="Status" className="max-h-[60vh] w-full object-contain" />
              ) : (
                <span className="text-gray-500">No image</span>
              )}
            </div>
          )}
          
          {status.content && status.type === 'text' && (
            <p className="text-lg text-white mb-4 whitespace-pre-wrap">{status.content}</p>
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
          <Button
            variant="ghost"
            className="flex items-center gap-2"
            onClick={() => {
              if (isOwn && onShowLikes) {
                onShowLikes(status.likes ?? 0)
              }
            }}
          >
            <Heart className="w-4 h-4" />
            {isOwn ? 'Likes' : 'Like'}
          </Button>
          
          {!isOwn && (
            <Button variant="ghost" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Reply
            </Button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default StatusViewer