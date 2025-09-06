import React, { useRef, useEffect } from 'react'

const OTPInput = ({ value, onChange, length = 6 }) => {
  const inputRefs = useRef([])

  useEffect(() => {
    if (value.length === 0) {
      inputRefs.current[0]?.focus()
    }
  }, [value])

  const handleChange = (index, digit) => {
    if (digit.length > 1) return
    
    const newValue = value.split('')
    newValue[index] = digit
    onChange(newValue.join(''))
    
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          maxLength={1}
          value={value[index] || ''}
          onChange={e => handleChange(index, e.target.value)}
          onKeyDown={e => handleKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-2xl focus:border-el-blue-500 focus:ring-4 focus:ring-el-blue-500/20 transition-all duration-200 outline-none"
        />
      ))}
    </div>
  )
}

export default OTPInput