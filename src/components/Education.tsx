import { Award, GraduationCap, Languages } from 'lucide-react'
import { achievements, education, languages } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Education() {
  return (
    <section id="education" className="bg-panel/50 py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="My journey" title="Education" />

        <ol className="relative mx-auto max-w-3xl border-l border-sky/30 pl-8">
          {education.map((e, i) => (
            <li key={e.title} className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.6rem] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink ring-2 ring-sky">
                <span className="h-2 w-2 rounded-full bg-sky" />
              </span>
              <Reveal delay={i * 0.1}>
                <div className="glass rounded-2xl p-6 transition hover:border-sky/30">
                  <p className="text-sm font-medium text-sky">{e.period}</p>
                  <h3 className="mt-1 flex items-start gap-2 font-display text-lg font-semibold">
                    <GraduationCap size={20} className="mt-0.5 shrink-0 text-sky" /> {e.title}
                  </h3>
                  <p className="mt-2 text-muted">{e.place}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <h3 className="mb-5 flex items-center gap-2 font-display text-2xl font-semibold">
              <Award className="text-sky" /> Achievements
            </h3>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="glass rounded-xl p-4 text-muted">
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mb-5 flex items-center gap-2 font-display text-2xl font-semibold">
              <Languages className="text-sky" /> Languages
            </h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {languages.map((l) => (
                <li key={l.name} className="glass rounded-xl p-5 transition hover:border-sky/30">
                  <p className="font-display text-lg font-semibold">{l.name}</p>
                  <p className="text-sm text-sky">{l.level}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
