import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, Users, MessageCircle, Calendar, Settings, Sparkles, ArrowRight, Clock, Mic, MicOff, VideoOff, Phone, Star } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import { useAuth } from '../../store/useAuth'
import { useMeetingStore } from '../../store/useMeeting'
import { motion, useScroll, useSpring } from 'framer-motion'

// Animated Robot (SVG + Framer Motion)
const Robot = () => {
  return (
    <motion.div
      className="relative w-40 h-40"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: [10, -6, 10], opacity: 1 }}
      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Body */}
        <defs>
          <linearGradient id="rb" x1="0" x2="1">
            <stop offset="0%" stopColor="#7f1d1d" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect x="50" y="70" width="100" height="80" rx="16" fill="url(#rb)" stroke="#ef4444" strokeWidth="2" />
        {/* Head */}
        <rect x="60" y="30" width="80" height="45" rx="12" fill="#111" stroke="#ef4444" strokeWidth="2" />
        {/* Antenna */}
        <line x1="100" y1="20" x2="100" y2="30" stroke="#ef4444" strokeWidth="3" />
        <circle cx="100" cy="18" r="5" fill="#ef4444" />
        {/* Eyes */}
        <motion.circle cx="80" cy="52" r="6" fill="#ef4444" animate={{ scaleY: [1, 0.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="120" cy="52" r="6" fill="#ef4444" animate={{ scaleY: [1, 0.2, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />
        {/* Mouth */}
        <rect x="85" y="60" width="30" height="6" rx="3" fill="#ef4444" opacity="0.7" />
        {/* Arms */}
        <rect x="40" y="80" width="12" height="50" rx="6" fill="#1a1a1a" stroke="#ef4444" strokeWidth="2" />
        <rect x="148" y="80" width="12" height="50" rx="6" fill="#1a1a1a" stroke="#ef4444" strokeWidth="2" />
        {/* Legs */}
        <rect x="80" y="152" width="14" height="22" rx="6" fill="#1a1a1a" stroke="#ef4444" strokeWidth="2" />
        <rect x="106" y="152" width="14" height="22" rx="6" fill="#1a1a1a" stroke="#ef4444" strokeWidth="2" />
      </svg>
      {/* Glow */}
      <div className="absolute -inset-2 bg-red-600/10 blur-xl rounded-2xl" />
    </motion.div>
  )
}

// Small 3D Tilt wrapper for cards
const Tilt = ({ children }) => {
  const [style, setStyle] = useState({})
  const onMove = (e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rotateX = (0.5 - py) * 10
    const rotateY = (px - 0.5) * 10
    setStyle({ transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)` })
  }
  const onLeave = () => setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)' })
  return (
    <div onMouseMove={onMove} onMouseLeave={onLeave} style={style} className="transition-transform duration-200 will-change-transform">
      {children}
    </div>
  )
}

const DashboardPage = () => {
  const { user, isProUser, getCredits } = useAuth()
  const { scheduledMeetings } = useMeetingStore()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 })
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => { setHydrated(true) }, [])

  const quickActions = [
    {
      title: 'Start Instant Meeting',
      description: 'Jump into a meeting right now',
      icon: Video,
      color: 'bg-gradient-to-r from-red-600 to-red-700',
      hoverColor: 'hover:from-red-700 hover:to-red-800',
      href: '/dashboard/meeting',
      isPro: false
    },
    {
      title: 'Schedule Meeting',
      description: 'Plan your next meeting',
      icon: Calendar,
      color: 'bg-gradient-to-r from-red-700 to-red-800',
      hoverColor: 'hover:from-red-800 hover:to-red-900',
      href: '/dashboard/schedule',
      isPro: false
    },
    {
      title: 'Join Meeting',
      description: 'Enter meeting ID to join',
      icon: Phone,
      color: 'bg-gradient-to-r from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      href: '/dashboard/meeting',
      isPro: false
    }
  ]

  const features = [
    {
      title: 'AI Chatbot',
      description: 'Get instant help with Circle AI',
      icon: MessageCircle,
      href: '/dashboard/chatbot',
      color: 'text-red-500'
    },
    {
      title: 'Group Chats',
      description: 'Connect with your teams',
      icon: Users,
      href: '/dashboard/chats',
      color: 'text-red-400'
    },
    {
      title: 'Status Updates',
      description: 'Share what you\'re up to',
      icon: Star,
      href: '/dashboard/status',
      color: 'text-red-300'
    },
    {
      title: 'Community',
      description: 'Join discussions',
      icon: Users,
      href: '/dashboard/community',
      color: 'text-red-400'
    }
  ]

  const upcomingMeetings = scheduledMeetings.slice(0, 3)

  return (
    <div className="relative p-4 sm:p-6 bg-gradient-to-br from-[#0a0a0a] via-black to-[#140000] min-h-screen overflow-hidden">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-red-600/15">
          <motion.div style={{ scaleX: progressX }} className="origin-left h-full bg-gradient-to-r from-red-600 to-red-800" />
        </div>
      </div>
      {/* Background glows and particles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-[420px] h-[420px] bg-red-700/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-3xl" />
        {[...Array(18)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
            style={{ top: `${10 + (i * 5) % 80}%`, left: `${(i * 13) % 90}%` }}
            animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */
        }
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <motion.h1
                className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Welcome back, {user?.name || 'User'}! 👋
              </motion.h1>
              <motion.p
                className="text-gray-400 text-sm sm:text-base max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Ready to connect and collaborate? Let's make your meetings more productive.
              </motion.p>
            </div>
            <Robot />
          </div>
          {!isProUser() && (
            <div className="mt-4 p-3 bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-600/30 rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Upgrade to Pro</p>
                  <p className="text-gray-300 text-sm">Unlock unlimited meetings & premium features</p>
                </div>
                <Link to="/dashboard/upgrade">
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Upgrade
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Marquee strip */}
        <div className="mb-6">
          <div className="relative overflow-hidden rounded-xl border border-red-900/30 bg-black/30">
            <motion.div
              className="flex gap-8 py-3 whitespace-nowrap"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              {Array(2).fill(0).flatMap((_, d) => (
                ['AI Chatbot','Ultra-fast Messaging','Smart Scheduling','Communities','Secure','24/7 Support','Cross-Platform']
                  .map((t, i) => (
                    <span key={`${d}-${i}`} className="px-4 py-1 rounded-full border border-red-600/50 text-red-300/90 bg-red-900/10 text-xs">
                      {t}
                    </span>
                  ))
              ))}
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent mb-8" />

        {/* Quick Actions - Meeting Focused */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                  <Tilt>
                    <Card className="p-6 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(239,68,68,0.15)] transition-all duration-300 cursor-pointer group bg-white/5 border border-red-900/30">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-lg">{action.title}</h3>
                          <p className="text-gray-400 text-sm">{action.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </Tilt>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Meeting Status Card */}
        <div className="mb-8">
          <Card className="p-6 bg-gradient-to-r from-red-600/10 to-red-900/10 border border-red-600/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Meeting Controls</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">Live</span>
              </div>
            </div>
            {/* Live Visualizer */}
            <div className="absolute right-4 top-4 flex items-end gap-1 h-10 opacity-80">
              {[...Array(12)].map((_, i) => (
                <motion.span key={i} className="w-1 bg-red-600 rounded-sm"
                  animate={{ height: [6, 24, 10, 28, 8][i%5] }}
                  transition={{ duration: 0.8 + (i%3)*0.1, repeat: Infinity, repeatType: 'mirror' }}
                  style={{ height: 8 + (i%4)*4 }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={isMuted ? 'danger' : 'secondary'}
                onClick={() => setIsMuted(!isMuted)}
                className="flex items-center gap-2"
              >
                {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
              <Button
                variant={isVideoOff ? 'danger' : 'secondary'}
                onClick={() => setIsVideoOff(!isVideoOff)}
                className="flex items-center gap-2"
              >
                {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {isVideoOff ? 'Turn On Video' : 'Turn Off Video'}
              </Button>
              <Link to="/dashboard/meeting">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Join Meeting
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        {upcomingMeetings.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Upcoming Meetings</h2>
              <Link to="/dashboard/schedule" className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingMeetings.map((meeting) => (
                <motion.div key={meeting.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }}>
                  <Tilt>
                    <Card className="p-4 hover:bg-gray-900/50 transition-colors border border-red-900/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                          <Video className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{meeting.title}</h3>
                          <p className="text-gray-400 text-sm">ID: {meeting.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(meeting.scheduledAt).toLocaleString()}</span>
                      </div>
                    </Card>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Other Features */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Explore Features</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <Link key={index} to={feature.href}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Tilt>
                  <Card className="p-4 text-center hover:bg-gray-900/60 transition-colors group bg-white/5 border border-red-900/30">
                    <div className={`w-12 h-12 ${feature.color} bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-xs">{feature.description}</p>
                  </Card>
                </Tilt>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-4 text-center bg-white/5 border border-red-900/30">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {isProUser() ? '∞' : getCredits()}
            </div>
            <div className="text-gray-400 text-sm">
              {isProUser() ? 'Unlimited Credits' : 'Credits Remaining'}
            </div>
          </Card>
          <Card className="p-4 text-center bg-white/5 border border-red-900/30">
            <div className="text-2xl font-bold text-red-400 mb-1">
              {hydrated ? scheduledMeetings.length : '—'}
            </div>
            <div className="text-gray-400 text-sm">Scheduled Meetings</div>
          </Card>
          <Card className="p-4 text-center bg-white/5 border border-red-900/30">
            <div className="text-2xl font-bold text-red-300 mb-1">
              {isProUser() ? 'Pro' : 'Free'}
            </div>
            <div className="text-gray-400 text-sm">Current Plan</div>
          </Card>
        </div>

        {/* Bottom Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-transparent via-red-900/50 to-transparent" />
      </div>
    </div>
  )
}

export default DashboardPage
