import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'

const FEATURES = [
  { icon: '✏️', text: '10 hands-on activities for ages 6–12' },
  { icon: '💡', text: 'Prompt writing, AI safety & careers' },
  { icon: '🎓', text: 'Completion certificate included' },
  { icon: '🖨️', text: 'Printable & ready to use today' },
  { icon: '🔗', text: 'Pairs with any AI tool or classroom' },
]

const TAGS = ['10 Activities', 'Certificate', 'Printable', 'Ages 6–12']

const WorkbookCTA = () => {
  const ref = useReveal()

  return (
    <section id="workbook" className="workbook-v2-section">
      <div className="container workbook-v2-inner" ref={ref}>

        {/* ── Left column ── */}
        <div className="reveal">
          <div className="workbook-v2-free-badge">
            Free forever · No email required
          </div>
          <span className="workbook-v2-label">Free Resource</span>
          <h2 className="section-title workbook-v2-title">
            Download the Kids AI Workbook
          </h2>
          <p className="workbook-v2-desc">
            A 10-page activity workbook to introduce your child to AI concepts —
            through games, drawing, storytelling, and critical thinking challenges.
          </p>

          <div className="workbook-v2-features">
            {FEATURES.map(f => (
              <div key={f.text} className="workbook-v2-feature">
                <span className="workbook-v2-feature-icon" aria-hidden="true">{f.icon}</span>
                {f.text}
              </div>
            ))}
          </div>

          <div className="workbook-v2-ctas">
            <a href="/avenircore-kids-ai-workbook.pdf" download className="btn btn-white btn-lg">
              Download Free PDF 📥
            </a>
            <Link to="/workbook" className="btn workbook-v2-btn-outline btn-lg">
              Explore Full Catalogue →
            </Link>
          </div>
        </div>

        {/* ── Right column — illustrated cover ── */}
        <div className="workbook-v2-cover reveal delay-2" style={{ flexDirection: 'column', alignItems: 'center' }}>
          <div className="workbook-v2-cover-inner" style={{ width: '100%' }}>
            <span className="workbook-v2-cover-tag">⭐ New — 2026</span>

            {/* Book spine accent */}
            <div className="workbook-v2-spine" aria-hidden="true" />

            <div className="workbook-v2-cover-emoji" aria-hidden="true">📖</div>

            <div className="workbook-v2-cover-title">
              Free Starter Workbook
            </div>
            <div className="workbook-v2-cover-sub">
              For curious kids, ages 6–12
            </div>

            <div className="workbook-v2-price-row">
              <span className="workbook-v2-price" style={{ color: 'var(--color-emerald)' }}>Free Download</span>
            </div>

            <div className="workbook-v2-tags">
              {TAGS.map(t => (
                <span key={t} className="workbook-v2-tag">{t}</span>
              ))}
            </div>
          </div>
          
          <div style={{ marginTop: '1.5rem', textAlign: 'center', width: '100%' }}>
            <Link to="/workbook" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 500 }}>
              Loved the free starter? Discover our 30+ page premium workbooks.
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default WorkbookCTA
