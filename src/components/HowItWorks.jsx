const steps = [
  { num: '01', title: 'Explore', icon: '🔭', desc: 'Kids dive into guided lessons and challenges designed to spark curiosity about AI ethics and how it really works — in language they understand.' },
  { num: '02', title: 'Engage', icon: '💬', desc: 'Our AI companion asks questions instead of just giving answers — helping kids build the critical thinking muscles that last a lifetime.' },
  { num: '03', title: 'Connect', icon: '🌐', desc: 'Parents and teachers receive simple insights and conversation starters to bridge learning at home and school — no tech expertise needed.' }
];

const HowItWorks = () => (
  <section id="how-it-works" className="hiw-section">
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: 'var(--color-emerald-light)' }}>Simple Process</span>
        <h2 className="section-title" style={{ color: 'white' }}>How It Works</h2>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.65)' }}>Three steps to a smarter, safer future — for the whole family.</p>
      </div>
      <div className="hiw-grid">
        {steps.map((s, i) => (
          <div key={i} className={`hiw-step animate-fade-up delay-${i + 1}`}>
            <div className="hiw-num">{s.icon}</div>
            <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: 'rgba(52,211,153,0.6)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Step {s.num}
            </div>
            <h3 className="hiw-step-title">{s.title}</h3>
            <p className="hiw-step-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
