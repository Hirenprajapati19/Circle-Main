import React, { useState, useMemo } from 'react'
import { X, Heart, MessageCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import { formatTime } from '../../lib/format'
import { useChatStore } from '../../store/useChat'
import { useNotifStore } from '../../store/useNotif'

const StatusViewer = ({ status, onClose, isOwn = false, onShowLikes, onLike }) => {
  if (!status) return null
  const [liked, setLiked] = useState(Boolean(status.likedByMe))
  const [isReplying, setIsReplying] = useState(false)
  const [replyText, setReplyText] = useState('')
  const addMessage = useChatStore(s => s.addMessage)
  const updateChatLastMessage = useChatStore(s => s.updateChatLastMessage)
  const addNotification = useNotifStore(s => s.addNotification)
  const safeUser = status.user || { name: 'User', avatar: null }
  const safeTimestamp = status.timestamp || new Date().toISOString()

  const handleLike = () => {
    if (liked) return
    if (isOwn) {
      if (onShowLikes) onShowLikes(status.likes ?? 0)
      addNotification('Someone liked your status')
      setLiked(true)
      return
    }
    if (!status.likedByMe) {
      status.likes = (status.likes || 0) + 1
      status.likedByMe = true
      if (onLike) onLike(status.id)
    }
    setLiked(true)
  }

  const handleReply = () => {
    if (isOwn) return
    setIsReplying(true)
  }

  const sendReply = () => {
    if (isOwn) return
    const text = replyText.trim()
    if (!text) return
    const chatId = status.user.name || 'chat'
    const msg = {
      id: Math.random().toString(36).slice(2, 10),
      text,
      createdAt: new Date().toISOString(),
      from: 'me'
    }
    addMessage(chatId, msg)
    updateChatLastMessage(chatId, msg.text)
    addNotification('New message sent as reply to status')
    setReplyText('')
    setIsReplying(false)
  }

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
          <Avatar src={safeUser.avatar} name={safeUser.name} />
          <div>
            <h3 className="font-semibold text-white">{safeUser.name}</h3>
            <p className="text-sm text-white">{formatTime(safeTimestamp)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button
            variant="ghost"
            className={`flex items-center gap-2 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`w-4 h-4 ${liked ? 'text-red-500 fill-red-500' : ''}`} />
            {isOwn ? (liked ? 'Likes' : 'Likes') : liked ? 'Liked' : 'Like'}
          </Button>
          
          {!isOwn && (
            <>
              <Button variant="ghost" className="flex items-center gap-2" onClick={handleReply}>
                <MessageCircle className="w-4 h-4" />
                Reply
              </Button>
              {isReplying && (
                <div className="flex items-center gap-2 max-w-lg w-full">
                  <input
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none text-sm"
                    placeholder="Type your reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <Button onClick={sendReply} className="bg-red-600 hover:bg-red-700 text-white px-3 py-2">Send</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default StatusViewer