import React from 'react';

const PersonaBenefits = () => (
  <section className="section" style={{ background: 'var(--color-navy)', color: 'white' }}>
    <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
      <h2 className="section-title" style={{ color: 'white' }}>Why AvenirCore Built This</h2>
      <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem' }}>
        We couldn't find an AI curriculum that wasn't trying to sell a software subscription, harvest student data, or pretend AI is magic. 
        So we built the antidote: a screen-free foundation in computational thinking grounded in human ethics.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', textAlign: 'left', marginTop: '3rem' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: 'var(--color-gold)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 800 }}>Teacher Benefits</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> FERPA/COPPA safe (no logins)</li>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Easy cross-curricular integration</li>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Black & white printer friendly</li>
          </ul>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h3 style={{ color: 'var(--color-mint)', marginBottom: '1rem', fontSize: '1.2rem', fontWeight: 800 }}>Parent Benefits</h3>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', color: 'rgba(255,255,255,0.9)' }}>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Low prep, high engagement</li>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Reduces tech anxiety</li>
            <li style={{ display: 'flex', gap: '0.5rem' }}><span>✓</span> Cultivates critical thinking over passive consumption</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default PersonaBenefits;
