import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/posts'
import { safeJsonLd } from '../utils/security'

const TEACHER_ARTICLES = [
  { slug: 'ai-classroom-safety-guide', icon: '🛡️', order: 1 },
  { slug: 'detect-ai-homework-guide', icon: '🔍', order: 2 },
  { slug: 'ai-lesson-planning-for-teachers', icon: '📚', order: 3 },
  { slug: 'ai-prompts-for-group-work', icon: '🤝', order: 4 },
  { slug: 'teaching-in-the-age-of-ai-not-being-replaced', icon: '🍎', order: 5 },
]

const teacherHubSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'A Teacher’s Quick Guide to AI (2026)',
  description: 'Everything teachers need to know about using AI in the classroom safely, detecting AI homework, and saving time with lesson planning. Updated for 2026.',
  url: 'https://avenircore.com/blog/teachers-ai-guide',
  datePublished: '2026-04-02',
  dateModified: '2026-04-02',
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

const teacherFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What AI tools are safe to use in the classroom?',
      acceptedAnswer: { '@type': 'Answer', text: 'Purpose-built K-12 AI tools with FERPA compliance — including MagicSchool.ai, Diffit, and Canva for Education — are the safest choices. Generic AI chatbots like ChatGPT require direct district-level data processing agreements before classroom use.' },
    },
    {
      '@type': 'Question',
      name: 'How can teachers detect AI-generated student work?',
      acceptedAnswer: { '@type': 'Answer', text: 'The most reliable method is an oral follow-up conversation. AI detection software has unacceptably high false positive rates. If a student cannot explain their own essay in their own words, the work is likely not theirs.' },
    },
    {
      '@type': 'Question',
      name: 'Can AI really save teachers time on lesson planning?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — significantly. AI tools like MagicSchool.ai and Diffit can generate differentiated materials, rubrics, and formative assessments in seconds. Teachers who adopt a consistent weekly workflow typically reduce planning time from 8–12 hours to under 2 hours.' },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to use AI for student group work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, with clear rules. Use AI as a thinking partner — to challenge ideas and find weaknesses in arguments — not as a ghostwriter. District-approved tools, shared group accounts, and a Prompt Journal for students make AI group work both safe and educationally valuable.' },
    },
    {
      '@type': 'Question',
      name: 'What does FERPA mean for teachers using AI tools?',
      acceptedAnswer: { '@type': 'Answer', text: 'FERPA requires that student data — names, grades, learning needs, disciplinary records — cannot be shared with third-party vendors without appropriate data processing agreements. Never input identifiable student information into an AI tool that has not signed a Student Data Privacy Agreement (SDPA) with your district.' },
    },
  ],
}

import NewsletterCTA from '../components/NewsletterCTA'

const TeacherHub = () => {
  const allPosts = getAllPosts()
  const teacherPosts = TEACHER_ARTICLES
    .map(item => {
      const post = allPosts.find(p => p.slug === item.slug)
      return post ? { ...post, icon: item.icon, order: item.order } : null
    })
    .filter(Boolean)
    .sort((a, b) => a.order - b.order)

  const labelTint = { background: 'color-mix(in srgb, var(--color-teacher) 18%, transparent)', color: 'var(--color-teacher-light)', border: '1px solid color-mix(in srgb, var(--color-teacher) 30%, transparent)' }

  return (
    <>
      <Helmet>
        <title>A Teacher’s Quick Guide to AI (2026) | AvenirCore Educators</title>
        <meta name="description" content="The ultimate hub for educators using AI in 2026. Practical guides on classroom safety, homework detection, and 10x lesson planning. From AvenirCore." />
        <meta name="keywords" content="AI for teachers 2026, AI lesson planning guide, AI classroom safety, detect AI homework, AI group work prompts" />
        <link rel="canonical" href="https://avenircore.com/blog/teachers-ai-guide" />
        <meta property="og:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="AvenirCore Teacher Hub | AI Classroom Resources" />
        <meta name="twitter:description" content="Reclaim your weekends and lead the AI revolution in your school. The complete guide for educators." />
        <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <script type="application/ld+json">{safeJsonLd(teacherHubSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(teacherFaqSchema)}</script>
      </Helmet>

      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-teacher)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <Link to="/blog" style={{ color: 'var(--color-teacher)', textDecoration: 'none', fontWeight: 600 }}>Blog</Link>
            <span>›</span>
            <span>Teacher Hub — AI Guide</span>
          </nav>
        </div>
      </div>

      <div style={{ background: `linear-gradient(135deg, var(--color-teacher-bg) 0%, var(--color-teacher-bg-mid) 100%)`, padding: '4.5rem 0 3.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', opacity: 0.1, fontSize: '15rem' }}>🎓</div>
        <div className="container" style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <span className="section-label" style={labelTint}>
            Educator Hub · Professional Guide
          </span>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.1 }}>
            The Teacher’s Hub:<br />Master AI in 2026
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--color-teacher-soft)', maxWidth: '620px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Built for educators who want to move past the &quot;AI fear&quot; and into high-impact, time-saving, safe teaching methods.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              <span>✅</span> FERPA/GDPR Compliance
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              <span>✅</span> Pedagogy-First Strategy
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          <div className="blog-content" style={{ marginBottom: '3.5rem', maxWidth: '720px' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-navy)', fontWeight: 500, lineHeight: 1.6 }}>By 2026, AI has become as standard in the classroom as the whiteboard. But the learning curve is still high—and the risks are real.</p>
            <p>This hub is your command center for the modern classroom. We have condensed 500+ hours of teacher feedback into these primary guides, designed to help you reclaim your time and lead your students into the future.</p>
            
            <NewsletterCTA 
              variant="mid" 
              role="teacher"
              location="teacher-hub-mid"
              heading="Reclaim your weekends"
              subheading="Join teachers getting one practical AI classroom idea every week. Free."
            />
          </div>

          <section aria-label="Educator guides" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '4rem' }}>
            {teacherPosts.map((post) => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <div className="pillar-article-card" style={{ borderColor: 'color-mix(in srgb, var(--color-teacher) 15%, transparent)' }}>
                  <div className="pillar-article-num" style={{ color: 'var(--color-teacher-light)' }}>{String(post.order).padStart(2, '0')}</div>
                  <div className="pillar-article-icon" style={{ background: 'var(--color-teacher-bg-light)', color: 'var(--color-teacher)' }}>{post.icon}</div>
                  <div className="pillar-article-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                      <span className="section-label" style={{ margin: 0, fontSize: '0.6rem', color: 'var(--color-teacher)', background: 'var(--color-teacher-soft)', borderColor: 'var(--color-teacher-light)' }}>FOR EDUCATORS</span>
                      {post.isNew && <span style={{ background: 'var(--color-amber)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.6rem', fontWeight: 'bold' }}>NEW</span>}
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{post.readingTime}</span>
                    </div>
                    <h2 className="pillar-article-title">{post.title}</h2>
                    <p className="pillar-article-excerpt">{post.excerpt}</p>
                  </div>
                  <div className="pillar-article-arrow" style={{ color: 'var(--color-teacher)' }}>→</div>
                </div>
              </Link>
            ))}
          </section>

          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: '2.5rem', marginBottom: '3.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-teacher-bg-mid)', marginBottom: '1.5rem' }}>
              The 3 Rules of the AI Classroom
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Human-in-the-Loop', desc: 'AI is a thinking partner, not a decision-maker. Always review AI output before it touches a student desk.' },
                { title: 'Data Stealth', desc: 'Assume every prompt is public. Never input student names, grades, or sensitive behavioral data into generic AI.' },
                { title: 'Process over Product', desc: 'In 2026, the final essay is less important than the reflection, the oral defense, and the research process.' },
              ].map(rule => (
                <div key={rule.title} style={{ padding: '1.25rem', background: 'var(--color-bg)', borderRadius: '1rem', border: '1px solid var(--color-border)' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-teacher)', marginBottom: '0.5rem' }}>{rule.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{rule.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#f5f3ff', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-teacher-soft)', padding: '2.5rem', marginBottom: '3.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <span className="section-label" style={{ margin: 0, fontSize: '0.65rem', color: 'var(--color-teacher)', background: 'white', borderColor: 'var(--color-teacher-light)' }}>NEW RESOURCE</span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-teacher-bg-mid)', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                My AI Adventure Workbook
              </h2>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>A screen-free, printable 9-chapter curriculum teaching kids ages 6-12 what AI is, how it works, and why it matters.</p>
              <Link to="/workbook" className="btn" style={{ background: 'var(--color-teacher)', color: 'white' }}>Get the Workbook for your Classroom →</Link>
            </div>
            <div style={{ width: '180px', flexShrink: 0, alignSelf: 'center', transform: 'rotate(2deg)', boxShadow: 'var(--shadow-lg)', borderRadius: '8px' }}>
               <img src="/images/workbook-thumbnail.png" alt="Workbook Cover" style={{ borderRadius: '8px', border: '1px solid var(--color-border)' }} />
            </div>
          </div>

          <NewsletterCTA 
            variant="end"
            role="teacher"
            location="teacher-hub-end"
            heading="Join the Educator Brief"
            subheading="Practical, jargon-free AI guidance for teachers. Sent every Tuesday."
          />

        </div>
      </div>
    </>
  )
}

export default TeacherHub
