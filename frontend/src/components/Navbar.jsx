import { Link, useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/api'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = authService.getUser()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    authService.logout()
    navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-icon">⬡</span>
        <span className="brand-text">GenBridge</span>
      </Link>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
            <span className="navbar-email">{user.email}</span>
            <button className="btn-ghost" onClick={handleLogout}>Sign out</button>
          </>
        ) : (
          <>
            <Link to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>
              Sign in
            </Link>
            <Link to="/register" className="btn-nav-cta">
              Get started
            </Link>
          </>
        )}
      </div>

      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
    </nav>
  )
}
