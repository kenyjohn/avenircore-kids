import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const NotFound = () => (
  <>
    <Helmet>
      <title>Page Not Found | AvenirCore</title>
      <meta name="robots" content="noindex" />
    </Helmet>

    <section style={{ padding: '6rem 0', textAlign: 'center', background: 'var(--color-bg)', minHeight: '60vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{ fontSize: '5rem', marginBottom: '1rem', lineHeight: 1 }}>🤖</div>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.5rem)', fontWeight: 900, color: 'var(--color-navy)', marginBottom: '1rem' }}>
          Oops — this page doesn't exist
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
          Even the best AI makes mistakes sometimes. The page you're looking for has moved, been deleted, or never existed.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            Back to Home
          </Link>
          <Link to="/blog" className="btn btn-outline btn-lg">
            Browse the Blog
          </Link>
        </div>
        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Looking for something specific?{' '}
          <a href="mailto:hello@avenircore.com" style={{ color: 'var(--color-emerald)' }}>
            Let us know
          </a>
        </p>
      </div>
    </section>
  </>
)

export default NotFound
