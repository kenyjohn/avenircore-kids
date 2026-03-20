import React from 'react';

const Pillars = () => {
    const pillars = [
        {
            title: "AI Literacy & Values for Kids",
            desc: "Bite-sized lessons, stories, and challenges that teach what AI is, how it works, safety, ethics, and critical thinking. So kids grow curious and confident, not dependent.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
            )
        },
        {
            title: "Safe AI Study Companion",
            desc: "A homework/study helper that explains step-by-step, encourages reflection, and is intentionally designed not to be just an answer-giver. So homework becomes understanding, not shortcuts.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
            )
        },
        {
            title: "Guides for Parents & Teachers",
            desc: "Dashboards, guides, printable resources, and conversation prompts that make it easy to set healthy AI rules. So adults feel informed and empowered, not left behind.",
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            )
        }
    ];

    return (
        <section id="offerings" className="section-padding" style={{ backgroundColor: 'var(--color-bg-light)' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Three Core Pillars</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>Building a balanced foundation for the future.</p>
                </div>

                <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    {pillars.map((pillar, index) => (
                        <div key={index} style={{
                            backgroundColor: 'white',
                            padding: '2rem',
                            borderRadius: 'var(--radius-lg)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                color: 'var(--color-green)',
                                marginBottom: '1.5rem',
                                padding: '1rem',
                                backgroundColor: 'var(--color-green-soft)',
                                borderRadius: '50%'
                            }}>
                                {pillar.icon}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{pillar.title}</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>{pillar.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default Pillars;
