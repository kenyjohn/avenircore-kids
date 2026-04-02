import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/posts'
import { safeJsonLd } from '../utils/security'

const TEACHER_ARTICLES = [
  {
    slug: 'ai-classroom-safety-guide',
    icon: '🛡️',
    order: 1,
  },
  {
    slug: 'detect-ai-homework-guide',
    icon: '🔍',
    order: 2,
  },
  {
    slug: 'ai-lesson-planning-for-teachers',
    icon: '📚',
    order: 3,
  },
  {
    slug: 'ai-prompts-for-group-work',
    icon: '🤝',
    order: 4,
  },
]

// JSON-LD for the pillar page
const teacherHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'A Teacher’s Quick Guide to AI (2026)',
  description: 'Everything teachers need to know about using AI in the classroom safely, detecting AI homework, and saving time with lesson planning. Updated for 2026.',
  url: 'https://avenircore.com/blog/teachers-ai-guide',
  publisher: { '@type': 'Organization', name: 'AvenirCore', url: 'https://avenircore.com' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avenircore.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://avenircore.com/blog' },
    { '@type': 'ListItem', position: 3, name: 'Teacher Hub — AI Guide', item: 'https://avenircore.com/blog/teachers-ai-guide' },
  ],
}

const TeacherHub = () => {
  const allPosts = getAllPosts()

  // Match teacher slugs to their full post data
  const teacherPosts = TEACHER_ARTICLES
    .map(item => {
      const post = allPosts.find(p => p.slug === item.slug)
      return post ? { ...post, icon: item.icon, order: item.order } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)

  return (
    <>
      <Helmet>
        <title>A Teacher’s Quick Guide to AI (2026) | AvenirCore Educators</title>
        <meta name="description" content="The ultimate hub for educators using AI in 2026. Practical guides on classroom safety, homework detection, and 10x lesson planning. From AvenirCore." />
        <meta name="keywords" content="AI for teachers 2026, AI lesson planning guide, AI classroom safety, detect AI homework, AI group work prompts" />
        <link rel="canonical" href="https://avenircore.com/blog/teachers-ai-guide" />
        <meta property="og:title" content="A Teacher’s Quick Guide to AI (2026)" />
        <meta property="og:description" content="Reclaim your weekends and lead the AI revolution in your school. The complete guide for educators." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://avenircore.com/blog/teachers-ai-guide" />
        <meta property="og:image" content="https://avenircore.com/og-image.png" />
        <script type="application/ld+json">{safeJsonLd(teacherHubSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <Link to="/blog" style={{ color: '#4f46e5', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
            <span>›</span>
            <span>Teacher Hub — AI Guide</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)', padding: '4.5rem 0 3.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1, fontSize: '15rem' }}>🎓</div>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={{ background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', borderColor: 'rgba(99,102,241,0.3)' }}>
            Educator Hub · Professional Guide
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.1 }}>
            The Teacher’s Hub:<br />Master AI in 2026
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#c7d2fe', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Built for educators who want to move past the "AI fear" and into high-impact, time-saving, safe teaching methods.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <span>✅</span> FERPA/GDPR Compliance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
              <span>✅</span> Pedagogy-First Strategy
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          {/* Intro */}
          <div className="blog-content" style={{ marginBottom: '3.5rem', maxWidth: '720px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-navy)', fontWeight: 500, lineHeight: 1.6 }}>By 2026, AI has become as standard in the classroom as the whiteboard. But the learning curve is still high—and the risks are real.</p>
            <p>This hub is your command center for the modern classroom. We have condensed 500+ hours of teacher feedback into these primary guides, designed to help you reclaim your time and lead your students into the future.</p>
          </div>

          {/* Article list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '4rem' }}>
            {teacherPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="pillar-article-card" style={{ borderColor: 'rgba(79, 70, 229, 0.15)' }}>
                  <div className="pillar-article-num" style={{ color: '#818cf8' }}>{String(post.order).padStart(2, '0')}</div>
                  <div className="pillar-article-icon" style={{ background: '#eef2ff', color: '#4f46e5' }}>{post.icon}</div>
                  <div className="pillar-article-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <span className="section-label" style={{ margin: 0, fontSize: '0.6rem', color: '#4f46e5', background: '#e0e7ff', borderColor: '#c7d2fe' }}>FOR EDUCATORS</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{post.readingTime}</span>
                    </div>
                    <h2 className="pillar-article-title">{post.title}</h2>
                    <p className="pillar-article-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="pillar-article-arrow" style={{ color: '#4f46e5' }}>→</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Key Principles */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: '2.5rem', marginBottom: '3.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#312e81', marginBottom: '1.5rem' }}>
              The 3 Rules of the AI Classroom
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Human-in-the-Loop', desc: 'AI is a thinking partner, not a decision-maker. Always review AI output before it touches a student desk.' },
                { title: 'Data Stealth', desc: 'Assume every prompt is public. Never input student names, grades, or sensitive behavioral data into generic AI.' },
                { title: 'Process over Product', desc: 'In 2026, the final essay is less important than the reflection, the oral defense, and the research process.' },
              ].map(rule => (
                <div key={rule.title} style={{ padding: '1.25rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #f1f5f9' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#4f46e5', marginBottom: '0.5rem' }}>{rule.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div style={{ background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', borderRadius: 'var(--radius-xl)', padding: '3rem 2rem', textAlign: 'center', border: '1.5px solid #a5b4fc' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '0.75rem', color: '#312e81' }}>The Weekly Teacher-AI Brief</h3>
            <p style={{ color: '#4338ca', marginBottom: '2rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Join 1,200+ educators getting the latest prompts, tools, and pedagogy guidance for the AI era. No jargon. No hype. Just teaching.
            </p>
            <button className="btn" style={{ background: '#4f46e5', color: 'white', fontWeight: 800, padding: '0.85rem 2rem' }} onClick={() => window.location.href = '/#waitlist'}>
              Join the Educator Waitlist →
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default TeacherHub
