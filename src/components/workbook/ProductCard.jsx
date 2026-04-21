import React, { useState } from 'react';

/**
 * ProductCard — renders a single workbook as a rich product card.
 *
 * Props:
 *   product {Object}
 *     id          {string}   unique key
 *     title       {string}
 *     tagline     {string}
 *     badge       {string}   e.g. "🌟 Best Seller"
 *     accentColor {string}   CSS color value
 *     coverImage  {string}   path to cover image
 *     price       {number}
 *     ages        {string}   e.g. "6–12"
 *     grades      {string}   e.g. "Grades 1–6"
 *     pages       {number}
 *     chapters    {number}
 *     gumroadUrl  {string}
 *     highlights  {string[]} 3–4 bullet features
 *     chapterList {Array<{id, title, desc}>}
 *     audience    {string[]} e.g. ["Parents","Teachers","Homeschoolers"]
 */
const ProductCard = ({ product, featured = false }) => {
  const [chaptersOpen, setChaptersOpen] = useState(false);

  const {
    title, tagline, badge, accentColor, coverImage,
    price, ages, pages, chapters,
    gumroadUrl, highlights, chapterList, audience,
  } = product;

  return (
    <article
      style={{
        background: 'var(--color-white)',
        borderRadius: '1.5rem',
        border: featured ? `2px solid ${accentColor}` : '1.5px solid var(--color-border)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: featured ? `0 8px 32px ${accentColor}22` : '0 2px 12px rgba(0,0,0,0.06)',
      }}
      className="product-card"
    >
      {/* Badge */}
      {badge && (
        <div
          style={{
            position: 'absolute',
            top: '1.25rem',
            left: '1.25rem',
            background: accentColor,
            color: 'var(--color-ink)',
            borderRadius: '2rem',
            padding: '0.3rem 0.9rem',
            fontSize: '0.78rem',
            fontWeight: 900,
            fontFamily: 'var(--font-heading)',
            letterSpacing: '0.03em',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }}
        >
          {badge}
        </div>
      )}

      {/* Cover image strip */}
      <div
        style={{
          background: `linear-gradient(160deg, ${accentColor}18 0%, var(--color-cream) 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: '3rem 2rem 0',
          minHeight: '220px',
        }}
      >
        <img
          src={coverImage}
          alt={`${title} cover`}
          style={{
            maxWidth: '160px',
            width: '100%',
            borderRadius: '10px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.18)',
            transform: 'rotate(-1.5deg)',
            display: 'block',
          }}
          loading="lazy"
          width="160"
          height="207"
        />
      </div>

      {/* Specs strip */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          margin: '0',
          background: 'var(--color-bg)',
        }}
      >
        {[
          { label: 'Ages', value: ages },
          { label: 'Pages', value: pages },
          { label: 'Chapters', value: chapters },
        ].map((spec, i) => (
          <div
            key={spec.label}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '0.75rem 0',
              borderRight: i < 2 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-ink)', fontFamily: 'var(--font-heading)' }}>
              {spec.value}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 700 }}>
              {spec.label}
            </div>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding: '1.75rem 1.75rem 2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Audience pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
          {audience.map(a => (
            <span
              key={a}
              style={{
                background: `${accentColor}1A`,
                color: 'var(--color-ink)',
                border: `1px solid ${accentColor}55`,
                borderRadius: '2rem',
                padding: '0.2rem 0.7rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
              }}
            >
              {a}
            </span>
          ))}
        </div>

        <h2
          style={{
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'var(--color-ink)',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          {title}
        </h2>

        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          {tagline}
        </p>

        {/* Highlights */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {highlights.map(h => (
            <li
              key={h}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.6rem',
                fontSize: '0.9rem',
                color: 'var(--color-text)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: accentColor, fontWeight: 900, fontSize: '1rem', flexShrink: 0, marginTop: '0.05rem' }}>✓</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Chapter accordion teaser */}
        {chapterList && chapterList.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => setChaptersOpen(o => !o)}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: 'var(--color-indigo)',
                fontFamily: 'var(--font-heading)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
              aria-expanded={chaptersOpen}
            >
              <span style={{ transition: 'transform 0.2s', display: 'inline-block', transform: chaptersOpen ? 'rotate(90deg)' : 'none' }}>▶</span>
              {chaptersOpen ? 'Hide' : 'See'} all {chapterList.length} chapters
            </button>
            {chaptersOpen && (
              <div
                style={{
                  marginTop: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  paddingRight: '0.25rem',
                }}
              >
                {chapterList.map((ch, i) => (
                  <div
                    key={ch.id || i}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      alignItems: 'flex-start',
                      padding: '0.5rem 0.75rem',
                      background: 'var(--color-bg)',
                      borderRadius: '0.5rem',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 900,
                        color: accentColor,
                        background: `${accentColor}1A`,
                        borderRadius: '0.3rem',
                        padding: '0.15rem 0.4rem',
                        flexShrink: 0,
                        fontFamily: 'var(--font-heading)',
                        marginTop: '0.1rem',
                      }}
                    >
                      {String(ch.id).padStart(2, '0')}
                    </span>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-ink)', lineHeight: 1.3 }}>{ch.title}</div>
                      {ch.desc && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4, marginTop: '0.15rem' }}>{ch.desc}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Spacer to push CTA to bottom */}
        <div style={{ flex: 1 }} />

        {/* Price + CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1.25rem',
            background: `${accentColor}0D`,
            borderRadius: '1rem',
            border: `1px solid ${accentColor}33`,
          }}
        >
          <div>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-ink)', lineHeight: 1, fontFamily: 'var(--font-heading)' }}>
              ${price}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: 600, marginTop: '0.1rem' }}>
              Instant PDF Download
            </div>
          </div>
          <a
            href={gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{
              flex: 1,
              background: accentColor,
              color: 'var(--color-ink)',
              padding: '0.9rem 1.25rem',
              fontSize: '1rem',
              fontWeight: 900,
              textAlign: 'center',
              borderRadius: '0.75rem',
              display: 'block',
              textDecoration: 'none',
            }}
          >
            Get it on Gumroad →
          </a>
        </div>

        {/* Trust micro-copy */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
          <span>🔒 Secure checkout</span>
          <span>💳 Card / Apple / Google Pay</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
