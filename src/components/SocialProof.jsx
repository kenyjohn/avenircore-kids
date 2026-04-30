import { useState, useEffect, useRef, useCallback } from 'react'
import { stories } from '../data/stories/index'
import { getAllPosts } from '../utils/posts'

function getDynamicStats() {
  const uniqueAgeTracks = new Set(stories.map(s => s.ageRange).filter(Boolean)).size
  const totalPosts = getAllPosts().length
  
  return [
    { value: stories.length, suffix: '+', label: 'Interactive Stories' },
    { value: totalPosts, suffix: '+', label: 'Expert Articles' },
    { value: uniqueAgeTracks, suffix: '', label: 'Age Tracks' },
    { value: 0, suffix: '', label: 'Cost to Start', prefix: '$' },
  ]
}

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
  const stats = getDynamicStats()
  return (
    <section className="social-proof" aria-label="Platform stats">
      <div className="container">
        <div className="proof-grid">
          {stats.map(s => (
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
