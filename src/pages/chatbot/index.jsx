import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import FeatureGate from '../../components/ui/FeatureGate'
import CreditDisplay from '../../components/ui/CreditDisplay'
import UpgradePopup from '../../components/ui/UpgradePopup'
import { useAuth } from '../../store/useAuth'

const ChatbotPage = () => {
  const { deductCredits, getCredits, isProUser } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content:
        "Hello! I'm Circle AI, your intelligent assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)
  const [isTyping, setIsTyping] = useState(false) // typing indicator
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    // credit check
    if (!isProUser()) {
      if (getCredits() < 3) {
        setShowUpgradePopup(true)
        return
      }
      const creditResult = deductCredits(3)
      if (!creditResult.success) {
        setShowUpgradePopup(true)
        return
      }
    }

    // add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')

    // placeholder bot message to progressively fill
    const botMessageId = Date.now() + 1
    setMessages((prev) => [
      ...prev,
      { id: botMessageId, type: 'bot', content: '', timestamp: new Date() },
    ])
    setIsTyping(true)

    try {
      const res = await fetch('http://localhost:5000/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      })

      if (!res.body) throw new Error("No response body")

      const reader = res.body.getReader()
      const decoder = new TextDecoder("utf-8")

      let partial = ""
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split("\n")

        for (let line of lines) {
          if (line.startsWith("data: ")) {
            const word = line.replace("data: ", "").trim()
            if (word === "[DONE]") {
              setIsTyping(false)
              return
            }
            partial += word + " "
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === botMessageId ? { ...msg, content: partial } : msg
              )
            )
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          type: 'bot',
          content: '⚠ Error connecting to AI server',
          timestamp: new Date(),
        },
      ])
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // lock scroll while open
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
    }
  }, [])

  return (
    <div className="flex flex-col h-[100svh] w-full bg-black text-white overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-700 bg-black flex items-center justify-between gap-4">
        <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold font-poppins text-white mb-1 truncate flex items-center gap-2">
            AI Assistant <Sparkles className="w-4 h-4 text-yellow-500" />
          </h1>
          <p className="text-sm sm:text-base text-gray-400 truncate">
            Get instant help and answers to your questions
          </p>
        </div>
        <CreditDisplay />
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto thin-scroll p-4 sm:p-6 space-y-4 pb-24 bg-black">
        <FeatureGate feature="ai_features">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'bot' && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}

              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm sm:text-base leading-relaxed ${
                  message.type === 'user'
                    ? 'bg-gray-600 text-white rounded-br-none'
                    : 'bg-gray-800 text-gray-100 border border-gray-700 rounded-bl-none'
                }`}
              >
                {message.content}
              </div>

              {message.type === 'user' && (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 font-bold">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-700">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="max-w-[75%] px-4 py-3 rounded-2xl bg-gray-800 text-gray-300 border border-gray-700 rounded-bl-none text-sm sm:text-base">
                Circle AI is typing<span className="animate-pulse">...</span>
              </div>
            </div>  
          )}

          <div ref={messagesEndRef} />
        </FeatureGate>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 p-2 border-t border-gray-700 bg-black sticky bottom-0 z-10 pb-[env(safe-area-inset-bottom)]">
        <div className="flex items-center gap-3 bg-gray-900 border border-gray-700 rounded-xl px-3 py-2">
          <Input
            type="text"
            placeholder="Send a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-transparent border-0 text-white placeholder-gray-400 focus:ring-0 focus:outline-none"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Upgrade Popup */}
      <UpgradePopup
        isOpen={showUpgradePopup}
        onClose={() => setShowUpgradePopup(false)}
        feature="chatbot"
        creditsNeeded={3}
        currentCredits={getCredits()}
      />
    </div>
  )
}

export default ChatbotPage