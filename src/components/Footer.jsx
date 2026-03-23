import Logo from './Logo';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', filter: 'brightness(0) invert(1)' }}>
        <Logo />
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'white', filter: 'none' }}>AvenirCore</span>
      </div>

      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', maxWidth: '360px', textAlign: 'center' }}>
        Future-ready kids, strong at the core. Safe AI education for ages 6–14.
      </p>

      <div className="footer-links">
        {[
          { label: 'Offerings', href: '#offerings' },
          { label: 'How It Works', href: '#how-it-works' },
          { label: 'Vision', href: '#vision' },
          { label: 'Free Workbook', href: '#workbook' },
          { label: 'Join Waitlist', href: '#waitlist' },
        ].map(l => (
          <a key={l.label} href={l.href} className="footer-link">{l.label}</a>
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
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/terms" className="footer-link">Terms of Service</a>
            <a href="mailto:hello@avenircore.com" className="footer-link">Contact</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
