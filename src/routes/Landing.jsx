import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, MessageCircle, Calendar, Bot, Star, Shield, Zap, Globe, Heart, TrendingUp, Award, CheckCircle } from 'lucide-react'
import Header from '../components/layout/Header'
import { motion, useScroll, useSpring } from 'framer-motion'

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, restDelta: 0.001 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const features = [
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Lightning Fast Messaging",
      description: "Experience ultra-fast real-time messaging with end-to-end encryption and multimedia support",
      color: "from-red-600 to-red-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Vibrant Communities",
      description: "Join thousands of active communities, create your own spaces, and connect with like-minded people",
      color: "from-red-700 to-red-600"
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "AI-powered calendar management with automatic meeting scheduling and time zone optimization",
      color: "from-red-800 to-red-600"
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Assistant",
      description: "Your personal AI companion that helps with tasks, answers questions, and boosts productivity",
      color: "from-red-700 to-red-500"
    }
  ]

  const stats = [
    { number: "1M+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "50M+", label: "Messages Sent", icon: <MessageCircle className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Shield className="w-6 h-6" /> },
    { number: "150+", label: "Countries", icon: <Globe className="w-6 h-6" /> }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Product Manager",
      content: "Circle has revolutionized how our team collaborates. The AI assistant is incredibly helpful!",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Alex Rodriguez",
      role: "Startup Founder",
      content: "The community features are amazing. I've built my entire network through Circle.",
      avatar: "AR",
      rating: 5
    },
    {
      name: "Maya Patel",
      role: "Designer",
      content: "Beautiful interface, smooth animations, and powerful features. Everything I need in one place.",
      avatar: "MP",
      rating: 5
    }
  ]

  const benefits = [
    "End-to-end encryption for all communications",
    "Cross-platform synchronization",
    "Advanced AI-powered search",
    "Custom themes and personalization",
    "Integration with popular productivity tools",
    "24/7 customer support"
  ]

  return (
    <motion.div
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-black to-[#140000] text-white"
    >
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1.5 bg-red-600/15">
          <motion.div style={{ scaleX }} className="origin-left h-full bg-gradient-to-r from-red-600 to-red-800" />
        </div>
      </div>
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-800/20 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-red-900/10 rounded-full blur-3xl animate-bounce"></div>
        {/* Thematic gradient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-red-950/30 via-transparent to-red-900/20" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(600px at 20% 15%, rgba(239,68,68,0.12), transparent 60%), radial-gradient(700px at 75% 80%, rgba(127,29,29,0.10), transparent 60%)',
            }}
          />
          <motion.div
            className="absolute -inset-x-1 top-1/4 h-64 bg-gradient-to-r from-transparent via-red-700/10 to-transparent blur-3xl"
            animate={{ x: ['-20%', '120%'] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" className="text-white" />
          </svg>
        </div>
        {/* Floating particles */}
        {[
          { top: '12%', left: '8%' }, { top: '22%', left: '30%' }, { top: '18%', left: '70%' },
          { top: '35%', left: '15%' }, { top: '42%', left: '55%' }, { top: '30%', left: '85%' },
          { top: '62%', left: '10%' }, { top: '58%', left: '38%' }, { top: '66%', left: '72%' },
          { top: '78%', left: '22%' }, { top: '80%', left: '48%' }, { top: '74%', left: '88%' },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute w-1.5 h-1.5 bg-red-500 rounded-full"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -10, 0], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3.5 + (i % 3), repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          />
        ))}
        
        {/* Mouse follower effect */}
        <motion.div
          className="absolute w-96 h-96 bg-red-500/5 rounded-full blur-3xl pointer-events-none"
          animate={{
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      <Header />
      
      {/* Hero Section */}
      <main className="relative">
        <section className="container mx-auto px-6 pt-32 pb-20">
          <motion.div 
            className="text-center max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-7xl md:text-8xl lg:text-9xl font-extrabold font-poppins bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent mb-6"
                whileHover={{ scale: 1.05 }}
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                CIRCLE
              </motion.h1>
            </motion.div>
            
            <motion.p 
              className="text-2xl md:text-3xl text-gray-300 mb-8 font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Where <span className="text-red-500 font-semibold">Connections</span> Come to Life
            </motion.p>
            
            <motion.p 
              className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Experience the future of social interaction with our revolutionary platform that combines 
              <span className="text-red-400"> instant messaging</span>, 
              <span className="text-red-400"> vibrant communities</span>, 
              <span className="text-red-400"> smart scheduling</span>, and 
              <span className="text-red-400"> AI assistance</span> in one beautiful, seamless experience.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth/signup"
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl font-semibold text-lg
                  inline-flex items-center gap-3 shadow-2xl shadow-red-600/50 hover:shadow-red-600/70 transition-all duration-300
                  border border-red-500/30"
                >
                  <Zap className="w-6 h-6" />
                  Start Your Journey
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/auth/login"
                  className="px-8 py-4 border-2 border-gray-600 rounded-2xl hover:border-red-500 hover:text-red-500 
                  transition-all duration-300 font-semibold text-lg inline-flex items-center gap-3
                  hover:shadow-lg hover:shadow-red-500/20 backdrop-blur-sm bg-white/5"
                >
                  <Heart className="w-6 h-6" />
                  Welcome Back
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Section */}
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.1 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 + index * 0.1 }}
                >
                  <div className="text-red-500 mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* Scrolling marquee */}
        <section className="pb-8">
          <div className="container mx-auto px-6">
            <div className="relative overflow-hidden rounded-2xl border border-red-900/30 bg-black/30">
              <motion.div
                className="flex gap-8 py-4 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                {Array(2).fill(0).flatMap((_, dup) => (
                  [
                    'Fast Messaging', 'Secure & Private', 'AI Assistance', 'Smart Scheduling', 'Communities', '24/7 Support', 'Cross-Platform'
                  ].map((label, idx) => (
                    <span
                      key={`${dup}-${idx}`}
                      className="px-4 py-1 rounded-full border border-red-600/50 text-red-300/90 bg-red-900/10 text-sm"
                    >
                      {label}
                    </span>
                  ))
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-black/20">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Discover the tools that make Circle the most advanced social platform
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
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
                  className="group relative rounded-3xl bg-white/5 backdrop-blur-xl p-8 text-center border border-gray-700/50
                  hover:border-red-500/50 transition-all duration-500 overflow-hidden"
                  variants={{
                    hidden: { opacity: 0, y: 50, scale: 0.9 },
                    show: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(239, 68, 68, 0.3)"
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  
                  <motion.div 
                    className="w-16 h-16 text-red-500 bg-gradient-to-br from-black to-gray-900 rounded-3xl 
                    flex items-center justify-center mx-auto mb-6 shadow-xl shadow-red-600/30
                    group-hover:shadow-red-600/50 transition-all duration-300"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
                  Why Choose Circle?
                </h2>
                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  Join millions of users who have already discovered the power of seamless communication and community building.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-gray-300">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-red-500 to-red-700 rounded-full blur-xl opacity-60" />
                  <div className="relative">
                    <Award className="w-16 h-16 text-red-500 mb-6" />
                    <h3 className="text-2xl font-bold mb-4 text-white">Industry Leading</h3>
                    <p className="text-gray-400 mb-6">
                      Trusted by top companies worldwide for secure, reliable communication solutions.
                    </p>
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-red-500 fill-current" />
                      ))}
                      <span className="text-gray-300 ml-2">4.9/5 rating</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-b from-black/20 to-transparent">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6 text-white">What Our Users Say</h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Don't just take our word for it - hear from our amazing community
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.2 }
                }
              }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50 hover:border-red-500/50 transition-all duration-300"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    show: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-red-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Ready to Join the Revolution?
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                Start your journey with Circle today and experience the future of social interaction. 
                Join millions of users who are already part of our amazing community.
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/auth/signup"
                    className="px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl font-bold text-xl
                    inline-flex items-center gap-4 shadow-2xl shadow-red-600/50 hover:shadow-red-600/70 transition-all duration-300
                    border border-red-500/30"
                  >
                    <TrendingUp className="w-6 h-6" />
                    Get Started Free
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-sm text-gray-500 mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
               • Join in 30 seconds
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
    </motion.div>
  )
}

export default Landing