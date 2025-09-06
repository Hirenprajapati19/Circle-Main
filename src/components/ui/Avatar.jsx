import React from 'react'
import { User } from 'lucide-react'

const Avatar = ({ src, name, size = 'md', status, className = '' }) => {
  const sizes = {
    xs: 'w-5 h-5 sm:w-6 sm:h-6',
    sm: 'w-6 h-6 sm:w-8 sm:h-8',
    md: 'w-8 h-8 sm:w-10 sm:h-10',
    lg: 'w-10 h-10 sm:w-12 sm:h-12',
    xl: 'w-12 h-12 sm:w-16 sm:h-16'
  }

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-xs sm:text-sm',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl'
  }

  const statusColors = {
    online: 'bg-green-500',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
    offline: 'bg-gray-400'
  }

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizes[size]} bg-el-blue-100 rounded-full overflow-hidden flex items-center justify-center`}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <User className={`${textSizes[size]} text-el-blue-600`} />
        )}
      </div>
      
      {status && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 ${statusColors[status]} border-2 border-white rounded-full`} />
      )}
    </div>
  )
}

export default Avatar