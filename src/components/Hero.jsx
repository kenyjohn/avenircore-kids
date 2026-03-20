import React from 'react';
import HeroIllustration from './HeroIllustration';

const Hero = () => {
    return (
        <section className="section-padding" style={{ paddingBottom: '0' }}>
            <div className="container grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '4rem' }}>
                <div className="hero-content">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--color-navy-dark)' }}>
                        The core foundation for kids in an AI world.
                    </h1>
                    <p style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-main)', maxWidth: '500px' }}>
                        AvenirCore helps kids, parents, and teachers use AI wisely—building future-ready skills on strong values.
                    </p>
                    <p style={{ fontSize: '1rem', color: 'var(--color-navy)', fontWeight: '500', marginBottom: '2.5rem', maxWidth: '500px' }}>
                        AvenirCore is where the future meets strong foundations for kids, families, and schools.
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-primary" onClick={() => document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' })}>
                            Get early access
                        </button>
                        <button className="btn btn-secondary" onClick={() => document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' })}>
                            See how it works
                        </button>
                    </div>
                </div>
                <div className="hero-visual">
                    <HeroIllustration />
                </div>
            </div>
        </section>
    );
};

export default Hero;
