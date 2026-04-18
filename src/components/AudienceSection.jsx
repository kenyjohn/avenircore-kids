import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const AUDIENCES = [
  {
    emoji: '🧒',
    label: 'For Kids',
    title: 'Stories & activities',
    desc: 'Bite-sized adventures that explain AI through characters, questions, and choices. Built for ages 6–14.',
    cta: 'Explore stories',
    href: '/stories',
    accent: 'var(--color-emerald)',
  },
  {
    emoji: '👨‍👩‍👧',
    label: 'For Parents',
    title: 'Guides & conversation starters',
    desc: 'Simple resources to help families talk about AI at home — no technical background needed.',
    cta: 'Parent resources',
    href: '/blog/ai-for-kids-guide',
    accent: 'var(--color-amber)',
  },
  {
    emoji: '🎓',
    label: 'For Educators',
    title: 'Classroom-ready materials',
    desc: 'Lesson ideas, safety guides, and AI prompts designed for real classroom use in 2026.',
    cta: 'Teacher hub',
    href: '/blog/teachers-ai-guide',
    accent: 'var(--color-teacher)',
  },
]

export default function AudienceSection() {
  const ref = useReveal()

  return (
    <section id="offerings" className="audience-section">
      <div className="container" ref={ref}>
        <div className="text-center reveal" style={{ marginBottom: '3rem' }}>
          <span className="section-label">Built for your world</span>
          <h2 className="section-title">Everyone has a role to play</h2>
          <p className="section-sub">
            AvenirCore supports kids, parents, and educators — each with their own track.
          </p>
        </div>

        <div className="audience-grid">
          {AUDIENCES.map((a, i) => (
            <div
              key={a.label}
              className={`audience-card reveal delay-${i + 1}`}
              style={{ '--audience-accent': a.accent }}
            >
              <div className="audience-card-icon" aria-hidden="true">
                {a.emoji}
              </div>
              <div className="audience-card-meta">{a.label}</div>
              <h3 className="audience-card-title">{a.title}</h3>
              <p className="audience-card-desc">{a.desc}</p>
              <Link to={a.href} className="audience-card-cta">
                {a.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
