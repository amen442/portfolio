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

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured')
      res.status(500).json({ error: 'Email service not configured' })
      return
    }

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['amenallah.ibrahmi@esen.tn'],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: `Nouveau message depuis le portfolio\n\nDe : ${name} <${email}>\nSujet : ${subject}\n\n${message}`,
      }),
    })

    if (!resendRes.ok) {
      const errText = await resendRes.text()
      console.error('Resend error:', errText)
      res.status(502).json({ error: 'Failed to send email' })
      return
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact form error:', err)
    res.status(500).json({ error: 'Internal error' })
  }
}
// trigger redeploy to pick up new RESEND_API_KEY
