import { getPayload } from 'payload'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import config from '@/payload.config'
import './styles.css'

// Definimos el orden exacto deseado con los slugs exactos de tu base de datos
const CATEGORIES_CONFIG = [
  { slug: 'moda-local', layoutType: 1 }, // 1. Moda Local
  { slug: 'makeup', layoutType: 2 }, // 2. Makeup & Beauty
  { slug: 'lifestyle', layoutType: 3 }, // 3. Lifestyle
  { slug: 'cultura', layoutType: 30 }, // 4. Cultura
  { slug: 'eventos', layoutType: 5 }, // 5. Festivales y Eventos
  { slug: 'horoscopo', layoutType: 4 }, // 6. Horóscopo
]

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

  // Mapeamos exactamente según el orden configurado arriba
  const orderedSections = CATEGORIES_CONFIG.map((configItem) => {
    const categoryDoc = categories.find((c) => c.slug === configItem.slug)
    if (!categoryDoc) return null

    const categoryPosts = posts.filter(
      (post) => typeof post.category === 'object' && post.category?.id === categoryDoc.id,
    )

    return {
      category: categoryDoc,
      layoutType: configItem.layoutType,
      posts: categoryPosts,
    }
  }).filter((section): section is NonNullable<typeof section> => section !== null)

  return (
    <div className="home-container">
      {orderedSections.map(({ category, layoutType, posts: categoryPosts }) => {
        if (categoryPosts.length === 0) return null

        return (
          <section key={category.id} className="category-section">
            {/* Encabezado */}
            <div className="section-header-framed">
              <h2 className="section-title">{category.title}</h2>
            </div>

            {/* LAYOUT 1: MODA LOCAL (Scroll horizontal hasta 10 historias, 3 visibles en Desktop) */}
            {layoutType === 1 && (
              <div className="layout-section-1">
                {categoryPosts.slice(0, 10).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* LAYOUT 2: MAKEUP & BEAUTY (2 Izq + 1 Centro Destacado + 2 Der) */}
            {layoutType === 2 && (
              <div className="layout-section-2">
                <div className="sec2-side">
                  {categoryPosts.slice(1, 3).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>

                <div className="sec2-center">
                  {categoryPosts[0] && <PostCard post={categoryPosts[0]} isFeatured={true} />}
                </div>

                <div className="sec2-side">
                  {categoryPosts.slice(3, 5).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT 3: LIFESTYLE (Scroll Mobile hasta 8 / Scroll Desktop hasta 10) */}
            {layoutType === 3 && (
              <div className="layout-section-3-scroll">
                {categoryPosts.slice(0, 10).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* LAYOUT 3V: CULTURA (Vertical en Mobile hasta 4 / Scroll Desktop hasta 10) */}
            {layoutType === 30 && (
              <div className="layout-section-3-vertical">
                {categoryPosts.slice(0, 10).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* LAYOUT 5: FESTIVALES Y EVENTOS (Grande Izq + Grid Pequeña Der) */}
            {layoutType === 5 && (
              <div className="layout-section-5">
                <div className="sec5-main">
                  {categoryPosts[0] && <PostCard post={categoryPosts[0]} isFeatured={true} />}
                </div>

                <div className="sec5-grid">
                  {categoryPosts.slice(1, 5).map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}

            {/* LAYOUT 4: HORÓSCOPO (Grid 4 columnas) */}
            {layoutType === 4 && (
              <div className="layout-section-4">
                {categoryPosts.slice(0, 4).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Footer de la Sección */}
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

function PostCard({ post, isFeatured = false }: { post: any; isFeatured?: boolean }) {
  const categoryName = typeof post.category === 'object' ? post.category?.title : ''

  return (
    <article className={`post-card ${isFeatured ? 'featured-card' : ''}`}>
      <Link href={`/posts/${post.slug}`}>
        {post.featuredImage && typeof post.featuredImage === 'object' && (
          <div className="card-image-wrapper">
            <Image
              src={post.featuredImage.url || ''}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 82vw, (max-width: 1024px) 33vw, 280px"
              style={{ objectFit: 'cover' }}
            />
          </div>
        )}

        <div className="card-content">
          {categoryName && <span className="card-category-tag">{categoryName}</span>}
          <h3 className="card-title">{post.title}</h3>
          {post.excerpt && <p className="card-excerpt">{post.excerpt}</p>}
        </div>
      </Link>
    </article>
  )
}
