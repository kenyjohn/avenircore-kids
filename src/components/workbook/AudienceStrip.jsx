import React from 'react';

const AUDIENCES = [
  {
    icon: '👩‍🏫',
    target: 'For Teachers',
    headline: 'Drop-in AI units that fit your existing curriculum',
    body: 'Both workbooks are structured around clear learning outcomes, FERPA/COPPA safe, and B&W printer friendly. No software, no accounts, no setup.',
    accentColor: 'var(--color-indigo)',
    accentBg: 'var(--color-indigo-light)',
  },
  {
    icon: '👨‍👩‍👧',
    target: 'For Parents',
    headline: 'Screen-free weekend learning they\'ll actually ask for',
    body: 'Hands-on puzzles, drawing challenges, and ethical debates that spark real dinner-table conversations. Perfect for curious kids who want to understand the world.',
    accentColor: 'var(--color-coral)',
    accentBg: '#FF7E6B22',
  },
  {
    icon: '🏠',
    target: 'For Homeschoolers',
    headline: 'A complete, self-paced AI literacy unit',
    body: 'Self-guided chapters with no prerequisites. Print once, work through at your pace, revisit any section any time. Works as a standalone unit or a supplement.',
    accentColor: 'var(--color-mint)',
    accentBg: '#5DC5A822',
  },
];

const AudienceStrip = () => (
  <section
    style={{
      padding: '4rem 0',
      background: 'var(--color-white)',
      borderTop: '1px solid var(--color-border)',
      borderBottom: '1px solid var(--color-border)',
    }}
  >
    <div className="container">
      <h2
        className="section-title"
        style={{ textAlign: 'center', color: 'var(--color-ink)', marginBottom: '3rem' }}
      >
        Who is this for?
      </h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
        }}
      >
        {AUDIENCES.map(a => (
          <div
            key={a.target}
            style={{
              padding: '2rem',
              background: 'var(--color-bg)',
              borderRadius: '1.25rem',
              border: '1.5px solid var(--color-border)',
              transition: 'transform 0.2s, border-color 0.2s',
            }}
            className="audience-card"
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: a.accentBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                marginBottom: '1.25rem',
              }}
            >
              {a.icon}
            </div>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 900,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: a.accentColor,
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-heading)',
              }}
            >
              {a.target}
            </div>
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 800,
                color: 'var(--color-ink)',
                marginBottom: '0.75rem',
                lineHeight: 1.3,
              }}
            >
              {a.headline}
            </h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.65, margin: 0 }}>
              {a.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AudienceStrip;
