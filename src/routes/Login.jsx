import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { QrCode, Phone, ArrowLeft, Shield, Lock } from 'lucide-react'
import { useAuth } from '../store/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Tabs from '../components/ui/Tabs'
import { motion } from 'framer-motion'

// ✅ Simple inline OTPInput component
const OTPInput = ({ value, onChange, length = 6 }) => {
  const handleChange = (e, i) => {
    const val = e.target.value.replace(/[^0-9]/g, '')
    if (!val) return
    let otpArray = value.split('')
    otpArray[i] = val[val.length - 1] // take last digit only
    const newOtp = otpArray.join('')
    onChange(newOtp)

    // move focus to next input
    if (i < length - 1) {
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
          className="w-9 h-10 text-center text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-el-blue-500"
        />
      ))}
    </div>
  )
}

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState('qr')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(true)

  const tabs = [
    { id: 'qr', label: 'QR Code', icon: <QrCode className="w-3 h-3" /> },
    { id: 'phone', label: 'Phone', icon: <Phone className="w-3 h-3" /> }
  ]

  const handleSendOTP = () => {
    if (phoneNumber.length >= 10) setOtpSent(true)
  }

  const handleVerifyOTP = () => {
    if (otp.length === 6) {
      login({ phone: phoneNumber })
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white flex items-center justify-center p-4 sm:p-6">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[280px] h-[280px] bg-el-blue-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[220px] h-[220px] bg-purple-600/20 rounded-full blur-3xl animate-ping"></div>
      </div>

      <div className="w-full max-w-xs sm:max-w-sm">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-gray-400 hover:text-el-blue-400 mb-4 transition-colors text-xs"
        >
          <ArrowLeft className="w-3 h-3" />
          Back
        </Link>

        {/* Login Card */}
        <motion.div
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-gray-700 shadow-lg"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-xl font-bold font-poppins text-white mb-1">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-xs sm:text-sm">
              Sign in to your Circle account
            </p>
          </div>

          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="mb-3"
          />

          {activeTab === 'qr' && (
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-5 border-2 border-dashed border-gray-600 text-center">
                <QrCode className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-400 text-xs mb-2">
                  Scan QR code with your mobile
                </p>
                <div className="w-20 h-20 bg-gray-800 rounded-md mx-auto"></div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    checked={keepSignedIn}
                    onChange={(e) => setKeepSignedIn(e.target.checked)}
                    className="w-3 h-3 text-el-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-el-blue-500"
                  />
                  <span className="text-[11px] text-gray-400">
                    Keep me signed in
                  </span>
                </label>

                <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                  <Shield className="w-3 h-3" />
                  <span>End-to-end encrypted</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'phone' && (
            <div className="space-y-3">
              {!otpSent ? (
                <>
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
                    onClick={handleSendOTP}
                    className="w-full py-1.5 text-xs bg-el-blue-600 hover:bg-el-blue-700 text-white shadow-md shadow-el-blue-500/30"
                    disabled={phoneNumber.length < 10}
                  >
                    Send OTP
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-center mb-3">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-el-blue-500" />
                    <p className="text-gray-400 text-xs">
                      Code sent to <br />
                      <strong className="text-white">{phoneNumber}</strong>
                    </p>
                  </div>

                  {/* ✅ Working OTP Input */}
                  <OTPInput value={otp} onChange={setOtp} length={6} />

                  <Button
                    onClick={handleVerifyOTP}
                    className="w-full py-1.5 text-xs bg-el-blue-600 hover:bg-el-blue-700 text-white shadow-md shadow-el-blue-500/30"
                    disabled={otp.length !== 6}
                  >
                    Verify & Sign In
                  </Button>

                  <button
                    onClick={() => {
                      setOtpSent(false)
                      setOtp('')
                    }}
                    className="w-full text-center text-[11px] text-gray-400 hover:text-el-blue-400 transition-colors mt-1"
                  >
                    Change number
                  </button>
                </>
              )}
            </div>
          )}

          <div className="mt-5 text-center">
            <p className="text-[11px] text-gray-400">
              Don&apos;t have an account?{' '}
              <Link
                to="/auth/signup"
                className="text-el-blue-400 hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Login
