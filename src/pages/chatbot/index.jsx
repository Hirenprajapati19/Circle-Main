import React, { useState } from 'react'
import { Bot, Send, Sparkles } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm Circle AI, your intelligent assistant. How can I help you today?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

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

  return (
    <div className="p-4 sm:p-6 h-full">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 mb-2">AI Assistant</h1>
            <p className="text-sm sm:text-base text-gray-600">Get instant help and answers to your questions</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {/* AI Assistant Card */}
          <Card className="mb-4 sm:mb-6 bg-gradient-to-r from-el-blue-50 to-purple-50 border-el-blue-200 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-el-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2 text-sm sm:text-base">
                  Circle AI
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">Powered by advanced AI technology</p>
              </div>
            </div>
          </Card>

          {/* Messages */}
          <Card className="flex-1 flex flex-col p-3 sm:p-4">
            <div className="flex-1 space-y-3 sm:space-y-4 mb-3 sm:mb-4 max-h-80 sm:max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl ${
                      message.type === 'user'
                        ? 'bg-el-blue-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm sm:text-base">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-2 sm:gap-3">
              <Input
                type="text"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1 text-sm"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim()} size="sm">
                <Send className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ChatbotPage