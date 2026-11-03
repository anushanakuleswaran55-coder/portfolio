import { ArrowUp } from 'lucide-react'
import { profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 text-center md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="text-sm text-muted">Aspiring Software Developer</p>
        </div>
        <div className="flex gap-3">
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${profile.name} on LinkedIn`} className="text-muted transition hover:text-sky">
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${profile.name} on GitHub`} className="text-muted transition hover:text-sky">
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="rounded-xl border border-white/10 p-2.5 text-muted transition hover:-translate-y-0.5 hover:border-sky/40 hover:text-sky"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  )
}
