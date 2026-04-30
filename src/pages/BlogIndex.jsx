import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useMemo } from 'react'
import { getAllPosts } from '../utils/posts'

const BlogIndex = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const posts = useMemo(() => {
    const allPosts = getAllPosts()
    return activeCategory === 'All'
      ? allPosts
      : allPosts.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const filterPosts = (cat) => setActiveCategory(cat)

  return (
    <>
      <Helmet>
        <title>Blog — AI for Kids | AvenirCore</title>
        <meta name="description" content="Parent guides, tips, and honest advice on helping kids navigate AI safely. Written for families, not tech experts." />
        <link rel="canonical" href="https://avenircore.com/blog" />
        <meta property="og:title" content="Blog — AI for Kids | AvenirCore" />
        <meta property="og:description" content="Parent guides, tips, and honest advice on helping kids navigate AI safely." />
        <meta property="og:image" content="https://avenircore.com/avenircore-og-image.jpg" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@avenircore" />
        <meta name="twitter:title" content="Blog — AI for Kids | AvenirCore" />
        <meta name="twitter:description" content="Parent guides, tips, and honest advice on helping kids navigate AI safely." />
        <meta name="twitter:image" content="https://avenircore.com/avenircore-og-image.jpg" />
      </Helmet>

      <section style={{ padding: '5rem 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <span className="section-label">Resources</span>
            <h1 className="section-title">AI Guides for Parents & Teachers</h1>
            <p className="section-sub">Honest, jargon-free guides to help your family navigate AI with confidence.</p>
          </div>

          {/* Category filter */}
          <div id="categoryFilter" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
            {['All', 'Parents', 'Teachers', 'Safety', 'Tools'].map(cat => (
              <button
                key={cat}
                className={activeCategory === cat ? "btn btn-primary" : "btn btn-outline"}
                style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                onClick={() => filterPosts(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {posts.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                <article className="blog-card">
                  <div className="blog-card-meta">
                    <span className="blog-card-tag">{post.category}</span>
                    {post.isNew && <span className="blog-card-new" style={{ background: 'var(--color-amber)', color: 'white', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.65rem', marginLeft: '0.4rem', fontWeight: 'bold' }}>NEW</span>}
                    {post.featured && <span className="blog-card-featured">Featured</span>}
                    {post.readingTime && <span className="blog-card-time">{post.readingTime}</span>}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-date">{post.date}</span>
                    <span className="blog-card-read">Read →</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default BlogIndex
