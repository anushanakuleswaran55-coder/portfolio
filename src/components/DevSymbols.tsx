import type { CSSProperties } from 'react'

type Sym = { text: string; x: number; y: number; size: number; delay: number; duration: number; tone: 'white' | 'sky'; hideOnMobile?: boolean }

// Hand-placed along the edges so they never sit under the heading or buttons.
const SYMBOLS: Sym[] = [
  { text: '</>', x: 6, y: 18, size: 22, delay: 0, duration: 9, tone: 'sky' },
  { text: '{ }', x: 88, y: 14, size: 24, delay: 1.5, duration: 10, tone: 'white' },
  { text: '01', x: 14, y: 62, size: 18, delay: 3, duration: 8, tone: 'white' },
  { text: '</code>', x: 80, y: 66, size: 17, delay: 0.8, duration: 11, tone: 'sky' },
  { text: '{ }', x: 3, y: 42, size: 16, delay: 4.5, duration: 9.5, tone: 'sky', hideOnMobile: true },
  { text: '01', x: 93, y: 40, size: 16, delay: 2.2, duration: 8.5, tone: 'sky', hideOnMobile: true },
  { text: '</>', x: 72, y: 86, size: 18, delay: 5.2, duration: 10.5, tone: 'white', hideOnMobile: true },
  { text: '</code>', x: 22, y: 84, size: 15, delay: 3.8, duration: 9, tone: 'white', hideOnMobile: true },
]

export default function DevSymbols() {
  return (
    <div aria-hidden="true" className="dev-symbols pointer-events-none absolute inset-0 -z-0 overflow-hidden">
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={`dev-symbol dev-symbol--${s.tone}${s.hideOnMobile ? ' dev-symbol--desktop' : ''}`}
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              fontSize: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            } as CSSProperties
          }
        >
          {s.text}
        </span>
      ))}
    </div>
  )
}
