const Logo = ({ className = '' }) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="AvenirCore logo"
  >
    <path
      d="M24 4L38 9V20C38 29.5 24 40 24 40C24 40 10 29.5 10 20V9L24 4Z"
      fill="var(--color-navy)"
    />
    <path
      d="M24 8L35 12V20C35 28 24 37 24 37C24 37 13 28 13 20V12L24 8Z"
      fill="var(--color-navy-mid)"
    />
    <circle cx="24" cy="21" r="7" fill="var(--color-emerald)" />
    <circle cx="24" cy="21" r="3.5" fill="var(--color-navy)" />
    <circle
      cx="24"
      cy="21"
      r="10"
      stroke="var(--color-emerald-light)"
      strokeWidth="1.5"
      strokeDasharray="3 2"
      opacity="0.6"
    />
  </svg>
)

export default Logo
