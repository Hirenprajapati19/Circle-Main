import React, { useEffect, useState, useRef } from 'react'
import { Video, Mic, MicOff, VideoOff, Users, Hand, Palette, Monitor, MessageSquare, Smile, PenSquare, X, Eraser, Save, Download, Undo2, Redo2, Trash2 } from 'lucide-react'
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
  const { joinMeeting, scheduleMeeting, leaveMeeting, currentMeeting, setParticipantCount } = useMeetingStore()
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileChat, setShowMobileChat] = useState(false)
  const [bgMode, setBgMode] = useState('dark') // page bg
  const [myTileBg, setMyTileBg] = useState('dark') // my video tile bg
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showImagePickerModal, setShowImagePickerModal] = useState(false)
  const [joinId, setJoinId] = useState('')
  const [joinPassword, setJoinPassword] = useState('')
  const [joinError, setJoinError] = useState('')
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)

  // States for whiteboard and emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiBtnRef = useRef(null)
  const emojiPickerRef = useRef(null)
  const [reactions, setReactions] = useState([]);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [penColor, setPenColor] = useState('#ffffff');
  const [penSize, setPenSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [whiteboardTool, setWhiteboardTool] = useState('pen');
  const [whiteboardHistory, setWhiteboardHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [isEraserActive, setIsEraserActive] = useState(false);

  const participants = [
    { id: 1, name: 'John Doe', avatar: null, isMuted: false, isHost: true },
    { id: 2, name: 'Jane Smith', avatar: null, isMuted: true, isHost: false },
    { id: 3, name: 'Alex Johnson', avatar: null, isMuted: false, isHost: false }
  ]

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
  const desktopChatRef = useRef(null)
  const mobileChatRef = useRef(null)

  const sendMessage = () => {
    const text = chatInput.trim()
    if (!text) return
    setMessages(prev => [...prev, { id: Date.now(), sender: 'You', text }])
    setChatInput('')
  }

  const addIncomingMessage = (sender, text) => {
    setMessages(prev => [...prev, { id: Date.now(), sender, text }])
  }

  useEffect(() => {
    const last = messages[messages.length - 1]
    if (!last) return
    if (lastSenderRef.current !== last.sender) {
      lastSenderRef.current = last.sender
      if (last.sender !== 'You' && isMobile && !showMobileChat) {
        setUnreadCount((c) => Math.min(999, c + 1))
      }
    }
  }, [messages, isMobile, showMobileChat])

  // Auto-scroll chat to the latest message (desktop + mobile)
  useEffect(() => {
    if (desktopChatRef.current) {
      desktopChatRef.current.scrollTop = desktopChatRef.current.scrollHeight
    }
    if (showMobileChat && mobileChatRef.current) {
      mobileChatRef.current.scrollTop = mobileChatRef.current.scrollHeight
    }
  }, [messages, showMobileChat])

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

  // Close emoji picker on outside click or Escape
  useEffect(() => {
    if (!showEmojiPicker) return
    const onDocMouseDown = (e) => {
      const btn = emojiBtnRef.current
      const panel = emojiPickerRef.current
      if (panel && panel.contains(e.target)) return
      if (btn && btn.contains(e.target)) return
      setShowEmojiPicker(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setShowEmojiPicker(false) }
    document.addEventListener('mousedown', onDocMouseDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [showEmojiPicker])

  // Emoji reaction handler
  const handleReaction = (emoji) => {
    const newReaction = {
      id: Date.now(),
      emoji,
      left: Math.random() * 80 + 10, // Random horizontal position from 10% to 90%
    };
    setReactions(prev => [...prev, newReaction]);
    setShowEmojiPicker(false);

    // Remove the reaction after animation completes (e.g., 4 seconds)
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 4000);
  };

  // Whiteboard initialization
  useEffect(() => {
    if (!showWhiteboard) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      const context = canvas.getContext('2d');
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = penColor;
      context.lineWidth = penSize;
      context.globalCompositeOperation = 'source-over';
      contextRef.current = context;

      // Restore previous drawing if any
      if (whiteboardHistory.length > 0 && historyIndex >= 0) {
        const image = new Image();
        image.onload = () => {
          context.drawImage(image, 0, 0);
        };
        image.src = whiteboardHistory[historyIndex];
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [showWhiteboard]);

  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = penColor;
      contextRef.current.lineWidth = penSize;
      contextRef.current.globalCompositeOperation = whiteboardTool === 'eraser' ? 'destination-out' : 'source-over';
    }
  }, [penColor, penSize, whiteboardTool]);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
    setLastPosition({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    
    // For smoother drawing
    if (whiteboardTool === 'pen') {
      contextRef.current.beginPath();
      contextRef.current.moveTo(x, y);
    }
    
    setLastPosition({ x, y });
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    contextRef.current.closePath();
    setIsDrawing(false);

    // Save to history
    const canvas = canvasRef.current;
    const imageData = canvas.toDataURL();

    // If we're not at the end of history, remove future states
    const newHistory = whiteboardHistory.slice(0, historyIndex + 1);
    newHistory.push(imageData);

    setWhiteboardHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Save cleared state to history
    const imageData = canvas.toDataURL();
    const newHistory = [...whiteboardHistory, imageData];
    setWhiteboardHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex <= 0) {
      clearCanvas();
      return;
    }

    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (newIndex >= 0) {
      const image = new Image();
      image.onload = () => {
        context.drawImage(image, 0, 0);
      };
      image.src = whiteboardHistory[newIndex];
    }
  };

  const redo = () => {
    if (historyIndex >= whiteboardHistory.length - 1) return;

    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.onload = () => {
      context.drawImage(image, 0, 0);
    };
    image.src = whiteboardHistory[newIndex];
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'whiteboard-drawing.png';
    link.href = image;
    link.click();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup');
    canvasRef.current.dispatchEvent(mouseEvent);
  };

  const planLimit = isProUser() ? 10000 : 50

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
                    if (!isProUser()) {
                      if (getCredits() < 20) {
                        setShowUpgradePopup(true)
                        return
                      }
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
                    setParticipantCount(1)
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

  const myTileBgClasses =
    myTileBg === 'dark'
      ? 'bg-gray-900'
      : myTileBg === 'gradient-red'
        ? 'bg-gradient-to-br from-red-950 via-black to-red-900'
        : myTileBg === 'gradient-blue'
          ? 'bg-gradient-to-br from-sky-950 via-black to-indigo-900'
          : myTileBg === 'gradient-purple'
            ? 'bg-gradient-to-br from-fuchsia-900 via-black to-purple-900'
            : myTileBg === 'neon'
              ? 'bg-black ring-2 ring-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.4)]'
              : myTileBg === 'abstract'
                ? "bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,0.25),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.2),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(16,185,129,0.2),transparent_30%)] bg-black"
                : myTileBg === 'img1'
                  ? "bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvupsTo4bGBKN-S_aYfEnVJnRSzK-Qgnda0g&s')] bg-cover bg-center"
                  : myTileBg === 'img2'
                    ? "bg-[url('https://ik.imagekit.io/bi2uhcctu2/HCP_20240625/HCP_Website/CMS/page_ar_project/Projects/63/171_63_4_1.jpg')] bg-cover bg-center"
                    : myTileBg === 'img3'
                      ? "bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww')] bg-cover bg-center"
                      : myTileBg === 'img4'
                        ? "bg-[url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww')] bg-cover bg-center"
                        : myTileBg === 'img5'
                          ? "bg-[url('https://images.unsplash.com/photo-1470770903676-69b98201ea1c?q=80&w=400&auto=format&fit=crop')] bg-cover bg-center"
                          : 'bg-gray-900'

  return (
    <div className={`h-screen ${bgClasses} relative flex overflow-hidden`}>

      {/* Floating Reactions Container */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-50">
        {reactions.map(reaction => (
          <div
            key={reaction.id}
            className="absolute text-3xl animate-floatUp"
            style={{
              left: `${reaction.left}%`,
              bottom: '20%',
              animationDuration: '4s'
            }}
          >
            {reaction.emoji}
          </div>
        ))}
      </div>

      {/* Video Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 overflow-hidden">
        <Card className={`${myTileBgClasses} border border-red-600 flex items-center justify-center transition-all duration-300 min-h-[64px] sm:min-h-[72px]`}>
          <div className="text-center text-white">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-1 sm:mb-2">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
            </div>
            <p className="text-xs sm:text-sm font-medium">Your Video</p>
          </div>
        </Card>

        {participants.slice(0, Math.min(3, planLimit - 1)).map((participant) => (
          <Card key={participant.id} className="bg-gray-900 border border-red-600 flex items-center justify-center min-h-[64px] sm:min-h-[72px]">
            <div className="text-center text-white">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-1">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
              </div>
              <p className="font-medium text-xs sm:text-sm">{participant.name}</p>
              {participant.isMuted && (
                <MicOff className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400 mx-auto mt-1 sm:mt-1" />
              )}
            </div>
          </Card>
        ))}

        {/* Extra placeholder tiles */}
        <Card className="bg-gray-900 border border-red-600 flex items-center justify-center min-h-[64px] sm:min-h-[72px]">
          <div className="text-center text-white">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Guest</p>
          </div>
        </Card>
        <Card className="bg-gray-900 border border-red-600 flex items-center justify-center min-h-[64px] sm:min-h-[72px]">
          <div className="text-center text-white">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-1">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
            </div>
            <p className="font-medium text-xs sm:text-sm">Guest</p>
          </div>
        </Card>
      </div>

      {/* Chat Sidebar */}
      {!isMobile && (
        <div className="w-72 bg-gray-950 border-l border-red-600 flex flex-col z-40">
          <div className="p-3 border-b border-gray-800 flex items-center gap-2 text-red-500">
            <MessageSquare className="w-4 h-4" />
            <span className="font-medium">Chat</span>
          </div>
          <div ref={desktopChatRef} className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className="text-sm break-words">
                <span className="font-semibold text-red-400">{msg.sender}: </span>
                <span className="text-gray-300">{msg.text}</span>
              </div>
            ))}
          </div>
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
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Controls Bar */}
      <div className="fixed bottom-3 left-1/2 -translate-x-1/2 transform z-30">
        <div className="w-[min(80vw,690px)]">
          <Card className="w-full flex items-center justify-center gap-2 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-900/95 backdrop-blur border border-red-600 rounded-xl">
            {/* Tooltip wrapper */}
            {/* Mic */}
            <div className="relative group">
              <Button variant={isMuted ? 'danger' : 'secondary'} size="sm" onClick={() => setIsMuted(!isMuted)} className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white">
                {isMuted ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4 text-red-500" />}
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isMuted ? 'Unmute' : 'Mute'}
              </div>
            </div>

            {/* Video */}
            <div className="relative group">
              <Button variant={isVideoOff ? 'danger' : 'secondary'} size="sm" onClick={() => setIsVideoOff(!isVideoOff)} className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white">
                {isVideoOff ? <VideoOff className="w-4 h-4 text-red-500" /> : <Video className="w-4 h-4 text-red-500" />}
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
              </div>
            </div>

            {/* Raise Hand */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white">
                <Hand className="w-4 h-4" />
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Raise Hand
              </div>
            </div>

            {/* Present Screen */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className="flex-shrink-0 text-red-500 hover:text-white">
                <Monitor className="w-4 h-4" />
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Present Screen
              </div>
            </div>

            {/* Background */}
            <div className="relative group">
              <Button variant="ghost" size="sm" className={`flex-shrink-0 ${isProUser() ? 'text-red-500 hover:text-white' : 'text-red-500 hover:text-white'}`} onClick={() => { if (isProUser()) { setShowThemePicker(true) } else { setShowUpgradePopup(true) } }}>
                <Palette className="w-4 h-4" />
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Background
              </div>
            </div>

            {/* EMOJI BUTTON & PICKER */}
            <div className="relative">
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-shrink-0 text-red-500 hover:text-white"
                  ref={emojiBtnRef}
                  aria-expanded={showEmojiPicker}
                  aria-controls="emoji-picker-panel"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className="w-4 h-4" />
                </Button>
                <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Emojis
                </div>
              </div>
              {showEmojiPicker && (
                <div
                  id="emoji-picker-panel"
                  ref={emojiPickerRef}
                  className="absolute bottom-full mb-2 bg-gray-800 border border-gray-700 rounded-lg p-2 flex flex-wrap gap-2 -translate-x-1/2 left-1/2 w-48 z-50"
                >
                  {['👍', '❤️', '😂', '😮', '😢', '😡', '👎', '🎉', '👏', '🔥', '🤔', '🙏'].map(emoji => (
                    <button
                      key={emoji}
                      onClick={() => handleReaction(emoji)}
                      className="text-xl hover:scale-125 transition-transform p-1"
                    >
                      {emoji}
                    </button>
                  ))}
                  <button
                    className="absolute -top-2 -right-2 bg-gray-700 rounded-full p-1"
                    onClick={() => setShowEmojiPicker(false)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* WHITEBOARD BUTTON */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                className="flex-shrink-0 text-red-500 hover:text-white"
                onClick={() => setShowWhiteboard(true)}
              >
                <PenSquare className="w-4 h-4" />
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Whiteboard
              </div>
            </div>

            <div className="relative group">
              <Button variant="danger" onClick={() => { leaveMeeting(); setIsInMeeting(false) }} className="flex-shrink-0 bg-red-600 hover:bg-red-700 text-xs sm:text-sm text-white">
                <span className="hidden sm:inline">Leave Meeting</span>
                <span className="sm:hidden">Leave</span>
              </Button>
              <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/90 border border-red-600 text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                Leave Meeting
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Chat Modal */}
      <Modal isOpen={showMobileChat} onClose={() => { setShowMobileChat(false); setUnreadCount(0); }} title="Chat">
        <div className="flex flex-col h-96">
          <div ref={mobileChatRef} className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
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
      <Modal isOpen={showThemePicker} onClose={() => setShowThemePicker(false)} title="Choose Background Style">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button onClick={() => { if (isProUser()) { setMyTileBg('dark'); setShowThemePicker(false) } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-gray-900 border border-gray-700 text-white">Dark</button>
          <button onClick={() => { if (isProUser()) { setMyTileBg('gradient-red'); setShowThemePicker(false) } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-gradient-to-br from-red-950 via-black to-red-900 text-white">Red Gradient</button>
          <button onClick={() => { if (isProUser()) { setMyTileBg('gradient-blue'); setShowThemePicker(false) } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-gradient-to-br from-sky-950 via-black to-indigo-900 text-white">Blue Gradient</button>
          <button onClick={() => { if (isProUser()) { setMyTileBg('gradient-purple'); setShowThemePicker(false) } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-900 via-black to-purple-900 text-white">Purple Gradient</button>
          <button onClick={() => { if (isProUser()) { setMyTileBg('abstract'); setShowThemePicker(false) } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-black text-white">Abstract</button>
          <button onClick={() => { if (isProUser()) { setShowThemePicker(false); setShowImagePickerModal(true); } else { setShowThemePicker(false); setShowUpgradePopup(true) } }} className="p-3 rounded-xl bg-gray-700 border border-gray-500 text-white col-span-2 sm:col-span-3 hover:bg-gray-600">
            Choose from Images...
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-3">Only your video tile background changes.</p>
      </Modal>

      {/* Image Picker Modal */}
      <Modal isOpen={showImagePickerModal} onClose={() => setShowImagePickerModal(false)} title="Choose an Image">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <button onClick={() => { setMyTileBg('img1'); setShowImagePickerModal(false) }} className="rounded-xl overflow-hidden border border-gray-700">
            <div className="w-full h-20 sm:h-24 bg-cover bg-center" style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvupsTo4bGBKN-S_aYfEnVJnRSzK-Qgnda0g&s')" }} />
            <div className="text-xs text-gray-200 p-2 text-center">Corporate Office</div>
          </button>
          <button onClick={() => { setMyTileBg('img2'); setShowImagePickerModal(false) }} className="rounded-xl overflow-hidden border border-gray-700">
            <div className="w-full h-20 sm:h-24 bg-cover bg-center" style={{ backgroundImage: "url('https://ik.imagekit.io/bi2uhcctu2/HCP_20240625/HCP_Website/CMS/page_ar_project/Projects/63/171_63_4_1.jpg')" }} />
            <div className="text-xs text-gray-200 p-2 text-center">Auditorium</div>
          </button>
          <button onClick={() => { setMyTileBg('img3'); setShowImagePickerModal(false) }} className="rounded-xl overflow-hidden border border-gray-700">
            <div className="w-full h-20 sm:h-24 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580582932707-520aed937b7b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2Nob29sJTIwY2xhc3Nyb29tfGVufDB8fDB8fHww')" }} />
            <div className="text-xs text-gray-200 p-2 text-center">School Classroom</div>
          </button>
        </div>
      </Modal>

      {/* Whiteboard Modal */}
      <Modal isOpen={showWhiteboard} onClose={() => setShowWhiteboard(false)} title="Whiteboard" size="3xl">
        <div className="w-[90vw] h-[70vh] flex flex-col bg-gray-900 rounded-lg overflow-hidden">
          {/* Toolbar */}
          <div className="p-3 bg-gray-800 border-b border-gray-700 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm text-gray-300 font-medium">Tools:</span>
              
              <Button
                variant={whiteboardTool === 'pen' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWhiteboardTool('pen')}
                className="flex items-center gap-1"
              >
                <PenSquare className="w-4 h-4" />
                <span>Pen</span>
              </Button>
              
              <Button
                variant={whiteboardTool === 'eraser' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setWhiteboardTool('eraser')}
                className="flex items-center gap-1"
              >
                <Eraser className="w-4 h-4" />
                <span>Eraser</span>
              </Button>

              {whiteboardTool === 'pen' && (
                <>
                  <span className="text-sm text-gray-300 font-medium ml-2">Color:</span>
                  <input
                    type="color"
                    value={penColor}
                    onChange={(e) => setPenColor(e.target.value)}
                    title="Pick color"
                    className="w-8 h-8 rounded-full border-2 border-gray-600 p-0 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    style={{ backgroundColor: penColor }}
                  />

                  <span className="text-sm text-gray-300 font-medium">Size:</span>
                  <select
                    value={penSize}
                    onChange={(e) => setPenSize(parseInt(e.target.value))}
                    className="bg-gray-700 text-white text-sm p-1 rounded border border-gray-600"
                  >
                    <option value={2}>Thin</option>
                    <option value={5}>Medium</option>
                    <option value={10}>Thick</option>
                    <option value={15}>Extra Thick</option>
                    <option value={20}>X-Large</option>
                  </select>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="flex items-center gap-1"
              >
                <Undo2 className="w-4 h-4" />
                <span>Undo</span>
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                onClick={redo}
                disabled={historyIndex >= whiteboardHistory.length - 1}
                className="flex items-center gap-1"
              >
                <Redo2 className="w-4 h-4" />
                <span>Redo</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="secondary" 
                onClick={clearCanvas}
                className="flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </Button>
              
              <Button 
                size="sm" 
                variant="primary" 
                onClick={downloadCanvas}
                className="flex items-center gap-1"
              >
                <Download className="w-4 h-4" />
                <span>Save</span>
              </Button>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 w-full h-full bg-gray-700 overflow-hidden relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full cursor-crosshair absolute inset-0"
              onMouseDown={startDrawing}
              onMouseUp={stopDrawing}
              onMouseMove={draw}
              onMouseLeave={stopDrawing}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          </div>
        </div>
      </Modal>

      {/* Upgrade Popup */}
      <UpgradePopup
        isOpen={showUpgradePopup}
        onClose={() => setShowUpgradePopup(false)}
        feature="meeting"
        creditsNeeded={20}
        currentCredits={getCredits()}
      />

      {/* Add CSS for the floating animation and scrollbar hiding */}
      <style>
        {`
          @keyframes floatUp {
            0% {
              transform: translateY(0);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh);
              opacity: 0;
            }
          }
          .animate-floatUp {
            animation: floatUp 4s forwards;
          }
          
          /* Hide scrollbars */
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  )
}

export default MeetingPage