import { useState, type FormEvent } from 'react'
import { Mail, Phone, Send, User } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const field =
  'w-full rounded-xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-fg placeholder:text-muted/60 transition focus:border-sky focus:outline-none focus:ring-2 focus:ring-sky/30'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

type Status = 'idle' | 'opened'
type Field = 'name' | 'email' | 'subject' | 'message'
type Errors = Partial<Record<Field, string>>

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Errors>({})

  const mailLink = (
    <a href={`mailto:${profile.email}`} className="font-medium underline hover:text-white">
      {profile.email}
    </a>
  )

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const v = (k: string) => String(d.get(k) ?? '').trim()

    const found: Errors = {}
    if (!v('name')) found.name = 'Please enter your name.'
    if (!v('email')) found.email = 'Please enter your email address.'
    else if (!EMAIL_RE.test(v('email'))) found.email = 'Please enter a valid email address.'
    if (!v('subject')) found.subject = 'Please enter a subject.'
    if (!v('message')) found.message = 'Please enter a message.'
    setErrors(found)
    if (Object.keys(found).length) return

    // Honeypot: bots fill this hidden field; do nothing.
    if (v('_gotcha')) return

    // Open the visitor's own email app with everything prefilled; they send it from their account.
    const body = `Name: ${v('name')}
Email: ${v('email')}

${v('message')}`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(v('subject'))}&body=${encodeURIComponent(body)}`
    setStatus('opened')
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
                className="inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/30 transition hover:-translate-y-0.5 hover:bg-blue-500"
              >
                <Send size={16} />
                Send Message
              </button>
              <div role="status" aria-live="polite" className="text-sm">
                {status === 'opened' && (
                  <p className="rounded-xl border border-sky/30 bg-sky/10 p-3 text-sky">
                    Your email app should open with the message ready. Press Send there to deliver it. If nothing opened, email me at {mailLink}.
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
