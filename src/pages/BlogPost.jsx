import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { getPostBySlug } from '../utils/posts'

const BlogPost = () => {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) return <Navigate to="/blog" replace />

  const { Content, title, description, date, category, keywords, faqs, author = 'AvenirCore Team', readingTime } = post

  // JSON-LD FAQ Schema
  const faqSchema = faqs ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null

  // JSON-LD Article Schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    author: { '@type': 'Organization', name: 'AvenirCore', url: 'https://avenircore.com' },
    publisher: { '@type': 'Organization', name: 'AvenirCore', url: 'https://avenircore.com' },
    datePublished: date,
    url: `https://avenircore.com/blog/${slug}`,
  }

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
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
      </Helmet>

      <article>
        {/* Hero */}
        <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem', color: 'white' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <Link to="/blog" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
              ← Back to blog
            </Link>
            <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>{category}</span>
            <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.15 }}>
              {title}
            </h1>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', flexWrap: 'wrap' }}>
              <span>By {author}</span>
              <span>{date}</span>
              {readingTime && <span>· {readingTime}</span>}
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: '3rem 0', background: 'var(--color-bg)' }}>
          <div className="container" style={{ maxWidth: '760px' }}>
            <div className="blog-content">
              <Content />
            </div>

            {/* FAQ section */}
            {faqs && (
              <div style={{ marginTop: '3rem', padding: '2rem', background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Frequently Asked Questions</h2>
                {faqs.map((faq, i) => (
                  <details key={i} style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)' }}>
                    <summary style={{ fontWeight: 700, cursor: 'pointer', color: 'var(--color-navy)' }}>{faq.q}</summary>
                    <p style={{ marginTop: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>{faq.a}</p>
                  </details>
                ))}
              </div>
            )}

            {/* CTA */}
            <div style={{ marginTop: '3rem', padding: '2.5rem', background: 'var(--color-emerald-bg)', borderRadius: 'var(--radius-xl)', textAlign: 'center' }}>
              <h3 style={{ fontWeight: 800, marginBottom: '0.75rem' }}>Want more guides like this?</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>Join 500+ parents on our free weekly newsletter.</p>
              <button className="btn btn-primary" onClick={() => window.location.href = '/#waitlist'}>
                Join the Waitlist →
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

export default BlogPost
