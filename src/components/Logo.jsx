const Logo = ({ className = "" }) => (
    <svg className={className} width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Main Shield Shape */}
        <path 
            d="M22 4C22 4 34 7 34 16.5C34 26 22 36 22 36C22 36 10 26 10 16.5C10 7 22 4 22 4Z" 
            stroke="var(--color-navy)" 
            strokeWidth="3" 
            fill="rgba(52, 211, 153, 0.05)" 
        />
        
        {/* Protective Core */}
        <circle cx="22" cy="18" r="7" fill="var(--color-navy)" />
        <circle cx="22" cy="18" r="3.5" fill="var(--color-emerald)" />
        
        {/* Connection/Orbit Lines */}
        <path 
            d="M14 28C14 28 17 31 22 31C27 31 30 28 30 28" 
            stroke="var(--color-emerald)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            opacity="0.6"
        />
    </svg>
);

export default Logo;
