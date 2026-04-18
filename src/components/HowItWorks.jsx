import useReveal from '../hooks/useReveal'

const STEPS = [
  {
    num: '01',
    accent: 'var(--color-emerald)',
    title: 'Explore',
    desc: 'Kids dive into guided lessons and challenges designed to spark curiosity about AI ethics and how it really works — in language they understand.',
  },
  {
    num: '02',
    accent: 'var(--color-amber)',
    title: 'Engage',
    desc: 'Our AI companion asks questions instead of just giving answers — helping kids build the critical thinking muscles that last a lifetime.',
  },
  {
    num: '03',
    accent: 'var(--color-purple)',
    title: 'Connect',
    desc: 'Parents and teachers receive simple insights and conversation starters to bridge learning at home and school — no tech expertise needed.',
  },
]

const HowItWorks = () => {
  const ref = useReveal()

  return (
    <section id="how-it-works" className="hiw-section">
      <div className="container" ref={ref}>
        <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="hiw-label">Simple Process</span>
          <h2 className="section-title hiw-title">How It Works</h2>
          <p className="section-sub hiw-sub">
            Three steps to a smarter, safer future — for the whole family.
          </p>
        </div>

        <div className="hiw-grid">
          {STEPS.map((s, i) => (
            <div key={i} className={`hiw-step reveal delay-${i + 1}`}>
              {/* Large watermark numeral */}
              <span className="hiw-watermark" aria-hidden="true">{s.num}</span>

              {/* Dashed connector to next step */}
              {i < STEPS.length - 1 && (
                <div className="hiw-connector" aria-hidden="true" />
              )}

              {/* Step number circle — coloured per step */}
              <div
                className="hiw-num"
                style={{ background: `color-mix(in srgb, ${s.accent} 15%, transparent)`, borderColor: `color-mix(in srgb, ${s.accent} 40%, transparent)` }}
              >
                <span style={{ color: s.accent }}>{s.num}</span>
              </div>

              <div className="hiw-step-tag">Step {s.num}</div>
              <h3 className="hiw-step-title">{s.title}</h3>
              <p className="hiw-step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
