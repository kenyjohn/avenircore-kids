import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const AUDIENCE_OPTIONS = [
  {
    value: 'parent',
    emoji: '👨‍👩‍👧',
    label: 'Parent / Carer',
    hint: 'Questions about our stories, waitlist, or keeping your child safe online.',
  },
  {
    value: 'teacher',
    emoji: '🏫',
    label: 'Teacher / Educator',
    hint: 'Interested in using AvenirCore resources in your classroom or school.',
  },
  {
    value: 'press',
    emoji: '📰',
    label: 'Press / Partnership',
    hint: 'Media enquiries, collaboration, or partnership opportunities.',
  },
];

export default function Contact() {
  const [type, setType]           = useState('parent');
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [message, setMessage]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');

  const selectedAudience = AUDIENCE_OPTIONS.find(o => o.value === type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, type, message }),
      });

      if (!res.ok) throw new Error('Contact API failed');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try emailing us directly at hello@avenircore.com');
    }

    setLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | AvenirCore</title>
        <meta
          name="description"
          content="Get in touch with AvenirCore — questions for parents, classroom resources for teachers, or press and partnership enquiries."
        />
        <link rel="canonical" href="https://avenircore.com/contact" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact AvenirCore",
          "url": "https://avenircore.com/contact",
          "description": "Contact page for AvenirCore — safe AI education for kids.",
          "mainEntity": {
            "@type": "Organization",
            "name": "AvenirCore",
            "email": "hello@avenircore.com",
            "url": "https://avenircore.com"
          }
        })}</script>
      </Helmet>

      {/* Page header */}
      <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem' }}>
        <div className="container" style={{ maxWidth: '680px' }}>
          <Link
            to="/"
            style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}
          >
            ← Back to home
          </Link>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
            Get in Touch
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '0.75rem', fontSize: '1rem', maxWidth: '480px' }}>
            We read every message. Usually reply within 1–2 business days.
          </p>
        </div>
      </div>

      <div style={{ padding: '3rem 0 5rem', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '680px' }}>

          {submitted ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>✉️</div>
              <h2 style={{ fontWeight: 800, fontSize: '1.6rem', marginBottom: '0.75rem' }}>
                Message sent!
              </h2>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                Thanks for reaching out. We'll get back to you at <strong>{email}</strong> shortly.
              </p>
              <Link to="/" className="btn btn-primary">Back to Home</Link>
            </div>
          ) : (
            <>
              {/* Audience selector */}
              <div className="contact-audience-grid">
                {AUDIENCE_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    id={`contact-type-${opt.value}`}
                    onClick={() => setType(opt.value)}
                    className={`contact-audience-btn ${type === opt.value ? 'active' : ''}`}
                  >
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.35rem' }}>{opt.emoji}</div>
                    <div className="contact-audience-label">{opt.label}</div>
                  </button>
                ))}
              </div>

              {/* Contextual hint */}
              <p className="contact-hint">
                💬 {selectedAudience?.hint}
              </p>

              {/* Contact form */}
              <div className="form-light">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Your name</label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email address *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      className="form-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contact-message">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    className="form-input"
                    placeholder="Tell us how we can help..."
                    rows={5}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{ resize: 'vertical', minHeight: '120px' }}
                  />
                </div>

                {error && (
                  <p style={{ color: 'var(--color-error, #ef4444)', fontSize: '0.875rem' }}>{error}</p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ alignSelf: 'flex-start', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending...' : 'Send Message →'}
                </button>

                <p className="form-privacy">
                  🔒 We'll only use your email to reply. No marketing without consent.
                </p>
              </form>
              </div>{/* /form-light */}

              {/* Direct email fallback */}
              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)', textAlign: 'center' }}>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                  Prefer email directly?{' '}
                  <a href="mailto:hello@avenircore.com" style={{ color: 'var(--color-indigo)', fontWeight: 600 }}>
                    hello@avenircore.com
                  </a>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
