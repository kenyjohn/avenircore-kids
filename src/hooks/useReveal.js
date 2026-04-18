import { useEffect, useRef } from 'react'

/**
 * Scroll-triggered reveal hook.
 * Adds `.visible` to the ref element when it enters the viewport.
 * Usage: const ref = useReveal(); → <div ref={ref} className="reveal">
 */
export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.unobserve(el) // animate once only
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
