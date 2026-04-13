# Skill: CTA Operations & High-Conversion Styling

Trigger this skill when building or interacting with Calls to Action (CTAs), lead-gen boundaries (like newsletter boxes), or engaging sales landing pages inside AvenirCore.

## 1. High-Impact Aesthetic Styling
Conversion components demand aggressive engagement logic separated from generic layout code:
- **Vibrancy First**: Employ contrasting colors strictly mapped from `var(--color-emerald)` and `var(--color-teacher)`. CTAs must never vanish into the background scope.
- **Dynamic Interaction**: CTAs should never remain visually static. Trigger dynamic state offsets natively mimicking "Glassmorphism" layering or employing shadow transitions `onHover` mapping into `@keyframes` (`.animate-pop`, `.animate-pulse`, or `.animate-bounce-short`).
- **Context Locking**: For persistent sales hooks, consider implementing scrolling fixed bottom-bar behaviors utilizing safe Area configurations to hold action states persistent entirely through the user reading funnel.

## 2. Accessible Scaling and Typography
Optimal scaling drastically improves mobile conversions.
- Minimum actionable touch-targets for CTAs resolving on screen space limits (`max-width: 480px`) must NEVER fall below 44px boundaries in both height and vertical spacing.
- Anchor text scaling must match `.font-heading` (`Nunito`) with weight minimum structures >= `700`.

## 3. Engagement Tracking Metrics
If user engagement analytics (such as `@vercel/analytics`) exist, click triggers binding user intent towards outbound or gateway steps must wrap `onClick()` configurations recording conversion properties directly towards the logging hook. 

## 4. Anti-Bot Configurations
AvenirCore forms routing through Vercel serverless hooks (e.g., `api/subscribe.js`) must strictly combine dual anti-spam logic natively into the CTA JSX structure:
- **Honeypot fields**: Hidden `email_verify` inputs trapping headless scrapers.
- **Client-Side Throttling**: Restricting submit triggers utilizing disabled interaction logic natively locked into the component state parameters based on active submission status.
