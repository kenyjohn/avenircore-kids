import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPostBySlug, getRelatedPosts, getAdjacentPosts } from '../utils/posts'
import { safeJsonLd } from '../utils/security'
import AuthorBox from '../components/AuthorBox'
import ContentGate from '../components/ContentGate'

// ── Share buttons ──────────────────────────────────────────────
const ShareButtons = ({ title, slug }) => {
  const url = `https://avenircore.com/blog/${slug}`
  const encoded = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const copyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      const btn = document.getElementById('copy-btn')
      if (btn) { btn.textContent = '✓ Copied!'; setTimeout(() => { btn.textContent = 'Copy link' }, 2000) }
    })
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', padding: '1.5rem 0', borderTop: '1.5px solid var(--color-border)', borderBottom: '1.5px solid var(--color-border)', margin: '2.5rem 0' }}>
      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Share</span>

      {/* Twitter / X */}
      <a
        href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#000')}
        aria-label="Share on X (Twitter)"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X (Twitter)
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#0A66C2')}
        aria-label="Share on LinkedIn"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encoded}`}
        target="_blank"
        rel="noopener noreferrer"
        style={shareBtnStyle('#25D366')}
        aria-label="Share on WhatsApp"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>

      {/* Copy link */}
      <button
        id="copy-btn"
        onClick={copyLink}
        style={{ ...shareBtnStyle('#64748b'), background: 'none', border: '1.5px solid var(--color-border)', color: 'var(--color-text-muted)', cursor: 'pointer' }}
        aria-label="Copy link to clipboard"
      >
        Copy link
      </button>
    </div>
  )
}

const shareBtnStyle = (color) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.4rem',
  fontSize: '0.8rem',
  fontWeight: 600,
  padding: '0.45rem 0.9rem',
  borderRadius: 'var(--radius-pill)',
  background: color,
  color: 'white',
  textDecoration: 'none',
  transition: 'opacity 0.2s',
  border: 'none',
  fontFamily: 'var(--font-heading)',
})

// ── Related posts ───────────────────────────────────────────────
const RelatedPosts = ({ posts }) => {
  if (!posts.length) return null
  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-navy)' }}>
        Related articles
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
        {posts.map(p => (
          <Link key={p.slug} to={`/blog/${p.slug}`} style={{ textDecoration: 'none' }}>
            <div className="card" style={{ height: '100%' }}>
              <span className="section-label" style={{ margin: '0 0 0.6rem', fontSize: '0.62rem', display: 'inline-block' }}>{p.category}</span>
              <h3 style={{ fontSize: '0.975rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1.35, marginBottom: '0.5rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '0.75rem' }}>{p.excerpt}</p>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-emerald)' }}>Read article →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ── Prev / Next navigation ──────────────────────────────────────
const PrevNextNav = ({ prev, next }) => {
  if (!prev && !next) return null
  return (
    <div style={{ display: 'grid', gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr', gap: '1rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1.5px solid var(--color-border)' }}>
      {prev && (
        <Link to={`/blog/${prev.slug}`} style={{ textDecoration: 'none' }}>
          <div className="card" style={{ height: '100%' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>← Previous</div>
            <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1.35 }}>{prev.title}</div>
          </div>
        </Link>
      )}
      {next && (
        <Link to={`/blog/${next.slug}`} style={{ textDecoration: 'none', gridColumn: prev ? 'auto' : '1', textAlign: prev ? 'right' : 'left' }}>
          <div className="card" style={{ height: '100%', textAlign: prev ? 'right' : 'left' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Next →</div>
            <div style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--color-navy)', lineHeight: 1.35 }}>{next.title}</div>
          </div>
        </Link>
      )}
    </div>
  )
}

import { MDXProvider } from '@mdx-js/react'
import { components } from '../components/MDXComponents'

// ── Main BlogPost component ─────────────────────────────────────
const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const { Content, title, description, date, category, keywords, faqs, author = 'John & Abigail Kennedy', readingTime, howToSteps } = post

  const scrollWaitlist = () => {
    const el = document.getElementById('waitlist')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/#waitlist'
  }
  const relatedPosts = getRelatedPosts(slug, category)
  const { prev, next } = getAdjacentPosts(slug)

  // JSON-LD: Breadcrumb schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avenircore.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://avenircore.com/blog' },
      { '@type': 'ListItem', position: 3, name: title, item: `https://avenircore.com/blog/${slug}` },
    ],
  }

  // JSON-LD: FAQ schema
  const faqSchema = faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null

  const howToMinutes = readingTime?.match(/(\d+)\s*min/)?.[1]
  const howToSchema = howToSteps ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    ...(howToMinutes ? { totalTime: `PT${howToMinutes}M` } : {}),
    step: howToSteps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      url: `https://avenircore.com/blog/${slug}#step-${i + 1}`,
    })),
  } : null

  // JSON-LD: Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: {
      '@type': 'Person',
      name: author,
      url: 'https://avenircore.com/about',
      sameAs: 'https://www.linkedin.com/in/johnkennedythangarajan',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AvenirCore',
      url: 'https://avenircore.com',
      logo: { '@type': 'ImageObject', url: 'https://avenircore.com/og-image.png' },
    },
    datePublished: date,
    dateModified: date,
    url: `https://avenircore.com/blog/${slug}`,
    image: 'https://avenircore.com/og-image.png',
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://avenircore.com/blog/${slug}` },
  }

  // Blog teaser — always visible above the gate
  const blogTeaser = (
    <>
      {/* Breadcrumb nav */}
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <Link to="/blog" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
            <span>›</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '280px' }}>{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', padding: '3.5rem 0 2.5rem', color: 'white' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{category}</span>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.15 }}>
            {title}
          </h1>
          <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link to="/about" style={{ color: 'white', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.3)' }}>By {author}</Link>
            <span>{date}</span>
            {readingTime && <span>· {readingTime}</span>}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <Helmet>
        <title>{title} | AvenirCore</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={`https://avenircore.com/blog/${slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://avenircore.com/blog/${slug}`} />
        <meta property="og:image" content="https://avenircore.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://avenircore.com/og-image.png" />
        <script type="application/ld+json">{safeJsonLd(articleSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
        {faqSchema && <script type="application/ld+json">{safeJsonLd(faqSchema)}</script>}
        {howToSchema && <script type="application/ld+json">{safeJsonLd(howToSchema)}</script>}
      </Helmet>

      <article>
        <ContentGate contentType="blog" teaser={blogTeaser}>
          {/* Body */}
          <div style={{ padding: '3rem 0', background: 'var(--color-bg)' }}>
            <div className="container" style={{ maxWidth: '760px' }}>

              <div className="blog-content">
                <MDXProvider components={components}>
                  <Content />
                </MDXProvider>
              </div>

              {/* Share buttons */}
              <ShareButtons title={title} slug={slug} />

              {/* FAQ accordion */}
              {faqs && (
                <div style={{ marginTop: '2rem', padding: '2rem', background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.25rem', color: 'var(--color-navy)' }}>Frequently asked questions</h2>
                  {faqs.map((faq, i) => (
                    <details key={i} style={{ marginBottom: '0.75rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', cursor: 'pointer' }}>
                      <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--color-navy)', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                        {faq.q}
                        <span style={{ flexShrink: 0, fontSize: '1.1rem', color: 'var(--color-emerald)' }}>+</span>
                      </summary>
                      <p style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.7, paddingRight: '1rem' }}>{faq.a}</p>
                    </details>
                  ))}
                </div>
              )}

              {/* Newsletter CTA */}
              <div style={{ marginTop: '2.5rem', padding: '2.5rem', background: 'var(--color-emerald-bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1.5px solid var(--color-emerald-soft)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🌱</div>
                <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-navy)' }}>Want more guides like this?</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Join our free weekly newsletter for parents.</p>
                <button type="button" className="btn btn-primary" onClick={scrollWaitlist}>
                  Join the Waitlist →
                </button>
              </div>

              {/* Author box */}
              <AuthorBox />

              {/* Related posts */}
              <RelatedPosts posts={relatedPosts} />

              {/* Prev / Next */}
              <PrevNextNav prev={prev} next={next} />

            </div>
          </div>
        </ContentGate>
      </article>
    </>
  )
}

export default BlogPost
