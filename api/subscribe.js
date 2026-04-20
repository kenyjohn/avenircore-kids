// api/subscribe.js — complete replacement

import { Resend } from 'resend';
import { generateWelcomeEmail } from './utils/welcomeEmailTemplate.js';
// Simple but effective email regex — matches RFC 5321 common cases
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Sanitise a string: trim whitespace, strip control characters, enforce max length
function sanitise(str, maxLen = 100) {
  if (typeof str !== 'string') return ''
  return str
    .trim()
    .replace(/[\u0000-\u001F\u007F]/g, '') // strip control characters
    .slice(0, maxLen)
}

// Allowed role values — allowlist prevents injection of arbitrary strings into Beehiiv
const ALLOWED_ROLES = ['parent', 'teacher', 'student', 'educator', 'general', 'other']

// Allowed origins — only allow subscriptions from official domains + localhost
const ALLOWED_ORIGINS = [
  'https://avenircore.com',
  'https://avenircore-kids.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
]

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // 2. Validate Origin (Production Security)
  const origin = req.headers.origin || req.headers.referer
  const isAllowed = ALLOWED_ORIGINS.some(allowed => origin?.startsWith(allowed))
  
  if (!isAllowed && process.env.NODE_ENV === 'production') {
    console.error(`Blocked unauthorized request from origin: ${origin}`)
    return res.status(403).json({ message: 'Forbidden' })
  }

  // 3. Enforce a reasonable body size (prevent large payload attacks)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  if (contentLength > 2048) {
    return res.status(413).json({ message: 'Payload too large' })
  }

  // 4. Parse body safely
  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ message: 'Invalid JSON body' })
  }

  const { 
    email: rawEmail, 
    role: rawRole, 
    name: rawName,
    source: rawSource,
    website: botField // Honeypot field
  } = body || {}

  // 5. Honeypot check: Bots usually fill every field.
  // If 'website' has a value, we 'pretend' success but don't call Beehiiv.
  if (botField) {
    console.warn('Bot detected via honeypot field.')
    return res.status(200).json({ success: true, note: 'Filtered' })
  }

  // 6. Validate and sanitise email
  const email = sanitise(rawEmail, 254) // RFC 5321 max email length
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required.' })
  }

  // 7. Sanitise name (optional field)
  const name = sanitise(rawName, 100)
  const source = sanitise(rawSource, 100) || 'waitlist'

  // 8. Validate role against allowlist
  const role = ALLOWED_ROLES.includes(rawRole) ? rawRole : 'general'

  // 7. Check environment variables
  // Fallback to VITE_ keys in case the Vercel dashboard wasn't updated yet to prevent 502s
  const BEEHIIV_PUB_ID = process.env.BEEHIIV_PUB_ID || process.env.VITE_BEEHIIV_PUB_ID
  const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY || process.env.VITE_BEEHIIV_API_KEY

  if (!BEEHIIV_PUB_ID || !BEEHIIV_API_KEY) {
    console.error('Missing Beehiiv configuration keys')
    return res.status(500).json({ message: 'Server configuration error.' })
  }

  // ── Prepare Tags ─────────────────────────────────────────────────────────────
  // Tags appear as bubbles in Beehiiv dashboard — very searchable.
  const tags = [`role:${role}`, `src:${source}`]
  if (source.includes('teacher')) tags.push('audience:educator')

  // 8. Forward to Beehiiv API
  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          tags,
          custom_fields: [
            { name: 'role', value: role },
            { name: 'First Name', value: name },
            { name: 'source_location', value: source },
          ],
          reactivate_existing: true,
          send_welcome_email: false, // Must be false so custom Automations (e.g. 02-parent-welcome) trigger instead of generic email
          utm_source: 'avenircore-website',
          utm_medium: 'waitlist',
          utm_campaign: source,
          referring_site: 'https://avenircore.com',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Beehiiv API error:', response.status, data)
      // Return specific error to client for debugging purposes to fix the production block
      return res.status(502).json({ message: `Beehiiv returned ${response.status}: ${data.message || JSON.stringify(data)}` })
    }

    // --- NEW: Send Beautiful Welcome Email via Resend ---
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY && email) {
      const resend = new Resend(RESEND_API_KEY);
      const subjectLine = role === 'parent' 
        ? "Welcome to AvenirCore — you're doing the right thing"
        : role === 'teacher' || role === 'educator'
        ? "Welcome to AvenirCore — thank you for being here"
        : "You're in 🌱 — here's your free AI workbook";
        
      try {
        await resend.emails.send({
          from: 'John at AvenirCore <hello@avenircore.com>',
          to: email,
          replyTo: 'hello@avenircore.com',
          subject: subjectLine,
          html: generateWelcomeEmail(role, name)
        });
      } catch (emailErr) {
        console.error('Failed to send Resend welcome email:', emailErr);
        // Do not block the primary subscription success return
      }
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Fatal API error:', error)
    return res.status(500).json({ message: 'Internal Server Error.' })
  }
}
