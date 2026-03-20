import React, { useState } from 'react';

const EmailCapture = () => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('parent');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <section id="waitlist" className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
                <div className="container text-center">
                    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>You're on the list!</h2>
                    <p>Thank you for helping us shape the future of AvenirCore.</p>
                </div>
            </section>
        )
    }

    return (
        <section id="waitlist" className="section-padding" style={{
            backgroundColor: 'var(--color-bg-light)',
            borderTop: '1px solid #e2e8f0',
            borderBottom: '1px solid #e2e8f0'
        }}>
            <div className="container" style={{ maxWidth: '600px' }}>
                <div className="text-center" style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--color-navy-dark)' }}>Join the Waitlist</h2>
                    <p style={{ color: 'var(--color-text-main)' }}>
                        Join the AvenirCore early access list and help shape tools that keep kids’ future and values at the core.
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{
                    backgroundColor: 'white',
                    padding: '2rem',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
                }}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>I am a...</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="parent">Parent</option>
                            <option value="teacher">Teacher</option>
                            <option value="student">Student</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: 'var(--radius-md)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        Join Early Access
                    </button>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '1rem', textAlign: 'center' }}>
                        No spam. Unsubscribe anytime.
                    </p>
                </form>
            </div>
        </section>
    );
};

export default EmailCapture;
