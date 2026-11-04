import { useState, type FormEvent, type ReactNode } from 'react'
import { Loader2, Mail, Phone, Send, User } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const field =
  'w-full rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Messages are posted to the Vercel serverless function in /api/contact, which sends the email.
const ENDPOINT = '/api/contact'

type Status = 'idle' | 'sending' | 'success' | 'error'
type Field = 'name' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<Field, string>>

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState<ReactNode>(null)
  const [errors, setErrors] = useState<Errors>({})

  const mailLink = (
    <a href={`mailto:${profile.email}`} className="font-medium underline hover:text-white">
      {profile.email}
    </a>
  )

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (status === 'sending') return
    const form = e.currentTarget
    const d = new FormData(form)
    const v = (k: string) => String(d.get(k) ?? '').trim()

    const found: Errors = {}
    if (!v('name')) found.name = 'Please enter your name.'
    if (!v('email')) found.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(v('email'))) found.email = 'Please enter a valid email address.'
    if (!v('subject')) found.subject = 'Please enter a subject.'
    if (!v('message')) found.message = 'Please enter a message.'
    setErrors(found)
    if (Object.keys(found).length) return

    // Honeypot: bots fill this hidden field; send nothing and show nothing.
    if (v('_gotcha')) {
      form.reset()
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: v('name'),
          email: v('email'),
          subject: v('subject'),
          message: v('message'),
        }),
      })
      const data = await res.json().catch(() => ({}))
      // Only treat the send as successful when the server explicitly confirms the email was sent.
      if (!res.ok || data.ok !== true || data.error || data.errors) {
        const detail = data.error
        throw new Error(detail ?? `HTTP ${res.status}`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Contact form send failed:', err)
      const text = err instanceof Error ? err.message : ''
      setErrorMsg(
        <>Sorry, your message could not be sent{text ? ` (${text})` : ''}. Please try again or email me at {mailLink}.</>,
      )
      setStatus('error')
    }
  }

  const fieldError = (k: Field) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-xs text-red-400">
        {errors[k]}
      </p>
    ) : null
  const aria = (k: Field) => ({
    'aria-invalid': !!errors[k],
    'aria-describedby': errors[k] ? `${k}-error` : undefined,
  })

  return (
    <section id="contact" className="bg-panel/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Let's talk" title="Contact Me" />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <Reveal className="glass space-y-5 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <User className="text-sky" size={20} /> <span>{profile.name}</span>
            </div>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 break-all hover:text-sky">
              <Mail className="shrink-0 text-sky" size={20} /> {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 hover:text-sky">
              <Phone className="text-sky" size={20} /> {profile.phone}
            </a>
            <div className="flex gap-3 pt-2">
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${profile.name} on LinkedIn`} className="rounded-xl border border-white/10 p-3 text-muted transition hover:-translate-y-0.5 hover:text-sky">
                <LinkedinIcon className="h-5 w-5" />
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${profile.name} on GitHub`} className="rounded-xl border border-white/10 p-3 text-muted transition hover:-translate-y-0.5 hover:text-sky">
                <GithubIcon className="h-5 w-5" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-2xl p-6">
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm text-muted">Full Name</label>
                  <input id="name" name="name" autoComplete="name" className={field} placeholder="Your name" {...aria('name')} />
                  {fieldError('name')}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm text-muted">Email Address</label>
                  <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" {...aria('email')} />
                  {fieldError('email')}
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm text-muted">Subject</label>
                <input id="subject" name="subject" className={field} placeholder="What is this about?" {...aria('subject')} />
                {fieldError('subject')}
              </div>
              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm text-muted">Message</label>
                <textarea id="message" name="message" rows={5} className={field} placeholder="Your message..." {...aria('message')} />
                {fieldError('message')}
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              <div role="status" aria-live="polite" className="text-sm">
                {status === 'success' && (
                  <p className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3 text-emerald-300">
                    Message sent successfully!
                  </p>
                )}
                {status === 'error' && (
                  <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-red-300">{errorMsg}</p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
