/**
 * Safely stringifies an object for use in a <script type="application/ld+json"> tag.
 * Prevents XSS by escaping the '</script>' string and other potentially dangerous characters.
 */
export function safeJsonLd(data) {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\//g, '\\u002f')
}
