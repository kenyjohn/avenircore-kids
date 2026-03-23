const values = [
  { icon: '❤️', title: 'Values at the core', desc: 'Not just screen time — every feature is built around character.' },
  { icon: '👨‍👩‍👧', title: 'Built together', desc: 'Designed for kids, parents, and teachers as a team — not in silos.' },
  { icon: '🧠', title: 'Teaches, not replaces', desc: 'Our AI explains and asks questions — it never does the thinking for kids.' },
  { icon: '💬', title: 'Clear human language', desc: 'No jargon. No dark patterns. Honest communication at every step.' }
];

const ValuesCharter = () => (
  <section id="values" className="section" style={{ background: 'white' }}>
    <div className="container values-grid">
      <div>
        <span className="section-label">Our Charter</span>
        <h2 className="section-title">Why AvenirCore?</h2>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.75 }}>
          We believe technology should amplify human potential — not automate it away. Our tools are built on a Values Charter that puts character first, every time.
        </p>
        <div className="values-list">
          {values.map((v, i) => (
            <div key={i} className="value-item">
              <span className="value-icon">{v.icon}</span>
              <div className="value-text">
                <strong>{v.title}</strong>
                <span>{v.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="promise-card animate-float">
        <p className="promise-quote">
          "We promise to never sell your child's data, to always design AI that explains instead of just answers, and to keep parents and teachers in the loop at every step of the journey."
        </p>
        <div className="promise-author">
          <div className="promise-avatar">🌱</div>
          <div>
            <div className="promise-name" style={{ color: 'white' }}>The AvenirCore Founders</div>
            <div className="promise-role">Building the future, carefully.</div>
          </div>
        </div>
        <div className="data-badges">
          {['Zero data selling', 'COPPA compliant', 'No ads to kids', 'Open to parents', 'GDPR ready'].map(b => (
            <span key={b} className="data-badge">{b}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ValuesCharter;
