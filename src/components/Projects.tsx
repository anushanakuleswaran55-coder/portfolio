import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { projects } from '../data/portfolio'
import { GithubIcon } from './Icons'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Selected work" title="Projects" />
      <div className="grid gap-6 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Reveal key={p.number} delay={i * 0.1} className="h-full">
            <motion.article
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl p-6 transition-shadow duration-300 hover:border-sky/30 hover:shadow-[0_0_50px_-12px_rgb(37_99_235/0.5)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky to-transparent opacity-0 transition-opacity group-hover:opacity-100"
              />
              <span className="font-display text-4xl font-bold text-white/10">{p.number}</span>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>

              <h4 className="mt-5 text-xs font-semibold uppercase tracking-wider text-sky">Main features</h4>
              <ul className="mt-2 space-y-1.5">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted">
                    <Check size={14} className="mt-1 shrink-0 text-sky" /> {f}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tech.map((t) => (
                  <li key={t} className="rounded-full bg-brand/15 px-2.5 py-1 text-xs font-medium text-sky">
                    {t}
                  </li>
                ))}
              </ul>

              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center justify-center gap-2 self-start rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold transition hover:border-sky/40 hover:text-sky"
                style={{ marginTop: '1.5rem' }}
              >
                <GithubIcon className="h-4 w-4" /> GitHub
                <span className="sr-only"> repository for {p.title} (placeholder link)</span>
              </a>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
