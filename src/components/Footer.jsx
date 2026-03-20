import React from 'react';
import Logo from './Logo';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: 'var(--color-navy-dark)', color: 'var(--color-text-light)', padding: '4rem 0' }}>
            <div className="container">
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '3rem',
                    textAlign: 'center'
                }}>
                    <div style={{ marginBottom: '1rem', filter: 'brightness(0) invert(1)' }}>
                        <Logo />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'white', marginBottom: '0.5rem' }}>AvenirCore</h3>
                    <p style={{ opacity: 0.7 }}>Future-ready kids, strong at the core.</p>
                </div>

                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '2rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.875rem',
                    opacity: 0.6
                }}>
                    <div>
                        © {new Date().getFullYear()} AvenirCore. All rights reserved.
                    </div>
                    <div className="flex gap-4">
                        <a href="#" style={{ textDecoration: 'none' }}>Privacy Policy</a>
                        <a href="#" style={{ textDecoration: 'none' }}>Terms of Service</a>
                        <a href="#" style={{ textDecoration: 'none' }}>Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
