import React from 'react';

const cards = [
  { icon: '👩‍🏫', target: 'For Teachers', title: 'Ready to print and teach', desc: '9 structured chapters aligned to digital citizenship goals. Works as a standalone unit or a supplement to your existing curriculum.' },
  { icon: '👨‍👩‍👧', target: 'For Parents', title: 'Screen-free and genuinely fun', desc: 'Hands-on puzzles, drawing activities and ethical challenges that spark real conversations about technology at the dinner table.' },
  { icon: '🏠', target: 'For Homeschoolers', title: 'A complete AI literacy unit', desc: 'Self-guided chapters with clear learning outcomes. Print once, use at your own pace, revisit any chapter any time.' }
];

const PersonaStrip = () => (
  <section style={{ padding: '3rem 0', background: 'var(--color-white)', borderBottom: '1px solid var(--color-border)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
      {cards.map(c => (
        <div key={c.target} style={{ padding: '2rem', background: 'var(--color-bg)', borderRadius: '1rem', border: '1.5px solid var(--color-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '1.5rem' }}>{c.icon}</span>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--color-indigo)', letterSpacing: '0.05em' }}>{c.target}</span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--color-ink)', marginBottom: '0.75rem' }}>{c.title}</h3>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{c.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default PersonaStrip;
