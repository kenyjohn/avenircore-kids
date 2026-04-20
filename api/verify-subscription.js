// ─── api/verify-subscription.js ────────────────────────────────────────────────
// Vercel Serverless Function — Check if an email is already a subscriber.
// Used for "Restore Access" flow in ContentGate.
// ─────────────────────────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_ORIGINS = [
  'https://avenircore.com',
  'https://avenircore-kids.vercel.app',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
];

export default async function handler(req, res) {
  // ── Method guard ─────────────────────────────────────────────────────────────
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Origin guard ─────────────────────────────────────────────────────────────
  const origin = req.headers.origin || req.headers.referer || '';
  const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
  if (!isAllowed && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { email: rawEmail } = body || {};

  if (!rawEmail || typeof rawEmail !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const email = rawEmail.trim().toLowerCase().slice(0, 254);
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // ── Config ───────────────────────────────────────────────────────────────────
  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || process.env.VITE_BEEHIIV_API_KEY || '';
  const BEEHIIV_PUB_ID  = process.env.BEEHIIV_PUB_ID  || process.env.VITE_BEEHIIV_PUB_ID  || '';

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
    console.error('[verify-subscription] Missing config');
    return res.status(500).json({ error: 'Configuration error' });
  }

  // ── Query Beehiiv ────────────────────────────────────────────────────────────
  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions/by_email/${email}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
      }
    );

    if (beehiivRes.status === 404) {
      // Not found in Beehiiv
      return res.status(200).json({ isSubscriber: false });
    }

    if (!beehiivRes.ok) {
      const errorData = await beehiivRes.json().catch(() => ({}));
      console.error('[verify-subscription] Beehiiv error:', beehiivRes.status, errorData);
      return res.status(502).json({ error: 'Communication error with provider' });
    }

    const data = await beehiivRes.json();
    
    // Check if subscription is active
    // Beehiiv status can be 'active', 'unsubscribed', 'pending', etc.
    const status = data.data?.status;
    const isSubscriber = status === 'active' || status === 'validating';

    return res.status(200).json({ isSubscriber });
  } catch (err) {
    console.error('[verify-subscription] Fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
