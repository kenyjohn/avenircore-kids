import HeroIllustration from './HeroIllustration';

const Hero = () => (
  <section className="hero">
    <div className="container hero-grid">
      <div className="hero-content animate-fade-up">
        <div className="hero-eyebrow">
          <span className="section-label">🌱 Now in early access</span>
        </div>
        <h1 className="hero-title">
          The <span className="highlight">core foundation</span> for kids in an AI world.
        </h1>
        <p className="hero-desc">
          AvenirCore helps kids ages 6–14 learn AI literacy, build critical thinking, and develop
          strong digital values — safely, joyfully, and together with parents and teachers.
        </p>
        <div className="hero-ctas">
          <button className="btn btn-primary btn-lg" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
            Get Early Access →
          </button>
          <button className="btn btn-outline btn-lg" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
            See How It Works
          </button>
        </div>
        <div className="hero-trust">
          {['COPPA Safe', 'No Ads for Kids', 'Parent Dashboard', 'Free to Start'].map(t => (
            <div key={t} className="trust-item">
              <div className="trust-check">✓</div>
              {t}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-visual animate-fade-up delay-2">
        <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
          <div className="hero-main-card animate-float">
            <HeroIllustration />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem', color: 'var(--color-navy)' }}>
                Today's Activity 🎯
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '0.3rem' }}>
                "What can AI see, hear, and learn?"
              </div>
              <div style={{ marginTop: '0.75rem', background: 'var(--color-emerald-soft)', borderRadius: 'var(--radius-md)', padding: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-emerald)' }}>Progress</span>
                <div style={{ background: '#d1fae5', borderRadius: '100px', height: '6px', flex: 1, margin: '0 0.75rem', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: 'var(--color-emerald)', borderRadius: '100px' }} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-emerald)' }}>65%</span>
              </div>
            </div>
          </div>

          <div className="hero-float-badge" style={{ top: '-16px', left: '-20px' }}>
            🏆 <span>Level 3 Explorer</span>
          </div>
          <div className="hero-float-badge" style={{ bottom: '30px', right: '-20px' }}>
            🔒 <span>100% Safe</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
