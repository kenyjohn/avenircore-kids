import React from 'react';

const ActivityPreview = () => (
  <section className="section" style={{ background: 'var(--color-cream)' }}>
    <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
      <div style={{ order: 1 }}>
        <div style={{ background: 'var(--color-white)', padding: '1rem', borderRadius: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', transform: 'rotate(-2deg)' }}>
           <img src="/images/workbook-thumbnail.png" alt="Activity Preview" style={{ width: '100%', borderRadius: '8px', border: '1px solid var(--color-border)' }} loading="lazy" />
        </div>
      </div>
      <div style={{ order: 2 }}>
        <h2 className="section-title" style={{ color: 'var(--color-ink)' }}>Look Inside the Workbook</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
          Every chapter features a mix of reading comprehension and active involvement. Kids will draw robot sensors, solve logic puzzles demonstrating how data works, and write their own prompts using our structured framework.
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ background: 'var(--color-mint)', color: 'white', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 800, flexShrink: 0 }}>1</span>
            <div><strong style={{ color: 'var(--color-ink)', display: 'block' }}>Concept Introduction</strong> Simple, jargon-free explanations.</div>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ background: 'var(--color-coral)', color: 'white', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 800, flexShrink: 0 }}>2</span>
            <div><strong style={{ color: 'var(--color-ink)', display: 'block' }}>Hands-on Activity</strong> Puzzles, drawing, or writing prompts.</div>
          </li>
          <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <span style={{ background: 'var(--color-gold)', color: 'white', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontWeight: 800, flexShrink: 0 }}>3</span>
            <div><strong style={{ color: 'var(--color-ink)', display: 'block' }}>Discussion Question</strong> Guided prompts for parents or teachers.</div>
          </li>
        </ul>
      </div>
    </div>
  </section>
);

export default ActivityPreview;
