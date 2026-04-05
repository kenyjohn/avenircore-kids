const VARIANTS = {
  default: {
    outer: 'var(--color-navy)',
    inner: 'var(--color-navy-mid)',
    emerald: 'var(--color-emerald)',
    center: 'var(--color-navy)',
    orbit: 'var(--color-emerald-light)',
    orbitOpacity: 0.6,
  },
  /** Navy footer: light shield so emerald core stays visible (no invert filter) */
  onDark: {
    outer: '#e2e8f0',
    inner: '#cbd5e1',
    emerald: 'var(--color-emerald)',
    center: 'var(--color-navy)',
    orbit: '#6ee7b7',
    orbitOpacity: 0.9,
  },
}

const Logo = ({ className = '', variant = 'default' }) => {
  const c = VARIANTS[variant] ?? VARIANTS.default
  return (
    <svg
      className={`logo-mark ${className}`.trim()}
      width="40"
      height="40"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AvenirCore logo"
    >
      <path
        d="M24 4L38 9V20C38 29.5 24 40 24 40C24 40 10 29.5 10 20V9L24 4Z"
        fill={c.outer}
      />
      <path
        d="M24 8L35 12V20C35 28 24 37 24 37C24 37 13 28 13 20V12L24 8Z"
        fill={c.inner}
      />
      <circle cx="24" cy="21" r="7" fill={c.emerald} />
      <circle cx="24" cy="21" r="3.5" fill={c.center} />
      <circle
        cx="24"
        cy="21"
        r="10"
        stroke={c.orbit}
        strokeWidth="1.5"
        strokeDasharray="3 2"
        opacity={c.orbitOpacity}
      />
    </svg>
  )
}

export default Logo
