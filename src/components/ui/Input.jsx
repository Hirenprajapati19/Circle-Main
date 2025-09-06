import React from 'react'

const Input = ({ 
  className = '', 
  error = false, 
  ...props 
}) => {
  const baseClasses = 'input-field'
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''

  return (
    <input
      className={`${baseClasses} ${errorClasses} ${className}`}
      {...props}
    />
  )
}

export default Input