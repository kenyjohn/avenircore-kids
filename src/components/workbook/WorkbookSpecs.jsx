import React from 'react';

const specs = [
  { label: 'Format', value: 'Digital PDF Download' },
  { label: 'Length', value: '28 Pages' },
  { label: 'Chapters', value: '9 Structured Lessons' },
  { label: 'Ages', value: '6–12 (Grades 1-6)' },
  { label: 'Tech Required', value: 'None (Screen-free)' },
  { label: 'Language', value: 'English' }
];

const WorkbookSpecs = () => (
  <section style={{ padding: '3rem 0', background: 'var(--color-navy)', color: 'white', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-indigo-light)', marginBottom: '2rem', textAlign: 'center' }}>Technical Specifications</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        {specs.map(s => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
            <span style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkbookSpecs;
