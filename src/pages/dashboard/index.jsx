import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Video, Users, MessageCircle, Calendar, Settings, Sparkles, ArrowRight, Clock, Mic, MicOff, VideoOff, Phone, Star } from 'lucide-react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import { useAuth } from '../../store/useAuth'
import { useMeetingStore } from '../../store/useMeeting'

const DashboardPage = () => {
  const { user, isProUser, getCredits } = useAuth()
  const { scheduledMeetings } = useMeetingStore()
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)

  const quickActions = [
    {
      title: 'Start Instant Meeting',
      description: 'Jump into a meeting right now',
      icon: Video,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
      href: '/dashboard/meeting',
      isPro: false
    },
    {
      title: 'Schedule Meeting',
      description: 'Plan your next meeting',
      icon: Calendar,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
      href: '/dashboard/schedule',
      isPro: false
    },
    {
      title: 'Join Meeting',
      description: 'Enter meeting ID to join',
      icon: Phone,
      color: 'bg-green-600',
      hoverColor: 'hover:bg-green-700',
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
      color: 'text-purple-500'
    },
    {
      title: 'Group Chats',
      description: 'Connect with your teams',
      icon: Users,
      href: '/dashboard/chats',
      color: 'text-blue-500'
    },
    {
      title: 'Status Updates',
      description: 'Share what you\'re up to',
      icon: Star,
      href: '/dashboard/status',
      color: 'text-yellow-500'
    },
    {
      title: 'Community',
      description: 'Join discussions',
      icon: Users,
      href: '/dashboard/community',
      color: 'text-green-500'
    }
  ]

  const upcomingMeetings = scheduledMeetings.slice(0, 3)

  return (
    <div className="p-4 sm:p-6 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Ready to connect and collaborate? Let's make your meetings more productive.
          </p>
          {!isProUser() && (
            <div className="mt-4 p-3 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-600/30 rounded-xl">
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

        {/* Quick Actions - Meeting Focused */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.href}>
                <Card className="p-6 hover:scale-105 transition-all duration-200 cursor-pointer group">
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
              </Link>
            ))}
          </div>
        </div>

        {/* Meeting Status Card */}
        <div className="mb-8">
          <Card className="p-6 bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/30">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Meeting Controls</h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-sm">Live</span>
              </div>
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
                <Card key={meeting.id} className="p-4 hover:bg-gray-900/50 transition-colors">
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
                <Card className="p-4 text-center hover:bg-gray-900/50 transition-colors group">
                  <div className={`w-12 h-12 ${feature.color} bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-xs">{feature.description}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-red-500 mb-1">
              {isProUser() ? '∞' : getCredits()}
            </div>
            <div className="text-gray-400 text-sm">
              {isProUser() ? 'Unlimited Credits' : 'Credits Remaining'}
            </div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-1">
              {scheduledMeetings.length}
            </div>
            <div className="text-gray-400 text-sm">Scheduled Meetings</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-green-500 mb-1">
              {isProUser() ? 'Pro' : 'Free'}
            </div>
            <div className="text-gray-400 text-sm">Current Plan</div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
