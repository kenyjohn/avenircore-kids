import React from 'react';

const HowItWorks = () => {
    const steps = [
        {
            num: "01",
            title: "Explore",
            desc: "Kids dive into guided lessons and challenges designed to spark curiosity about AI ethics and mechanics."
        },
        {
            num: "02",
            title: "Engage",
            desc: "The AI companion asks questions rather than giving answers, helping kids build critical thinking muscles."
        },
        {
            num: "03",
            title: "Connect",
            desc: "Parents and teachers receive simple insights and conversation starters to bridge the gap between home and tech."
        }
    ];

    return (
        <section id="how-it-works" className="section-padding" style={{ backgroundColor: 'var(--color-navy-dark)', color: 'white' }}>
            <div className="container">
                <div className="text-center" style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white' }}>How It Works</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-light)', opacity: 0.8 }}>Simple steps to a smarter future.</p>
                </div>

                <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                    {steps.map((step, index) => (
                        <div key={index} style={{ position: 'relative', padding: '2rem 1rem' }}>
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: '700',
                                color: 'rgba(255,255,255,0.1)',
                                position: 'absolute',
                                top: '0',
                                left: '0',
                                lineHeight: 1
                            }}>
                                {step.num}
                            </div>
                            <div style={{ position: 'relative', zIndex: 1, marginTop: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-green)' }}>{step.title}</h3>
                                <p style={{ color: 'var(--color-text-light)', opacity: 0.9 }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
export default HowItWorks;
