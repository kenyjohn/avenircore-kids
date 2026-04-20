import { useState } from 'react'

const TRUST_ITEMS = [
  { label: 'COPPA Safe', icon: '🔒' },
  { label: 'No Ads to Kids', icon: '🚫' },
  { label: 'No Spam', icon: '📧' },
  { label: 'Free to Start', icon: '🌱' },
]

const EmailCapture = () => {
  const [email, setEmail]       = useState('')
  const [role, setRole]         = useState('parent')
  const [name, setName]         = useState('')
  const [website, setWebsite]   = useState('') // Honeypot
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')

  // ── API call unchanged ──
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, name, website, source: 'waitlist-main' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Newsletter API backend failed')
      }
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <section id="waitlist" className="waitlist-section">
      <div className="container">
        {submitted ? (
          <div className="waitlist-card waitlist-success">
            <div className="waitlist-success-icon" aria-hidden="true">🎉</div>
            <h2 className="waitlist-success-title">You're on the list!</h2>
            <p className="waitlist-success-desc">
              Thank you for joining — we'll be in touch with early access details soon.
            </p>
            <a
              href="/avenircore-kids-ai-workbook.pdf"
              download
              className="btn btn-primary btn-lg"
            >
              Download Free Workbook →
            </a>
            <p className="waitlist-success-hint">
              While you wait — your free AI Activity Workbook is ready above!
            </p>
          </div>
        ) : (
          <>
            <div className="waitlist-header">
              <span className="section-label">Early Access</span>
              <h2 className="section-title">Join the Waitlist</h2>
              <p className="section-sub">
                Be first to access AI literacy tools built for kids, parents, and
                teachers — grounded in values from day one.
              </p>
            </div>

            <div className="waitlist-card">
              <form onSubmit={handleSubmit} className="form-light">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-name">Your name</label>
                    <input
                      id="wl-name"
                      type="text"
                      className="form-input"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="wl-role">I am a…</label>
                    <select
                      id="wl-role"
                      className="form-select"
                      value={role}
                      onChange={e => setRole(e.target.value)}
                    >
                      <option value="parent">Parent</option>
                      <option value="teacher">Teacher</option>
                      <option value="student">Student</option>
                      <option value="educator">Educator / Admin</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="wl-email">Email address</label>
                  <input
                    id="wl-email"
                    type="email"
                    required
                    className="form-input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                {/* Honeypot field to catch bots — hidden from real users */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input 
                    id="website" 
                    name="website" 
                    type="text" 
                    tabIndex="-1" 
                    autoComplete="off" 
                    value={website}
                    onChange={e => setWebsite(e.target.value)}
                  />
                </div>

                {error && (
                  <p className="waitlist-error">{error}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Joining…' : 'Join Early Access →'}
                </button>

                <p className="form-privacy">
                  🔒 No spam. Unsubscribe anytime. We respect your privacy and your child's.
                </p>
              </form>
            </div>

            {/* Trust chips */}
            <div className="waitlist-trust">
              {TRUST_ITEMS.map(t => (
                <span key={t.label} className="waitlist-trust-chip">
                  <span aria-hidden="true">{t.icon}</span>
                  {t.label}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default EmailCapture
