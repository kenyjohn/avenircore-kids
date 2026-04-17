// ─── accessConstants.js ──────────────────────────────────────────────────────
// Single source of truth for metered access limits.
// Change FREE_STORY_LIMIT / FREE_BLOG_LIMIT here only.

export const FREE_STORY_LIMIT = 3;
export const FREE_BLOG_LIMIT = 2;
// Content-gate uses a separate API endpoint to add contacts to Resend Audiences
// (distinct from /api/subscribe which handles Beehiiv waitlist signups)
export const SUBSCRIBE_API_ENDPOINT = "/api/subscribe-gate";
export const SUBSCRIBE_SOURCE_TAG = "content-gate";
