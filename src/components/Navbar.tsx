import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems, profile } from '../data/portfolio'
import { useActiveSection } from '../hooks/useActiveSection'

const ids = navItems.map((n) => n.id)

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="glass fixed inset-x-0 top-0 z-50 border-x-0 border-t-0"
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <a href="#home" className="font-display text-xl font-bold" aria-label="Home">
          <span className="text-gradient">{profile.initials}</span>
          <span className="text-sky">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'page' : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === n.id ? 'text-fg' : 'text-muted hover:text-fg'
                }`}
              >
                {active === n.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-brand/20 ring-1 ring-sky/30"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="rounded-lg p-2 text-muted hover:text-fg md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/5 px-5 md:hidden"
          >
            {navItems.map((n, i) => (
              <motion.li
                key={n.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block py-3 text-base font-medium ${active === n.id ? 'text-sky' : 'text-muted'}`}
                >
                  {n.label}
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
