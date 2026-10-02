import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/payload.config'
import './styles.css'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const { docs: categories } = await payload.find({
    collection: 'categories',
    limit: 100,
  })

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      status: {
        equals: 'published',
      },
    },
    depth: 2,
    limit: 100,
    sort: '-createdAt',
  })

  return (
    <div className="home-container">
      {categories.map((category, index) => {
        const categoryPosts = posts.filter(
          (post) =>
            typeof post.category === 'object' && post.category?.id === category.id
        )

        if (categoryPosts.length === 0) return null

        const isFeaturedSection = index === 0

        return (
          <section key={category.id} className="category-section">
            {/* Título encerrado: línea arriba y línea abajo */}
            <div className="section-header-framed">
              <h2 className="section-title">{category.title}</h2>
            </div>

            {/* Grilla de Artículos */}
            <div
              className={
                isFeaturedSection ? 'posts-grid-featured' : 'posts-grid-standard'
              }
            >
              {categoryPosts.slice(0, 3).map((post) => {
                const categoryName =
                  typeof post.category === 'object' ? post.category.title : ''

                return (
                  <article key={post.id} className="post-card">
                    <Link href={`/posts/${post.slug}`}>
                      {/* Imagen Arriba */}
                      {post.featuredImage && typeof post.featuredImage === 'object' && (
                        <div className="card-image-wrapper">
                          <Image
                            src={post.featuredImage.url || ''}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                      )}

                      {/* Texto y Categoría Abajo */}
                      <div className="card-content">
                        {categoryName && (
                          <span className="card-category-tag">{categoryName}</span>
                        )}
                        <h3 className="card-title">{post.title}</h3>
                        {post.excerpt && (
                          <p className="card-excerpt">{post.excerpt}</p>
                        )}
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>

            {/* Ver todo al final de la sección */}
            <div className="section-footer">
              <Link href={`/category/${category.slug}`} className="see-all-link">
                Ver todo en {category.title} &rarr;
              </Link>
            </div>
          </section>
        )
      })}

      {posts.length === 0 && (
        <div className="no-posts">
          <p>Aún no hay artículos publicados en el panel.</p>
        </div>
      )}
    </div>
  )
}