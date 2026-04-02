import React from 'react';

const HeroIllustration = () => (
    <svg width="100%" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background Orbits */}
        <circle cx="250" cy="200" r="150" stroke="var(--color-green-soft)" strokeWidth="2" strokeDasharray="8 8" opacity="0.5" />
        <circle cx="250" cy="200" r="100" stroke="var(--color-green-soft)" strokeWidth="2" opacity="0.8" />

        {/* Core Glow */}
        <circle cx="250" cy="200" r="40" fill="var(--color-green-soft)" filter="url(#glow)" />

        {/* Abstract People/Connections */}
        {/* Child (Center) */}
        <circle cx="250" cy="200" r="15" fill="var(--color-navy-dark)" />
        <path d="M235 230 C235 230 250 220 265 230 V 250 H 235 V 230 Z" fill="var(--color-navy-dark)" />

        {/* Parent (Left) */}
        <circle cx="150" cy="180" r="12" fill="var(--color-accent)" />
        <path d="M138 205 C138 205 150 195 162 205 V 220 H 138 V 205 Z" fill="var(--color-accent)" />
        <line x1="165" y1="200" x2="235" y2="220" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 4" />

        {/* Teacher (Right) */}
        <circle cx="350" cy="180" r="12" fill="var(--color-navy)" />
        <path d="M338 205 C338 205 350 195 362 205 V 220 H 338 V 205 Z" fill="var(--color-navy)" />
        <line x1="335" y1="200" x2="265" y2="220" stroke="var(--color-navy)" strokeWidth="2" strokeDasharray="4 4" />

        {/* AI Elements floating */}
        <circle cx="200" cy="100" r="5" fill="var(--color-green)" />
        <circle cx="300" cy="300" r="5" fill="var(--color-green)" />
        <path d="M200 100 L 250 200 L 300 300" stroke="var(--color-green)" strokeWidth="1" opacity="0.3" />

        <defs>
            <filter id="glow" x="150" y="100" width="200" height="200" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="20" result="effect1_foregroundBlur" />
            </filter>
        </defs>
    </svg>
);
export default HeroIllustration;
