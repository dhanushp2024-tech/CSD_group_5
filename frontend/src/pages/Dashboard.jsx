import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { authService } from '../services/api'
import Navbar from '../components/Navbar'
import './Dashboard.css'

const modules = [
  { icon: '🔥', title: 'Internet Slang 101', progress: 0, lessons: 8, tag: 'Beginner' },
  { icon: '⚡', title: 'Meme Culture Deep Dive', progress: 0, lessons: 12, tag: 'Intermediate' },
  { icon: '🎮', title: 'Gaming & Streaming Lingo', progress: 0, lessons: 6, tag: 'Beginner' },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const user = authService.getUser()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authService.isLoggedIn()) {
      navigate('/login')
    }
  }, [navigate])

  if (!user) return null

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dash-container">
        {/* Welcome header */}
        <div className="dash-welcome">
          <div>
            <p className="dash-greeting">Welcome back 👋</p>
            <h1 className="dash-name">{user.email.split('@')[0]}</h1>
          </div>
          <div className="dash-role-badge">
            <span className="role-dot" />
            {user.role}
          </div>
        </div>

        {/* Stats row */}
        <div className="dash-stats">
          {[
            { label: 'Lessons completed', value: '0', icon: '📚' },
            { label: 'Quiz score avg', value: '—', icon: '🎯' },
            { label: 'Day streak', value: '1', icon: '🔥' },
          ].map(s => (
            <div key={s.label} className="dash-stat-card">
              <span className="dash-stat-icon">{s.icon}</span>
              <span className="dash-stat-value">{s.value}</span>
              <span className="dash-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modules */}
        <div className="dash-section">
          <h2 className="dash-section-title">Your learning path</h2>
          <div className="dash-modules">
            {modules.map(m => (
              <div key={m.title} className="module-card">
                <div className="module-icon">{m.icon}</div>
                <div className="module-info">
                  <div className="module-meta">
                    <span className="module-tag">{m.tag}</span>
                    <span className="module-lessons">{m.lessons} lessons</span>
                  </div>
                  <h3 className="module-title">{m.title}</h3>
                  <div className="module-progress-bar">
                    <div className="module-progress-fill" style={{ width: `${m.progress}%` }} />
                  </div>
                  <span className="module-progress-text">{m.progress}% complete</span>
                </div>
                <button className="module-btn">Start →</button>
              </div>
            ))}
          </div>
        </div>

        <p className="dash-coming-soon">
          ✦ More modules coming soon — content is being added weekly.
        </p>
      </div>
    </div>
  )
}
