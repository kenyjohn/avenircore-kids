import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // If there is a hash, scroll to that element
    if (hash) {
      const id = hash.replace('#', '')
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback: wait a bit for component to mount (especially with Suspense)
        setTimeout(() => {
          const elRetry = document.getElementById(id)
          if (elRetry) elRetry.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    } else {
      // No hash: scroll to top
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
