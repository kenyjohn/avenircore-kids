import React from 'react';
import { Helmet } from 'react-helmet-async';
import { safeJsonLd } from '../utils/security';

import CatalogueHero from '../components/workbook/CatalogueHero';
import ProductsGrid from '../components/workbook/ProductsGrid';
import AudienceStrip from '../components/workbook/AudienceStrip';
import PersonaBenefits from '../components/workbook/PersonaBenefits';
import WorkbookFAQ from '../components/workbook/WorkbookFAQ';
import NewsletterCTA from '../components/NewsletterCTA';

const catalogueSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AvenirCore AI Literacy Workbooks',
  description: 'Screen-free printable AI literacy workbooks for kids ages 6–14. No logins, no apps — just curiosity and a pencil.',
  url: 'https://avenircore.com/workbook',
  numberOfItems: 2,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Product',
        name: 'My AI Adventure Workbook',
        description: 'A 28-page printable AI literacy workbook for kids ages 6–12. 9 structured chapters covering AI concepts, ethics, and hands-on activities.',
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
      }
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Product',
        name: 'AI Heroes: A Workbook for Tomorrow\'s Builders',
        description: 'A 32-page printable AI literacy workbook for kids ages 10–14. 10 deep-dive chapters covering AI fluency, real-world applications, and ethical reasoning.',
        image: 'https://avenircore.com/images/aiheroes_thumbnail.png',
        brand: { '@type': 'Brand', name: 'AvenirCore' },
        offers: {
          '@type': 'Offer',
          url: 'https://avenircore.gumroad.com/l/aiheroes',
          priceCurrency: 'USD',
          price: '15.00',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'AvenirCore' }
        }
      }
    }
  ]
};

const WorkbookPage = () => (
  <>
    <Helmet>
      <title>AI Literacy Workbooks for Kids | AvenirCore</title>
      <meta
        name="description"
        content="Screen-free printable AI literacy workbooks for kids ages 6–14. My AI Adventure (ages 6–12) and AI Heroes (ages 10–14). No logins, no apps — just curiosity."
      />
      <link rel="canonical" href="https://avenircore.com/workbook" />
      <meta property="og:title" content="AI Literacy Workbooks for Kids | AvenirCore" />
      <meta property="og:description" content="Printable AI literacy workbooks for ages 6–14. Screen-free. COPPA-safe. Loved by teachers and parents." />
      <meta property="og:image" content="https://avenircore.com/images/workbook-cover.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@avenircore" />
      <meta name="twitter:title" content="AI Literacy Workbooks for Kids | AvenirCore" />
      <meta name="twitter:description" content="Screen-free printable workbooks teaching AI literacy to kids ages 6–14." />
      <meta name="twitter:image" content="https://avenircore.com/images/workbook-cover.png" />
      <script type="application/ld+json">{safeJsonLd(catalogueSchema)}</script>
    </Helmet>

    <CatalogueHero />
    <ProductsGrid />
    <AudienceStrip />
    <PersonaBenefits />
    <WorkbookFAQ />

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

export default WorkbookPage;
