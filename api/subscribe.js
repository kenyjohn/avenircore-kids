// api/subscribe.js — complete replacement

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
const ALLOWED_ROLES = ['parent', 'teacher', 'student', 'educator', 'other']

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  // 2. Enforce a reasonable body size (prevent large payload attacks)
  const contentLength = parseInt(req.headers['content-length'] || '0', 10)
  if (contentLength > 2048) {
    return res.status(413).json({ message: 'Payload too large' })
  }

  // 3. Parse body safely
  let body
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  } catch {
    return res.status(400).json({ message: 'Invalid JSON body' })
  }

  const { email: rawEmail, role: rawRole, name: rawName } = body || {}

  // 4. Validate and sanitise email
  const email = sanitise(rawEmail, 254) // RFC 5321 max email length
  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required.' })
  }

  // 5. Sanitise name (optional field)
  const name = sanitise(rawName, 100)

  // 6. Validate role against allowlist
  const role = ALLOWED_ROLES.includes(rawRole) ? rawRole : 'parent'

  // 7. Check environment variables
  const BEEHIIV_PUB_ID = process.env.VITE_BEEHIIV_PUB_ID
  const BEEHIIV_API_KEY = process.env.VITE_BEEHIIV_API_KEY

  if (!BEEHIIV_PUB_ID || !BEEHIIV_API_KEY) {
    console.error('Missing Beehiiv configuration keys')
    return res.status(500).json({ message: 'Server configuration error.' })
  }

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
          custom_fields: [
            { name: 'role', value: role },
            { name: 'first_name', value: name },
          ],
          reactivate_existing: true,
          send_welcome_email: true,
          utm_source: 'avenircore-website',
          utm_medium: 'waitlist',
          referring_site: 'https://avenircore.com',
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Beehiiv API error:', response.status, data)
      // Return a generic error — do not expose Beehiiv response details to client
      return res.status(502).json({ message: 'Subscription service temporarily unavailable.' })
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error('Fatal API error:', error)
    return res.status(500).json({ message: 'Internal Server Error.' })
  }
}
