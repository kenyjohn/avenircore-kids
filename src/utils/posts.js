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
