import React, { useState } from 'react'
import { Video, Mic, MicOff, VideoOff, Users, Hand, Settings, Monitor } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'

const MeetingPage = () => {
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const participants = [
    { id: 1, name: 'John Doe', avatar: null, isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', avatar: null, isMuted: true, isHost: false },
    { id: 3, name: 'Alex Johnson', avatar: null, isMuted: false, isHost: false }
  ]

  if (!isInMeeting) {
    return (
      <div className="p-4 sm:p-6 h-full">
        <div className="max-w-2xl mx-auto h-full flex flex-col justify-center">
          <Card className="text-center p-6 sm:p-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-el-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <Video className="w-6 h-6 sm:w-8 sm:h-8 text-el-blue-600" />
            </div>
            
            <h1 className="text-xl sm:text-2xl font-bold font-poppins text-gray-900 mb-3 sm:mb-4">
              AR Meeting Room
            </h1>
            
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 px-4">
              Join an immersive AR conference experience with spatial audio and virtual collaboration tools.
            </p>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Microphone Ready</p>
                </div>
                
                <div className="text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-el-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2">
                    <Video className="w-5 h-5 sm:w-6 sm:h-6 text-el-blue-600" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Camera Ready</p>
                </div>
              </div>
              
              <Button onClick={() => setIsInMeeting(true)} className="w-full text-sm sm:text-base">
                Join Meeting
              </Button>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-gray-900 relative">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-6 h-full">
        <Card className="bg-gray-800 border-gray-700 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4">
              <Video className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <p className="text-sm sm:text-lg font-medium">Your Video</p>
          </div>
        </Card>
        
        {participants.slice(0, 3).map((participant) => (
          <Card key={participant.id} className="bg-gray-800 border-gray-700 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-medium text-sm sm:text-base">{participant.name}</p>
              {participant.isMuted && (
                <MicOff className="w-3 h-3 sm:w-4 sm:h-4 text-red-400 mx-auto mt-1 sm:mt-2" />
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 w-full max-w-md px-3 sm:px-0">
        <Card className="flex items-center gap-2 sm:gap-4 p-2 sm:p-4 bg-gray-800/90 backdrop-blur border-gray-600 overflow-x-auto">
          <Button
            variant={isMuted ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => setIsMuted(!isMuted)}
            className="flex-shrink-0"
          >
            {isMuted ? <MicOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Mic className="w-3 h-3 sm:w-4 sm:h-4" />}
          </Button>
          
          <Button
            variant={isVideoOff ? 'danger' : 'secondary'}
            size="sm"
            onClick={() => setIsVideoOff(!isVideoOff)}
            className="flex-shrink-0"
          >
            {isVideoOff ? <VideoOff className="w-3 h-3 sm:w-4 sm:h-4" /> : <Video className="w-3 h-3 sm:w-4 sm:h-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <Hand className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <Monitor className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-shrink-0">
            <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
          
          <Button 
            variant="danger" 
            onClick={() => setIsInMeeting(false)}
            className="flex-shrink-0 text-xs sm:text-sm"
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