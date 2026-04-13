import React from 'react';

const WorkbookHero = () => (
  <section className="section" style={{ background: 'var(--color-cream)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
      <div>
        <span className="section-label" style={{ background: 'var(--color-indigo-light)', color: 'var(--color-indigo)' }}>PRINTABLE WORKBOOK</span>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--color-ink)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem' }}>
          Give your students a head start on the most important skill of their generation.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '2.5rem' }}>
          My AI Adventure Workbook is a beautifully designed, print-ready PDF that teaches children ages 6–12 what AI is, how it works, and why it matters — through 9 hands-on chapters. No screens. No apps. Just curiosity and a pencil.
        </p>
        <a href="https://avenircore.gumroad.com/l/aiadventure" className="btn" style={{ background: 'var(--color-gold)', color: 'var(--color-ink)', padding: '1rem 2rem', fontSize: '1.1rem', width: '100%', maxWidth: '300px' }}>
          Get the Workbook — $13 →
        </a>
      </div>
      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <img src="/images/workbook-cover.png" alt="My AI Adventure Workbook Cover" style={{ maxWidth: '100%', width: '90%', borderRadius: '12px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', transform: 'rotate(2deg)' }} loading="lazy" width="600" height="776"/>
      </div>
    </div>
  </section>
);

export default WorkbookHero;
