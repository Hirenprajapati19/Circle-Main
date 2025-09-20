import React, { useEffect, useMemo, useRef, useState } from 'react'
import Card from '../../components/layout/Card'
import Button from '../../components/ui/Button'
import { Check, Crown, Shield, Sparkles, Zap, Rocket, Star } from 'lucide-react'
import Modal from '../../components/ui/Modal'
import { useAuth } from '../../store/useAuth'

const features = [
  { icon: Crown, title: 'Priority Access', desc: 'Faster servers, zero waiting and premium support.' },
  { icon: Zap, title: 'Unlimited Meetings', desc: 'Host longer, larger, and higher-quality meetings.' },
  { icon: Shield, title: 'Advanced Security', desc: 'Extra encryption and admin controls for peace of mind.' },
  { icon: Rocket, title: 'AI Superpowers', desc: 'Smart summaries, action items, and chatbot boosts.' },
]

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    cta: 'Current Plan',
    highlight: false,
    perks: ['Basic chat and status', 'Community access', 'Standard quality'],
  },
  {
    name: 'Pro',
    price: '$9/mo',
    cta: 'Upgrade to Pro',
    highlight: true,
    perks: ['All Starter features', 'Unlimited meetings', 'AI features', 'Priority support'],
  },
  {
    name: 'Team',
    price: '$29/mo',
    cta: 'Contact Sales',
    highlight: false,
    perks: ['Everything in Pro', 'Admin controls', 'SSO & roles', 'Premium onboarding'],
  },
]

const currencyRates = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  JPY: { symbol: '¥', rate: 156 },
}

const basePrices = {
  Pro: { monthly: 9, yearly: 90 },
  Team: { monthly: 29, yearly: 290 },
}

const UpgradePage = () => {
  const { upgradeToPro, isProUser } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Pro')
  const [billing, setBilling] = useState('monthly') // 'monthly' | 'yearly'
  const [currency, setCurrency] = useState('USD')

  const [buyerName, setBuyerName] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvv, setCardCvv] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card') // 'card' | 'upi' | 'paypal'
  const [upiId, setUpiId] = useState('')
  const [paypalEmail, setPaypalEmail] = useState('')
  const [errors, setErrors] = useState({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Trigger entrance animations on mount
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const priceDisplay = useMemo(() => {
    const planKey = basePrices[selectedPlan] ? selectedPlan : 'Pro'
    const base = basePrices[planKey][billing]
    const { symbol, rate } = currencyRates[currency]
    const converted = Math.round(base * rate)
    const suffix = billing === 'monthly' ? '/mo' : '/yr'
    return `${symbol}${converted}${suffix}`
  }, [selectedPlan, billing, currency])

  const validate = () => {
    const next = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!buyerName.trim()) next.buyerName = 'Name is required'
    if (!buyerEmail.trim() || !emailRegex.test(buyerEmail)) next.buyerEmail = 'Valid email required'
    if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\s+/g, '')
      if (!/^\d{16}$/.test(digits)) next.cardNumber = 'Card number must be 16 digits'
      if (!/^\d{2}\/\d{2}$/.test(cardExp)) next.cardExp = 'Use MM/YY format'
      if (!/^\d{3,4}$/.test(cardCvv)) next.cardCvv = 'CVV must be 3-4 digits'
    } else if (paymentMethod === 'upi') {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) next.upiId = 'Enter valid UPI ID (e.g., user@icici)'
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail.trim() || !emailRegex.test(paypalEmail)) next.paypalEmail = 'Valid PayPal email required'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!buyerName.trim()) return false
    if (!buyerEmail.trim() || !emailRegex.test(buyerEmail)) return false
    if (paymentMethod === 'card') {
      const digits = cardNumber.replace(/\s+/g, '')
      if (!/^\d{16}$/.test(digits)) return false
      if (!/^\d{2}\/\d{2}$/.test(cardExp)) return false
      if (!/^\d{3,4}$/.test(cardCvv)) return false
    } else if (paymentMethod === 'upi') {
      if (!/^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upiId)) return false
    } else if (paymentMethod === 'paypal') {
      if (!paypalEmail.trim() || !emailRegex.test(paypalEmail)) return false
    }
    return true
  }

  // Confetti component for success popup
  const ConfettiBurst = ({ active = false, durationMs = 1500 }) => {
    const canvasRef = useRef(null)
    const frameRef = useRef(0)
    const startRef = useRef(0)
    const particlesRef = useRef([])

    useEffect(() => {
      if (!active) return
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      let width = canvas.clientWidth
      let height = canvas.clientHeight
      canvas.width = width
      canvas.height = height

      const resize = () => {
        width = canvas.clientWidth
        height = canvas.clientHeight
        canvas.width = width
        canvas.height = height
      }
      window.addEventListener('resize', resize)

      // initialize particles
      const colors = ['#ef4444', '#22c55e', '#3b82f6', '#eab308', '#a855f7']
      const particles = Array.from({ length: 80 }).map(() => ({
        x: width / 2 + (Math.random() - 0.5) * 60,
        y: height / 2,
        vx: (Math.random() - 0.5) * 6,
        vy: Math.random() * -6 - 2,
        g: 0.15 + Math.random() * 0.1,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2
      }))
      particlesRef.current = particles

      const draw = (ts) => {
        if (!startRef.current) startRef.current = ts
        const elapsed = ts - startRef.current
        ctx.clearRect(0, 0, width, height)
        particlesRef.current.forEach(p => {
          p.vy += p.g
          p.x += p.vx
          p.y += p.vy
          p.rot += p.vr
          ctx.save()
          ctx.translate(p.x, p.y)
          ctx.rotate(p.rot)
          ctx.fillStyle = p.color
          ctx.fillRect(-p.size, -p.size, p.size * 2, p.size * 2)
          ctx.restore()
        })
        if (elapsed < durationMs) {
          frameRef.current = requestAnimationFrame(draw)
        }
      }
      frameRef.current = requestAnimationFrame(draw)

      return () => {
        cancelAnimationFrame(frameRef.current)
        window.removeEventListener('resize', resize)
        startRef.current = 0
      }
    }, [active, durationMs])

    return (
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    )
  }

  // UI helpers: input formatters
  const handleCardNumberInput = (value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 16)
    const groups = digitsOnly.match(/.{1,4}/g) || []
    setCardNumber(groups.join(' '))
  }

  const handleExpiryInput = (value) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 4)
    let formatted = digitsOnly
    if (digitsOnly.length >= 3) {
      formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`
    }
    setCardExp(formatted)
  }

  const handleCheckout = (e) => {
    e.preventDefault()
    if (!validate()) return
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      // Upgrade user to pro plan
      upgradeToPro()
      setShowSuccess(true)
    }, 1000)
  }

  // If user is already pro, show success message
  if (isProUser()) {
    return (
      <div className="min-h-screen bg-black text-white p-4 sm:p-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_0_40px_rgba(234,179,8,0.35)]">
            <Crown className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold font-poppins text-yellow-500 mb-4">You're Already Pro!</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-8">You have access to all premium features. Enjoy your Circle Pro experience!</p>
          <div className="bg-gray-950 border border-yellow-600/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-yellow-500 mb-3">Your Pro Benefits</h3>
            <ul className="space-y-2 text-left">
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Check className="w-4 h-4 text-yellow-500" />
                <span>Unlimited meetings and calls</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Check className="w-4 h-4 text-yellow-500" />
                <span>AI-powered features and smart summaries</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Check className="w-4 h-4 text-yellow-500" />
                <span>Priority support and faster servers</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300 text-sm">
                <Check className="w-4 h-4 text-yellow-500" />
                <span>Advanced security and admin controls</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden min-h-screen bg-black text-white p-4 sm:p-8">
      {/* Animated background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25% 10%, rgba(239,68,68,0.08), transparent 40%), radial-gradient(circle at 80% 30%, rgba(168,85,247,0.06), transparent 40%)'
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px)'
        }}
      />
      {/* Floating blurred blobs */}
      <div className="pointer-events-none absolute -top-16 -left-24 w-80 h-80 bg-red-600/25 blur-3xl rounded-full animate-blob" />
      <div className="pointer-events-none absolute bottom-[-60px] right-[-60px] w-96 h-96 bg-purple-600/20 blur-3xl rounded-full animate-blob2" />

      <div className="relative max-w-6xl mx-auto space-y-8">
        <header className="text-center">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-red-600 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.35)] transform transition-all duration-700 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-75'} float-gentle`}
          >
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1
            className={`text-2xl sm:text-4xl font-bold font-poppins text-red-500 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
          >
            Upgrade to Pro
          </h1>
          <p
            className={`mt-2 text-gray-400 max-w-2xl mx-auto text-sm sm:text-base transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}
            style={{ transitionDelay: mounted ? '180ms' : '0ms' }}
          >
            Unlock powerful features crafted for speed, security, and productivity—beautifully integrated with your current Circle workspace.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {features.map(({ icon: Icon, title, desc }, idx) => (
            <Card
              key={title}
              className={`group bg-gray-950/90 backdrop-blur-sm border border-red-600/60 p-5 sm:p-6 transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} hover:translate-y-[-2px] hover:shadow-[0_0_30px_rgba(239,68,68,0.25)]`}
              style={{ transitionDelay: mounted ? `${220 + idx * 100}ms` : '0ms' }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                  <Icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-white">{title}</h3>
                  <p className="text-gray-400 text-sm mt-1">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {plans.map((plan, idx) => (
              <Card
                key={plan.name}
                className={`group p-5 sm:p-6 border transform transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'} hover:translate-y-[-3px] hover:shadow-[0_0_40px_rgba(239,68,68,0.25)] ${
                  plan.highlight
                    ? 'relative overflow-hidden bg-gradient-to-b from-red-950 via-black to-black border-red-600 shadow-[0_0_50px_rgba(239,68,68,0.25)]'
                    : 'bg-gray-950 border-red-600/50'
                }`}
                style={{ transitionDelay: mounted ? `${200 + idx * 120}ms` : '0ms' }}
              >
                {plan.highlight && (
                  <div className="pointer-events-none absolute -inset-0.5 rounded-xl opacity-20 bg-[radial-gradient(120px_60px_at_10%_-20%,rgba(255,255,255,0.6),transparent),radial-gradient(120px_60px_at_90%_120%,rgba(255,255,255,0.5),transparent)] animate-glow" />
                )}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white flex items-center gap-2">
                      {plan.name}
                      {plan.highlight && <Star className="w-4 h-4 text-red-400" />}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">{plan.highlight ? 'Best for power users' : 'Good for getting started'}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-bold text-red-500">{plan.price}</div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-gray-300 text-sm">
                      <Check className="w-4 h-4 text-red-500" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`relative overflow-hidden w-full mt-5 text-sm ${plan.highlight ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                  disabled={plan.name === 'Starter'}
                  onClick={() => { if (plan.name !== 'Starter') { setSelectedPlan(plan.name); setIsOpen(true) } }}
                >
                  <span className="relative z-10">{plan.cta}</span>
                  {plan.highlight && (
                    <span className="pointer-events-none absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 animate-shine" />
                  )}
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-gray-500">
          Secured by enterprise‑grade encryption. Upgrade anytime, cancel anytime.
        </footer>
      </div>

      {/* Upgrade Modal */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title={`Upgrade to ${selectedPlan}`} size="xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-gray-400 text-sm">Billing:</span>
              <div className="inline-flex rounded-xl overflow-hidden border border-gray-800">
                <button
                  className={`px-3 py-1.5 text-sm ${billing === 'monthly' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}
                  onClick={() => setBilling('monthly')}
                >Monthly</button>
                <button
                  className={`px-3 py-1.5 text-sm ${billing === 'yearly' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}
                  onClick={() => setBilling('yearly')}
                >Yearly</button>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-gray-400 text-sm">Currency:</span>
              <div className="flex flex-wrap gap-2">
                {Object.keys(currencyRates).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 py-1.5 rounded-xl text-sm border ${currency === c ? 'border-el-blue-500 text-el-blue-500 bg-black' : 'border-gray-800 text-gray-300 bg-gray-900'}`}
                  >{c}</button>
                ))}
              </div>
            </div>

            <Card className="bg-gray-950 border border-red-600/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Plan</p>
                  <p className="text-white font-semibold">{selectedPlan} ({billing})</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold text-red-500">{priceDisplay}</p>
                </div>
              </div>
            </Card>
          </div>

          <form onSubmit={handleCheckout} className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Pay with:</span>
              <div className="inline-flex rounded-xl overflow-hidden border border-gray-800">
                <button type="button" onClick={() => setPaymentMethod('card')} className={`px-3 py-1.5 text-sm ${paymentMethod === 'card' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}>Card</button>
                <button type="button" onClick={() => setPaymentMethod('upi')} className={`px-3 py-1.5 text-sm ${paymentMethod === 'upi' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}>UPI</button>
                <button type="button" onClick={() => setPaymentMethod('paypal')} className={`px-3 py-1.5 text-sm ${paymentMethod === 'paypal' ? 'bg-red-600 text-white' : 'bg-gray-900 text-gray-300'}`}>PayPal</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400">Full Name</label>
                <input value={buyerName} onChange={(e) => setBuyerName(e.target.value)} className={`w-full bg-gray-900 border ${errors.buyerName ? 'border-red-600' : 'border-gray-700'} rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600`} placeholder="John Doe" />
                {errors.buyerName && <p className="text-red-500 text-xs mt-1">{errors.buyerName}</p>}
              </div>
              <div>
                <label className="text-xs text-gray-400">Email</label>
                <input type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} className={`w-full bg-gray-900 border ${errors.buyerEmail ? 'border-red-600' : 'border-gray-700'} rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600`} placeholder="you@example.com" />
                {errors.buyerEmail && <p className="text-red-500 text-xs mt-1">{errors.buyerEmail}</p>}
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="text-xs text-gray-400">Card Number</label>
                  <div className={`flex items-center gap-2 w-full bg-gray-900 border ${errors.cardNumber ? 'border-red-600' : 'border-gray-700'} rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-red-600`}>
                    <span className="text-gray-500 text-xs">💳</span>
                    <input
                      value={cardNumber}
                      onChange={(e) => handleCardNumberInput(e.target.value)}
                      inputMode="numeric"
                      className="flex-1 bg-transparent outline-none text-sm placeholder-gray-500"
                      placeholder="4242 4242 4242 4242"
                    />
                  </div>
                  {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400">Expiry</label>
                    <div className={`w-full bg-gray-900 border ${errors.cardExp ? 'border-red-600' : 'border-gray-700'} rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-red-600`}>
                      <input
                        value={cardExp}
                        onChange={(e) => handleExpiryInput(e.target.value)}
                        inputMode="numeric"
                        className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                        placeholder="MM/YY"
                      />
                    </div>
                    {errors.cardExp && <p className="text-red-500 text-xs mt-1">{errors.cardExp}</p>}
                  </div>
                  <div>
                    <label className="text-xs text-gray-400">CVV</label>
                    <div className={`w-full bg-gray-900 border ${errors.cardCvv ? 'border-red-600' : 'border-gray-700'} rounded-xl px-3 py-2 focus-within:ring-1 focus-within:ring-red-600`}>
                      <input
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                        inputMode="numeric"
                        type="password"
                        className="w-full bg-transparent outline-none text-sm placeholder-gray-500"
                        placeholder="•••"
                      />
                    </div>
                    {errors.cardCvv && <p className="text-red-500 text-xs mt-1">{errors.cardCvv}</p>}
                  </div>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <div>
                <label className="text-xs text-gray-400">UPI ID</label>
                <input value={upiId} onChange={(e) => setUpiId(e.target.value)} className={`w-full bg-gray-900 border ${errors.upiId ? 'border-red-600' : 'border-gray-700'} rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600`} placeholder="username@icici" />
                {errors.upiId && <p className="text-red-500 text-xs mt-1">{errors.upiId}</p>}
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div>
                <label className="text-xs text-gray-400">PayPal Email</label>
                <input type="email" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} className={`w-full bg-gray-900 border ${errors.paypalEmail ? 'border-red-600' : 'border-gray-700'} rounded-xl p-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-600`} placeholder="you@paypal.com" />
                {errors.paypalEmail && <p className="text-red-500 text-xs mt-1">{errors.paypalEmail}</p>}
              </div>
            )}

            <Button disabled={isProcessing || !isFormValid()} className="w-full bg-red-600 disabled:opacity-60 hover:bg-red-700 text-white">
              {isProcessing ? 'Processing…' : `Pay ${priceDisplay}`}
            </Button>
          </form>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={() => { setShowSuccess(false); setIsOpen(false) }} title="Payment Done" size="md">
        <div className="relative" style={{ minHeight: 'calc(100vh - 160px)' }}>
          <ConfettiBurst active={showSuccess} />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center">
              <div className="w-20 h-20 sm:w-16 sm:h-16 mx-auto mb-5 rounded-full bg-green-600/20 border border-green-600 flex items-center justify-center">
                <span className="text-green-400 text-4xl sm:text-3xl">✓</span>
              </div>
              <p className="text-base sm:text-sm text-gray-300 mb-5">Your payment is successful. Enjoy {selectedPlan}!</p>
              <Button onClick={() => { setShowSuccess(false); setIsOpen(false) }} className="w-full bg-red-600 hover:bg-red-700 text-white">Continue</Button>
            </div>
          </div>
        </div>
      </Modal>
      {/* Page-local animations */}
      <style>{`
        @keyframes floatGentle { 0%, 100% { transform: translateY(0) } 50% { transform: translateY(-6px) } }
        .float-gentle { animation: floatGentle 6s ease-in-out infinite }
        @keyframes blobMove { 0%, 100% { transform: translate(0,0) scale(1)} 50% { transform: translate(20px, -10px) scale(1.05)} }
        .animate-blob { animation: blobMove 16s ease-in-out infinite }
        @keyframes blobMove2 { 0%, 100% { transform: translate(0,0) scale(1)} 50% { transform: translate(-20px, 10px) scale(1.06)} }
        .animate-blob2 { animation: blobMove2 18s ease-in-out infinite }
        @keyframes glowPulse { 0%, 100% { opacity: .18 } 50% { opacity: .35 } }
        .animate-glow { animation: glowPulse 3s ease-in-out infinite }
        @keyframes shine { 0% { transform: translateX(-120%) skewX(12deg) } 100% { transform: translateX(120%) skewX(12deg) } }
        .animate-shine { animation: shine 1.8s ease-in-out infinite }
      `}</style>
    </div>
  )
}

export default UpgradePage


