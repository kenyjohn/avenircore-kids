const pillars = [
  {
    color: 'emerald',
    icon: '📚',
    title: 'AI Literacy for Kids',
    desc: 'Bite-sized lessons, stories, and challenges that teach what AI is, how it works, and how to use it with good judgment. So kids grow curious and confident — not dependent.',
    link: 'Explore lessons'
  },
  {
    color: 'amber',
    icon: '🤝',
    title: 'Safe Study Companion',
    desc: 'A homework helper that explains step-by-step and encourages reflection. Intentionally designed not to just give answers — because real learning builds understanding, not shortcuts.',
    link: 'See how it helps'
  },
  {
    color: 'sky',
    icon: '👨‍👩‍👧',
    title: 'Guides for Parents & Teachers',
    desc: 'Dashboards, printable resources, and conversation starters that make it easy to set healthy AI habits at home and school. Stay informed and empowered — not left behind.',
    link: 'Get the guides'
  }
];

const ValuesPillars = () => (
  <section id="offerings" className="section" style={{ background: 'var(--color-bg)' }}>
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-label">What We Build</span>
        <h2 className="section-title">Three Core Pillars</h2>
        <p className="section-sub">A complete foundation for kids, families, and educators navigating an AI-powered world.</p>
      </div>
      <div className="pillars-grid">
        {pillars.map((p, i) => (
          <div key={i} className={`pillar-card ${p.color} animate-fade-up delay-${i + 1}`}>
            <div className={`pillar-icon ${p.color}`}>{p.icon}</div>
            <div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
            <a href="#waitlist" className="pillar-link">
              {p.link} <span>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValuesPillars;
