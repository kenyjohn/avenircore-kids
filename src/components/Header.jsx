import Logo from './Logo';

const Header = () => (
  <header className="header">
    <div className="container header-inner">
      <a href="/" className="brand">
        <Logo />
        AvenirCore
      </a>
      <nav className="nav">
        <a href="/#offerings" className="nav-link">Offerings</a>
        <a href="/#how-it-works" className="nav-link">How It Works</a>
        <a href="/#vision" className="nav-link">Vision</a>
        <a href="/#workbook" className="nav-link">Free Workbook</a>
        <a href="/blog" className="nav-link">Blog</a>
      </nav>
      <button className="btn btn-primary" onClick={() => {
        const el = document.getElementById('waitlist');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#waitlist';
      }}>
        Join Waitlist
      </button>
    </div>
  </header>
);

export default Header;
