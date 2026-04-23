import { useState } from 'react'

const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
)

const NewsletterCTA = ({ 
  variant = 'end', 
  role = 'parent', // 'parent' | 'teacher' | 'general'
  location = 'newsletter',
  heading, 
  subheading, 
  buttonText 
}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [botField, setBotField] = useState('') // Honeypot field
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const isTeacher = role === 'teacher'
  const isMid = variant === 'mid'
  
  // Dynamic Headings based on audience
  const defaultHeading = isMid 
    ? (isTeacher
        ? 'Get one AI classroom idea every week.' 
        : 'Get one family AI tip every week.')
    : (isTeacher
        ? 'Want more like this?'
        : 'Found this useful?')
  
  // Dynamic Subheadings based on audience
  const defaultSub = isMid
    ? (isTeacher
        ? 'Free weekly ideas for teachers. No jargon, just practical gains.'
        : 'Free weekly tips for parents navigating AI with kids. Age-appropriate and honest.')
    : (isTeacher
        ? 'Every week I send one practical AI idea for the classroom — tool guides, prompts, and lesson hacks. Free, no spam, unsubscribe anytime.'
        : 'Every week I send one practical tip for parents helping kids thrive in an AI world — simple, useful, and ad-free.')
  
  const defaultBtn = isTeacher ? 'Get weekly classroom ideas →' : 'Get weekly family tips →'

  // Success copy varies by role
  const successHeading = isTeacher
    ? "You're in! Your first AI classroom idea lands this week."
    : "You're in! Your first family AI tip lands this week."
  const successSub = isTeacher
    ? 'Check your inbox — a welcome note is on its way with a free resource.'
    : 'Check your inbox — a welcome note is on its way with a free guide.'

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email, 
          role, 
          name: name.trim(),
          source: location,
          website: botField // Honeypot catch
        })
      })

      if (!res.ok) {
        try {
          const data = await res.json()
          throw new Error(data.message || 'Subscription failed')
        } catch {
          throw new Error('Subscription service temporarily unavailable.')
        }
      }
      setStatus('success')
    } catch (err) {
      console.error('Newsletter submission error:', err)
      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong — please try again.')
    }
  }

  const successUI = (
    <div className="newsletter-success-elite">
      <div className="success-icon-wrap">✅</div>
      <div style={{ textAlign: 'center' }}>
        <h4 className="success-heading">{successHeading}</h4>
        <p className="success-sub">{successSub}</p>
      </div>
    </div>
  )

  if (isMid) {
    return (
      <div className="newsletter-cta-mid" data-role={role}>
        {status === 'success' ? (
          successUI
        ) : (
          <>
            <div className="cta-mid-anchor">
              <MailIcon />
            </div>
            <div className="cta-mid-content">
              <div className="newsletter-cta-content">
                <h3 className="newsletter-cta-title">{heading || defaultHeading}</h3>
                <p className="newsletter-cta-sub">{subheading || defaultSub}</p>
              </div>

              <form onSubmit={handleSubmit} className="newsletter-cta-form">
                <div className="newsletter-input-group">
                  <label htmlFor="cta-name-mid">First Name</label>
                  <input
                    id="cta-name-mid"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Optional"
                    disabled={status === 'loading'}
                    className="newsletter-input"
                  />
                </div>
                
                <div className="newsletter-input-group">
                  <label htmlFor="cta-email-mid">Email Address</label>
                  <input
                    id="cta-email-mid"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={status === 'loading'}
                    className="newsletter-input"
                    required
                  />
                </div>

                {/* Honeypot field (hidden from humans) */}
                <input 
                  type="text" 
                  name="website" 
                  tabIndex="-1" 
                  autoComplete="off" 
                  style={{ display: 'none' }} 
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />

                <button type="submit" disabled={status === 'loading'} className="btn btn-primary">
                  {status === 'loading' ? (
                    <div className="btn-loading-wrap"><span className="spinner-elite"></span></div>
                  ) : (
                    buttonText || defaultBtn
                  )}
                </button>
              </form>
              {status === 'error' && <p className="cta-error-msg">{errorMsg}</p>}
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="newsletter-cta-end" data-role={role}>
      <div className="rainbow-accent"></div>
      {status === 'success' ? (
        successUI
      ) : (
        <div className="newsletter-cta-glass">
          <div className="cta-end-badge">NEW RESOURCE</div>
          <div className="newsletter-cta-content">
            <h3 className="newsletter-cta-title">{heading || defaultHeading}</h3>
            <p className="newsletter-cta-sub">{subheading || defaultSub}</p>
          </div>

          <div className="cta-end-form-wrap">
            <form onSubmit={handleSubmit} className="newsletter-cta-form">
              <div className="newsletter-input-group">
                <label htmlFor="cta-name-end">First Name</label>
                <input
                  id="cta-name-end"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Optional"
                  disabled={status === 'loading'}
                  className="newsletter-input"
                />
              </div>
              
              <div className="newsletter-input-group">
                <label htmlFor="cta-email-end">Email Address</label>
                <input
                  id="cta-email-end"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  disabled={status === 'loading'}
                  className="newsletter-input"
                  required
                />
              </div>

              {/* Honeypot field (hidden from humans) */}
              <input 
                type="text" 
                name="website" 
                tabIndex="-1" 
                autoComplete="off" 
                style={{ display: 'none' }} 
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
              />

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary">
                {status === 'loading' ? (
                  <div className="btn-loading-wrap"><span className="spinner-elite"></span></div>
                ) : (
                  buttonText || defaultBtn
                )}
              </button>
            </form>
            {status === 'error' && <p className="cta-error-msg">{errorMsg}</p>}
            
            <div className="cta-trust-signals">
              <span>✓ No spam</span>
              <span>✓ Unsubscribe anytime</span>
              <span>✓ Free always</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsletterCTA
