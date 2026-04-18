import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'

// Primary nav — full weight, visible hierarchy
const PRIMARY_NAV = [
  { label: 'For Parents', href: '/#offerings',            external: true },
  { label: 'For Teachers', to:   '/blog/teachers-ai-guide' },
  { label: 'Workbook',     to:   '/workbook' },
  { label: 'Stories',      to:   '/stories' },
  { label: 'Blog',         to:   '/blog' },
]

// Secondary nav — smaller, muted, right-aligned before CTA
const SECONDARY_NAV = [
  { label: 'About',   to: '/about' },
  { label: 'Contact', to: '/contact' },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  const handleWaitlist = () => {
    close()
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/#waitlist'
  }

  return (
    <header className="header">
      <div className="container header-inner">

        {/* Brand */}
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          <span className="brand-text">AvenirCore</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav" aria-label="Main navigation">
          {/* Primary links */}
          <div className="nav-primary">
            {PRIMARY_NAV.map(l =>
              l.external ? (
                <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}
                >
                  {l.label}
                </NavLink>
              )
            )}
          </div>

          {/* Divider */}
          <span className="nav-divider" aria-hidden="true" />

          {/* Secondary links */}
          <div className="nav-secondary">
            {SECONDARY_NAV.map(l => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => isActive ? 'nav-link nav-link--secondary nav-link--active' : 'nav-link nav-link--secondary'}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Right side: CTA + hamburger */}
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-primary btn-nav-cta"
            onClick={handleWaitlist}
          >
            Join Waitlist
          </button>
          <button
            type="button"
            className="hamburger"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(o => !o)}
          >
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
            <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <div id="mobile-nav" className="mobile-nav" role="dialog" aria-label="Navigation menu">
          <nav>
            <div className="mobile-nav-section-label">Explore</div>
            {PRIMARY_NAV.map(l =>
              l.external ? (
                <a key={l.label} href={l.href} className="mobile-nav-link" onClick={close}>{l.label}</a>
              ) : (
                <NavLink
                  key={l.label}
                  to={l.to}
                  className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                  onClick={close}
                >
                  {l.label}
                </NavLink>
              )
            )}
            <div className="mobile-nav-section-label" style={{ marginTop: '0.5rem' }}>Company</div>
            {SECONDARY_NAV.map(l => (
              <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`}
                onClick={close}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
          <div className="mobile-nav-cta">
            <button type="button" className="btn btn-primary" style={{ width: '100%' }} onClick={handleWaitlist}>
              Join Waitlist →
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
