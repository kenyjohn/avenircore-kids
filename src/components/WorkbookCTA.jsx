import { Link } from 'react-router-dom';

const features = [
  '10 hands-on activities for ages 6–12',
  'Prompt writing, AI safety & careers',
  'Completion certificate included',
  'Printable & ready to use today',
  'Pairs with any AI tool or classroom'
];

const WorkbookCTA = () => (
  <section id="workbook" className="workbook-section">
    <div className="container workbook-inner">
      <div>
        <span className="section-label">Free Resource</span>
        <h2 className="section-title">Download the Kids AI Workbook</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.75 }}>
          A 10-page activity workbook to introduce your child to AI concepts — through games, drawing, storytelling, and critical thinking challenges. Created by the AvenirCore team.
        </p>
        <div className="workbook-features">
          {features.map(f => (
            <div key={f} className="workbook-feature">
              <span className="wf-check">✓</span>
              {f}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/workbook" className="btn btn-primary btn-lg">
            Get the Workbook →
          </Link>
          <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
            Join Waitlist
          </button>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
          Free forever. No email required to download.
        </p>
      </div>

      <div className="workbook-preview">
        <span className="workbook-tag">⭐ New — March 2026</span>
        <span className="workbook-emoji">📖</span>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
          My AI Activity Workbook
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          For curious kids, ages 6–12
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '0.5rem', marginBottom: '1.5rem' }}>
          <span className="price-main">Free</span>
          <span style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>$9</span>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center' }}>
          {['10 Activities', 'Certificate', 'Printable', 'Ages 6–12'].map(t => (
            <span key={t} style={{ fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', background: 'white', color: 'var(--color-emerald)', border: '1.5px solid var(--color-emerald-soft)' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WorkbookCTA;
