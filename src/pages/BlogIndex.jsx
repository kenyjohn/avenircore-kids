import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/posts'

const BlogIndex = () => {
  const allPosts = getAllPosts()
  const [activeCategory, setActiveCategory] = useState('All')

  const posts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(p => p.category === activeCategory)

  const filterPosts = (cat) => setActiveCategory(cat)

  return (
    <>
      <Helmet>
        <title>Blog — AI for Kids | AvenirCore</title>
        <meta name="description" content="Parent guides, tips, and honest advice on helping kids navigate AI safely. Written for families, not tech experts." />
        <link rel="canonical" href="https://avenircore.com/blog" />
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
            {['All', 'Parents', 'Teachers', 'Safety', 'Tools', 'Activities'].map(cat => (
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
                <article className="card" style={{ height: '100%', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span className="section-label" style={{ margin: 0, fontSize: '0.65rem' }}>{post.category}</span>
                    {post.featured && (
                      <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '0.25rem 0.6rem', background: 'var(--color-amber-soft)', color: '#92400e', borderRadius: 'var(--radius-pill)' }}>Featured</span>
                    )}
                  </div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--color-navy)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <span>{post.date}</span>
                      {post.readingTime && <span style={{ opacity: 0.6 }}>· {post.readingTime}</span>}
                    </div>
                    <span style={{ color: 'var(--color-emerald)', fontWeight: 700 }}>Read →</span>
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
