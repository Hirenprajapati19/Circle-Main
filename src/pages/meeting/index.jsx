import React, { useState } from 'react'
import { Video, Mic, MicOff, VideoOff, Users, Hand, Settings, Monitor, MessageSquare } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useMeetingStore } from '../../store/useMeeting'

const MeetingPage = () => {
  const { joinMeeting, scheduleMeeting, leaveMeeting, currentMeeting } = useMeetingStore()
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  // Join form state
  const [joinId, setJoinId] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinError, setJoinError] = useState('')

  const participants = [
    { id: 1, name: 'John Doe', avatar: null, isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', avatar: null, isMuted: true, isHost: false },
    { id: 3, name: 'Alex Johnson', avatar: null, isMuted: false, isHost: false }
  ]

  // dummy messages
  const messages = [
    { id: 1, sender: "John Doe", text: "Hello team!" },
    { id: 2, sender: "Jane Smith", text: "Hi John 👋" },
    { id: 3, sender: "Alex Johnson", text: "Let's start the meeting" },
    { id: 4, sender: "You", text: "Sure 🚀" },
    { id: 5, sender: "You", text: "Ye ek bahut lamba message hai jo test ke liye likha gaya hai taki dekhe ki cut hone ke bajaye line break hoke niche aata hai ya nahi. Ab ye properly wrap ho jana chahiye." }
  ]

  if (!isInMeeting) {
    return (
      <div className="p-4 sm:p-6 min-h-screen bg-black text-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center">
          <Card className="text-center p-6 sm:p-8 bg-black border border-red-600">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>

            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-500 mb-3 sm:mb-4">
              AR Meeting Room
            </h1>

            <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
              Join an immersive AR conference experience with spatial audio and virtual collaboration tools.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">Microphone Ready</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-600/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Video className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">Camera Ready</p>
                </div>
              </div>
              
              <Button 
                onClick={() => setIsInMeeting(true)} 
                className="w-full text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white"
              >
                Join Meeting
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative flex">
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-6">
        <Card className="bg-gray-900 border border-red-600 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
            </div>
            <p className="text-sm sm:text-lg font-medium">Your Video</p>
          </div>
        </Card>

        {participants.slice(0, 3).map((participant) => (
          <Card key={participant.id} className="bg-gray-900 border border-red-600 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
              </div>
              <p className="font-medium text-sm sm:text-base">{participant.name}</p>
              {participant.isMuted && (
                <MicOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mx-auto mt-1 sm:mt-2" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Chat Sidebar */}
      <div className="w-72 bg-gray-950 border-l border-red-600 flex flex-col">
        <div className="p-3 border-b border-gray-800 flex items-center gap-2 text-red-500">
          <MessageSquare className="w-4 h-4" />
          <span className="font-medium">Chat</span>
        </div>

        {/* messages list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="text-sm break-words">
              <span className="font-semibold text-red-400">{msg.sender}: </span>
              <span className="text-gray-300">{msg.text}</span>
            </div>
          ))}
        </div>

        {/* input always bottom */}
        <div className="p-2 border-t border-gray-800">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-gray-800 text-gray-200 text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>
      </div>

      {/* Controls Bar */}
     {/* Controls Bar */}
<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
  <Card className="flex items-center justify-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 bg-gray-900/95 backdrop-blur border border-red-600 rounded-xl">
    <Button
      variant={isMuted ? 'danger' : 'secondary'}
      size="sm"
      onClick={() => setIsMuted(!isMuted)}
      className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white"
    >
      {isMuted ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4 text-red-500" />}
    </Button>
    
    <Button
      variant={isVideoOff ? 'danger' : 'secondary'}
      size="sm"
      onClick={() => setIsVideoOff(!isVideoOff)}
      className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white"
    >
      {isVideoOff ? <VideoOff className="w-4 h-4 text-red-500" /> : <Video className="w-4 h-4 text-red-500" />}
    </Button>
    
    <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white">
      <Hand className="w-4 h-4" />
    </Button>
    
    <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white">
      <Monitor className="w-4 h-4" />
    </Button>
    
    <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white">
      <Settings className="w-4 h-4" />
    </Button>
    
    <Button 
      variant="danger" 
      onClick={() => setIsInMeeting(false)}
      className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-xs sm:text-sm text-white"
    >
      <span className="hidden sm:inline">Leave Meeting</span>
      <span className="sm:hidden">Leave</span>
    </Button>
  </Card>
</div>

    </div>
  )
}

export default MeetingPage
