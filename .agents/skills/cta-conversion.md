# Skill: CTAs & Conversion

Trigger for: CTAs, lead-gen, landing pages.

## 1. Aesthetics
- **Colors**: Use `var(--color-emerald)` and `var(--color-teacher)`.
- **States**: Use `.animate-pop`, `.animate-pulse`, or `.animate-bounce-short` on hover.
- **Glassmorphism**: Apply layering effects where appropriate.
- **Persistence**: Consider fixed bottom-bar for critical funnels.

## 2. Accessibility
- **Touch-Targets**: Min 44px height/spacing for mobile (`max-width: 480px`).
- **Typography**: Font: `Nunito` (`.font-heading`). Weight: >= 700.

## 3. Analytics & Anti-Bot
- **Tracking**: Bind `onClick` to `@vercel/analytics` hooks.
- **Forms**: 
  - **Honeypot**: Hidden `email_verify` inputs.
  - **Throttling**: Disable submission state during processing (`api/subscribe.js`).
