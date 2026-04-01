// Auto-imports all MDX files from /src/posts/
// Each MDX file exports frontmatter as named exports

const modules = import.meta.glob('../posts/*.mdx', { eager: true })

export function getAllPosts() {
  return Object.entries(modules)
    .map(([path, mod]) => {
      const slug = path.replace('../posts/', '').replace('.mdx', '')
      return {
        slug,
        title: mod.title,
        description: mod.description,
        excerpt: mod.excerpt,
        date: mod.date,
        category: mod.category,
        keywords: mod.keywords,
        faqs: mod.faqs || null,
        featured: mod.featured || false,
        readingTime: mod.readingTime || '4 min read',
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getPostBySlug(slug) {
  const key = `../posts/${slug}.mdx`
  if (!modules[key]) return null
  const mod = modules[key]
  return {
    slug,
    Content: mod.default,
    title: mod.title,
    description: mod.description,
    date: mod.date,
    category: mod.category,
    keywords: mod.keywords,
    faqs: mod.faqs || null,
    featured: mod.featured || false,
    readingTime: mod.readingTime || '4 min read',
  }
}

// Returns up to 3 posts from the same category, excluding the current post
export function getRelatedPosts(currentSlug, currentCategory, limit = 3) {
  return getAllPosts()
    .filter(p => p.slug !== currentSlug && p.category === currentCategory)
    .slice(0, limit)
}

// Returns the previous and next posts in chronological order
export function getAdjacentPosts(currentSlug) {
  const all = getAllPosts()
  const index = all.findIndex(p => p.slug === currentSlug)
  return {
    prev: index < all.length - 1 ? all[index + 1] : null,
    next: index > 0 ? all[index - 1] : null,
  }
}
