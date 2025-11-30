import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/AuthPages.css'

function LoginPage() {
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const from = location.state?.from?.pathname || '/your-courses'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!emailOrUsername || !password) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrUsername, password })
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.requiresOTP) {
          setError('Please verify your email first')
          navigate('/verify-otp', { state: { email: data.email } })
          return
        }
        setError(data.message || 'Login failed')
        return
      }

      login(data.token, data.user)
      navigate(from, { replace: true })
    } catch (err) {
      setError('Network error. Please try again.')
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

        <h2 className="auth-title">Sign In</h2>
        <p className="auth-subtitle">Welcome back!</p>

        {error && <div className="auth-alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email or Username</label>
            <input
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              placeholder="john@example.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-toggle">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} className="auth-link">
            Create Account
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
