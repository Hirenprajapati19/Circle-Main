import React from 'react'

const Switch = ({ checked, onChange, className = '', size = 'md' }) => {
  const sizes = {
    sm: { track: 'w-9 h-5', dot: 'w-4 h-4', translate: 'translate-x-4' },
    md: { track: 'w-11 h-6', dot: 'w-5 h-5', translate: 'translate-x-5' },
    lg: { track: 'w-14 h-7', dot: 'w-6 h-6', translate: 'translate-x-7' }
  }
  const s = sizes[size] || sizes.md

  return (
    <button
      type="button"
      onClick={() => onChange && onChange({ target: { checked: !checked } })}
      className={`relative inline-flex items-center ${s.track} rounded-full transition-colors duration-200 focus:outline-none border ${checked ? 'bg-red-600 border-red-600' : 'bg-gray-700 border-gray-600'} ${className}`}
      aria-pressed={checked}
    >
      <span
        className={`inline-block ${s.dot} rounded-full bg-white shadow transform transition-transform duration-200 ${checked ? s.translate : 'translate-x-1'}`}
      />
    </button>
  )
}

export default Switch


