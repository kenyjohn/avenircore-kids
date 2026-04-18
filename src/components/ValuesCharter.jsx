import useReveal from '../hooks/useReveal'

const VALUES = [
  {
    icon: '❤️',
    accent: 'var(--color-emerald)',
    title: 'Values at the core',
    desc: 'Not just screen time — every feature is built around character.',
  },
  {
    icon: '👨‍👩‍👧',
    accent: 'var(--color-amber)',
    title: 'Built together',
    desc: 'Designed for kids, parents, and teachers as a team — not in silos.',
  },
  {
    icon: '🧠',
    accent: 'var(--color-purple)',
    title: 'Teaches, not replaces',
    desc: 'Our AI explains and asks questions — it never does the thinking for kids.',
  },
  {
    icon: '💬',
    accent: 'var(--color-sky)',
    title: 'Clear human language',
    desc: 'No jargon. No dark patterns. Honest communication at every step.',
  },
]

const TRUST_BADGES = [
  'Zero data selling',
  'COPPA compliant',
  'No ads to kids',
  'Open to parents',
  'GDPR ready',
]

const ValuesCharter = () => {
  const ref = useReveal()

  return (
    <section id="values" className="values-section">
      <div className="container" ref={ref}>

        {/* ── Centred founder blockquote ── */}
        <div className="values-quote-wrap reveal">
          <span className="section-label">Our Charter</span>
          <blockquote className="values-blockquote">
            "We promise to never sell your child's data, to always design AI
            that explains instead of just answers, and to keep parents and
            teachers in the loop at every step of the journey."
          </blockquote>
          <div className="values-quote-author">
            <span className="values-author-avatar" aria-hidden="true">🌱</span>
            <div>
              <div className="values-author-name">The AvenirCore Founders</div>
              <div className="values-author-role">Building the future, carefully.</div>
            </div>
          </div>

          {/* Trust badge strip */}
          <div className="values-trust-strip">
            {TRUST_BADGES.map(b => (
              <span key={b} className="values-trust-badge">{b}</span>
            ))}
          </div>
        </div>

        {/* ── 2×2 value cards ── */}
        <div className="values-cards-grid">
          {VALUES.map((v, i) => (
            <div
              key={i}
              className={`value-card reveal delay-${i + 1}`}
              style={{ '--value-accent': v.accent }}
            >
              <span className="value-card-icon" aria-hidden="true">{v.icon}</span>
              <h3 className="value-card-title">{v.title}</h3>
              <p className="value-card-desc">{v.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ValuesCharter
