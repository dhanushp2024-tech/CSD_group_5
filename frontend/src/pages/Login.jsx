import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import Navbar from '../components/Navbar'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await authService.login(form.email, form.password)
      // Save the JWT token and user info to localStorage for session persistence
      authService.saveSession(res.data)
      navigate('/dashboard')
    } catch (err) {
      // Show the error message from the backend (e.g. "Invalid email or password.")
      const msg = err.response?.data || 'Login failed. Please try again.'
      setError(typeof msg === 'string' ? msg : 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <Navbar />

      <div className="auth-bg" aria-hidden="true">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
      </div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <Link to="/" className="auth-logo">
              <span>⬡</span> GenBridge
            </Link>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to continue your cultural journey</p>
          </div>

          {error && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email" className="field-label">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                className="field-input"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>

            <div className="field-group">
              <div className="field-label-row">
                <label htmlFor="password" className="field-label">Password</label>
                <a href="#" className="field-link">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                className="field-input"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <>Sign in <span className="cta-arrow">→</span></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{' '}
            <Link to="/register" className="auth-switch-link">Create one free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
