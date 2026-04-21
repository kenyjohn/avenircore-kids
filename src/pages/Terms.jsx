import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Terms = () => (
  <>
    <Helmet>
      <title>Terms of Service | AvenirCore</title>
      <meta name="description" content="AvenirCore's terms of service — how to use our platform, age requirements, and your rights." />
      <meta property="og:title" content="Terms of Service | AvenirCore" />
      <meta property="og:description" content="The terms governing the use of AvenirCore's AI literacy platform for families." />
      <meta property="og:image" content="https://avenircore.com/avenircore-og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@avenircore" />
      <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.png" />
      <link rel="canonical" href="https://avenircore.com/terms" />
    </Helmet>

    <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <Link to="/" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
          ← Back to home
        </Link>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
          Terms of Service
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          Last updated: March 2026 · Effective: March 2026
        </p>
      </div>
    </div>

    <div style={{ padding: '3rem 0 5rem', background: 'var(--color-bg)' }}>
      <div className="container blog-content" style={{ maxWidth: '760px' }}>

        <h2>1. Acceptance of terms</h2>
        <p>By accessing or using AvenirCore at <strong>avenircore.com</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>

        <h2>2. Description of service</h2>
        <p>AvenirCore provides free educational content, resources, and tools to help children, parents, and teachers navigate artificial intelligence safely and confidently. Our current services include:</p>
        <ul>
          <li>Free educational blog articles and guides</li>
          <li>Downloadable activity workbooks</li>
          <li>A newsletter for parents and educators</li>
          <li>Early access waitlist for future products</li>
        </ul>

        <h2>3. Age requirements and parental consent</h2>
        <p>AvenirCore's website content is suitable for general audiences including families and educators. However, joining our waitlist or newsletter requires users to be at least 13 years old, or to have verifiable parental consent if under 13, in accordance with COPPA.</p>
        <p>Parents and guardians are responsible for supervising their children's use of any AI tools or platforms referenced or recommended on this site.</p>

        <h2>4. Free content and downloads</h2>
        <p>Our free resources, including blog articles and downloadable workbooks, are provided for personal, educational, and non-commercial use. You may:</p>
        <ul>
          <li>Download and print workbooks for personal or classroom use</li>
          <li>Share links to our articles</li>
          <li>Use our content for non-commercial educational purposes</li>
        </ul>
        <p>You may not republish, sell, or redistribute our content without written permission.</p>

        <h2>5. Newsletter and communications</h2>
        <p>By joining our waitlist or newsletter, you consent to receive email communications from AvenirCore. You can unsubscribe at any time using the link in any email. We will not send spam or sell your email address.</p>

        <h2>6. Intellectual property</h2>
        <p>All content on avenircore.com — including text, images, logos, and downloadable resources — is owned by AvenirCore and protected by copyright. The AvenirCore name and logo are trademarks of AvenirCore.</p>

        <h2>7. Disclaimer of warranties</h2>
        <p>AvenirCore's content is provided for educational purposes only and does not constitute professional advice. We make no warranties regarding the accuracy, completeness, or suitability of our content for any particular purpose. Always consult qualified professionals for medical, legal, or psychological advice regarding your child.</p>

        <h2>8. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, AvenirCore shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or resources.</p>

        <h2>9. Third-party links</h2>
        <p>Our website may link to third-party websites and tools. We do not endorse or control these external sites and are not responsible for their content or privacy practices. Always review the terms and privacy policies of any third-party service before use.</p>

        <h2>10. Changes to terms</h2>
        <p>We may update these terms as our services grow. The "Last updated" date will reflect any changes. Continued use of avenircore.com after changes constitutes acceptance of the updated terms.</p>

        <h2>11. Governing law</h2>
        <p>These terms are governed by applicable law. For users in the United States, COPPA (Children's Online Privacy Protection Act) and applicable state laws apply.</p>

        <h2>12. Contact</h2>
        <p>Questions about these terms? Contact us at <a href="mailto:hello@avenircore.com">hello@avenircore.com</a></p>

      </div>
    </div>
  </>
)

export default Terms
