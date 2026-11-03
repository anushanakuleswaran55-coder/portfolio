import { motion } from 'framer-motion'
import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './Icons'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } } }
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const btn =
  'inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5'

export default function Hero() {
  const [first, ...rest] = profile.name.toUpperCase().split(' ')
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
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

      <div className="relative mx-auto w-full max-w-6xl px-5 py-16 text-center">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-xs font-medium text-sky"
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" /> Open to opportunities
          </motion.p>
          <motion.h1 variants={item} className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-7xl">
            {first}
            <br />
            <span className="text-gradient">{rest.join(' ')}</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 text-lg font-medium text-sky">
            {profile.role}
          </motion.p>
          <motion.p variants={item} className="mx-auto mt-4 max-w-2xl text-lg italic text-muted">
            &ldquo;{profile.tagline}&rdquo;
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap justify-center gap-3">
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

          <motion.div variants={item} className="mt-8 flex justify-center gap-3">
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
