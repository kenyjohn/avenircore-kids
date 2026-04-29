import { Link } from 'react-router-dom'
import { stories } from '../data/stories/index'
import useReveal from '../hooks/useReveal'

const FEATURED_COUNT = 3

export default function FeaturedStories() {
  const featured = stories.slice(0, FEATURED_COUNT)
  const ref = useReveal()

  return (
    <section className="featured-section">
      <div className="container" ref={ref}>

        {/* Section header */}
        <div className="featured-header reveal">
          <h2 className="featured-heading">Featured stories</h2>
          <Link to="/stories" className="featured-browse-link">
            Browse all stories →
          </Link>
        </div>

        {/* 3-column card grid */}
        <div className="featured-grid">
          {featured.map((story, i) => (
            <Link
              key={story.id}
              to={`/stories/${story.id}`}
              className="featured-card animate-fade-up"
              style={{
                position: 'relative',
                animationDelay: `${i * 0.12}s`,
                '--card-accent': story.character?.color || 'var(--color-purple)',
              }}
            >
              {story.isNew && (
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                    background: '#16a34a',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '3px 10px',
                    borderRadius: '99px',
                    textTransform: 'uppercase',
                    pointerEvents: 'none',
                  }}
                >
                  New
                </span>
              )}
              {/* Coloured accent bar */}
              <div
                className="featured-card-accent"
                style={{ background: story.character?.color || 'var(--color-purple)' }}
                aria-hidden="true"
              />

              <div className="featured-card-body">
                {/* Icon tile */}
                <div className="featured-card-icon" aria-hidden="true">
                  {story.character?.emoji}
                </div>

                {/* Age badge */}
                {story.ageRange && (
                  <span className="featured-card-age">Ages {story.ageRange}</span>
                )}

                <h3 className="featured-card-title">{story.title}</h3>
                <p className="featured-card-desc">{story.description}</p>

                {/* Hover read cue */}
                <span className="featured-card-read" aria-hidden="true">
                  Read story →
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
