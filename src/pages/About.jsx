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

const ABOUT_VALUES = [
  { icon: '❤️', tileBg: 'var(--color-emerald-soft)', title: 'Values before features',      desc: "Every product decision starts with one question: does this put children's character and wellbeing first?" },
  { icon: '🔒', tileBg: 'var(--color-sky-soft)',     title: 'Privacy without compromise',  desc: 'We will never sell data, show ads to children, or use manipulative design patterns. Ever.' },
  { icon: '🧠', tileBg: 'var(--color-purple-soft)',  title: "Teach, don't replace",        desc: 'AI should build thinking, not bypass it. Every tool we make is designed to guide, question, and explain — not just answer.' },
  { icon: '👨‍👩‍👧', tileBg: 'var(--color-amber-soft)', title: 'Families in the loop',        desc: 'Parents and teachers are partners, not afterthoughts. We keep them informed, empowered, and in control.' },
  { icon: '🌍', tileBg: 'var(--color-emerald-soft)', title: 'Built for every child',       desc: 'Not just English-speaking, not just US-based. Values-driven AI education should be accessible to families worldwide.' },
]

const START_HERE = [
  { href: '/blog/ai-for-kids-guide',      label: 'The Complete Parent Guide to AI for Kids',               tag: 'Parents'   },
  { href: '/blog/teachers-ai-guide',      label: "The Teacher's Complete Guide to AI in the Classroom",    tag: 'Educators' },
  { href: '/blog/is-ai-safe-for-kids',    label: 'Is AI Safe for Kids? What Every Parent Needs to Know',  tag: 'Safety'    },
]

const About = () => {
  const navigate = useNavigate()
  const handleWaitlist = () => navigate('/#waitlist')

  return (
    <>
      <Helmet>
        <title>About AvenirCore | Our Story, Mission &amp; Values</title>
        <meta name="description" content="AvenirCore was built by parents and educators who believe children deserve better AI tools. Learn about our founders, mission, and values charter." />
        <meta name="keywords" content="about AvenirCore, AI education founders, kids AI safety mission, COPPA children platform" />
        <link rel="canonical" href="https://avenircore.com/about" />
        <meta property="og:title" content="About AvenirCore | Our Story, Mission & Values" />
        <meta property="og:description" content="We built AvenirCore because children deserve AI tools built around their values, not just their attention." />
        <meta property="og:url" content="https://avenircore.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="About AvenirCore | Our Story, Mission & Values" />
        <meta name="twitter:description" content="We built AvenirCore because children deserve AI tools built around their values, not just their attention." />
        <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <script type="application/ld+json">{safeJsonLd(personSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(orgSchema)}</script>
        <script type="application/ld+json">{safeJsonLd(breadcrumbSchema)}</script>
      </Helmet>

      {/* ── Breadcrumb (unchanged) ── */}
      <div style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)', padding: '0.75rem 0' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
            <Link to="/" style={{ color: 'var(--color-emerald)', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span>›</span>
            <span>About</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="ab-hero">
        <div className="ab-hero-glow"  aria-hidden="true" />
        <div className="ab-hero-glow2" aria-hidden="true" />
        <div className="ab-hero-inner">
          <span className="ab-hero-label">Our story</span>
          <h1 className="ab-hero-h1">
            Built by parents.<br />For every family navigating AI.
          </h1>
          <p className="ab-hero-sub">
            AvenirCore started with a simple frustration: the AI tools our children encountered
            were built for adults, measured by engagement, and designed with no thought for
            character. We set out to do it differently.
          </p>
        </div>
        <div className="ab-hero-wave" aria-hidden="true">
          <svg viewBox="0 0 1440 52" preserveAspectRatio="none" fill="none">
            <path d="M0,0 L0,26 Q360,52 720,32 Q1080,12 1440,36 L1440,0 Z" fill="var(--color-bg)" />
          </svg>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="ab-body">
        <div className="ab-container">

          {/* Founder card */}
          <div className="ab-founder">
            <div className="ab-founder-left">
              <div className="ab-avatar" aria-hidden="true">🌱</div>
              <div className="ab-founder-name">John &amp; Abigail Kennedy</div>
              <div className="ab-founder-role">Founders, AvenirCore</div>
              <div className="ab-social-links">
                <a
                  href="https://www.linkedin.com/in/johnkennedythangarajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ab-social-btn ab-social-btn--li"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
            <div className="ab-founder-body">
              <p>We built AvenirCore because we couldn&apos;t find what we were looking for as parents. Our children were already using AI tools — at school, at home, in ways we barely knew about. The tools they were using were powerful, engaging, and <strong>completely indifferent to their character development.</strong></p>
              <p>We bring a background in software and technology, and we work with families and communities who care deeply about values-centred upbringing. That combination made the gap impossible to ignore.</p>
              <p>AvenirCore is what we wanted to exist: an honest, practical resource that helps families engage with AI thoughtfully — not with panic, and not by pretending it isn&apos;t happening.</p>
              <p>Every article, workbook, and tool we build starts with one question: <strong>does this help children grow into thoughtful, capable people who use technology wisely?</strong> If the answer is yes, we build it. If not, we don&apos;t.</p>
            </div>
          </div>

          {/* Mission card */}
          <div className="ab-mission">
            <span className="ab-mission-label">Our mission</span>
            <h2 className="ab-mission-h2">Why we get up and build this every day</h2>
            <p className="ab-mission-quote">
              &quot;To help every child, parent, and teacher navigate artificial intelligence
              with confidence, clarity, and strong values at the core.&quot;
            </p>
            <p className="ab-mission-sub">
              We believe AI literacy is as important as reading literacy — and just as much
              a responsibility for families and schools to take seriously. AvenirCore exists
              to make that accessible, honest, and grounded in what actually matters.
            </p>
          </div>

          {/* Values charter */}
          <h2 className="ab-values-title">Our values charter</h2>
          <div className="ab-values-list">
            {ABOUT_VALUES.map((v, i) => (
              <div key={i} className="ab-value-item">
                <div className="ab-value-icon" style={{ background: v.tileBg }} aria-hidden="true">
                  {v.icon}
                </div>
                <div>
                  <strong className="ab-value-title">{v.title}</strong>
                  <span className="ab-value-desc">{v.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Resource links */}
          <h2 className="ab-res-title">Start with our best guides</h2>
          <div className="ab-resources">
            {START_HERE.map(item => (
              <Link key={item.href} to={item.href} className="ab-res-link">
                <span className="ab-res-tag">{item.tag}</span>
                <span className="ab-res-label">{item.label}</span>
                <span className="ab-res-arrow" aria-hidden="true">→</span>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* Contact closing */}
      <div className="ab-contact-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 52" preserveAspectRatio="none" fill="none">
          <path d="M0,52 L0,26 Q360,0 720,20 Q1080,40 1440,16 L1440,52 Z" fill="var(--color-navy)" />
        </svg>
      </div>
      <div className="ab-contact">
        <div className="ab-contact-inner">
          <span className="ab-contact-icon" aria-hidden="true">✉️</span>
          <h3 className="ab-contact-h3">Get in touch</h3>
          <p className="ab-contact-sub">
            Questions, partnership ideas, or just want to say hello — we read every email.
          </p>
          <div className="ab-contact-actions">
            <a href="mailto:hello@avenircore.com" className="btn btn-primary">Email us →</a>
            <button type="button" className="btn btn-outline ab-btn-outline-dark" onClick={handleWaitlist}>
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default About
