import React from 'react';

const FutureRoadmap = () => {
    const items = [
        {
            quarter: "Phase 1 (Now)",
            title: "Building the Foundation",
            desc: "Waitlist open. Community building. Core charter definition."
        },
        {
            quarter: "Phase 2",
            title: "Interactive Storytelling",
            desc: "Launch of first bite-sized AI literacy stories for kids."
        },
        {
            quarter: "Phase 3",
            title: "Study Companion Beta",
            desc: "Early access to the safe, values-driven study helper."
        },
        {
            quarter: "Phase 4",
            title: "Parent Dashboards",
            desc: "Full visibility and resources for parents and teachers."
        }
    ];

    return (
        <section id="vision" className="section-padding" style={{ backgroundColor: 'var(--color-navy-dark)', color: 'white', overflow: 'hidden' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>Our Vision</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', opacity: 0.8, marginBottom: '1rem' }}>Preparing a generation for an AI-powered world.</p>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-green)', maxWidth: '600px', margin: '0 auto' }}>
                        Each phase strengthens the core foundation kids need to thrive in an AI-powered future.
                    </p>
                </div>

                <div className="roadmap-grid">
                    {items.map((item, index) => (
                        <div key={index} style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            padding: '2rem',
                            borderRadius: 'var(--radius-md)',
                            borderLeft: `4px solid var(--color-green)`,
                            marginBottom: '1rem'
                        }}>
                            <div style={{ fontSize: '0.875rem', color: 'var(--color-green)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                                {item.quarter}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'white' }}>{item.title}</h3>
                            <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', opacity: 0.8 }}>
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FutureRoadmap;
