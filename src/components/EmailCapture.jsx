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
      // Securely proxy the request through our own Node server 
      // preventing the API keys from leaking to the browser and bypassing CORS
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, role, name })
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || 'Newsletter API backend failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
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
