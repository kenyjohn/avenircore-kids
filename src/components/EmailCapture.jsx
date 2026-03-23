import { useState } from 'react';

const EmailCapture = () => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('parent');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Replace YOUR_BEEHIIV_PUB_ID with your actual Beehiiv publication ID
      // Sign up free at beehiiv.com → Settings → API
      const BEEHIIV_PUB_ID = import.meta.env.VITE_BEEHIIV_PUB_ID || 'YOUR_PUB_ID';
      const BEEHIIV_API_KEY = import.meta.env.VITE_BEEHIIV_API_KEY || '';

      if (BEEHIIV_API_KEY && BEEHIIV_PUB_ID !== 'YOUR_PUB_ID') {
        await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BEEHIIV_API_KEY}`,
          },
          body: JSON.stringify({
            email,
            custom_fields: [
              { name: 'role', value: role },
              { name: 'first_name', value: name },
            ],
            reactivate_existing: true,
            send_welcome_email: true,
            utm_source: 'avenircore-website',
            utm_medium: 'waitlist',
          }),
        });
      }
      // Always show success even in demo mode
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <section id="waitlist" className="email-section">
        <div className="container">
          <div className="email-inner">
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 className="section-title" style={{ color: 'white', marginBottom: '1rem' }}>
              You're on the list!
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '2rem' }}>
              Thank you for joining! We'll be in touch with early access details soon.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/avenircore-kids-ai-workbook.pdf" download className="btn btn-white">
                Download Free Workbook →
              </a>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '1.5rem' }}>
              While you wait — grab your free AI Activity Workbook above!
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="email-section">
      <div className="container">
        <div className="email-inner">
          <span className="section-label" style={{ background: 'rgba(52,211,153,0.15)', color: 'var(--color-emerald-light)' }}>
            Early Access
          </span>
          <h2 className="section-title" style={{ color: 'white', marginTop: '0.5rem' }}>
            Join the Waitlist
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1.1rem', marginTop: '0.75rem' }}>
            Be first to access AI literacy tools built for kids, parents, and teachers — grounded in values from day one.
          </p>

          <form onSubmit={handleSubmit} className="email-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Your name</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Jane Smith"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">I am a...</label>
                <select className="form-select" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="parent">Parent</option>
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                  <option value="educator">Educator / Admin</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Email address</label>
              <input
                type="email"
                required
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <p style={{ color: '#fca5a5', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</p>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? 'Joining...' : 'Join Early Access →'}
            </button>

            <p className="form-privacy">
              🔒 No spam. Unsubscribe anytime. We respect your privacy and your child's.
            </p>
          </form>

          {/* Trust badges row */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem', flexWrap: 'wrap' }}>
            {[
              { icon: '🔒', label: 'COPPA Safe' },
              { icon: '🚫', label: 'No Ads to Kids' },
              { icon: '📧', label: 'No Spam' },
              { icon: '🌱', label: 'Free to Start' },
            ].map(t => (
              <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>
                <span>{t.icon}</span>{t.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmailCapture;
