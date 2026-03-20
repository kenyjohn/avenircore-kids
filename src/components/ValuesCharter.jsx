import React from 'react';

const ValuesCharter = () => {
    const points = [
        <><strong>Values</strong> at the core, not just screen time.</>,
        <>Built for kids, parents, and teachers <strong>together</strong>.</>,
        <>Designed to <strong>teach</strong>, not to replace thinking.</>,
        "Clear, human language—no jargon."
    ];

    return (
        <section id="values" className="section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
            <div className="container grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--color-navy-dark)' }}>
                        Why AvenirCore?
                    </h2>
                    <p style={{ fontSize: '1.125rem', marginBottom: '2rem', color: 'var(--color-text-main)' }}>
                        We believe technology should amplify human potential, not automate it away. Our tools are built on a "Values Charter" that puts character first.
                    </p>
                    <ul style={{ listStyle: 'none', space: 'y-4' }}>
                        {points.map((point, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', fontSize: '1.1rem' }}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '24px',
                                    height: '24px',
                                    backgroundColor: 'var(--color-green-soft)',
                                    color: 'var(--color-green)',
                                    borderRadius: '50%'
                                }}>✓</span>
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{
                    backgroundColor: 'var(--color-bg-light)',
                    padding: '3rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px dashed var(--color-navy)'
                }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-navy-dark)' }}>Our Promise</h3>
                    <p style={{ marginBottom: '1rem', fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                        "We promise to never sell your child's data, to always design AI that explains instead of just answers, and to keep parents and teachers in the loop at every step."
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                        <div>
                            <div style={{ fontWeight: 'bold' }}>The Founders</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>AvenirCore Team</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ValuesCharter;
