import React, { useState } from 'react';

const FAQS = [
  {
    q: 'Which workbook should I buy?',
    a: 'My AI Adventure is designed for ages 6–12 with drawing activities, simple puzzles, and foundational AI concepts. AI Heroes is designed for ages 10–14 with deeper dives into prompt engineering, AI ethics debates, and career exploration. If you have kids in both age groups, both workbooks work independently — no need to complete AI Adventure before AI Heroes.',
  },
  {
    q: 'Can I print multiple copies for my classroom?',
    a: 'Yes. Purchasing either workbook grants a licence to print copies for your immediate family or a single classroom of students. Please do not distribute the digital file or share it with other teachers — each classroom requires its own purchase.',
  },
  {
    q: 'Do my students need AI accounts or devices?',
    a: 'No. Both workbooks are completely screen-free. They teach the foundational logic, ethics, and vocabulary of AI entirely offline. This makes them 100% FERPA and COPPA safe — no logins, no tracking, no consent forms required.',
  },
  {
    q: 'Is this a physical book?',
    a: 'No — both workbooks are digital PDF downloads. You receive access immediately after purchase via Gumroad and can print them at home or at school on any standard printer. Both are optimised for black-and-white printing.',
  },
  {
    q: 'What ages are these workbooks for exactly?',
    a: 'My AI Adventure targets ages 6–12 (Grades 1–6). AI Heroes targets ages 10–14 (Grades 5–9). There is deliberate age overlap at 10–12 — in our experience, some 10-year-olds love the accessibility of AI Adventure, while others are ready for the challenge of AI Heroes. You know your child best.',
  },
  {
    q: 'Can I use these alongside classroom AI tools like ChatGPT?',
    a: 'Absolutely. Both workbooks are platform-agnostic — the concepts and activities work with or without any specific AI tool. AI Heroes in particular includes a prompt-writing chapter that pairs well with any LLM your school approves for supervised use.',
  },
  {
    q: 'Do you offer refunds?',
    a: 'Because these are instant digital downloads, we do not offer refunds once the file has been accessed. If you have a problem with your purchase, please contact us at hello@avenircore.com and we will make it right.',
  },
];

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        background: 'var(--color-white)',
        borderRadius: '1rem',
        border: '1.5px solid var(--color-border)',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          cursor: 'pointer',
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontSize: '1.05rem',
            fontWeight: 800,
            color: 'var(--color-ink)',
            fontFamily: 'var(--font-heading)',
            lineHeight: 1.4,
          }}
        >
          {faq.q}
        </span>
        <span
          style={{
            fontSize: '1.2rem',
            color: 'var(--color-indigo)',
            flexShrink: 0,
            transform: open ? 'rotate(45deg)' : 'none',
            transition: 'transform 0.2s',
            fontWeight: 900,
          }}
        >
          +
        </span>
      </button>
      {open && (
        <div style={{ padding: '0 2rem 1.5rem' }}>
          <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
};

const WorkbookFAQ = () => (
  <section className="section" style={{ background: 'var(--color-bg)' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2
        className="section-title"
        style={{ textAlign: 'center', marginBottom: '0.75rem', color: 'var(--color-ink)' }}
      >
        Frequently Asked Questions
      </h2>
      <p className="section-sub" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Questions about our workbooks, licences, or which one to choose.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {FAQS.map(faq => (
          <FAQItem key={faq.q} faq={faq} />
        ))}
      </div>
    </div>
  </section>
);

export default WorkbookFAQ;
