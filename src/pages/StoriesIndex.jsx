import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { stories } from '../data/stories';

// Age groups derived from data so they never go stale
const AGE_FILTERS = [
  { label: 'All Ages', value: 'all' },
  { label: '6–8', value: '6–8' },
  { label: '8–10', value: '8–10' },
  { label: '9–13', value: '9–13' },
  { label: '10–14', value: '10–14' },
];

const CONCEPT_EMOJIS = {
  'Pattern Recognition': '🔁',
  'AI Decision Making': '🧠',
  'Data Quality': '🕵️',
  'AI Ethics': '🌸',
  'AI Limitations': '🔍',
  'AI Bias & Fairness': '⚖️',
  'AI for Climate & Environment': '🌊',
  'AI Transparency & Hallucination': '🔎',
  'AI in Healthcare & Human Oversight': '🏥',
  'Data Privacy & Digital Rights': '🔐',
};

export default function StoriesIndex() {
  const [activeAge, setActiveAge] = useState('all');
  const navigate = useNavigate();

  const totalCount = stories.length;

  const checkAgeOverlap = (storyRange, filterRange) => {
    if (!storyRange) return false;
    // Note: uses en-dash '–'
    const [sMin, sMax] = storyRange.split('–').map(Number);
    const [fMin, fMax] = filterRange.split('–').map(Number);
    return sMin <= fMax && sMax >= fMin;
  };

  const filtered = activeAge === 'all'
    ? stories
    : stories.filter(s => checkAgeOverlap(s.ageRange, activeAge));

  const handleWaitlist = () => {
    navigate('/#waitlist');
  }

  // Dynamic meta description
  const metaDesc = `Explore ${totalCount} interactive AI literacy stories for children ages 6–14. Teach kids about fairness, privacy, climate, and critical thinking through emotionally resonant adventures.`;

  return (
    <>
      <Helmet>
        <title>AI Story Library for Kids | AvenirCore</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href="https://avenircore.com/stories" />
        <meta property="og:title" content="Interactive AI Stories for Kids | AvenirCore" />
        <meta property="og:description" content="Free interactive stories that teach kids about AI bias, privacy, and ethics. Built for families and classrooms." />
        <meta property="og:image" content="https://avenircore.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="Interactive AI Stories for Kids | AvenirCore" />
        <meta name="twitter:description" content="Free interactive stories that teach kids about AI bias, privacy, and ethics." />
        <meta name="twitter:image" content="https://avenircore.com/og-image.png" />
      </Helmet>

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="stories-hero-section">
        <div className="stories-hero-glow" />
        <div className="container stories-hero-inner">
          <div className="stories-hero-badge">
            <span className="stories-badge-dot" />
            {totalCount} Interactive Stories
          </div>
          <h1 className="stories-hero-title">
            AI Story Library
          </h1>
          <p className="stories-hero-sub">
            Real adventures about fairness, privacy, climate, and critical thinking —
            written to make the next generation curious, not anxious.
          </p>

          {/* Age filter pills */}
          <div className="stories-filter-bar" role="group" aria-label="Filter by age range">
            {AGE_FILTERS.map(f => (
              <button
                key={f.value}
                className={`stories-filter-pill${activeAge === f.value ? ' active' : ''}`}
                onClick={() => setActiveAge(f.value)}
                aria-pressed={activeAge === f.value}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Count feedback */}
          <p className="stories-filter-count">
            {filtered.length === totalCount
              ? `${totalCount} stories available`
              : `${filtered.length} of ${totalCount} stories`}
          </p>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────── */}
      <div className="section container">
        {filtered.length === 0 ? (
          <div className="stories-empty">
            <div className="stories-empty-emoji">🔭</div>
            <p>No stories match this filter yet — more coming soon!</p>
            <button className="stories-filter-pill active" onClick={() => setActiveAge('all')}>
              Show all stories
            </button>
          </div>
        ) : (
          <div className="stories-grid">
            {filtered.map(story => {
              const conceptEmoji = CONCEPT_EMOJIS[story.aiConcept] || '✨';
              return (
                <Link to={`/stories/${story.id}`} key={story.id} className="story-card">
                  {/* Banner */}
                  <div
                    className="story-card-banner"
                    style={{ backgroundColor: story.character?.color || 'var(--color-teacher-soft)' }}
                  >
                    <span className="story-card-banner-emoji">{story.character?.emoji}</span>
                    {/* Floating concept badge on banner */}
                    <span className="story-card-concept-float">
                      {conceptEmoji} {story.aiConcept}
                    </span>
                  </div>

                  <div className="story-card-inner">
                    {/* Meta badges */}
                    <div className="story-card-meta">
                      {story.ageRange && (
                        <span className="story-badge-age">Ages {story.ageRange}</span>
                      )}
                      {story.difficulty && (
                        <span className={`story-badge-diff ${story.difficulty.toLowerCase()}`}>
                          {story.difficulty}
                        </span>
                      )}
                    </div>

                    <h3 className="story-card-title">{story.title}</h3>
                    <p className="story-card-desc">{story.description}</p>

                    {/* Step count */}
                    <p className="story-card-steps">
                      {story.steps?.length ?? '?'} steps · {story.character?.name}
                    </p>

                    <div className="story-card-footer">
                      <span className="story-card-cta-link">
                        Start story →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* ── Bottom CTA strip ────────────────────────────── */}
        <div className="stories-bottom-strip">
          <div className="stories-bottom-inner">
            <span className="stories-bottom-emoji">📬</span>
            <div>
              <strong>New stories every month.</strong>
              <span> Join the waitlist to get them first.</span>
            </div>
            <button 
              type="button"
              className="btn btn-primary"
              onClick={handleWaitlist}
            >
              Join free →
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
