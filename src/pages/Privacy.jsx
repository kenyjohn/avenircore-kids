import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

const Privacy = () => (
  <>
    <Helmet>
      <title>Privacy Policy | AvenirCore</title>
      <meta name="description" content="AvenirCore's privacy policy — how we protect children's data, COPPA compliance, and your rights as a parent." />
      <meta property="og:title" content="Privacy Policy | AvenirCore" />
      <meta property="og:description" content="How we protect children's data and uphold COPPA standards at AvenirCore." />
      <meta property="og:image" content="https://avenircore.com/og-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@avenircore" />
      <meta name="twitter:image" content="https://avenircore.com/og-image.png" />
      <link rel="canonical" href="https://avenircore.com/privacy" />
    </Helmet>

    <div style={{ background: 'var(--color-navy)', padding: '4rem 0 3rem' }}>
      <div className="container" style={{ maxWidth: '760px' }}>
        <Link to="/" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
          ← Back to home
        </Link>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: 'white', lineHeight: 1.15 }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '0.75rem', fontSize: '0.9rem' }}>
          Last updated: March 2026 · Effective: March 2026
        </p>
      </div>
    </div>

    <div style={{ padding: '3rem 0 5rem', background: 'var(--color-bg)' }}>
      <div className="container blog-content" style={{ maxWidth: '760px' }}>

        <div style={{ background: 'var(--color-emerald-bg)', border: '1.5px solid var(--color-emerald-soft)', borderRadius: 'var(--radius-lg)', padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
          <strong style={{ color: 'var(--color-emerald)', display: 'block', marginBottom: '0.4rem' }}>Our core privacy promise</strong>
          <p style={{ margin: 0, fontSize: '0.95rem' }}>We will never sell your child's data. We will never show ads to children. We will never share personal information with third parties for marketing purposes. Ever.</p>
        </div>

        <h2>1. Who we are</h2>
        <p>AvenirCore ("we", "us", "our") operates the website at <strong>avenircore.com</strong>. We provide AI literacy resources, educational content, and tools for children ages 6–14, their parents, and teachers.</p>
        <p>For privacy questions, contact us at: <a href="mailto:privacy@avenircore.com">privacy@avenircore.com</a></p>

        <h2>2. COPPA compliance — children under 13</h2>
        <p>AvenirCore complies fully with the <strong>Children's Online Privacy Protection Act (COPPA)</strong>. We do not knowingly collect personal information from children under 13 without verifiable parental consent.</p>
        <p>Specifically, we do not:</p>
        <ul>
          <li>Require children to provide personal information to access free content</li>
          <li>Display behavioural or targeted advertising to children</li>
          <li>Share children's personal data with third parties for commercial purposes</li>
          <li>Use persistent identifiers to track children across websites or services</li>
        </ul>
        <p>If you believe we have inadvertently collected information from a child under 13 without parental consent, please contact us immediately at <a href="mailto:privacy@avenircore.com">privacy@avenircore.com</a> and we will delete it promptly.</p>

        <h2>3. Information we collect</h2>
        <p><strong>When you join our waitlist:</strong> We collect your email address and the role you selected (parent, teacher, student). We use this solely to send AvenirCore updates and early access notifications.</p>
        <p><strong>When you download the free workbook:</strong> No personal information is required to download our free PDF resources.</p>
        <p><strong>Automatically collected data:</strong> We use Vercel Analytics to collect anonymous, aggregated usage data (page views, referrer, country). This data contains no personally identifiable information and is not linked to individuals.</p>

        <h2>4. How we use your information</h2>
        <ul>
          <li>To send you AvenirCore newsletters and product updates (email subscribers only)</li>
          <li>To understand which content is most useful to our community (analytics)</li>
          <li>To improve the quality and safety of our educational resources</li>
        </ul>
        <p>We do <strong>not</strong> use your information for advertising, profiling, or sale to third parties.</p>

        <h2>5. Email communications</h2>
        <p>If you join our waitlist or newsletter, you consent to receive emails from AvenirCore. Every email includes a clearly visible unsubscribe link. We use Beehiiv to manage our newsletter. You can view Beehiiv's privacy policy at <a href="https://www.beehiiv.com/privacy" target="_blank" rel="noopener noreferrer">beehiiv.com/privacy</a>.</p>

        <h2>6. Cookies and tracking</h2>
        <p>Our website uses minimal, privacy-respecting analytics (Vercel Analytics). We do not use advertising cookies, tracking pixels, or third-party behavioural analytics. We do not serve or participate in ad networks.</p>

        <h2>7. Data retention and deletion</h2>
        <p>Email subscriber data is retained until you unsubscribe. You may request deletion of your data at any time by emailing <a href="mailto:privacy@avenircore.com">privacy@avenircore.com</a>. We will process deletion requests within 30 days.</p>

        <h2>8. Your rights (GDPR & CCPA)</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data ("right to be forgotten")</li>
          <li>Object to or restrict processing of your data</li>
          <li>Data portability — receive your data in a structured format</li>
        </ul>
        <p>To exercise any of these rights, email <a href="mailto:privacy@avenircore.com">privacy@avenircore.com</a>.</p>

        <h2>9. Third-party services</h2>
        <p>We use the following third-party services, each with their own privacy policies:</p>
        <ul>
          <li><strong>Vercel</strong> — hosting and analytics (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
          <li><strong>Beehiiv</strong> — newsletter platform (<a href="https://www.beehiiv.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
          <li><strong>Google Fonts</strong> — typography (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>)</li>
        </ul>

        <h2>10. Changes to this policy</h2>
        <p>We may update this policy as our services evolve. When we make significant changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.</p>

        <h2>11. Contact us</h2>
        <p>For any privacy questions, COPPA requests, or data deletion requests:</p>
        <ul>
          <li>Email: <a href="mailto:privacy@avenircore.com">privacy@avenircore.com</a></li>
          <li>Website: <a href="https://avenircore.com">avenircore.com</a></li>
        </ul>

      </div>
    </div>
  </>
)

export default Privacy
