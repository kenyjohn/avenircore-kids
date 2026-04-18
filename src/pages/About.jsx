import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { safeJsonLd } from '../utils/security'

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'John & Abigail Kennedy',
  url: 'https://avenircore.com/about',
  jobTitle: 'Founders, AvenirCore',
  worksFor: { '@type': 'Organization', name: 'AvenirCore', url: 'https://avenircore.com' },
  sameAs: [
    'https://www.linkedin.com/in/johnkennedythangarajan',
    'https://github.com/johnkennedythangarajan',
  ],
  knowsAbout: ['AI education for children', 'Digital values', 'Family technology', 'AI literacy', 'Child safety online'],
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'AvenirCore',
  url: 'https://avenircore.com',
  description: 'AI literacy education platform for children ages 6–14. Values-driven, COPPA compliant, built for families and schools.',
  founder: [
    { '@type': 'Person', name: 'John Kennedy', sameAs: 'https://www.linkedin.com/in/johnkennedythangarajan' },
    { '@type': 'Person', name: 'Abigail Kennedy' },
  ],
  foundingDate: '2026',
  knowsAbout: ['AI literacy for kids', 'Children digital safety', 'AI education', 'COPPA compliance'],
  contactPoint: { '@type': 'ContactPoint', email: 'hello@avenircore.com', contactType: 'general enquiry' },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://avenircore.com' },
    { '@type': 'ListItem', position: 2, name: 'About', item: 'https://avenircore.com/about' },
  ],
}

const VALUES = [
  { icon: '❤️', title: 'Values before features', desc: 'Every product decision starts with one question: does this put children\'s character and wellbeing first?' },
  { icon: '🔒', title: 'Privacy without compromise', desc: 'We will never sell data, show ads to children, or use manipulative design patterns. Ever.' },
  { icon: '🧠', title: 'Teach, don\'t replace', desc: 'AI should build thinking, not bypass it. Every tool we make is designed to guide, question, and explain — not just answer.' },
  { icon: '👨‍👩‍👧', title: 'Families in the loop', desc: 'Parents and teachers are partners, not afterthoughts. We keep them informed, empowered, and in control.' },
  { icon: '🌍', title: 'Built for every child', desc: 'Not just English-speaking, not just US-based. Values-driven AI education should be accessible to families worldwide.' },
]

const START_HERE = [
  { href: '/blog/ai-for-kids-guide', label: 'The Complete Parent Guide to AI for Kids', tag: 'Parents' },
  { href: '/blog/teachers-ai-guide', label: 'The Teacher\'s Complete Guide to AI in the Classroom', tag: 'Educators' },
  { href: '/blog/is-ai-safe-for-kids', label: 'Is AI Safe for Kids? What Every Parent Needs to Know', tag: 'Safety' },
]

const About = () => {
  const navigate = useNavigate()

  const handleWaitlist = () => {
    navigate('/#waitlist')
  }

  return (
    <>
      <Helmet>
        <title>About AvenirCore | Our Story, Mission & Values</title>
        <meta name="description" content="AvenirCore was built by parents and educators who believe children deserve better AI tools. Learn about our founders, mission, and values charter." />
        <meta name="keywords" content="about AvenirCore, AI education founders, kids AI safety mission, COPPA children platform" />
        <link rel="canonical" href="https://avenircore.com/about" />
        <meta property="og:title" content="About AvenirCore | Our Story, Mission & Values" />
        <meta property="og:description" content="We built AvenirCore because children deserve AI tools built around their values, not just their attention." />
        <meta property="og:url" content="https://avenircore.com/about" />
        <meta property="og:type" content="profile" />
        <script type="application/ld+json">{safeJsonLd(personSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(orgSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
      </Helmet>

      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <span>About</span>
          </nav>
        </div>
      </div>

      <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: '#34d399' }}>Our story</span>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,2.8rem)', fontWeight: 900, color: 'white', margin: '1rem 0', lineHeight: 1.15 }}>
            Built by parents.<br />For every family navigating AI.
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.75 }}>
            AvenirCore started with a simple frustration: the AI tools our children encountered were built for adults, measured by engagement, and designed with no thought for character. We set out to do it differently.
          </p>
        </div>
      </div>

      <div style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '860px' }}>

          <div className="founder-grid" style={{ marginBottom: '4rem' }}>
            <div>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
                border: '3px solid var(--color-emerald-soft)',
              }}>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '1.35rem',
                  color: 'var(--color-emerald-light)',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  textAlign: 'center',
                  padding: '0 4px',
                }}>J&amp;A</span>
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-navy)', marginBottom: '0.25rem' }}>John &amp; Abigail Kennedy</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>Founders, AvenirCore</div>
              <a
                href="https://www.linkedin.com/in/johnkennedythangarajan"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', fontWeight: 600, color: 'white', background: '#0A66C2', padding: '0.4rem 0.85rem', borderRadius: 'var(--radius-pill)', textDecoration: 'none' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                LinkedIn
              </a>
            </div>
            <div className="blog-content">
              <p>We built AvenirCore because we couldn&apos;t find what we were looking for as parents. Our children were already using AI tools — at school, at home, in ways we barely knew about. The tools they were using were powerful, engaging, and completely indifferent to their character development.</p>
              <p>We bring a background in software and technology, and we work with families and communities who care deeply about values-centred upbringing. That combination made the gap impossible to ignore.</p>
              <p>AvenirCore is what we wanted to exist: an honest, practical resource that helps families engage with AI thoughtfully — not with panic, and not by pretending it isn&apos;t happening.</p>
              <p>Every article, workbook, and tool we build starts with one question: does this help children grow into thoughtful, capable people who use technology wisely? If the answer is yes, we build it. If not, we don&apos;t.</p>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: '2.5rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1rem' }}>Our mission</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', lineHeight: 1.8, fontStyle: 'italic', borderLeft: '4px solid var(--color-emerald)', paddingLeft: '1.25rem', margin: '0 0 1.5rem' }}>
              &quot;To help every child, parent, and teacher navigate artificial intelligence with confidence, clarity, and strong values at the core.&quot;
            </p>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
              We believe AI literacy is as important as reading literacy — and just as much a responsibility for families and schools to take seriously. AvenirCore exists to make that accessible, honest, and grounded in what actually matters.
            </p>
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.5rem' }}>Our values charter</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '3.5rem' }}>
            {VALUES.map((v, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.1rem 1.25rem', background: 'white', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--color-border)', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.3rem', flexShrink: 0, marginTop: '2px' }}>{v.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--color-navy)', marginBottom: '0.2rem' }}>{v.title}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-border)', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '1.25rem' }}>
              Start with our best guides
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {START_HERE.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1rem', background: 'var(--color-bg)', borderRadius: 'var(--radius-lg)', textDecoration: 'none', transition: 'background 0.15s' }}
                >
                  <span className="section-label" style={{ margin: 0, fontSize: '0.6rem', flexShrink: 0 }}>{item.tag}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>{item.label}</span>
                  <span style={{ marginLeft: 'auto', color: 'var(--color-emerald)', fontWeight: 700, flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>

          <div style={{ background: 'var(--color-emerald-bg)', borderRadius: 'var(--radius-xl)', border: '1.5px solid var(--color-emerald-soft)', padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✉️</div>
            <h3 style={{ fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Get in touch</h3>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>Questions, partnership ideas, or just want to say hello — we read every email.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:hello@avenircore.com" className="btn btn-primary">Email us →</a>
              <button type="button" className="btn btn-outline" onClick={handleWaitlist}>Join the Waitlist</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default About
