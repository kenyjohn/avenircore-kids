import NewsletterCTA from './NewsletterCTA'
import { Link } from 'react-router-dom'

/**
 * Global component map for all MDX blog posts.
 * These components are available across all .mdx files without explicit imports.
 */
export const components = {
  NewsletterCTA,
  Link,
  // Add other components here as needed
  img: (props) => <img {...props} style={{ maxWidth: '100%', borderRadius: 'var(--radius-lg)' }} />,
}
