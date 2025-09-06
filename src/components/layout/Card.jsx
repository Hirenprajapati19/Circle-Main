import React from 'react'

const Card = ({ children, className = '', hover = false, glass = false, ...props }) => {
  const baseClasses = glass 
    ? 'glass' 
    : 'bg-black rounded-xl sm:rounded-2xl shadow-lg border border-gray-800'
  
  const hoverClasses = hover ? 'glow-hover cursor-pointer' : ''

  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${className}`} 
      {...props}
    >
      {children}
    </div>
  )
}

export default Card