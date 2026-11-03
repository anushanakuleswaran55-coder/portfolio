import { useMemo, type CSSProperties } from 'react'

type Star = { x: number; y: number; size: number; delay: number; duration: number; peak: number; blue: boolean }

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

export default function StarField({ count = 70 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    const rand = mulberry32(2024)
    return Array.from({ length: count }, () => ({
      x: rand() * 100,
      y: rand() * 100,
      size: 1 + rand() * 2, // 1px - 3px
      delay: rand() * 8,
      duration: 4 + rand() * 5, // slow: 4s - 9s
      peak: 0.45 + rand() * 0.5,
      blue: rand() > 0.45,
    }))
  }, [count])

  return (
    <div aria-hidden="true" className="star-field">
      {stars.map((s, i) => (
        <span
          key={i}
          className={`star ${s.blue ? 'star--blue' : 'star--white'}`}
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
        />
      ))}
    </div>
  )
}
