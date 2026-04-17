// ─── api/subscribe-gate.js ────────────────────────────────────────────────────
// Vercel Serverless Function — Content Gate subscriber endpoint.
// Accepts POST { email, source } → adds contact to Resend Audience.
//
// Separate from /api/subscribe.js (which handles Beehiiv waitlist signups).
//
// Environment variables required (set in Vercel dashboard):
//   RESEND_API_KEY      — your Resend API key
//   RESEND_AUDIENCE_ID  — your Resend audience/list ID (create one in Resend dashboard)
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

  // ── Origin guard (production only) ───────────────────────────────────────────
  const origin = req.headers.origin || req.headers.referer || '';
  const isAllowed = ALLOWED_ORIGINS.some(o => origin.startsWith(o));
  if (!isAllowed && process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ── Payload size guard (matches /api/subscribe.js) ────────────────────────
  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 2048) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  // ── Parse body ───────────────────────────────────────────────────────────────
  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const { email: rawEmail, source: rawSource } = body || {};

  if (!rawEmail || typeof rawEmail !== 'string') {
    return res.status(400).json({ error: 'Email is required' });
  }

  const email = rawEmail.trim().toLowerCase().slice(0, 254); // RFC 5321 max
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Strip control chars from source (defence-in-depth)
  const source = typeof rawSource === 'string'
    ? rawSource.replace(/[\u0000-\u001F\u007F]/g, '').slice(0, 50)
    : 'content-gate';

  // ── Config guard ──────────────────────────────────────────────────────────────
  const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
  const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID ?? '';

  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    console.error('[subscribe-gate] Missing RESEND_API_KEY or RESEND_AUDIENCE_ID');
    // Fail open — don't block the user if we're misconfigured
    return res.status(200).json({ ok: true, warn: 'config_missing' });
  }

  // ── Add to Resend Audience ────────────────────────────────────────────────────
  try {
    const resendRes = await fetch(
      `https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          unsubscribed: false,
          data: {
            source,
            subscribed_at: new Date().toISOString(),
          },
        }),
      }
    );

    // 409 = already subscribed — treat as success
    if (resendRes.status === 409) {
      return res.status(200).json({ ok: true, alreadySubscribed: true });
    }

    if (!resendRes.ok) {
      const errBody = await resendRes.json().catch(() => ({}));
      console.error('[subscribe-gate] Resend error:', resendRes.status, errBody);
      return res.status(502).json({ error: 'Could not save subscription' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[subscribe-gate] Fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
