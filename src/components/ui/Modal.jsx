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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className={`relative bg-black rounded-3xl shadow-2xl border border-gray-800 w-full mx-4 ${sizes[size]}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h3 className="text-lg font-semibold text-red-600">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-white hover:text-red-500 hover:bg-red-600/10 rounded-2xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 text-white">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
