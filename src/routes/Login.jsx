import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Lock, Phone } from 'lucide-react'
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
    <div className="flex justify-center gap-1 sm:gap-2 mb-3">
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
          className="w-8 h-8 sm:w-9 sm:h-10 text-center text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm sm:text-base"
        />
      ))}
    </div>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()

  // Step states - always start with phone page
  const [step, setStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')

  // Error states
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Update localStorage when step or phone changes
  React.useEffect(() => {
    localStorage.setItem('loginStep', step.toString())
    if (phoneNumber) {
      localStorage.setItem('loginPhone', phoneNumber)
    }
  }, [step, phoneNumber])

  const validateStep = () => {
    if (step === 1) {
      if (!phoneNumber) return 'Phone number is required'
      if (!/^\d{10}$/.test(phoneNumber))
        return 'Enter a valid 10-digit phone number'
    }

    if (step === 2) {
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
    else if (step === 2) {
      // Clear localStorage after successful login
      localStorage.removeItem('loginStep')
      localStorage.removeItem('loginPhone')
      login({ phone: phoneNumber })
      navigate('/dashboard')
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    
    try {
      // Simulate Google authentication
      console.log('Signing in with Google...')
      
      // In real app, implement Firebase Google Auth
      // const provider = new GoogleAuthProvider()
      // const result = await signInWithPopup(auth, provider)
      
      // For now, simulate successful login
      setTimeout(() => {
        // Clear localStorage after successful Google login
        localStorage.removeItem('loginStep')
        localStorage.removeItem('loginPhone')
        
        login({ 
          name: 'Google User', 
          email: 'user@gmail.com', 
          phone: '+91 98765 43210' 
        })
        navigate('/dashboard')
        setIsLoading(false)
      }, 1000)
      
    } catch (error) {
      setError('Google sign-in failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center p-2 sm:p-3">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[280px] sm:h-[280px] bg-red-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[150px] h-[150px] sm:w-[220px] sm:h-[220px] bg-black/40 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm">
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
          className="rounded-xl p-4 sm:p-5 bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4 sm:mb-5">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-white mb-1">
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

          {/* Step 1 - Phone Number */}
          {step === 1 && (
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
                  className="bg-gray-900/40 border-gray-700 text-white text-xs h-10"
                />
              </div>
              <Button
                onClick={handleNextStep}
                className="w-full py-2 sm:py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30 h-10"
              >
                Send OTP
              </Button>

              {/* Divider */}
              <div className="relative my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In */}
              <Button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full py-2 sm:py-1.5 text-xs bg-white hover:bg-gray-100 text-gray-900 shadow-md flex items-center justify-center gap-2 h-10"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="hidden sm:inline">Continue with Google</span>
                    <span className="sm:hidden">Google</span>
                  </>
                )}
              </Button>
            </div>
          )}

          {/* Step 2 - OTP Verification */}
          {step === 2 && (
            <div className="space-y-3">
              <div className="text-center mb-3">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-red-500" />
                <p className="text-gray-400 text-xs">
                  Code sent to <br />
                  <strong className="text-white break-all">{phoneNumber}</strong>
                </p>
              </div>

              <OTPInput value={otp} onChange={setOtp} length={6} />

              <Button
                onClick={handleNextStep}
                className="w-full py-2 sm:py-1.5 text-xs bg-red-600 hover:bg-black hover:text-red-500 text-white shadow-md shadow-red-600/30 h-10"
              >
                Verify & Sign In
              </Button>

              <button
                onClick={() => {
                  setStep(1)
                  setOtp('')
                  setError('')
                  // Clear localStorage when going back to phone step
                  localStorage.removeItem('loginStep')
                  localStorage.removeItem('loginPhone')
                }}
                className="w-full text-center text-[11px] text-gray-400 hover:text-red-500 transition-colors mt-1 py-2"
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