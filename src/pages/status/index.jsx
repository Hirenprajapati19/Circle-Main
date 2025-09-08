import React, { useMemo, useState, useEffect } from 'react'
import { Plus, Image as ImageIcon, Type as TypeIcon, Upload } from 'lucide-react'
import MyStatus from '../../components/status/MyStatus'
import StatusList from '../../components/status/StatusList'
import StatusViewer from '../../components/status/StatusViewer'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import { mockStatuses } from '../../mock/statuses.json'
import { useAuth } from '../../store/useAuth'

const StatusPage = () => {
  const { user } = useAuth()
  const [viewingStatus, setViewingStatus] = useState(null)
  const [showLikesModal, setShowLikesModal] = useState(false)
  const [likesCount, setLikesCount] = useState(0)
  const [showAddModal, setShowAddModal] = useState(false)
  const [addType, setAddType] = useState('text') // 'text' | 'image'
  const [textContent, setTextContent] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')

  const [statuses, setStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('circle.statuses')
      if (saved) return JSON.parse(saved)
    } catch (_) {}
    return mockStatuses
  })

  useEffect(() => {
    try {
      localStorage.setItem('circle.statuses', JSON.stringify(statuses))
    } catch (_) {}
  }, [statuses])

  const openAddModal = (type) => {
    setAddType(type)
    setShowAddModal(true)
  }

  const closeAddModal = () => {
    setShowAddModal(false)
    setTextContent('')
    setPreviewUrl('')
    setSelectedFile(null)
  }

  const handlePickFile = (event) => {
    const file = event.target.files && event.target.files[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(typeof reader.result === 'string' ? reader.result : '')
    }
    reader.readAsDataURL(file)
  }

  const createStatus = () => {
    const id = Math.random().toString(36).slice(2, 10)
    const base = {
      id,
      user: { name: user?.name || 'Me', avatar: user?.avatar || null },
      timestamp: new Date().toISOString(),
      views: 0,
      likes: 0
    }
    const contentToUse = previewUrl
    const newStatus = addType === 'image'
      ? { ...base, type: 'image', content: contentToUse || 'Image' }
      : { ...base, type: 'text', content: textContent }

    setStatuses(prev => [newStatus, ...prev])
    closeAddModal()
  }

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-600 mb-2">
              Status Updates
            </h1>
            <p className="text-sm sm:text-base text-gray-300">
              Share what's happening in your world
            </p>
          </div>
          
          <Button
            onClick={() => openAddModal('text')}
            className="flex items-center gap-2 text-sm bg-red-600 text-white hover:bg-red-700 rounded-full px-4 py-2 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Status</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1">
            <MyStatus
              onAddText={() => openAddModal('text')}
              onAddPhoto={() => openAddModal('image')}
            />
          </div>
          
          <div className="lg:col-span-2">
            <StatusList statuses={statuses} onViewStatus={setViewingStatus} />
          </div>
        </div>

        {/* Status viewer modal */}
        {viewingStatus && (
          <StatusViewer
            status={viewingStatus}
            onClose={() => setViewingStatus(null)}
            isOwn={viewingStatus?.user?.name === (user?.name || 'Me')}
            onShowLikes={(count) => { setLikesCount(count); setShowLikesModal(true) }}
          />
        )}

        {/* Add status modal */}
        <Modal
          isOpen={showAddModal}
          onClose={closeAddModal}
          title={addType === 'image' ? 'Add Photo Status' : 'Add Text Status'}
        >
          <div className="space-y-4">
            <div className="flex gap-2 text-white text-sm">
              <button
                onClick={() => setAddType('text')}
                className={`px-3 py-1 rounded-full border ${addType === 'text' ? 'bg-red-600 text-white border-red-600' : 'border-gray-700'}`}
              >
                <TypeIcon className="w-4 h-4 inline-block mr-1" /> Text
              </button>
              <button
                onClick={() => setAddType('image')}
                className={`px-3 py-1 rounded-full border ${addType === 'image' ? 'bg-red-600 text-white border-red-600' : 'border-gray-700'}`}
              >
                <ImageIcon className="w-4 h-4 inline-block mr-1" /> Photo
              </button>
            </div>

            {addType === 'text' && (
              <div>
                <label className="block text-sm font-medium text-white mb-2">What's on your mind?</label>
                <textarea
                  className="w-full px-3 py-2 rounded-lg border border-gray-700 bg-black text-white focus:border-red-600 focus:ring-2 focus:ring-red-600/20 outline-none resize-none"
                  rows={4}
                  placeholder="Type your status..."
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                />
              </div>
            )}

            {addType === 'image' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Upload photo</label>
                  <div className="flex items-center gap-3">
                    <label className="px-3 py-2 rounded-lg border border-gray-700 text-white hover:border-red-600 cursor-pointer inline-flex items-center gap-2">
                      <Upload className="w-4 h-4" /> Choose file
                      <input type="file" accept="image/*" className="hidden" onChange={handlePickFile} />
                    </label>
                  </div>
                </div>
                {previewUrl && (
                  <div className="bg-gray-900 border border-gray-800 rounded-xl p-3">
                    <img src={previewUrl} alt="Preview" className="max-h-56 w-full object-contain rounded-lg" />
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={closeAddModal} className="flex-1">Cancel</Button>
              <Button
                onClick={createStatus}
                disabled={addType === 'text' ? textContent.trim().length === 0 : previewUrl.trim().length === 0}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Post
              </Button>
            </div>
          </div>
        </Modal>
      </div>
      {/* Likes modal for own status */}
      <Modal isOpen={showLikesModal} onClose={() => setShowLikesModal(false)} title="Likes">
        <div className="text-white text-center">
          <p className="text-lg">Total likes: <span className="text-red-400 font-semibold">{likesCount}</span></p>
        </div>
      </Modal>
    </div>
  )
}

export default StatusPage
