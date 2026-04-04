const AuthorBox = ({ author = 'John Kennedy', role = 'Founder, AvenirCore' }) => (
  <div style={{
    display: 'flex',
    gap: '1.25rem',
    padding: '1.5rem',
    background: 'white',
    borderRadius: 'var(--radius-xl)',
    border: '1.5px solid var(--color-border)',
    marginTop: '2.5rem',
    alignItems: 'flex-start',
  }}>
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'var(--color-navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      border: '2px solid var(--color-emerald-soft)',
    }}>
      <span style={{
        fontFamily: 'var(--font-heading)',
        fontWeight: 900,
        fontSize: '1.1rem',
        color: 'var(--color-emerald-light)',
        letterSpacing: '-0.02em',
      }}>JK</span>
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.3rem' }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '0.975rem', color: 'var(--color-navy)' }}>
          {author}
        </span>
        <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{role}</span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.65, margin: '0 0 0.75rem' }}>
        John Kennedy is the founder of AvenirCore and a parent who believes children deserve AI tools built around values, not engagement metrics. He writes about child safety, AI literacy, and helping families navigate technology with confidence.
      </p>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <a
          href="/about"
          style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-emerald)', textDecoration: 'none' }}
        >
          About AvenirCore →
        </a>
        <a
          href="https://www.linkedin.com/in/johnkennedythangarajan"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A66C2', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          LinkedIn
        </a>
      </div>
    </div>
  </div>
)

export default AuthorBox
