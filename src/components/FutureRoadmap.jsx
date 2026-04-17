import React from 'react';
import { Link } from 'react-router-dom';

const items = [
  { phase: 'Now', title: 'Foundation', desc: 'Waitlist open. Community building & early access.', active: true, done: true },
  { phase: 'Q3 2026', title: 'Stories', desc: 'AI literacy stories and guided activities for ages 6–10.', active: true, done: true, link: '/stories' },
  { phase: 'Q4 2026', title: 'Study Companion', desc: 'Safe homework helper for ages 11–14 with parent visibility.', active: false },
  { phase: '2027', title: 'Dashboards', desc: 'Full family and teacher dashboards with progress insights.', active: false },
];

const FutureRoadmap = () => (
  <section id="vision" className="roadmap-section">
    <div className="container">
      <div className="text-center" style={{ marginBottom: '3rem' }}>
        <span className="section-label">Our Vision</span>
        <h2 className="section-title">Where We're Going</h2>
        <p className="section-sub">Each phase builds the foundation kids need to thrive in an AI-powered future.</p>
      </div>

      {/* Compact horizontal timeline */}
      <div className="roadmap-timeline">
        {items.map((item, i) => (
          <div key={i} className={`roadmap-node ${item.done ? 'done' : item.active ? 'active' : 'upcoming'}`}>
            <div className="roadmap-node-dot">
              {item.done ? '✓' : <span>{i + 1}</span>}
            </div>
            {i < items.length - 1 && <div className={`roadmap-connector${item.done ? ' filled' : ''}`} />}
            <div className="roadmap-node-content">
              <div className="roadmap-phase-label">{item.phase}</div>
              <div className="roadmap-node-title">
                {item.link
                  ? <Link to={item.link} style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>{item.title}</Link>
                  : item.title}
              </div>
              <p className="roadmap-node-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FutureRoadmap;
