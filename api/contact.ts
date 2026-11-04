import type { VercelRequest, VercelResponse } from '@vercel/node'
import nodemailer from 'nodemailer'

const TO = 'anushanakuleswaran55@gmail.com'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const esc = (t: string) => t.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
// Strip control characters so header values can't be used for header injection.
const oneLine = (t: string) => t.replace(/[\r\n\u0000-\u001f]+/g, ' ').trim()
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const user = process.env.GMAIL_USER
  const pass = process.env.GMAIL_APP_PASSWORD
  if (!user || !pass) {
    console.error('Email credentials are not configured (GMAIL_USER / GMAIL_APP_PASSWORD).')
    return res.status(500).json({ ok: false, error: 'Email service is not configured' })
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body ?? {})
  const name = oneLine(str(body.name, 100))
  const email = oneLine(str(body.email, 200))
  const subject = oneLine(str(body.subject, 150))
  const message = str(body.message, 5000)

  if (!name || !subject || !message || !EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please fill in all fields with valid values.' })
  }

  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } })
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${user}>`, // verified sender (your own Gmail), never the visitor's address
      to: TO,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject: `Portfolio Contact - ${email}`,
      text: `Visitor email: ${email}\nName: ${name}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111">
<p style="font-size:18px;margin:0 0 12px"><strong>Visitor email:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p style="margin:0 0 4px"><strong>Name:</strong> ${esc(name)}</p>
<p style="margin:0 0 12px"><strong>Subject:</strong> ${esc(subject)}</p>
<p style="margin:0 0 4px"><strong>Message:</strong></p>
<p style="white-space:pre-wrap;margin:0;padding:12px;background:#f3f4f6;border-radius:8px">${esc(message)}</p>
</div>`,
    })
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Email send failed:', err)
    return res.status(502).json({ ok: false, error: 'Could not send the message' })
  }
}
