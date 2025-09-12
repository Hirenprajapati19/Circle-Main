import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import FeatureGate from '../../components/ui/FeatureGate'
import CreditDisplay from '../../components/ui/CreditDisplay'
import UpgradePopup from '../../components/ui/UpgradePopup'
import { useAuth } from '../../store/useAuth'

const ChatbotPage = () => {
  const { deductCredits, getCredits, canUseCredits, isProUser } = useAuth()
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Circle AI, your intelligent assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)
  const messagesEndRef = useRef(null)

  // ✅ Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // For free users, check credits
    if (!isProUser()) {
      if (getCredits() < 3) {
        setShowUpgradePopup(true)
        return
      }

      // Deduct credits for free users
      const creditResult = deductCredits(3)
      if (!creditResult.success) {
        setShowUpgradePopup(true)
        return
      }
    }

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: "I understand your question. Let me help you with that!",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    }, 1000)
  }

  // ✅ Auto scroll jab bhi messages update ho
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="h-screen bg-black text-white p-4 sm:p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex flex-col flex-1 border border-gray-600 rounded-xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-600 bg-black">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-poppins text-white mb-1">
                AI Assistant
              </h1>
              <p className="text-sm sm:text-base text-gray-400">
                Get instant help and answers to your questions
              </p>
            </div>
            <CreditDisplay />
          </div>
        </div>

        {/* Assistant Card */}
        <div className="p-4 border-b border-gray-600 bg-black">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-600 rounded-xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white flex items-center gap-2 text-base">
                Circle AI
                <Sparkles className="w-4 h-4 text-yellow-500" />
              </h3>
              <p className="text-sm text-gray-400">
                Powered by advanced AI technology
              </p>
            </div>
          </div>
        </div>

        <FeatureGate feature="ai_features">
          {/* Messages (scrollable area) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-sm lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-gray-600 text-white'
                      : 'bg-gray-800 text-gray-100 border border-gray-600'
                  }`}
                >
                  {/* ✅ Long text wrap fix */}
                  <p className="text-sm sm:text-base break-words whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <div className="p-4 border-t border-gray-600 bg-black flex gap-3">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 text-sm bg-gray-900 text-white border border-gray-600 rounded-lg"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              size="sm"
              className="bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </FeatureGate>
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
