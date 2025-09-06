import React, { useRef, useEffect } from 'react'
import { Send, Paperclip, Smile } from 'lucide-react'
import Button from '../ui/Button'

const Composer = ({ value, onChange, onSend }) => {
  const textareaRef = useRef(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto'
      
      // Calculate the height for 2 lines maximum
      const lineHeight = 20 // Line height
      const maxHeight = 80 // 2 lines maximum (80px)
      const minHeight = 40 // 1 line minimum (40px)
      
      // Set height based on content, but limit to maxHeight
      const newHeight = Math.min(Math.max(textarea.scrollHeight, minHeight), maxHeight)
      textarea.style.height = `${newHeight}px`
      
      // Enable/disable scrolling based on content height
      if (textarea.scrollHeight > maxHeight) {
        textarea.style.overflowY = 'auto'
      } else {
        textarea.style.overflowY = 'hidden'
      }
    }
  }, [value])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
    // Shift+Enter allows new line (default behavior)
  }

  const handleKeyDown = (e) => {
    // Handle Enter key for sending message
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
    }
  }

  return (
    <div className="bg-white border-t border-gray-200 p-3 sm:p-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Attachment Button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <Paperclip className="w-4 h-4 text-gray-600" />
        </Button>
        
        {/* Message Input */}
        <div className="flex-1 relative"> 
          <textarea
            ref={textareaRef}
            placeholder="Type a message..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-4 py-2.5 sm:py-3 text-sm bg-gray-50 border border-gray-200 rounded-2xl focus:bg-white focus:border-el-blue-500 focus:ring-2 focus:ring-el-blue-500/20 focus:outline-none transition-all resize-none"
            style={{
              minHeight: '40px',
              maxHeight: '80px', // 2 lines maximum
              lineHeight: '20px'
            }}
            rows={1}
          />
        </div>
        
        {/* Emoji Button */}
        <Button 
          variant="ghost" 
          size="sm"
          className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0"
        >
          <Smile className="w-4 h-4 text-gray-600" />
        </Button>
        
        {/* Send Button */}
        <Button 
          onClick={onSend} 
          disabled={!value.trim()}
          className="p-2 bg-el-blue-500 hover:bg-el-blue-600 text-white rounded-full flex-shrink-0 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

export default Composer