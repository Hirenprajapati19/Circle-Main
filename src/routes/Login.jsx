import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Lock } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import { motion } from 'framer-motion'

// ✅ Inline OTPInput component
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

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Step states
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')

  // Error states
  const [error, setError] = useState('')

  const validateStep = () => {
    if (step === 1) {
      if (!email) return 'Email is required'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        return 'Invalid email address'
      if (!password) return 'Password is required'
      if (password.length < 6) return 'Password must be at least 6 characters'
    }

    if (step === 2) {
      if (!phoneNumber) return 'Phone number is required'
      if (!/^\d{10}$/.test(phoneNumber))
        return 'Enter a valid 10-digit phone number'
    }

    if (step === 3) {
      if (!otp || otp.length !== 6) return 'Enter a valid 6-digit OTP'
    }

    return ''
  }

  const handleNextStep = () => {
    const validationError = validateStep()
    if (validationError) {
      setError(validationError)
      return
    }

    setError('')
    if (step === 1) setStep(2)
    else if (step === 2) setStep(3)
    else if (step === 3) {
      login({ email, phone: phoneNumber })
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center p-3">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-black/40 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-xs">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-red-500 mb-4 transition-colors text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>

        {/* Login Card */}
        <motion.div
          className="rounded-xl p-5 bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-5">
            <h1 className="text-xl font-bold font-poppins text-white mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-xs">
              Sign in to your Circle account
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="text-red-500 text-[11px] mb-2 text-center">
              {error}
            </div>
          )}

          {/* Step 1 - Email & Password */}
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs"
                />
              </div>
              <Button
                onClick={handleNextStep}
                className="w-full py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30"
              >
                Continue
              </Button>
            </div>
          )}

          {/* Step 2 - Phone Number */}
          {step === 2 && (
            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="bg-gray-900/40 border-gray-700 text-white text-xs"
                />
              </div>
              <Button
                onClick={handleNextStep}
                className="w-full py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30"
              >
                Send OTP
              </Button>
            </div>
          )}

          {/* Step 3 - OTP Verification */}
          {step === 3 && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <Lock className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <p className="text-gray-400 text-xs">
                  Code sent to <br />
                  <strong className="text-white">{phoneNumber}</strong>
                </p>
              </div>

              <OTPInput value={otp} onChange={setOtp} length={6} />

              <Button
                onClick={handleNextStep}
                className="w-full py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30"
              >
                Verify & Sign In
              </Button>

              <button
                onClick={() => {
                  setStep(2)
                  setOtp('')
                  setError('')
                }}
                className="w-full text-center text-[11px] text-gray-400 hover:text-red-500 transition-colors mt-1"
              >
                Change number
              </button>
            </div>
          )}

          <div className="mt-5 text-center">
            <p className="text-[11px] text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                to="/auth/signup"
                className="text-red-500 hover:underline font-medium"
              >
                Sign up
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

export default Login