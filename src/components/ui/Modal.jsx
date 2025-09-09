import React from 'react'
import { X } from 'lucide-react'

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center sm:items-center sm:justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className={`relative bg-black shadow-2xl border border-gray-800 w-full h-full sm:h-auto mx-0 sm:mx-4 rounded-none sm:rounded-3xl ${sizes[size]}`}>
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-6 border-b border-gray-800 bg-black">
          <h3 className="text-lg font-semibold text-red-600">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-red-500 hover:bg-red-600/10 rounded-2xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 sm:p-6 text-white overflow-y-auto thin-scroll" style={{ maxHeight: 'calc(100vh - 140px)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
