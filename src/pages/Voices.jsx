import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { safeJsonLd } from '../utils/security';
import voicesData from '../data/voices';
import voicesMeta from '../data/voices-meta';
import VoiceCard from '../components/VoiceCard';
import VoicesBlogSection from '../components/VoicesBlogSection';

export default function Voices() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { stats } = voicesMeta;

  // Filter client-side
  const filteredVoices = useMemo(() => {
    return voicesData.filter(v => {
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Teachers') return v.audience === 'teacher';
      if (activeFilter === 'Parents') return v.audience === 'parent';
      if (activeFilter === 'Grades K–5') return v.grades === 'k5';
      if (activeFilter === 'Grades 6–8') return v.grades === '68';
      return true;
    });
  }, [activeFilter]);

  // Sort: featured first
  const sortedVoices = useMemo(() => {
    return [...filteredVoices].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [filteredVoices]);

  // Contact Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bot submission
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Voices Contributor',
          email,
          type: 'teacher',
          message: 'Voices submission: Please send the short testimonial template.'
        }),
      });

      if (!res.ok) throw new Error('API failure');
      setSuccess(true);
      setEmail('');
    } catch {
      setError('Something went wrong. Please email us directly at hello@avenircore.com');
    } finally {
      setLoading(false);
    }
  };

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Voices — Teachers & parents on AvenirCore',
    description: 'Real stories from educators and parents using AvenirCore to teach AI literacy to children ages 6–14.',
    url: 'https://avenircore.com/voices',
    publisher: {
      '@type': 'Organization',
      name: 'AvenirCore',
      url: 'https://avenircore.com',
    }
  };

  return (
    <>
      <Helmet>
        <title>Voices — Teachers & parents on AvenirCore | AvenirCore</title>
        <meta name="description" content="Real stories from educators and parents using AvenirCore to teach AI literacy to children ages 6–14." />
        <link rel="canonical" href="https://avenircore.com/voices" />
        
        <meta property="og:title" content="Voices — Teachers & parents on AvenirCore | AvenirCore" />
        <meta property="og:description" content="Real stories from educators and parents using AvenirCore to teach AI literacy to children ages 6–14." />
        <meta property="og:url" content="https://avenircore.com/voices" />
        <meta property="og:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:type" content="image/jpeg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="Voices — Teachers & parents on AvenirCore | AvenirCore" />
        <meta name="twitter:description" content="Real stories from educators and parents using AvenirCore to teach AI literacy to children ages 6–14." />
        <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        
        <script type="application/ld+json">{safeJsonLd(collectionSchema)}</script>
      </Helmet>

      {/* ── Hero Section ── */}
      <section style={{ padding: '5rem 0 3rem', background: 'var(--color-bg)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--color-emerald-soft) 0%, transparent 70%)', opacity: 0.5, pointerEvents: 'none' }} />
        <div className="container text-center animate-fade-up">
          <span className="section-label" style={{ background: 'var(--color-emerald-soft)', color: 'var(--color-emerald)' }}>
            From the classroom
          </span>
          <h1 className="section-title" style={{ marginTop: '1rem', color: 'var(--color-navy)' }}>
            Real stories from teachers & parents
          </h1>
          <p className="section-sub">
            How educators and families are using AvenirCore to bring AI literacy into everyday learning.
          </p>

          {/* Stat Pills */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2.5rem' }}>
            <div style={{ background: 'var(--color-white)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              <span style={{ color: 'var(--color-emerald)', fontSize: '1.1rem', fontWeight: 900 }}>{stats.educators}</span> Educators
            </div>
            <div style={{ background: 'var(--color-white)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              <span style={{ color: 'var(--color-emerald)', fontSize: '1.1rem', fontWeight: 900 }}>Grade K–{stats.gradeLevels}</span> Represented
            </div>
            <div style={{ background: 'var(--color-white)', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-pill)', padding: '0.6rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: 'var(--shadow-sm)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-navy)' }}>
              <span style={{ color: 'var(--color-emerald)', fontSize: '1.1rem', fontWeight: 900 }}>{stats.countries}</span> Countries
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials Grid ── */}
      <section style={{ padding: '2rem 0 5rem', background: 'var(--color-bg)' }}>
        <div className="container">
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem' }}>
            {['All', 'Teachers', 'Parents', 'Grades K–5', 'Grades 6–8'].map(filter => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  className={isActive ? 'btn btn-primary' : 'btn btn-outline'}
                  style={{ padding: '0.45rem 1.25rem', fontSize: '0.85rem' }}
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Grid list */}
          {sortedVoices.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔭</div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '1rem' }}>No testimonials match this filter yet.</p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {sortedVoices.map(voice => (
                <div
                  key={voice.id}
                  data-audience={voice.audience}
                  data-grades={voice.grades}
                >
                  <VoiceCard voice={voice} />
                </div>
              ))}
            </div>
          )}

          {/* ── Classroom Blog Section ── */}
          <VoicesBlogSection />

          {/* ── CTA Form ── */}
          <div
            className="reveal"
            style={{
              marginTop: '5rem',
              padding: '3rem 2.5rem',
              background: 'var(--color-emerald-bg)',
              borderRadius: 'var(--radius-xl)',
              border: '1.5px solid var(--color-emerald-soft)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌱</div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
              Share your story
            </h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '580px', margin: '0 auto 2rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Used AvenirCore in your classroom or at home? We'd love to feature your experience and let other educators learn from you.
            </p>

            {success ? (
              <div style={{ padding: '1rem 0' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--color-emerald)', fontWeight: 700 }}>
                  ✓ Template request sent! Check your email inbox shortly.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto' }}>
                {/* Honeypot field */}
                <input
                  type="text"
                  name="email_verify"
                  style={{ display: 'none' }}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    style={{
                      padding: '0.8rem 1.25rem',
                      borderRadius: 'var(--radius-pill)',
                      border: '1.5px solid var(--color-border)',
                      fontSize: '0.95rem',
                      outline: 'none',
                      flex: 1,
                      minWidth: '240px',
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? 'Sending...' : 'Get the template'}
                  </button>
                </div>

                {error && (
                  <p style={{ color: 'var(--color-error, #ef4444)', fontSize: '0.875rem', marginTop: '1rem', marginBottom: 0 }}>
                    {error}
                  </p>
                )}
              </form>
            )}

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1.5rem', marginBottom: 0 }}>
              We'll send you a short template. All testimonials published with your consent.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
