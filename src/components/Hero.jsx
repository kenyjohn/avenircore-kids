import { Link } from 'react-router-dom'

const AGE_TRACKS = [
  {
    range: '6–8',
    num: 6,
    subtitle: 'Beginner — what is AI?',
    color: 'var(--color-emerald)',
    bg: 'var(--color-emerald-soft)',
    query: '6%E2%80%938',
  },
  {
    range: '9–11',
    num: 9,
    subtitle: 'Explorer — how does it think?',
    color: 'var(--color-amber)',
    bg: 'var(--color-amber-soft)',
    query: '9%E2%80%9311',
  },
  {
    range: '12–14',
    num: 12,
    subtitle: 'Thinker — what does it mean?',
    color: 'var(--color-purple)',
    bg: 'var(--color-purple-soft)',
    query: '10%E2%80%9314',
  },
]

const Hero = () => (
  <section className="hero-v2">
    <div className="hero-v2-noise" aria-hidden="true" />
    <div className="container hero-v2-grid">

      {/* ── Left column ── */}
      <div className="hero-v2-content animate-fade-up">
        <div className="hero-v2-eyebrow">
          <span className="hero-v2-dot" aria-hidden="true" />
          AI literacy for ages 6–14
        </div>

        <h1 className="hero-v2-title">
          Helping kids{' '}
          <span className="hero-v2-highlight">understand</span>{' '}
          the world of AI
        </h1>

        <p className="hero-v2-desc">
          Age-appropriate stories, guides, and lessons that turn curiosity
          into confidence — for children, parents, and educators.
        </p>

        <div className="hero-v2-ctas">
          <Link to="/stories" className="btn btn-white btn-lg">
            Explore Stories
          </Link>
          <Link
            to="/blog/teachers-ai-guide"
            className="btn hero-v2-btn-outline btn-lg"
          >
            For Teachers
          </Link>
        </div>

        <div className="hero-v2-trust">
          {['COPPA safe', 'No ads for kids', 'Free to start'].map(t => (
            <span key={t} className="hero-v2-trust-item">
              <span className="hero-v2-trust-check" aria-hidden="true">✓</span>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Right column — age-track cards ── */}
      <div className="hero-v2-tracks animate-fade-up delay-2">
        {AGE_TRACKS.map(track => (
          <Link
            key={track.range}
            to={`/stories?age=${track.query}`}
            className="age-track-card"
            aria-label={`Ages ${track.range}: ${track.subtitle}`}
          >
            <span
              className="age-track-num"
              style={{ background: track.color }}
              aria-hidden="true"
            >
              {track.num}
            </span>
            <div className="age-track-info">
              <span className="age-track-label">Ages {track.range}</span>
              <span className="age-track-sub">{track.subtitle}</span>
            </div>
            <span className="age-track-arrow" aria-hidden="true">→</span>
          </Link>
        ))}
      </div>

    </div>

    {/* Wave divider — smooth transition to next section */}
    <div className="hero-v2-wave" aria-hidden="true">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" fill="none">
        <path
          d="M0,60 L0,20 Q360,0 720,20 Q1080,40 1440,20 L1440,60 Z"
          fill="var(--color-white)"
        />
      </svg>
    </div>
  </section>
)

export default Hero
