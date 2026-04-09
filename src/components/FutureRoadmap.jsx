import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { phase: 'Phase 1 · Now', title: 'Building the Foundation', desc: 'Waitlist open. Community building. Core charter definition and early access onboarding.', active: true },
  { phase: 'Phase 2 · Q3 2026', title: 'Interactive Storytelling', desc: 'Launch of first bite-sized AI literacy stories and guided activities for kids ages 6–10.', active: true, link: '/stories' },
  { phase: 'Phase 3 · Q4 2026', title: 'Study Companion Beta', desc: 'Early access to the safe, values-driven study helper for ages 11–14 with parent visibility.', active: false },
  { phase: 'Phase 4 · 2027', title: 'Family Dashboards', desc: 'Full parent and teacher dashboards with insights, conversation starters, and progress tracking.', active: false }
];

const FutureRoadmap = () => (
  <section id="vision" className="roadmap-section">
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3.5rem' }}>
        <span className="section-label">Our Vision</span>
        <h2 className="section-title">Where We're Going</h2>
        <p className="section-sub">Each phase strengthens the core foundation kids need to thrive in an AI-powered future.</p>
      </div>
      <div className="roadmap-track">
        {items.map((item, i) => (
          <div key={i} className="roadmap-item animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`roadmap-dot ${item.active ? 'active' : 'upcoming'}`}>
              {item.active ? '✓' : i + 1}
            </div>
            <div className="roadmap-phase">{item.phase}</div>
            <h3 className="roadmap-title">
              {item.link ? <Link to={item.link} style={{color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '4px'}}>{item.title}</Link> : item.title}
            </h3>
            <p className="roadmap-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FutureRoadmap;
