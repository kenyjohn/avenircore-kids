import { Resend } from 'resend';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitise(str, maxLen = 500) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[\u0000-\u001F\u007F]/g, '').slice(0, maxLen);
}

const ALLOWED_TYPES = ['parent', 'teacher', 'press', 'other'];

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

  try {
    const resend = new Resend(RESEND_API_KEY);

    await resend.emails.send({
      from:    'AvenirCore Contact <hello@avenircore.com>',
      to:      'hello@avenircore.com',
      replyTo: email,
      subject: `[${type.toUpperCase()}] New message from ${name || email}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name || '(not provided)'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Type:</strong> ${type}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Failed to send message. Please try again.' });
  }
}
