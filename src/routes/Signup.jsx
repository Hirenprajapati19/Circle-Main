import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, User, Phone, Mail, Shield, Lock } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { motion } from 'framer-motion'

// ✅ Inline OTPInput component (same as login)
const OTPInput = ({ value, onChange, length = 6 }) => {
  const handleChange = (e, i) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    let otpArray = value.split('')
    otpArray[i] = val[val.length - 1] || ''
    const newOtp = otpArray.join('')
    onChange(newOtp)

    if (val && i < length - 1) {
      const nextInput = document.getElementById(`otp-${i + 1}`)
      if (nextInput) nextInput.focus()
    }
  }

  const handleKeyDown = (e, i) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) {
      const prevInput = document.getElementById(`otp-${i - 1}`)
      if (prevInput) prevInput.focus()
    }
  }

  return (
    <div className="flex justify-center gap-2 mb-3">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-9 h-10 text-center text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      ))}
    </div>
  )
}

const Signup = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [step, setStep] = useState(() => {
    // Check localStorage for saved step
    const savedStep = localStorage.getItem('signupStep')
    return savedStep || 'email'
  })
  const [otp, setOtp] = useState('')
  const [formData, setFormData] = useState(() => {
    // Load saved form data from localStorage
    const savedData = localStorage.getItem('signupFormData')
    return savedData ? JSON.parse(savedData) : {
      name: '',
      phone: '',
      email: ''
    }
  })
  const [errors, setErrors] = useState({})
  const [isOtpSent, setIsOtpSent] = useState(false)

  // Update localStorage when step changes
  React.useEffect(() => {
    if (step === 'otp') {
      localStorage.setItem('signupStep', 'otp')
    } else if (step === 'email') {
      // Only clear if we're going back to email from OTP
      const currentStep = localStorage.getItem('signupStep')
      if (currentStep === 'otp') {
        // Don't clear, just update step
        localStorage.setItem('signupStep', 'email')
      }
    }
  }, [step])

  // ✅ Validation Rules
  const validateEmailForm = () => {
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateOTP = () => {
    if (!otp || otp.length !== 6) {
      setErrors({ otp: 'Please enter a valid 6-digit OTP' })
      return false
    }
    setErrors({})
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Clear error on typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const sendOTP = async () => {
    if (validateEmailForm()) {
      // Save form data and step to localStorage
      localStorage.setItem('signupFormData', JSON.stringify(formData))
      localStorage.setItem('signupStep', 'otp')
      
      // Simulate OTP sending
      console.log(`Sending OTP to ${formData.email}`)
      setIsOtpSent(true)
      setStep('otp')
      // In real app, call API to send OTP
    }
  }

  const verifyOTP = (e) => {
    e.preventDefault()
    if (validateOTP()) {
      // Clear localStorage after successful verification
      localStorage.removeItem('signupStep')
      localStorage.removeItem('signupFormData')
      
      // Simulate OTP verification
      console.log(`Verifying OTP: ${otp}`)
      register(formData)
      navigate('/dashboard')
    }
  }

  const resendOTP = () => {
    console.log(`Resending OTP to ${formData.email}`)
    // In real app, call API to resend OTP
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center p-2 sm:p-3">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] bg-black/40 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm">
        {/* Back Button */}
        <button
          onClick={() => {
            if (step === 'otp') {
              setStep('email')
              setOtp('')
              setErrors({})
              // Clear localStorage when going back to email form
              localStorage.removeItem('signupStep')
              localStorage.removeItem('signupFormData')
            } else {
              navigate('/')
            }
          }}
          className="inline-flex items-center gap-1 text-gray-400 hover:text-red-500 mb-4 transition-colors text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </button>

        {/* Signup Card */}
        <motion.div
          className="rounded-xl p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-white mb-1">
              Create Account
            </h1>
            <p className="text-gray-400 text-xs">
              Join the <span className="text-red-500 font-semibold">Circle</span> community
            </p>
          </div>

          {/* Error message */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 text-[11px] mb-2 text-center">
              {Object.values(errors)[0]}
            </div>
          )}

          {/* Step 1 - Email Form */}
          {step === 'email' && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs h-10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs h-10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs h-10"
                />
              </div>

              <Button
                onClick={sendOTP}
                className="w-full py-2 sm:py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30 h-10"
              >
                Send OTP
              </Button>
            </div>
          )}

          {/* Step 2 - OTP Verification */}
          {step === 'otp' && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-500" />
                <p className="text-gray-400 text-xs">
                  Code sent to <br />
                  <strong className="text-white break-all">{formData.email}</strong>
                </p>
              </div>

              <OTPInput value={otp} onChange={setOtp} length={6} />

              <Button
                onClick={verifyOTP}
                className="w-full py-2 sm:py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30 h-10"
              >
                Verify & Create Account
              </Button>

              <button
                onClick={() => {
                  setStep('email')
                  setOtp('')
                  setErrors({})
                  // Clear localStorage when going back to email form
                  localStorage.removeItem('signupStep')
                  localStorage.removeItem('signupFormData')
                }}
                className="w-full text-center text-[11px] text-gray-400 hover:text-red-500 transition-colors mt-1 py-2"
              >
                Change email
              </button>
            </div>
          )}

          <div className="mt-5 text-center">
            <p className="text-[11px] text-gray-400">
              Already have an account?{' '}
              <Link to="/auth/login" className="text-red-500 hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>

          {/* Security note */}
          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
            <Shield className="w-3 h-3" />
            <span>End-to-end encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Signup