import React from 'react'

const Input = ({
  className = '',
  error = false,
  ...props
}) => {
  const baseClasses = 'input-field'
  const errorClasses = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-red-500 focus:border-red-500 focus:ring-red-500/20'

  return (
    <input
      {...props}
      className={`w-full px-3 py-2 rounded-md bg-gray-900 text-white 
        placeholder:text-white    /* 🔥 placeholder color white */
        border border-gray-700 
        focus:outline-none focus:ring-2 focus:ring-red-500 
        ${className}`}
    />
  )
}

export default Input