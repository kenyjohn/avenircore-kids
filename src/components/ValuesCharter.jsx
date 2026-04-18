import useReveal from '../hooks/useReveal'

const VALUES = [
  {
    icon: '🧭',
    tileBg: 'var(--color-emerald-soft)',
    title: 'Questions build thinkers. Answers build dependents.',
    desc: 'Our AI never hands over the answer. It teaches children how to reach it themselves — so they grow up knowing how to think with AI, not because of it.',
  },
  {
    icon: '🌱',
    tileBg: 'var(--color-amber-soft)',
    title: 'Character first. Capability second.',
    desc: 'The world has enough people who can use AI fast. We are building the generation that uses it wisely — children who question its outputs and hold onto what makes them human.',
  },
  {
    icon: '🤝',
    tileBg: 'var(--color-purple-soft)',
    title: 'No child learns in isolation.',
    desc: 'Real AI literacy happens in a thousand small moments — at dinner, in the classroom, on the walk home. We build for parents and teachers too, because they are half the lesson.',
  },
  {
    icon: '🔍',
    tileBg: 'var(--color-sky-soft)',
    title: 'Honest about what nobody fully knows yet.',
    desc: "AI's future is genuinely uncertain. We won't pretend otherwise. What we can shape is how the generation that will decide its direction grows up thinking about it.",
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
    <section id="values" className="vc-section">

      {/* Wave entry — dissolves from navy HowItWorks into white */}
      <div className="vc-wave-entry" aria-hidden="true">
        <svg viewBox="0 0 1440 56" preserveAspectRatio="none" fill="none">
          <path d="M0,0 L0,28 Q360,56 720,36 Q1080,16 1440,40 L1440,0 Z" fill="var(--color-white)" />
        </svg>
      </div>

      {/* Ambient blobs */}
      <div className="vc-blob vc-blob--emerald" aria-hidden="true" />
      <div className="vc-blob vc-blob--purple"  aria-hidden="true" />

      <div className="container vc-inner" ref={ref}>

        {/* ── LEFT COLUMN ── */}
        <div className="vc-left">
          <span className="section-label reveal">Our Charter</span>
          <h2 className="section-title reveal delay-1">Why AvenirCore?</h2>
          <p className="vc-intro reveal delay-1">
            Every AI tool teaches children something —
            whether we intend it or not.{' '}
            <strong>We intend it.</strong>{' '}
            AvenirCore is built on four principles we will never
            trade away for speed, scale, or profit.
          </p>

          <div className="vc-list">
            {VALUES.map((v, i) => (
              <div key={i} className={`vc-item reveal delay-${i + 1}`}>
                <div
                  className="vc-item-icon"
                  style={{ background: v.tileBg }}
                  aria-hidden="true"
                >
                  {v.icon}
                </div>
                <div>
                  <strong className="vc-item-title">{v.title}</strong>
                  <span className="vc-item-desc">{v.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT COLUMN — promise card ── */}
        <div className="vc-promise reveal delay-2">
          <span className="vc-quote-mark" aria-hidden="true">"</span>
          <p className="vc-quote-text">
            The children alive today are the first generation for whom
            AI has always existed. They did not discover it —{' '}
            <em>they were born into it.</em>{' '}
            The habits they form right now, the questions they learn to
            ask, the instinct to think rather than just accept — these
            become the values they carry into every decision AI will one
            day help them make. AvenirCore exists because{' '}
            <em>that formation is too important to leave to chance.</em>
          </p>
          <div className="vc-author">
            <div className="vc-avatar" aria-hidden="true">🌱</div>
            <div>
              <div className="vc-author-name">John &amp; Abigail Kennedy</div>
              <div className="vc-author-role">Founders, AvenirCore</div>
            </div>
          </div>
          <div className="vc-badges">
            {TRUST_BADGES.map(b => (
              <span key={b} className="vc-badge">{b}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Wave exit — dissolves from white into navy FutureRoadmap v2 */}
      <div className="vc-wave-exit" aria-hidden="true">
        <svg viewBox="0 0 1440 64" preserveAspectRatio="none" fill="none">
          <path d="M0,64 L0,32 Q240,0 480,24 Q720,48 960,20 Q1200,0 1440,28 L1440,64 Z" fill="var(--color-navy)" />
        </svg>
      </div>

    </section>
  )
}

export default ValuesCharter
