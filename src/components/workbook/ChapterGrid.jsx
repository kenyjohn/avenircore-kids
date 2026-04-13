import React from 'react';

const chapters = [
  { id: 1, title: 'What Is AI?', desc: "Discover what makes a computer intelligent — and what it can't do" },
  { id: 2, title: 'How AI Learns', desc: 'Training data, patterns, and why mistakes make AI smarter' },
  { id: 3, title: 'AI Eyes & Ears', desc: 'Computer vision, speech recognition, and how machines perceive the world' },
  { id: 4, title: 'Good AI, Bad AI?', desc: 'Ethics, bias, and the human responsibility behind every algorithm' },
  { id: 5, title: 'Talk to AI', desc: 'Write your first AI prompt and learn what makes a great question' },
  { id: 6, title: 'Design Your AI Pet', desc: 'Invent an AI companion, build its training plan, set its personality' },
  { id: 7, title: 'AI in My World', desc: 'An AI Safari — spot real AI in everyday life this week' },
  { id: 8, title: 'My AI Pledge', desc: 'A keepsake commitment to using AI wisely and kindly' },
  { id: 9, title: 'The Future of AI', desc: 'Timelines, predictions, and the jobs kids will shape tomorrow' }
];

const ChapterGrid = () => (
  <section className="section" style={{ background: 'var(--color-bg)' }}>
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ color: 'var(--color-ink)' }}>What's Inside</h2>
        <p className="section-sub">9 structured chapters taking kids from basic concepts to ethical understanding.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {chapters.map(ch => (
          <div key={ch.id} style={{ background: 'var(--color-white)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }} className="chapter-card">
            <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--color-cream)', position: 'absolute', top: '-10px', right: '10px', zIndex: 1, lineHeight: 1 }}>{ch.id}</div>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-indigo)', marginBottom: '0.25rem' }}>CHAPTER {ch.id}</div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--color-ink)', marginBottom: '0.5rem', fontWeight: 800 }}>{ch.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.5 }}>{ch.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ChapterGrid;
