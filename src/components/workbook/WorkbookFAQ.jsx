import React from 'react';

const faqs = [
  { q: "What age group is this for?", a: "The content is optimized for kids ages 6-12. Younger kids will enjoy the drawing and concepts with adult help, while older kids can engage deeply with the logic and ethical challenges independently." },
  { q: "Do I need an AI account to use this?", a: "No! The entire workbook is completely screen-free. It teaches the foundational logic and ethics of AI offline, making it completely safe and private for classroom or home use." },
  { q: "Can I print multiple copies for my classroom?", a: "Yes. Purchasing the workbook grants you a license to print copies for your immediate family or a single classroom of students. Please do not distribute the digital file." },
  { q: "Is this a physical book?", a: "No, this is a digital PDF download. You will receive access immediately upon purchase so you can print it right away." }
];

const WorkbookFAQ = () => (
  <section className="section" style={{ background: 'var(--color-bg)' }}>
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--color-ink)' }}>Frequently Asked Questions</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {faqs.map(faq => (
          <div key={faq.q} style={{ background: 'var(--color-white)', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--color-border)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-indigo)', marginBottom: '0.75rem', fontWeight: 800 }}>{faq.q}</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WorkbookFAQ;
