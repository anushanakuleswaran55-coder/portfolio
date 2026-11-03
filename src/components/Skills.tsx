import { motion } from 'framer-motion'
import { Code2, Database, Palette, Users } from 'lucide-react'
import { skillGroups } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const icons = { palette: Palette, code: Code2, database: Database, users: Users }

export default function Skills() {
  return (
    <section id="skills" className="bg-panel/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="What I work with" title="Technical Skills" />
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon]
            return (
              <Reveal key={g.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="glass group h-full rounded-2xl p-6 transition-shadow duration-300 hover:border-sky/30 hover:shadow-[0_0_40px_-12px_rgb(56_189_248/0.4)]"
                >
                  <div className="mb-5 flex items-center gap-3">
                    <div className="rounded-xl bg-brand/15 p-3 text-sky transition group-hover:bg-brand/25">
                      <Icon size={22} />
                    </div>
                    <h3 className="font-display text-xl font-semibold">{g.title}</h3>
                  </div>
                  <ul className="flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <li
                        key={s}
                        className="rounded-lg border border-white/10 bg-ink/60 px-3 py-1.5 text-sm text-muted transition hover:border-sky/40 hover:text-fg"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
