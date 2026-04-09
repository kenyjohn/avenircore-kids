// api/contact.js

import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLen);
}

const ALLOWED_TYPES = ['parent', 'teacher', 'press', 'other'];

// ─── Confirmation email content per audience type ───────────────────────────

const CONFIRMATION = {
  parent: {
    subject: 'We got your message — AvenirCore 🌱',
    html: (name) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e1b4b">
        <p style="font-size:1.5rem;margin-bottom:0.25rem">🌱</p>
        <h1 style="font-size:1.3rem;font-weight:800;margin-top:0">Thanks${name ? `, ${name}` : ''}!</h1>
        <p>We've received your message and will get back to you within <strong>1–2 business days</strong>.</p>
        <p>While you wait — if you haven't already, your child can start one of our free interactive AI stories right now. No login, no app, just five minutes of learning together:</p>
        <p style="margin:1.5rem 0">
          <a href="https://avenircore.com/stories"
             style="background:#6366f1;color:white;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
            Explore Free Stories →
          </a>
        </p>
        <p style="color:#6b7280;font-size:0.9rem">
          — John<br>
          Founder, AvenirCore<br>
          <a href="mailto:hello@avenircore.com" style="color:#6366f1">hello@avenircore.com</a>
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:2rem 0" />
        <p style="color:#9ca3af;font-size:0.8rem">
          You're receiving this because you submitted the contact form at
          <a href="https://avenircore.com/contact" style="color:#9ca3af">avenircore.com/contact</a>.
          This is a one-time reply — you won't receive further emails from this address unless you join our waitlist.
        </p>
      </div>
    `,
  },

  teacher: {
    subject: 'Thanks for reaching out — AvenirCore 🏫',
    html: (name) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e1b4b">
        <p style="font-size:1.5rem;margin-bottom:0.25rem">🏫</p>
        <h1 style="font-size:1.3rem;font-weight:800;margin-top:0">Thanks${name ? `, ${name}` : ''}!</h1>
        <p>Your message is with us — we'll be in touch within <strong>1–2 business days</strong>.</p>
        <p>In the meantime, our <strong>Teacher Hub</strong> has a full guide to introducing AI concepts in the classroom, including conversation frameworks, myth-busters, and lesson prompts for ages 6–14:</p>
        <p style="margin:1.5rem 0">
          <a href="https://avenircore.com/blog/teachers-ai-guide"
             style="background:#6366f1;color:white;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
            Visit the Teacher Hub →
          </a>
        </p>
        <p>Our interactive AI stories are also free to use with your class — no login or school account needed:</p>
        <p style="margin:1.5rem 0">
          <a href="https://avenircore.com/stories"
             style="background:white;color:#6366f1;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;border:2px solid #6366f1">
            Browse AI Stories →
          </a>
        </p>
        <p style="color:#6b7280;font-size:0.9rem">
          — John<br>
          Founder, AvenirCore<br>
          <a href="mailto:hello@avenircore.com" style="color:#6366f1">hello@avenircore.com</a>
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:2rem 0" />
        <p style="color:#9ca3af;font-size:0.8rem">
          You're receiving this because you submitted the contact form at
          <a href="https://avenircore.com/contact" style="color:#9ca3af">avenircore.com/contact</a>.
          This is a one-time reply — not a mailing list.
        </p>
      </div>
    `,
  },

  press: {
    subject: 'Message received — AvenirCore',
    html: (name) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e1b4b">
        <h1 style="font-size:1.3rem;font-weight:800">Thank you${name ? `, ${name}` : ''}.</h1>
        <p>We've received your enquiry and will respond within <strong>1–2 business days</strong>.</p>
        <p>If your request is time-sensitive, you're welcome to reply directly to this email and it will reach us immediately.</p>
        <p style="color:#6b7280;font-size:0.9rem;margin-top:2rem">
          — John<br>
          Founder, AvenirCore<br>
          <a href="https://avenircore.com" style="color:#6366f1">avenircore.com</a> ·
          <a href="mailto:hello@avenircore.com" style="color:#6366f1">hello@avenircore.com</a>
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:2rem 0" />
        <p style="color:#9ca3af;font-size:0.8rem">
          You're receiving this because you submitted the contact form at
          <a href="https://avenircore.com/contact" style="color:#9ca3af">avenircore.com/contact</a>.
        </p>
      </div>
    `,
  },

  other: {
    subject: 'We got your message — AvenirCore',
    html: (name) => `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#1e1b4b">
        <p style="font-size:1.5rem;margin-bottom:0.25rem">✉️</p>
        <h1 style="font-size:1.3rem;font-weight:800;margin-top:0">Thanks${name ? `, ${name}` : ''}!</h1>
        <p>Your message has landed with us — we'll get back to you within <strong>1–2 business days</strong>.</p>
        <p>If you'd like to explore what AvenirCore is building in the meantime:</p>
        <p style="margin:1.5rem 0">
          <a href="https://avenircore.com"
             style="background:#6366f1;color:white;padding:0.75rem 1.5rem;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block">
            Visit AvenirCore →
          </a>
        </p>
        <p style="color:#6b7280;font-size:0.9rem">
          — John<br>
          Founder, AvenirCore<br>
          <a href="mailto:hello@avenircore.com" style="color:#6366f1">hello@avenircore.com</a>
        </p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:2rem 0" />
        <p style="color:#9ca3af;font-size:0.8rem">
          You're receiving this because you submitted the contact form at
          <a href="https://avenircore.com/contact" style="color:#9ca3af">avenircore.com/contact</a>.
          This is a one-time reply — not a mailing list.
        </p>
      </div>
    `,
  },
};

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const contentLength = parseInt(req.headers['content-length'] || '0', 10);
  if (contentLength > 4096) {
    return res.status(413).json({ message: 'Payload too large' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }

  const name    = sanitise(body?.name, 100);
  const email   = sanitise(body?.email, 254);
  const type    = ALLOWED_TYPES.includes(body?.type) ? body.type : 'other';
  const message = sanitise(body?.message, 2000);

  if (!email || !EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'A valid email address is required.' });
  }
  if (!message || message.length < 10) {
    return res.status(400).json({ message: 'Please include a message (min 10 characters).' });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  const resend = new Resend(RESEND_API_KEY);
  const confirmation = CONFIRMATION[type] || CONFIRMATION.other;

  try {
    // Send both emails concurrently — fail fast if either errors
    await Promise.all([

      // 1. Internal notification to founder
      resend.emails.send({
        from:    'AvenirCore Contact <hello@avenircore.com>',
        to:      'hello@avenircore.com',
        replyTo: email,
        subject: `[${type.toUpperCase()}] New message from ${name || email}`,
        html: `
          <div style="font-family:sans-serif;max-width:560px;color:#1e1b4b">
            <h2 style="font-size:1.1rem">New contact form submission</h2>
            <table style="border-collapse:collapse;width:100%">
              <tr><td style="padding:0.4rem 0;font-weight:700;width:80px">Name</td><td>${name || '(not provided)'}</td></tr>
              <tr><td style="padding:0.4rem 0;font-weight:700">Email</td><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:0.4rem 0;font-weight:700">Type</td><td>${type}</td></tr>
            </table>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:1rem 0" />
            <p style="white-space:pre-wrap">${message}</p>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:1rem 0" />
            <p style="color:#9ca3af;font-size:0.8rem">
              Reply to this email to respond directly to ${email}.
              Confirmation email sent to submitter: ✅
            </p>
          </div>
        `,
      }),

      // 2. Personalised confirmation to submitter
      resend.emails.send({
        from:    'John at AvenirCore <hello@avenircore.com>',
        to:      email,
        replyTo: 'hello@avenircore.com',
        subject: confirmation.subject,
        html:    confirmation.html(name),
      }),

    ]);

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
}
