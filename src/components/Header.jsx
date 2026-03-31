import Logo from './Logo';

const Header = () => (
  <header className="header">
    <div className="container header-inner">
      <a href="/" className="brand">
        <Logo />
        AvenirCore
      </a>
      <nav className="nav">
        <a href="#offerings" className="nav-link">Offerings</a>
        <a href="#how-it-works" className="nav-link">How It Works</a>
        <a href="#vision" className="nav-link">Vision</a>
        <a href="#workbook" className="nav-link">Free Workbook</a>
        <a href="/blog" className="nav-link">Blog</a>
      </nav>
      <button className="btn btn-primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
        Join Waitlist
      </button>
    </div>
  </header>
);

export default Header;
