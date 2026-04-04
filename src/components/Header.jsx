import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Logo from './Logo'

const NAV_LINKS = [
  { label: 'Offerings', href: '/#offerings', external: true },
  { label: 'How It Works', href: '/#how-it-works', external: true },
  { label: 'Vision', href: '/#vision', external: true },
  { label: 'Free Workbook', href: '/#workbook', external: true },
]

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" onClick={close}>
          <Logo />
          AvenirCore
        </Link>

        <nav className="nav" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}
          <NavLink to="/blog" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Blog</NavLink>
          <NavLink to="/blog/teachers-ai-guide" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>Teacher Hub</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link nav-link--active' : 'nav-link'}>About</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{ fontSize: '0.9rem', padding: '0.65rem 1.25rem' }}
            onClick={() => {
              close()
              const el = document.getElementById('waitlist')
              if (el) el.scrollIntoView({ behavior: 'smooth' })
              else window.location.href = '/#waitlist'
            }}
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

      {menuOpen && (
        <div id="mobile-nav" className="mobile-nav" role="dialog" aria-label="Navigation menu">
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {NAV_LINKS.map(l => (
              <a key={l.label} href={l.href} className="mobile-nav-link" onClick={close}>{l.label}</a>
            ))}
            <NavLink to="/blog" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={close}>Blog</NavLink>
            <NavLink to="/blog/teachers-ai-guide" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={close}>Teacher Hub</NavLink>
            <NavLink to="/about" className={({ isActive }) => `mobile-nav-link${isActive ? ' active' : ''}`} onClick={close}>About</NavLink>
          </nav>
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--color-border)' }}>
            <button
              type="button"
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                close()
                const el = document.getElementById('waitlist')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else window.location.href = '/#waitlist'
              }}
            >
              Join Waitlist →
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
