import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './Icons'
import DevSymbols from './DevSymbols'

// Name lines animate first (0s and 0.2s); everything else follows in a subtle stagger.
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.55 } } }
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const btn =
  'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const nameLine = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: 'easeOut' as const },
  })
  const [first, ...rest] = profile.name.toUpperCase().split(' ')
  return (
    <section id="home" className="relative flex items-center overflow-hidden pb-14 pt-28 sm:pb-16 sm:pt-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
      >
        <motion.div
          className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-brand/25 blur-[120px]"
          animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-sky/15 blur-[120px]"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.08)_1px,transparent_0)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <DevSymbols />

      <div className="relative mx-auto w-full max-w-6xl px-5 text-center">
        <motion.div variants={container} initial={reduceMotion ? false : 'hidden'} animate="show">
          <h1 className="font-display text-[clamp(1.9rem,9.6vw,3rem)] font-bold leading-tight tracking-tight sm:text-7xl">
            <span className="block">
              <motion.span className="inline-block" {...nameLine(0)}>
                {first}
              </motion.span>
            </span>
            <span className="block">
              <motion.span className="text-gradient inline-block" {...nameLine(0.2)}>
                {rest.join(' ')}
              </motion.span>
            </span>
          </h1>
          <motion.p variants={item} className="mt-4 text-lg font-medium text-sky">
            {profile.role}
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-4 max-w-2xl text-lg italic text-muted">
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>

          <motion.div variants={item} className="mt-7 flex flex-wrap justify-center gap-3">
            <a
              href="#projects"
              className={`${btn} bg-brand text-white shadow-lg shadow-brand/30 hover:bg-blue-500 hover:shadow-brand/50`}
            >
              View My Projects <ArrowRight size={16} />
            </a>
            <a href={profile.cvUrl} download="Anusha_Nakuleshwaran_CV_updated.pdf" className={`${btn} glass text-fg hover:border-sky/40`}>
              <Download size={16} /> Download CV
            </a>
            <a href="#contact" className={`${btn} border border-white/10 text-fg hover:border-sky/40 hover:text-sky`}>
              <Mail size={16} /> Contact Me
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-7 flex justify-center gap-3">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${profile.name} on LinkedIn`}
              className="glass rounded-xl p-3 text-muted transition hover:-translate-y-0.5 hover:text-sky"
            >
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${profile.name} on GitHub`}
              className="glass rounded-xl p-3 text-muted transition hover:-translate-y-0.5 hover:text-sky"
            >
              <GithubIcon className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
