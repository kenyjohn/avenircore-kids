import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const PHASES = [
  {
    phase: 'Now',
    status: 'done',
    statusLabel: 'Live',
    title: 'Foundation',
    desc: 'Waitlist open. Community building and early access for founding families.',
    accent: 'var(--color-emerald)',
  },
  {
    phase: 'Q3 2026',
    status: 'done',
    statusLabel: 'Live',
    title: 'Stories',
    desc: 'AI literacy stories and guided activities for ages 6–10.',
    accent: 'var(--color-emerald)',
    link: '/stories',
  },
  {
    phase: 'Q4 2026',
    status: 'upcoming',
    statusLabel: 'Coming soon',
    title: 'Study Companion',
    desc: 'Safe homework helper for ages 11–14 with full parent visibility.',
    accent: 'var(--color-amber)',
  },
  {
    phase: '2027',
    status: 'future',
    statusLabel: 'Planned',
    title: 'Dashboards',
    desc: 'Full family and teacher dashboards with learning progress insights.',
    accent: 'var(--color-purple)',
  },
]

const FutureRoadmap = () => {
  const ref = useReveal()

  return (
    <section id="vision" className="roadmap-v2-section">
      <div className="container" ref={ref}>

        <div className="text-center reveal" style={{ marginBottom: '3.5rem' }}>
          <span className="roadmap-v2-label">Our Vision</span>
          <h2 className="section-title roadmap-v2-title">Where We're Going</h2>
          <p className="section-sub roadmap-v2-sub">
            Each phase builds the foundation kids need to thrive in an AI-powered future.
          </p>
        </div>

        <div className="roadmap-v2-grid">
          {PHASES.map((item, i) => (
            <div
              key={i}
              className={`roadmap-v2-card reveal delay-${(i % 2) + 1} roadmap-v2-card--${item.status}`}
              style={{ '--roadmap-accent': item.accent }}
            >
              {/* Coloured accent bar top */}
              <div className="roadmap-v2-bar" aria-hidden="true" />

              <div className="roadmap-v2-card-inner">
                <div className="roadmap-v2-meta">
                  <span className="roadmap-v2-phase">{item.phase}</span>
                  <span className={`roadmap-v2-status roadmap-v2-status--${item.status}`}>
                    {item.statusLabel}
                  </span>
                </div>

                <h3 className="roadmap-v2-card-title">
                  {item.link
                    ? <Link to={item.link} className="roadmap-v2-link">{item.title}</Link>
                    : item.title}
                </h3>

                <p className="roadmap-v2-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default FutureRoadmap
