import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Phone, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { motion } from 'framer-motion'

const Signup = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  // ✅ Validation Rules
  const validateForm = () => {
    const newErrors = {}

    // Name validation
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    else if (formData.name.trim().length < 3)
      newErrors.name = 'Name must be at least 3 characters'

    // Phone validation
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Enter a valid 10-digit phone number'

    // Email validation
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address'

    // Password validation
    if (!formData.password) newErrors.password = 'Password is required'
    else if (formData.password.length < 8)
      newErrors.password = 'Password must be at least 8 characters'
    else if (!/[A-Z]/.test(formData.password))
      newErrors.password = 'Must contain at least 1 uppercase letter'
    else if (!/[0-9]/.test(formData.password))
      newErrors.password = 'Must contain at least 1 number'
    else if (!/[!@#$%^&*]/.test(formData.password))
      newErrors.password = 'Must contain at least 1 special character (!@#$%^&*)'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error on typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      register(formData)
      navigate('/auth/login')
    }
  }

  return (
    <div className="h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center p-4">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-black/40 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-sm">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-red-500 mb-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Signup Card */}
        <motion.div
          className="rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold font-poppins text-white mb-1">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join the <span className="text-red-500 font-semibold">Circle</span> community today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-1">
                <User className="w-4 h-4 text-red-500" />
                Full Name
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-900/40 border-gray-700 text-white pl-10 h-10 text-sm"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-1">
                <Phone className="w-4 h-4 text-red-500" />
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                className="bg-gray-900/40 border-gray-700 text-white pl-10 h-10 text-sm"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-1">
                <Mail className="w-4 h-4 text-red-500" />
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-900/40 border-gray-700 text-white pl-10 h-10 text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-gray-300 mb-1">
                <Lock className="w-4 h-4 text-red-500" />
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-gray-900/40 border-gray-700 text-white pl-10 pr-10 h-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-black hover:text-red-500 text-white text-sm py-2 shadow-lg shadow-red-500/30"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-5 text-center">
            <p className="text-xs text-gray-400">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-red-500 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup