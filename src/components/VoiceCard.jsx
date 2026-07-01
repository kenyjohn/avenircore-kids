import React from 'react';

const tagStyles = {
  grade: {
    bg: 'var(--color-purple-soft)',
    color: 'var(--color-purple)',
  },
  subject: {
    bg: 'var(--color-emerald-soft)',
    color: 'var(--color-emerald)',
  },
  feature: {
    bg: 'var(--color-amber-soft)',
    color: 'var(--color-amber)',
  }
};

const avatarBgColors = {
  teal: 'var(--color-emerald-soft)',
  purple: 'var(--color-purple-soft)',
  amber: 'var(--color-amber-soft)',
  coral: 'rgba(255, 126, 107, 0.15)',
};

const avatarTextColors = {
  teal: 'var(--color-emerald)',
  purple: 'var(--color-purple)',
  amber: 'var(--color-amber)',
  coral: 'var(--color-coral)',
};

export default function VoiceCard({ voice }) {
  const { quote, tags, tagTypes, person, avatarColor, featured } = voice;

  return (
    <div
      className={`voice-card animate-fade-up ${featured ? 'voice-card--featured' : ''}`}
      style={{
        background: 'var(--color-white)',
        border: featured ? '2.5px solid var(--color-emerald)' : '1.5px solid var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.25rem 2rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        position: 'relative',
        boxShadow: featured ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
        transition: 'transform 0.22s, box-shadow 0.22s, border-color 0.22s',
        height: '100%',
      }}
    >
      {/* Featured Badge */}
      {featured && (
        <span
          className="featured-badge"
          style={{
            position: 'absolute',
            top: '-12px',
            left: '2rem',
            background: 'var(--color-emerald)',
            color: 'var(--color-white)',
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            padding: '0.25rem 0.75rem',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 2px 8px rgba(5,150,105,0.25)',
          }}
        >
          Featured
        </span>
      )}

      {/* Quote Mark */}
      <span
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '4.5rem',
          lineHeight: '1',
          color: 'var(--color-emerald)',
          display: 'block',
          height: '2rem',
          marginTop: '-1rem',
          opacity: 0.8,
          userSelect: 'none',
        }}
        aria-hidden="true"
      >
        “
      </span>

      {/* Quote Text */}
      <blockquote
        style={{
          margin: 0,
          fontSize: '0.925rem',
          fontWeight: 400,
          color: 'var(--color-text)',
          lineHeight: 1.75,
          flex: 1,
        }}
      >
        {quote}
      </blockquote>

      {/* Tags Row */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tags.map((tag, idx) => {
          const type = tagTypes[idx] || 'subject';
          const style = tagStyles[type] || tagStyles.subject;
          return (
            <span
              key={tag}
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-pill)',
                background: style.bg,
                color: style.color,
                fontFamily: 'var(--font-heading)',
              }}
            >
              {tag}
            </span>
          );
        })}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--color-border)', margin: '0.25rem 0' }} />

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Avatar Initials Circle */}
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: avatarBgColors[avatarColor] || 'var(--color-emerald-soft)',
            color: avatarTextColors[avatarColor] || 'var(--color-emerald)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.875rem',
            fontFamily: 'var(--font-heading)',
            flexShrink: 0,
            border: `1.5px solid ${avatarTextColors[avatarColor] || 'var(--color-emerald)'}33`,
          }}
        >
          {person.initials}
        </div>

        {/* Person Stack */}
        <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '0.925rem',
              color: 'var(--color-navy)',
              lineHeight: 1.25,
            }}
          >
            {person.name}
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              color: 'var(--color-text-muted)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {person.role} · {person.location}
          </span>
        </div>
      </div>
    </div>
  );
}
