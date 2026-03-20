const Logo = ({ className = "" }) => (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Core Hexagon */}
        <path d="M20 5L33 12.5V27.5L20 35L7 27.5V12.5L20 5Z" stroke="var(--color-navy-dark)" strokeWidth="2.5" fill="none" />

        {/* Inner Core */}
        <circle cx="20" cy="20" r="6" fill="var(--color-navy-dark)" />

        {/* Future Arrow / Orbit */}
        <path d="M10 32C10 32 12 36 20 36C28 36 34 29 34 20C34 14 30 10 30 10" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 4" />
        <path d="M34 10L30 6M34 10L38 6" stroke="var(--color-green)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
);

export default Logo;
