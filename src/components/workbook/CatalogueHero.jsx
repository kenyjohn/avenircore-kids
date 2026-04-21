import React from 'react';

const CatalogueHero = () => (
  <section
    className="section"
    style={{
      background: 'linear-gradient(135deg, var(--color-ink) 0%, #2d1a6e 100%)',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '5rem',
      paddingBottom: '5rem',
    }}
  >
    {/* Decorative background orbs */}
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(242,201,76,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(93,197,168,0.10) 0%, transparent 70%)',
        pointerEvents: 'none',
      }}
    />

    <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '720px' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <span
          className="section-label"
          style={{ background: 'rgba(242,201,76,0.15)', color: 'var(--color-gold)', border: '1px solid rgba(242,201,76,0.3)' }}
        >
          PRINTABLE WORKBOOKS
        </span>
      </div>

      <h1
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 900,
          color: '#ffffff',
          lineHeight: 1.1,
          marginBottom: '1.5rem',
          letterSpacing: '-0.02em',
        }}
      >
        The AI literacy toolkit{' '}
        <span style={{ color: 'var(--color-gold)' }}>kids actually want to do.</span>
      </h1>

      <p
        style={{
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.7,
          marginBottom: '2.5rem',
          maxWidth: '580px',
          margin: '0 auto 2.5rem',
        }}
      >
        Two beautifully designed, screen-free workbooks that teach AI concepts, computational thinking,
        and ethical reasoning — through hands-on activities, drawing, and real conversation.
        No apps. No logins. Just a pencil and curiosity.
      </p>

      {/* Trust badges */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem',
        }}
      >
        {[
          { icon: '🔒', label: 'COPPA Safe' },
          { icon: '🖨️', label: 'Printable PDF' },
          { icon: '⚡', label: 'Instant Download' },
          { icon: '🏫', label: 'Classroom Ready' },
        ].map(b => (
          <span
            key={b.label}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.85)',
              borderRadius: '2rem',
              padding: '0.4rem 1rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              fontFamily: 'var(--font-heading)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{b.icon}</span>
            {b.label}
          </span>
        ))}
      </div>

      {/* Scroll nudge */}
      <div style={{ marginTop: '3rem', color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        ↓ Choose your workbook
      </div>
    </div>
  </section>
);

export default CatalogueHero;
