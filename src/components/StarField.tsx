import { useMemo, type CSSProperties } from 'react'

type Tone = 'white' | 'sky' | 'royal'
type Star = { x: number; y: number; size: number; delay: number; duration: number; peak: number; tone: Tone }

// Small seeded PRNG so the star layout is identical on every render and reload.
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const COLS = 7
const ROWS = 6 // 7 x 6 = 42 stars

export default function StarField() {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(77)
    const list: Star[] = []
    // One star per jittered grid cell: evenly spread, never clumped or overcrowded.
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const t = rand()
        list.push({
          x: ((c + 0.15 + rand() * 0.7) / COLS) * 100,
          y: ((r + 0.15 + rand() * 0.7) / ROWS) * 100,
          size: rand() < 0.25 ? 3 + rand() * 1.5 : 4.5 + rand() * 3.5, // a few small, most 4.5 - 8px
          delay: rand() * 3,
          duration: 1.2 + rand() * 1.3, // 1.2s - 2.5s
          peak: 0.55 + rand() * 0.35,
          tone: t < 0.45 ? 'white' : t < 0.85 ? 'sky' : 'royal',
        })
      }
    }
    return list
  }, [])

  return (
    <div aria-hidden="true" className="star-field">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star star--${s.tone}`}
          style={
            {
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              '--star-peak': s.peak,
            } as CSSProperties
          }
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" focusable="false">
            {/* four-point sparkle with softly curved sides */}
            <path d="M12 0Q13.2 10.8 24 12Q13.2 13.2 12 24Q10.8 13.2 0 12Q10.8 10.8 12 0Z" />
          </svg>
        </span>
      ))}
    </div>
  )
}
