import React from 'react';

const BuySection = () => (
  <section className="section" style={{ background: 'white', textAlign: 'center' }}>
    <div className="container" style={{ maxWidth: '600px' }}>
      <span className="section-label" style={{ background: 'var(--color-gold)', color: 'var(--color-ink)' }}>INSTANT DOWNLOAD</span>
      <h2 className="section-title" style={{ color: 'var(--color-ink)', marginTop: '1rem' }}>Start your AI Adventure today</h2>
      <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', marginBottom: '2.5rem' }}>
        Get the 25+ page digital workbook immediately. Print it at home or school, and empower your kids for the future.
      </p>
      
      <div style={{ padding: '3rem', border: '2px solid var(--color-indigo-light)', borderRadius: '1.5rem', background: 'var(--color-bg)', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--color-indigo)', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontWeight: 800, fontSize: '0.85rem' }}>
          BEST VALUE
        </div>
        <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'var(--color-ink)', lineHeight: 1 }}>$13</div>
        <div style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Digital PDF • Unlimited Personal/Classroom Printing</div>
        
        <a href="https://avenircore.gumroad.com/l/aiadventure" className="btn" style={{ background: 'var(--color-gold)', color: 'var(--color-ink)', padding: '1.25rem 2.5rem', fontSize: '1.2rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
          Buy Now on Gumroad →
        </a>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          <span>🔒 Secure checkout</span>
          <span>💳 Credit/Apple/Google Pay</span>
        </div>
      </div>
    </div>
  </section>
);

export default BuySection;
