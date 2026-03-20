import React from 'react';
import Logo from './Logo';

const Header = () => {
    return (
        <header className="header">
            <div className="container flex items-center justify-between">
                <div className="flex items-center gap-4 logo-container">
                    <Logo />
                    <span className="brand-name">AvenirCore</span>
                </div>

                <nav className="hidden-mobile">
                    <ul className="flex gap-8">
                        <li><a href="#offerings" className="nav-link">Offerings</a></li>
                        <li><a href="#how-it-works" className="nav-link">How It Works</a></li>
                        <li><a href="#vision" className="nav-link">Vision</a></li>
                    </ul>
                </nav>

                <button className="btn btn-primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
                    Join Waitlist
                </button>
            </div>
        </header>
    );
};

export default Header;
