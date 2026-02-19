import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/api'
import Navbar from '../components/Navbar'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' })
    if (serverError) setServerError('')
  }

  // Client-side validation before hitting the API
  const validate = () => {
    const newErrors = {}
    if (!form.email) newErrors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email'
    if (!form.password) newErrors.password = 'Password is required'
    else if (form.password.length < 8) newErrors.password = 'At least 8 characters'
    if (form.password !== form.confirm) newErrors.confirm = 'Passwords do not match'
    return newErrors
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)
    setServerError('')

    try {
      await authService.register(form.email, form.password)
      // After registering, auto-login the user
      const loginRes = await authService.login(form.email, form.password)
      authService.saveSession(loginRes.data)
      navigate('/dashboard')
    } catch (err) {
      const msg = err.response?.data || 'Registration failed. Please try again.'
      setServerError(typeof msg === 'string' ? msg : 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = () => {
    const p = form.password
    if (!p) return 0
    let score = 0
    if (p.length >= 8) score++
    if (p.length >= 12) score++
    if (/[A-Z]/.test(p)) score++
    if (/[0-9]/.test(p)) score++
    if (/[^a-zA-Z0-9]/.test(p)) score++
    return Math.min(score, 4)
  }

  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['', '#f76a6a', '#f7a26a', '#febc2e', '#6af7a2']
  const strength = passwordStrength()

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
            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Start learning Gen-Alpha culture today — it's free</p>
          </div>

          {serverError && (
            <div className="auth-error" role="alert">
              <span className="error-icon">⚠</span>
              {serverError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field-group">
              <label htmlFor="email" className="field-label">Email address</label>
              <input
                id="email"
                type="email"
                name="email"
                className={`field-input ${errors.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="field-group">
              <label htmlFor="password" className="field-label">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                className={`field-input ${errors.password ? 'input-error' : ''}`}
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
              {form.password && !errors.password && (
                <div className="strength-bar">
                  <div className="strength-track">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className="strength-segment"
                        style={{ background: i <= strength ? strengthColors[strength] : 'var(--border)' }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: strengthColors[strength] }}>
                    {strengthLabels[strength]}
                  </span>
                </div>
              )}
            </div>

            <div className="field-group">
              <label htmlFor="confirm" className="field-label">Confirm password</label>
              <input
                id="confirm"
                type="password"
                name="confirm"
                className={`field-input ${errors.confirm ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
              {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? (
                <span className="btn-spinner" />
              ) : (
                <>Create account <span className="cta-arrow">→</span></>
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{' '}
            <Link to="/login" className="auth-switch-link">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
