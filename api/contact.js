export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  try {
    const { name, email, subject, message } = req.body || {}

    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: 'Missing fields' })
      return
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).json({ error: 'Invalid email' })
      return
    }

    // Submissions are appended to a Google Sheet via the linked Google Form's
    // public formResponse endpoint (no auth required).
    const FORM_ID = '1FAIpQLSegRD3Sh9co_ObGLH9XLw-WWGZH93vQZt5SqePnK8u-qdb7NA'
    const body = new URLSearchParams({
      'entry.15818052': name,
      'entry.1460513364': email,
      'entry.217177775': subject,
      'entry.3754351': message,
    })

    const formRes = await fetch(
      `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }
    )

    if (!formRes.ok) {
      console.error('Google Form submission failed:', formRes.status)
      res.status(502).json({ error: 'Failed to record submission' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
