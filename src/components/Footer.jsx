import { Link } from 'react-router-dom';

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
