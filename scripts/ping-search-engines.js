/**
 * scripts/ping-search-engines.js
 * Simple script to notify search engines that the sitemap has been updated.
 * Run this as part of your CI/CD pipeline after deployment.
 */

const SITEMAP_URL = 'https://avenircore.com/sitemap.xml';

async function ping() {
  console.log('🚀 Notifying search engines of sitemap update...');

  // Google (Note: Ping is technically deprecated but often still triggers a crawl)
  const googleUrl = `https://www.google.com/ping?sitemap=${SITEMAP_URL}`;
  
  // Bing (IndexNow is the preferred way for Bing)
  const bingUrl = `https://www.bing.com/ping?sitemap=${SITEMAP_URL}`;

  try {
    const [gRes, bRes] = await Promise.all([
      fetch(googleUrl),
      fetch(bingUrl)
    ]);

    console.log(`✅ Google: ${gRes.status === 200 ? 'Success' : 'Failed (' + gRes.status + ')'}`);
    console.log(`✅ Bing: ${bRes.status === 200 ? 'Success' : 'Failed (' + bRes.status + ')'}`);
    
    console.log('\n✨ All done! Search engines will recrawl your sitemap shortly.');
  } catch (err) {
    console.error('❌ Error pinging search engines:', err.message);
  }
}

ping();
