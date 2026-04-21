import React from 'react';
import ProductCard from './ProductCard';

// ─────────────────────────────────────────────
// WORKBOOK CATALOGUE — add future products here
// ─────────────────────────────────────────────
const WORKBOOKS = [
  {
    id: 'ai-adventure',
    title: 'My AI Adventure Workbook',
    tagline: 'Screen-free AI literacy for curious younger learners. From what AI is to why it matters — in 9 hands-on chapters.',
    badge: '🌟 Best Seller',
    accentColor: '#F2C94C',
    coverImage: '/images/workbook-cover.png',
    price: 13,
    ages: '6–12',
    grades: 'Grades 1–6',
    pages: 28,
    chapters: 9,
    gumroadUrl: 'https://avenircore.gumroad.com/l/aiadventure',
    audience: ['Parents', 'Teachers', 'Homeschoolers'],
    highlights: [
      '9 structured chapters from AI basics to ethics',
      'Drawing, puzzles, and prompt-writing activities',
      'No screens, no apps, no logins required',
      'B&W printer friendly — classroom print licence included',
    ],
    chapterList: [
      { id: 1, title: 'What Is AI?', desc: "Discover what makes a computer intelligent — and what it can't do" },
      { id: 2, title: 'How AI Learns', desc: 'Training data, patterns, and why mistakes make AI smarter' },
      { id: 3, title: 'AI Eyes & Ears', desc: 'Computer vision, speech recognition, and how machines perceive the world' },
      { id: 4, title: 'Good AI, Bad AI?', desc: 'Ethics, bias, and the human responsibility behind every algorithm' },
      { id: 5, title: 'Talk to AI', desc: 'Write your first AI prompt and learn what makes a great question' },
      { id: 6, title: 'Design Your AI Pet', desc: 'Invent an AI companion, build its training plan, set its personality' },
      { id: 7, title: 'AI in My World', desc: 'An AI Safari — spot real AI in everyday life this week' },
      { id: 8, title: 'My AI Pledge', desc: 'A keepsake commitment to using AI wisely and kindly' },
      { id: 9, title: 'The Future of AI', desc: 'Timelines, predictions, and the jobs kids will shape tomorrow' },
    ],
  },
  {
    id: 'ai-heroes',
    title: 'AI Heroes: A Workbook for Tomorrow\'s Builders',
    tagline: 'Deep-dive AI fluency for curious pre-teens ready to go beyond the basics and start thinking like builders.',
    badge: '🚀 New Release',
    accentColor: '#5DC5A8',
    coverImage: '/images/aiheroes_thumbnail.png',
    price: 15,
    ages: '10–14',
    grades: 'Grades 5–9',
    pages: 32,
    chapters: 10,
    gumroadUrl: 'https://avenircore.gumroad.com/l/aiheroes',
    audience: ['Parents', 'Teachers', 'Middle School'],
    highlights: [
      '10 advanced chapters on AI fluency and real-world use',
      'Prompt engineering, AI careers, and creative problem solving',
      'Ethical AI scenarios with debate and reasoning exercises',
      'FERPA/COPPA safe — no student accounts ever required',
    ],
    chapterList: [
      // Placeholder — update with actual AI Heroes chapter list from Gumroad
      { id: 1, title: 'How AI Really Works', desc: 'Under the hood: models, training, and neural networks explained simply' },
      { id: 2, title: 'Prompting Like a Pro', desc: 'The art and science of talking to AI effectively' },
      { id: 3, title: 'AI & Creativity', desc: 'How AI creates — and what that means for human artists' },
      { id: 4, title: 'Data & Bias', desc: 'Where AI goes wrong and why the data we feed it matters' },
      { id: 5, title: 'AI in Science', desc: 'From drug discovery to climate modelling — AI as a research tool' },
      { id: 6, title: 'Building with AI', desc: 'No-code and low-code AI tools — your first AI project' },
      { id: 7, title: 'AI & Jobs', desc: 'Which jobs AI changes and the new careers it creates' },
      { id: 8, title: 'Ethics in Action', desc: 'Real scenarios, real decisions — what would you do?' },
      { id: 9, title: 'AI Safety', desc: "Alignment, oversight, and why these are the most important problems" },
      { id: 10, title: 'Your AI Manifesto', desc: 'Write your personal commitment to shaping AI for good' },
    ],
  },
];

const ProductsGrid = () => (
  <section
    id="workbooks"
    className="section"
    style={{ background: 'var(--color-bg)', paddingTop: '5rem', paddingBottom: '5rem' }}
  >
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <h2
          className="section-title"
          style={{ color: 'var(--color-ink)', marginBottom: '0.75rem' }}
        >
          Choose your workbook
        </h2>
        <p className="section-sub">
          Both workbooks are screen-free, COPPA-safe, and instantly downloadable.
          Pick the one that matches your child's age — or get both and save.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        {WORKBOOKS.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            featured={i === 0}
          />
        ))}
      </div>

      {/* Bundle nudge */}
      <div
        style={{
          marginTop: '2.5rem',
          textAlign: 'center',
          padding: '1.5rem 2rem',
          background: 'var(--color-white)',
          borderRadius: '1rem',
          border: '1.5px dashed var(--color-border)',
          maxWidth: '560px',
          margin: '2.5rem auto 0',
        }}
      >
        <p style={{ fontSize: '0.95rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.6 }}>
          🎒 <strong style={{ color: 'var(--color-ink)' }}>Have kids in both age groups?</strong>{' '}
          Buy both workbooks and cover your whole classroom or family for just $28.{' '}
          <a
            href="https://avenircore.gumroad.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-indigo)', fontWeight: 700, textDecoration: 'none' }}
          >
            See all products →
          </a>
        </p>
      </div>
    </div>
  </section>
);

export default ProductsGrid;
