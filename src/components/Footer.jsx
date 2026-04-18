import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <div className="footer-brand-logo" aria-hidden>
          <Logo variant="onDark" />
        </div>
        <span className="footer-brand-text">AvenirCore</span>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', maxWidth: '360px', textAlign: 'center' }}>
        Future-ready kids, strong at the core. Safe AI education for ages 6–14.
      </p>

      <div className="footer-links">
        {[
          { label: 'Offerings', href: '/#offerings' },
          { label: 'How It Works', href: '/#how-it-works' },
          { label: 'Vision', href: '/#vision' },
          { label: 'Free Workbook', href: '/#workbook' },
          { label: 'Teachers Hub', href: '/blog/teachers-ai-guide' },
          { label: 'Stories', href: '/stories' },
          { label: 'Join Waitlist', href: '/#waitlist' },
        ].map(l => (
          <Link key={l.label} to={l.href} className="footer-link">{l.label}</Link>
        ))}
      </div>

      {/* Social links */}
      <div className="footer-social">
        <a
          href="https://twitter.com/avenircore"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="AvenirCore on X (Twitter)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a
          href="https://pinterest.com/avenircore"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="AvenirCore on Pinterest"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
          </svg>
        </a>
        <a
          href="https://instagram.com/avenircore"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
          aria-label="AvenirCore on Instagram"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
        </a>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['COPPA Compliant', 'No Ads to Kids', 'Zero Data Selling', 'GDPR Ready'].map(b => (
          <span key={b} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '100px', background: 'rgba(52,211,153,0.1)', color: 'rgba(52,211,153,0.8)', border: '1px solid rgba(52,211,153,0.2)' }}>
            {b}
          </span>
        ))}
      </div>

      <div className="footer-bottom">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <span>© {new Date().getFullYear()} AvenirCore. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
            <a href="/sitemap.xml" className="footer-link">Sitemap</a>
            <Link to="/contact" className="footer-link">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
