import { useState } from 'react'

const NewsletterCTA = ({ 
  variant = 'end', 
  heading, 
  subheading, 
  buttonText 
}) => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const isMid = variant === 'mid'
  
  const defaultHeading = isMid 
    ? 'Enjoying this? Get one AI idea for your classroom every week.' 
    : 'Found this useful?'
  
  const defaultSub = isMid
    ? 'Free. No spam. Join teachers already on the Avenircore newsletter.'
    : 'Every week I send one practical AI idea for the classroom — free, no spam, unsubscribe anytime. Join the Avenircore newsletter.'
  
  const defaultBtn = isMid ? 'Join free →' : 'Get the weekly AI idea →'

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
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
        body: JSON.stringify({ email, role: 'teacher' })
      })

      if (!res.ok) {
        // Handle specific server-side errors if they are JSON
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
      
      // Development fallback: If we are in dev and the API fails (e.g. no proxy), 
      // simulate success so the user can see the UI state.
      if (import.meta.env.DEV) {
        console.warn('API call failed in DEV. Simulating success for UI verification.')
        setTimeout(() => setStatus('success'), 1000)
        return
      }

      setStatus('error')
      setErrorMsg(err.message || 'Something went wrong — please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className={`newsletter-cta newsletter-cta-${variant}`}>
        <div className="newsletter-cta-bg"></div>
        <div className="newsletter-cta-glass">
          <div className="newsletter-success-elite">
            <div className="success-icon-wrap">✅</div>
            <div style={{ textAlign: 'center' }}>
              <h4 style={{ color: '#fff', fontSize: '1.25rem', marginBottom: '0.25rem' }}>You're on the list!</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Check your inbox to confirm your subscription.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`newsletter-cta newsletter-cta-${variant}`}>
      <div className="newsletter-cta-bg"></div>
      <div className="newsletter-cta-glass">
        <div className="newsletter-cta-content">
          <h3 className="newsletter-cta-title">{heading || defaultHeading}</h3>
          <p className="newsletter-cta-sub">{subheading || defaultSub}</p>
        </div>

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <form onSubmit={handleSubmit} className="newsletter-cta-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              disabled={status === 'loading'}
              className="newsletter-input"
              required
            />
            <button 
              type="submit" 
              disabled={status === 'loading'}
              className="btn btn-primary"
            >
              {status === 'loading' ? (
                <div className="btn-loading-wrap">
                  <span className="spinner-elite"></span>
                  <span>Joining...</span>
                </div>
              ) : (
                buttonText || defaultBtn
              )}
            </button>
          </form>
          
          {status === 'error' && (
            <p style={{ color: '#fda4af', fontSize: '0.85rem', fontWeight: 600, margin: '0.25rem 0 0', textAlign: isMid ? 'left' : 'center' }}>
              {errorMsg}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default NewsletterCTA
