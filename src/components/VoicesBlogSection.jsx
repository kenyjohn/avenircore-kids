import React from 'react';
import { Link } from 'react-router-dom';
import { getAllPosts } from '../utils/posts';

export default function VoicesBlogSection() {
  // Query and filter posts where author is defined as an object
  const classroomPosts = getAllPosts()
    .filter(p => p.author && typeof p.author === 'object')
    .slice(0, 3);

  if (classroomPosts.length === 0) return null;

  return (
    <section className="reveal" style={{ marginTop: '5rem', paddingBottom: '2rem' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '2px solid var(--color-border)',
          paddingBottom: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <span className="section-label" style={{ marginBottom: '0.5rem' }}>From the classroom</span>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--color-navy)', margin: 0 }}>
            Teacher-Authored Articles
          </h2>
        </div>
        <Link
          to="/blog?category=classroom"
          style={{
            fontSize: '0.9rem',
            fontWeight: 700,
            color: 'var(--color-emerald)',
            textDecoration: 'none',
            fontFamily: 'var(--font-heading)',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.target.style.color = '#047857')}
          onMouseLeave={(e) => (e.target.style.color = 'var(--color-emerald)')}
        >
          See all posts →
        </Link>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {classroomPosts.map((post, index) => {
          const numberStr = String(index + 1).padStart(2, '0');
          const authorName = post.author.name;
          const authorLoc = post.author.location;

          return (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                className="voices-blog-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  alignItems: 'center',
                  gap: '1.5rem',
                  background: 'var(--color-white)',
                  border: '1.5px solid var(--color-border)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '1.5rem 2rem',
                  transition: 'transform 0.22s, box-shadow 0.22s, border-color 0.22s',
                  boxShadow: 'var(--shadow-sm)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  e.currentTarget.style.borderColor = 'var(--color-emerald-soft)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                }}
              >
                {/* Number */}
                <div
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 900,
                    color: 'var(--color-emerald-soft)',
                    lineHeight: 1,
                  }}
                >
                  {numberStr}
                </div>

                {/* Body Content */}
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-pill)',
                        background: 'var(--color-emerald-soft)',
                        color: 'var(--color-emerald)',
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {post.category || 'Teachers'}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                      By {authorName} · {authorLoc}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 800,
                      color: 'var(--color-navy)',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {post.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div
                  style={{
                    fontSize: '1.25rem',
                    color: 'var(--color-emerald)',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s',
                  }}
                >
                  →
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
