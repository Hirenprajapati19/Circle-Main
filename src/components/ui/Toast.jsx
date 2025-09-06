import React from 'react'
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react'

const Toast = ({ type = 'success', message, onClose }) => {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />
  }

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  }

  return (
    <div className={`flex items-center gap-3 p-4 rounded-2xl border ${styles[type]} shadow-lg`}>
      {icons[type]}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="text-current hover:bg-black/10 p-1 rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default Toast