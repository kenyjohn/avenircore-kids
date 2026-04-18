import React from 'react';
import { Helmet } from 'react-helmet-async';
import { safeJsonLd } from '../utils/security';

// Subcomponents
import WorkbookHero from '../components/workbook/WorkbookHero';
import PersonaStrip from '../components/workbook/PersonaStrip';
import ChapterGrid from '../components/workbook/ChapterGrid';
import PersonaBenefits from '../components/workbook/PersonaBenefits';
import ActivityPreview from '../components/workbook/ActivityPreview';
import WorkbookSpecs from '../components/workbook/WorkbookSpecs';
import BuySection from '../components/workbook/BuySection';
import WorkbookFAQ from '../components/workbook/WorkbookFAQ';
import NewsletterCTA from '../components/NewsletterCTA';

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'My AI Adventure Workbook',
  description: 'A 28-page printable AI literacy workbook teaching computational thinking and ethics to kids ages 6-12 without screens.',
  image: 'https://avenircore.com/images/workbook-cover.png',
  brand: { '@type': 'Brand', name: 'AvenirCore' },
  offers: {
    '@type': 'Offer',
    url: 'https://avenircore.gumroad.com/l/aiadventure',
    priceCurrency: 'USD',
    price: '13.00',
    availability: 'https://schema.org/InStock',
    seller: { '@type': 'Organization', name: 'AvenirCore' }
  }
};

const WorkbookPage = () => {
  return (
    <>
      <Helmet>
        <title>My AI Adventure Workbook | AvenirCore Kids</title>
        <meta name="description" content="A 28-page printable AI literacy workbook teaching computational thinking and ethics to kids ages 6-12 without screens." />
        <link rel="canonical" href="https://avenircore.com/workbook" />
        <meta property="og:title" content="My AI Adventure Workbook" />
        <meta property="og:description" content="A 28-page printable AI literacy workbook teaching computational thinking and ethics to kids ages 6-12 without screens." />
        <meta property="og:image" content="https://avenircore.com/images/workbook-cover.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="My AI Adventure Workbook | AvenirCore Kids" />
        <meta name="twitter:description" content="A 28-page printable AI literacy workbook for kids ages 6–12. No screens required." />
        <meta name="twitter:image" content="https://avenircore.com/images/workbook-cover.png" />
        <script type="application/ld+json">{safeJsonLd(productSchema)}</script>
      </Helmet>

      {/* Assembly of dynamic workbook module structures */}
      <WorkbookHero />
      <PersonaStrip />
      <ChapterGrid />
      <ActivityPreview />
      <PersonaBenefits />
      <WorkbookSpecs />
      <BuySection />
      <WorkbookFAQ />

      {/* Newsletter Reusing Beehiiv Integration */}
      <div style={{ padding: '4rem 0', background: 'var(--color-bg)' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <NewsletterCTA 
            variant="end"
            heading="Not ready to buy yet?"
            subheading="Join the Educator Brief for free weekly AI classroom ideas instead."
            role="teacher"
          />
        </div>
      </div>
    </>
  );
};

export default WorkbookPage;
