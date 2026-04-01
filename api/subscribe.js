export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Safely parse the incoming JSON body
  const { email, role, name } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required.' });
  }

  // 3. Read the environment variables securely from the Vercel backend
  // We use the exact keys you set up in the Vercel Dashboard
  const BEEHIIV_PUB_ID = process.env.VITE_BEEHIIV_PUB_ID;
  const BEEHIIV_API_KEY = process.env.VITE_BEEHIIV_API_KEY;

  if (!BEEHIIV_PUB_ID || !BEEHIIV_API_KEY) {
    console.error('Missing Beehiiv Keys');
    return res.status(500).json({ message: 'Server configuration error.' });
  }

  // 4. Fire the secure server-to-server request
  try {
    const response = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
      },
      body: JSON.stringify({
        email,
        custom_fields: [
          { name: 'role', value: role || 'parent' },
          { name: 'first_name', value: name || '' },
        ],
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: 'avenircore-website',
        utm_medium: 'waitlist',
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Beehiiv API Error:', data);
      return res.status(response.status).json(data);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Fatal API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error.' });
  }
}
