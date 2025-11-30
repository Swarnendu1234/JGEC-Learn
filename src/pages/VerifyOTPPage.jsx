import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AuthPages.css'

function VerifyOTPPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [timer, setTimer] = useState(600)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const inputRefs = useRef([])

  const email = location.state?.email

  useEffect(() => {
    if (!email) {
      navigate('/signup')
      return
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [email, navigate])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const otpCode = otp.join('')
    if (otpCode.length !== 6) {
      setError('Enter 6-digit code')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpCode })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Verification failed')
        return
      }

      setSuccess('Email verified!')
      login(data.token, data.user)
      setTimeout(() => navigate('/your-courses'), 1500)
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message)
        return
      }

      setSuccess('New code sent')
      setTimer(600)
      setOtp(['', '', '', '', '', ''])
    } catch (err) {
      setError('Error sending code')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-text">JGEC Learn</div>
          <div className="logo-tagline">Master Premium Courses</div>
        </div>

        <h2 className="auth-title">Verify Email</h2>
        <p className="auth-subtitle">Code sent to {email}</p>

        {error && <div className="auth-alert error">{error}</div>}
        {success && <div className="auth-alert success">{success}</div>}

        <div className={`otp-timer ${timer < 60 ? 'warning' : ''}`}>
          Expires in: {timer}s
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                className="otp-input"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={loading || timer === 0}
              />
            ))}
          </div>

          <button type="submit" disabled={loading || timer === 0} className="auth-btn">
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <button
          type="button"
          onClick={handleResend}
          disabled={loading}
          className="auth-btn resend-btn"
        >
          Resend Code
        </button>

        <div className="auth-toggle">
          <span onClick={() => navigate('/signup')} className="auth-link">
            ← Back
          </span>
        </div>
      </div>
    </div>
  )
}

export default VerifyOTPPage
