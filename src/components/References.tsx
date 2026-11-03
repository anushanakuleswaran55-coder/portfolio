import { Mail, Phone } from 'lucide-react'
import { references } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function References() {
  return (
    <section id="references" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Academic" title="References" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {references.map((r, i) => (
          <Reveal key={r.email} delay={i * 0.1}>
            <article className="glass h-full rounded-2xl p-6 transition hover:border-sky/30">
              <p className="text-xs font-semibold uppercase tracking-wider text-sky">Reference {String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{r.name}</h3>
              <p className="mt-1 text-sm text-muted">{r.role}</p>
              <div className="mt-4 space-y-2 text-sm">
                <a href={`tel:${r.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-muted hover:text-sky">
                  <Phone size={14} /> {r.phone}
                </a>
                <a href={`mailto:${r.email}`} className="flex items-center gap-2 break-all text-muted hover:text-sky">
                  <Mail size={14} /> {r.email}
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
