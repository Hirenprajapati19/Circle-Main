import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MessageCircle, Calendar, Bot } from 'lucide-react'
import Header from '../components/layout/Header'
import { motion } from 'framer-motion'

const Landing = () => {
  const features = [
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: "Instant Messaging",
      description: "Connect with friends and colleagues through real-time messaging"
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: "Community Forums",
      description: "Join discussions in specialized channels and communities"
    },
    {
      icon: <Calendar className="w-7 h-7" />,
      title: "Smart Scheduling",
      description: "Book meetings and manage your calendar effortlessly"
    },
    {
      icon: <Bot className="w-7 h-7" />,
      title: "AI Assistant",
      description: "Get help from our intelligent chatbot whenever you need it"
    }
  ]

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white">
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-black/30 rounded-full blur-3xl animate-ping"></div>
      </div>

      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-28 pb-16 relative">
        <motion.div 
          className="text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-extrabold font-poppins text-red-500 "
            whileHover={{ scale: 1.05 }}
          >
            CIRCLE nskehfh
          </motion.h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-6">
            Welcome to <span className="text-red-500 font-semibold">Circle One</span>
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            The next generation social platform that blends messaging, communities, 
            scheduling, and AI assistance into one seamless futuristic experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="px-6 py-3 bg-red-600 rounded-xl font-medium 
              inline-flex items-center gap-2 shadow-lg shadow-red-600/40 hover:scale-105 transition-transform"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/auth/login"
              className="px-6 py-3 border border-gray-600 rounded-xl hover:border-red-500 hover:text-red-500 
              transition-all"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-24"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.2 }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="rounded-2xl bg-white/5 backdrop-blur-xl p-6 text-center border border-gray-700 
              hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-500"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
              }}
            >
              <div className="w-14 h-14 text-red-500 bg-black rounded-2xl 
                flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-600/40">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  )
}

export default Landing