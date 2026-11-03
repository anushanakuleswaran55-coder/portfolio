import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky">{eyebrow}</p>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-gradient-to-r from-sky to-brand" />
    </Reveal>
  )
}
