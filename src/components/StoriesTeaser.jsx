import React from 'react';
import { Link } from 'react-router-dom';
import { stories } from '../data/stories';

// Show only the first 4 stories as "featured" — keeps the home page tight
const FEATURED_COUNT = 4;

const CONCEPT_COLORS = {
  'Pattern Recognition': '#6366f1',
  'AI Decision Making': '#8b5cf6',
  'Data Quality': '#f59e0b',
  'AI Ethics': '#ec4899',
  'AI Limitations': '#ef4444',
  'AI Bias & Fairness': '#7c3aed',
  'AI for Climate & Environment': '#0891b2',
  'AI Transparency & Hallucination': '#dc2626',
  'AI in Healthcare & Human Oversight': '#059669',
  'Data Privacy & Digital Rights': '#d97706',
};

export default function StoriesTeaser() {
  const featured = stories.slice(0, FEATURED_COUNT);
  const remaining = stories.length - FEATURED_COUNT;

  return (
    <section id="stories-preview" className="section bg-white" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Soft background pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, var(--color-navy) 1px, transparent 1px)',
        backgroundSize: '28px 28px'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div className="teaser-header">
          <div>
            <span className="section-label">Available Now · Free</span>
            <h2 className="section-title">Start Learning with AI Stories</h2>
            <p className="section-sub" style={{ maxWidth: '520px' }}>
              Bite-sized adventures that teach kids how AI really works — through stories, questions, and activities.
            </p>
          </div>
          <Link to="/stories" className="btn btn-outline teaser-see-all">
            See all {stories.length} stories →
          </Link>
        </div>

        {/* 2×2 featured grid */}
        <div className="teaser-grid">
          {featured.map((story, i) => {
            const accentColor = story.character?.color || CONCEPT_COLORS[story.aiConcept] || 'var(--color-navy)';
            return (
              <Link
                to={`/stories/${story.id}`}
                key={story.id}
                className="teaser-card animate-fade-up"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                {/* Accent bar */}
                <div className="teaser-card-bar" style={{ background: accentColor }} />

                <div className="teaser-card-body">
                  {/* Emoji + meta row */}
                  <div className="teaser-card-top">
                    <span className="teaser-emoji" style={{ background: `${accentColor}18` }}>
                      {story.character?.emoji}
                    </span>
                    <div className="teaser-meta">
                      {story.ageRange && <span className="story-badge-age">Ages {story.ageRange}</span>}
                      {story.difficulty && (
                        <span className={`story-badge-diff ${story.difficulty.toLowerCase()}`}>
                          {story.difficulty}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="teaser-card-title">{story.title}</h3>
                  <p className="teaser-card-desc">{story.description}</p>

                  <div className="teaser-card-footer">
                    <span className="story-concept-pill" style={{ fontSize: '11px' }}>
                      {story.aiConcept}
                    </span>
                    <span className="teaser-cta-link" style={{ color: accentColor }}>
                      Start →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="teaser-bottom">
          {remaining > 0 && (
            <p className="teaser-more-hint">
              + {remaining} more stories in the library
            </p>
          )}
          <Link to="/stories" className="btn btn-primary btn-lg">
            Explore All Stories →
          </Link>
        </div>
      </div>
    </section>
  );
}
