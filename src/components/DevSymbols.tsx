import type { CSSProperties } from 'react'

type Sym = { text: string; x: number; y: number; size: number; delay: number; duration: number; tone: 'white' | 'sky'; hideOnMobile?: boolean }

// Global layer: fixed behind all page content (like the star field), so symbols drift behind every section.
// Hand-spread across the viewport; the extra ones are desktop-only to keep mobile light.
const SYMBOLS: Sym[] = [
  { text: '</>', x: 6, y: 14, size: 22, delay: 0, duration: 9, tone: 'sky' },
  { text: '{ }', x: 88, y: 10, size: 24, delay: 1.5, duration: 10, tone: 'white' },
  { text: '01', x: 14, y: 40, size: 18, delay: 3, duration: 8, tone: 'white' },
  { text: '</code>', x: 78, y: 34, size: 17, delay: 0.8, duration: 11, tone: 'sky' },
  { text: '{ }', x: 5, y: 66, size: 20, delay: 4.5, duration: 9.5, tone: 'sky' },
  { text: '01', x: 90, y: 62, size: 18, delay: 2.2, duration: 8.5, tone: 'sky' },
  { text: '</>', x: 72, y: 88, size: 20, delay: 5.2, duration: 10.5, tone: 'white' },
  { text: '</code>', x: 20, y: 90, size: 16, delay: 3.8, duration: 9, tone: 'white' },
  { text: '01', x: 45, y: 8, size: 15, delay: 6, duration: 9, tone: 'white', hideOnMobile: true },
  { text: '</>', x: 36, y: 52, size: 16, delay: 2.8, duration: 11, tone: 'sky', hideOnMobile: true },
  { text: '{ }', x: 60, y: 74, size: 17, delay: 6.5, duration: 10, tone: 'white', hideOnMobile: true },
  { text: '</code>', x: 52, y: 26, size: 15, delay: 7.2, duration: 12, tone: 'sky', hideOnMobile: true },
  { text: '01', x: 30, y: 78, size: 15, delay: 1.2, duration: 8, tone: 'sky', hideOnMobile: true },
  { text: '{ }', x: 96, y: 86, size: 15, delay: 4, duration: 9, tone: 'white', hideOnMobile: true },
]

export default function DevSymbols() {
  return (
    <div aria-hidden="true" className="dev-symbols">
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
