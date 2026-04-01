import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/posts'
import { safeJsonLd } from '../utils/security'

const PILLAR_ARTICLES = [
  {
    slug: 'is-ai-safe-for-kids',
    icon: '🔒',
    order: 1,
  },
  {
    slug: 'what-age-can-kids-use-ai',
    icon: '🎂',
    order: 2,
  },
  {
    slug: 'how-to-talk-to-kids-about-ai',
    icon: '💬',
    order: 3,
  },
  {
    slug: 'free-ai-tools-for-kids-2026',
    icon: '🛠️',
    order: 4,
  },
  {
    slug: 'will-ai-make-kids-lazy',
    icon: '🧠',
    order: 5,
  },
]

// JSON-LD for the pillar page
const pillarSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'The Complete Parent Guide to AI for Kids (2026)',
  description: 'Everything parents need to know about AI and children — safety, age guidance, tools, and how to have the conversation. Updated for 2026.',
  url: 'https://avenircore.com/blog/ai-for-kids-guide',
  publisher: { '@type': 'Organization', name: 'AvenirCore', url: 'https://avenircore.com' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avenircore.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://avenircore.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'AI for Kids — Complete Guide', item: 'https://avenircore.com/blog/ai-for-kids-guide' },
  ],
}

const PillarPage = () => {
  const allPosts = getAllPosts()

  // Match pillar slugs to their full post data
  const pillarPosts = PILLAR_ARTICLES
    .map(item => {
      const post = allPosts.find(p => p.slug === item.slug)
      return post ? { ...post, icon: item.icon, order: item.order } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <Helmet>
        <title>The Complete Parent Guide to AI for Kids (2026) | AvenirCore</title>
        <meta name="description" content="Everything parents need to know about AI and children in 2026 — safety, right age, best tools, having the conversation, and avoiding pitfalls. From AvenirCore." />
        <meta name="keywords" content="AI for kids guide, parent guide AI children, AI education kids 2026, safe AI kids" />
        <link rel="canonical" href="https://avenircore.com/blog/ai-for-kids-guide" />
        <meta property="og:title" content="The Complete Parent Guide to AI for Kids (2026)" />
        <meta property="og:description" content="Everything parents need to know about AI and children in one place. Safety, age guidance, tools, and how to have the conversation." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://avenircore.com/blog/ai-for-kids-guide" />
        <meta property="og:image" content="https://avenircore.com/og-image.png" />
        <script type="application/ld+json">{safeJsonLd(pillarSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <Link to="/blog" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
            <span>›</span>
            <span>AI for Kids — Complete Guide</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center' }}>
          <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>
            Complete Guide · Updated April 2026
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.15 }}>
            The Complete Parent Guide to<br />AI for Kids
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Everything you need to know about children and AI in one place — from safety and age guidance to the right tools and how to start the conversation.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
              <span>📖</span> {pillarPosts.length} in-depth articles
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
              <span>🎯</span> Written for parents, not tech experts
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
              <span>✓</span> COPPA & safety reviewed
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Intro */}
          <div className="blog-content" style={{ marginBottom: '3rem', maxWidth: '680px' }}>
            <p>AI is already part of your child's life — whether through voice assistants, homework tools, or the algorithms behind their favourite apps. The question isn't whether to engage with it. It's how to do so thoughtfully.</p>
            <p>This guide brings together everything we have written on children and AI in one place. Read it straight through for the full picture, or jump to the section most relevant to where you are right now.</p>
          </div>

          {/* Article list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            {pillarPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="pillar-article-card">
                  <div className="pillar-article-num">{String(post.order).padStart(2, '0')}</div>
                  <div className="pillar-article-icon">{post.icon}</div>
                  <div className="pillar-article-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
                      <span className="section-label" style={{ margin: 0, fontSize: '0.6rem' }}>{post.category}</span>
                      {post.readingTime && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{post.readingTime}</span>
                      )}
                    </div>
                    <h2 className="pillar-article-title">{post.title}</h2>
                    <p className="pillar-article-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="pillar-article-arrow">→</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Key takeaways */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: '2.5rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>
              The five things every parent should know
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { num: '01', text: 'AI is already in your child\'s life — through voice assistants, streaming recommendations, and school tools. Engagement beats avoidance.' },
                { num: '02', text: 'General-purpose AI tools like ChatGPT are not designed for children. Purpose-built platforms with parental controls are a safer starting point.' },
                { num: '03', text: 'The right age depends on the tool and the child, not a single number. Developmental readiness matters more than a birthday.' },
                { num: '04', text: 'AI will not make children lazy if used as a thinking tool rather than a shortcut. The difference is almost entirely in how it is used.' },
                { num: '05', text: 'The single most valuable skill you can nurture alongside AI use is critical thinking — asking whether information is accurate, why the AI might be wrong, and what they\'d do without it.' },
              ].map(item => (
                <div key={item.num} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', padding: '1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)' }}>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--color-emerald)', flexShrink: 0, minWidth: '28px' }}>{item.num}</span>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ background: 'var(--color-emerald-bg)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-emerald-soft)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📬</div>
            <h3 style={{ fontWeight: 800, marginBottom: '0.5rem', color: 'var(--color-navy)' }}>Get new guides in your inbox</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              We publish new parent guides regularly. Join 500+ families getting weekly, jargon-free AI guidance.
            </p>
            <button className="btn btn-primary" onClick={() => window.location.href = '/#waitlist'}>
              Join the Waitlist →
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default PillarPage
