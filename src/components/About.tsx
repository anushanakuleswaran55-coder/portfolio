import { GraduationCap, MapPin, Sparkles } from 'lucide-react'
import { profile } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const facts = [
  { icon: GraduationCap, label: 'Studying', value: 'BICT (Hons), University of Vavuniya' },
  { icon: MapPin, label: 'Location', value: 'Sri Lanka' },
  { icon: Sparkles, label: 'Focus', value: 'Web & software development' },
]

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-24">
      <SectionHeading eyebrow="Get to know me" title="About Me" />
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Reveal className="glass rounded-2xl p-8">
          <p className="text-lg leading-relaxed text-muted">{profile.summary}</p>
        </Reveal>
        <div className="grid gap-4">
          {facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.1}>
              <div className="glass flex items-center gap-4 rounded-2xl p-5 transition hover:border-sky/30">
                <div className="rounded-xl bg-brand/15 p-3 text-sky">
                  <f.icon size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted">{f.label}</p>
                  <p className="font-medium">{f.value}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
