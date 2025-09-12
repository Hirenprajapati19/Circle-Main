import React, { useEffect, useState } from 'react'
import { Video, Mic, MicOff, VideoOff, Users, Hand, Palette, Monitor, MessageSquare } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useMeetingStore } from '../../store/useMeeting'
import Modal from '../../components/ui/Modal'
import FeatureGate from '../../components/ui/FeatureGate'
import CreditDisplay from '../../components/ui/CreditDisplay'
import UpgradePopup from '../../components/ui/UpgradePopup'
import { useAuth } from '../../store/useAuth'

const MeetingPage = () => {
  const { canUseFeature, deductCredits, getCredits, canUseCredits, isProUser } = useAuth()
  const { joinMeeting, scheduleMeeting, leaveMeeting, currentMeeting } = useMeetingStore()
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [bgMode, setBgMode] = useState('dark') // page bg
  const [myTileBg, setMyTileBg] = useState('dark') // my video tile bg
  const [showThemePicker, setShowThemePicker] = useState(false)
  // Join form state
  const [joinId, setJoinId] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinError, setJoinError] = useState('')
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)

  const participants = [
    { id: 1, name: 'John Doe', avatar: null, isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', avatar: null, isMuted: true, isHost: false },
    { id: 3, name: 'Alex Johnson', avatar: null, isMuted: false, isHost: false }
  ]

  // chat state
  const [messages, setMessages] = useState([
    { id: 1, sender: "John Doe", text: "Hello team!" },
    { id: 2, sender: "Jane Smith", text: "Hi John 👋" },
    { id: 3, sender: "Alex Johnson", text: "Let's start the meeting" },
    { id: 4, sender: "You", text: "Sure 🚀" },
    { id: 5, sender: "You", text: "Ye ek bahut lamba message hai jo test ke liye likha gaya hai taki dekhe ki cut hone ke bajaye line break hoke niche aata hai ya nahi. Ab ye properly wrap ho jana chahiye." }
  ])
  const [chatInput, setChatInput] = useState('')
  const [unreadCount, setUnreadCount] = useState(0)
  const lastSenderRef = React.useRef(messages[messages.length - 1]?.sender || null)

  const sendMessage = () => {
    const text = chatInput.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text }])
    setChatInput('')
  }

  // Call this to simulate/handle incoming messages from others
  const addIncomingMessage = (sender, text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender, text }])
  }

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (!last) return
    if (lastSenderRef.current !== last.sender) {
      lastSenderRef.current = last.sender
      // If message from others and chat is not open (on mobile), increment unread
      if (last.sender !== 'You' && isMobile && !showMobileChat) {
        setUnreadCount((c) => Math.min(999, c + 1))
      }
    }
  }, [messages, isMobile, showMobileChat])

  const bgClasses = bgMode === 'dark'
    ? 'bg-black'
    : bgMode === 'gradient'
      ? 'bg-gradient-to-br from-black via-red-950 to-black'
      : 'bg-[url(\'/public/vite.svg\')] bg-center bg-cover bg-no-repeat bg-black/90'

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 640)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  if (!isInMeeting) {
    return (
      <div className="p-4 sm:p-6 min-h-screen bg-black text-white">
        <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center">
          <FeatureGate feature="unlimited_meetings">
            <Card className="text-center p-6 sm:p-8 bg-black border border-red-600">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Video className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <h1 className="text-xl sm:text-2xl font-bold font-poppins text-red-500">
                  AR Meeting Room
                </h1>
                <CreditDisplay />
              </div>
              
              <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-4">
                Join an immersive AR conference experience with spatial audio and virtual collaboration tools.
              </p>
              <div className="space-y-4 text-left">
                <label className="text-sm text-gray-300">Meeting ID</label>
                <Input
                  placeholder="Enter meeting ID"
                  value={joinId}
                  onChange={(e) => setJoinId(e.target.value)}
                />
                <label className="text-sm text-gray-300">Password</label>
                <Input
                  placeholder="Enter password"
                  type="password"
                  value={joinPassword}
                  onChange={(e) => setJoinPassword(e.target.value)}
                />
                {joinError && (
                  <div className="text-red-400 text-sm">{joinError}</div>
                )}
                <Button
                  onClick={() => {
                    // For free users, check credits
                    if (!isProUser()) {
                      if (getCredits() < 20) {
                        setShowUpgradePopup(true)
                        return
                      }

                      // Deduct credits for free users
                      const creditResult = deductCredits(20)
                      if (!creditResult.success) {
                        setShowUpgradePopup(true)
                        return
                      }
                    }

                    const resp = joinMeeting({ id: joinId.trim(), password: joinPassword })
                    if (!resp.ok) {
                      setJoinError(resp.error)
                      return
                    }
                    setIsInMeeting(true)
                  }}
                  className="w-full text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white mt-2"
                >
                  {isProUser() ? 'Join Meeting' : 'Join Meeting (20 Credits)'}
                </Button>
              </div>
            </Card>
          </FeatureGate>
        </div>

        {/* Upgrade Popup on join screen */}
        <UpgradePopup
          isOpen={showUpgradePopup}
          onClose={() => setShowUpgradePopup(false)}
          feature="meeting"
          creditsNeeded={20}
          currentCredits={getCredits()}
        />
      </div>
    )
  }

  const myTileBgClasses = myTileBg === 'dark'
    ? 'bg-gray-900'
    : myTileBg === 'gradient'
      ? 'bg-gradient-to-br from-red-950 via-black to-red-900'
      : myTileBg === 'neon'
        ? 'bg-black ring-2 ring-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
        : myTileBg === 'studio'
          ? 'bg-[url(\'/public/vite.svg\')] bg-cover bg-center'
          : 'bg-gray-900'

  return (
    <div className={`min-h-screen ${bgClasses} relative flex`}>
      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 p-3 sm:p-6">
        <Card className={`${myTileBgClasses} border border-red-600 flex items-center justify-center transition-all duration-300`}> 
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

      {/* Chat Sidebar - hidden on mobile, replaced by floating button */}
      {!isMobile && (
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
        <div className="p-2 border-t border-gray-800 flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            className="flex-1 bg-gray-800 text-gray-200 text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={sendMessage}>Send</Button>
        </div>
      </div>
      )}

      {/* Floating chat icon for mobile */}
      {isMobile && (
        <button
          onClick={() => setShowMobileChat(true)}
          className="fixed bottom-20 right-4 z-40 p-3 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700"
          aria-label="Open chat"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

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
    
    <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white" onClick={() => setShowThemePicker(true)}>
      <Palette className="w-4 h-4" />
    </Button>
    
    <Button 
      variant="danger" 
      onClick={() => { leaveMeeting(); setIsInMeeting(false) }}
      className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-xs sm:text-sm text-white"
    >
      <span className="hidden sm:inline">Leave Meeting</span>
      <span className="sm:hidden">Leave</span>
    </Button>
  </Card>
</div>

      {/* Mobile Chat Modal */}
      <Modal isOpen={showMobileChat} onClose={() => setShowMobileChat(false)} title="Chat">
        <div className="flex flex-col h-96">
          <div className="flex-1 overflow-y-auto space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm break-words">
                <span className="font-semibold text-red-400">{msg.sender}: </span>
                <span className="text-gray-300">{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
              className="flex-1 bg-gray-800 text-gray-200 text-sm p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600"
            />
            <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white" onClick={sendMessage}>Send</Button>
          </div>
        </div>
      </Modal>

      {/* Theme Picker Modal */}
      <Modal isOpen={showThemePicker} onClose={() => setShowThemePicker(false)} title="Change Theme">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => { setMyTileBg('dark'); setShowThemePicker(false) }} className="p-3 rounded-xl bg-gray-900 border border-gray-700 text-white">Dark</button>
          <button onClick={() => { setMyTileBg('gradient'); setShowThemePicker(false) }} className="p-3 rounded-xl bg-gradient-to-br from-red-950 via-black to-red-900 text-white">Gradient</button>
          <button onClick={() => { setMyTileBg('neon'); setShowThemePicker(false) }} className="p-3 rounded-xl bg-black ring-2 ring-red-500/50 text-white">Neon</button>
          <button onClick={() => { setMyTileBg('studio'); setShowThemePicker(false) }} className="p-3 rounded-xl bg-gray-800 text-white">Studio</button>
        </div>
        <p className="text-xs text-gray-400 mt-3">Only your video tile background changes (like Instagram theme).</p>
      </Modal>

      {/* Upgrade Popup */}
      <UpgradePopup
        isOpen={showUpgradePopup}
        onClose={() => setShowUpgradePopup(false)}
        feature="meeting"
        creditsNeeded={20}
        currentCredits={getCredits()}
      />

    </div>
  )
}

export default MeetingPage
