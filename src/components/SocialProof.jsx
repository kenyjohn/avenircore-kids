import { useState, useEffect, useRef, useCallback } from 'react'

const STATS = [
  { value: 10, suffix: '+', label: 'Interactive Stories' },
  { value: 3, suffix: '', label: 'Age Tracks' },
  { value: 0, suffix: '', label: 'Cost to Start', prefix: '$' },
]

function AnimatedNumber({ value, prefix = '', suffix = '', duration = 1200 }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef(null)
  const hasAnimated = useRef(false)

  const animate = useCallback(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    if (value === 0) { setCurrent(0); return }

    const start = performance.now()
    const step = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [value, duration])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [animate])

  return (
    <span ref={ref} className="proof-number">
      {prefix}{current}{suffix}
    </span>
  )
}

export default function SocialProof() {
  return (
    <section className="social-proof" aria-label="Platform stats">
      <div className="container">
        <div className="proof-grid">
          {STATS.map(s => (
            <div key={s.label} className="proof-item">
              <AnimatedNumber
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
              />
              <span className="proof-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
