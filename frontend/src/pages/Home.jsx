import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Home.css'

const features = [
  { icon: '◈', title: 'Cultural Lexicon', desc: 'Master Gen-Alpha slang, memes, and internet culture with structured lessons and real examples.', tag: 'Learn' },
  { icon: '◉', title: 'Interactive Quizzes', desc: 'Test your knowledge with bite-sized quizzes after each module. Track your streaks and scores.', tag: 'Practice' },
  { icon: '◍', title: 'Progress Tracking', desc: 'See exactly how far you\'ve come. Visual dashboards show your mastery across all topics.', tag: 'Track' },
]

const stats = [
  { value: '200+', label: 'Cultural concepts' },
  { value: '50+', label: 'Quiz modules' },
  { value: '3', label: 'User roles' },
]

export default function Home() {
  return (
    <div className="home">
      <Navbar />

      {/* Hero */}
      <section className="hero">
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="hero-orb hero-orb-1" aria-hidden="true" />
        <div className="hero-orb hero-orb-2" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Now in Beta
          </div>

          <h1 className="hero-title">
            Bridge the gap with
            <br />
            <span className="gradient-text">Gen-Alpha culture</span>
          </h1>

          <p className="hero-desc">
            The structured platform for learning Gen-Alpha internet culture, slang, and digital trends —
            built for educators, parents, and professionals who want to stay fluent.
          </p>

          <div className="hero-ctas">
            <Link to="/register" className="cta-primary">
              Start learning free
              <span className="cta-arrow">→</span>
            </Link>
            <Link to="/login" className="cta-secondary">Sign in</Link>
          </div>

          <div className="hero-stats">
            {stats.map(s => (
              <div key={s.label} className="stat">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="terminal-card">
            <div className="terminal-header">
              <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
              <span className="terminal-title">lesson_01.json</span>
            </div>
            <div className="terminal-body">
              <div className="t-line"><span className="t-key">"term"</span><span className="t-colon">:</span> <span className="t-str">"rizz"</span></div>
              <div className="t-line"><span className="t-key">"meaning"</span><span className="t-colon">:</span> <span className="t-str">"natural charm or charisma"</span></div>
              <div className="t-line"><span className="t-key">"usage"</span><span className="t-colon">:</span> <span className="t-str">"he's got unspoken rizz"</span></div>
              <div className="t-line"><span className="t-key">"generation"</span><span className="t-colon">:</span> <span className="t-str">"Gen-Alpha / Gen-Z"</span></div>
              <div className="t-line"><span className="t-key">"difficulty"</span><span className="t-colon">:</span> <span className="t-num">1</span></div>
              <div className="t-line t-dim">// Quiz unlocked ✓</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-label">What's inside</div>
        <h2 className="section-title">Everything you need to stay <em>culturally fluent</em></h2>

        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-tag">{f.tag}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="banner-inner">
          <h2>Ready to bridge the gap?</h2>
          <p>Join GenBridge and never feel lost in a Gen-Alpha conversation again.</p>
          <Link to="/register" className="cta-primary">
            Create your account
            <span className="cta-arrow">→</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-brand">
          <span className="brand-icon">⬡</span>
          GenBridge
        </div>
        <p className="footer-note">CS203 Group 5 · SMU · 2026</p>
      </footer>
    </div>
  )
}
