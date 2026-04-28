// ─── api/subscribe-gate.js ────────────────────────────────────────────────────
// Vercel Serverless Function — Content Gate subscriber endpoint.
import { Resend } from 'resend';
import { generateGeneralWelcomeEmail, generateRoleSpecificEmail } from './utils/welcomeEmailTemplate.js';
// Accepts POST { email, source } → adds subscriber to Beehiiv (same pub as waitlist).
//
// Strategy: reuses BEEHIIV_API_KEY + BEEHIIV_PUB_ID already set in Vercel.
// No new environment variables needed.
//
// Tagged via utm_medium: 'content-gate' so you can filter in Beehiiv analytics.
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

  // ── Payload size guard ────────────────────────────────────────────────────────
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

  // ── Config — reuse Beehiiv keys already configured in Vercel ─────────────────
  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || process.env.VITE_BEEHIIV_API_KEY || '';
  const BEEHIIV_PUB_ID  = process.env.BEEHIIV_PUB_ID  || process.env.VITE_BEEHIIV_PUB_ID  || '';

  if (!BEEHIIV_API_KEY || !BEEHIIV_PUB_ID) {
    console.error('[subscribe-gate] Missing BEEHIIV_API_KEY or BEEHIIV_PUB_ID');
    // Fail open — never block a user due to a config error
    return res.status(200).json({ ok: true, warn: 'config_missing' });
  }

  // ── Subscribe to Beehiiv ──────────────────────────────────────────────────────
  try {
    const beehiivRes = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          tags: ['role:subscriber', `src:${source}`],
          custom_fields: [
            { name: 'role', value: 'subscriber' },
            { name: 'source_location', value: source },
          ],
          reactivate_existing: true,
          send_welcome_email: false,
          utm_source: 'avenircore-website',
          utm_medium: 'content-gate',       // distinguishes gate subs from waitlist
          utm_campaign: source,             // e.g. "content-gate" or "story-memory-bot"
          referring_site: 'https://avenircore.com',
        }),
      }
    );

    const data = await beehiivRes.json().catch(() => ({}));

    if (!beehiivRes.ok) {
      console.error('[subscribe-gate] Beehiiv error:', beehiivRes.status, data);
      return res.status(502).json({ error: 'Could not save subscription' });
    }

    // --- NEW: Send Beautiful Welcome Email Sequence via Resend ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    // content-gate doesn't capture name natively in the current UI, so we pass null or empty
    const name = ''; 
    // content-gate is mainly for general readers unless specified
    const role = 'general'; 
    
    if (RESEND_API_KEY && email) {
      const resend = new Resend(RESEND_API_KEY);
      
      const roleSubjectLine = "Welcome to Avenircore — AI and kids, explained simply";
        
      try {
        // Email 1: General Welcome
        await resend.emails.send({
          from: 'John at AvenirCore <hello@avenircore.com>',
          to: email,
          replyTo: 'hello@avenircore.com',
          subject: "You're in 🌱 — here's your free AI workbook",
          html: generateGeneralWelcomeEmail(name)
        });

        // 3 second delay for better inbox delivery perception
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Email 2: Role Specific
        await resend.emails.send({
          from: 'John at AvenirCore <hello@avenircore.com>',
          to: email,
          replyTo: 'hello@avenircore.com',
          subject: roleSubjectLine,
          html: generateRoleSpecificEmail(role, name)
        });
      } catch (emailErr) {
        console.error('[subscribe-gate] Failed to send Resend welcome email sequence:', emailErr);
        // Do not block the primary subscription success return
      }
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[subscribe-gate] Fetch error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
