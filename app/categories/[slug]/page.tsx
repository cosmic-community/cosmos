// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import { getCategory, getPostsByCategory, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)
  const accent = getMetafieldValue(category.metadata?.accent_color) || '#b08d57'
  const image = category.metadata?.cover_image

  return (
    <div>
      <header className="relative bg-cosmos text-parchment">
        {image && (
          <div className="absolute inset-0">
            <img
              src={`${image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
              alt={name}
              width={1000}
              height={400}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmos via-cosmos/60 to-cosmos/20" />
          </div>
        )}
        <div className="relative max-w-exhibit mx-auto px-6 py-24 text-center">
          <span className="museum-label" style={{ color: accent }}>
            Exhibit
          </span>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl font-700 tracking-tight">
            {name}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl mx-auto text-parchment/70 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </header>

      <div className="max-w-exhibit mx-auto px-6 py-16">
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50 py-20">
            No articles in this exhibit yet.
          </p>
        )}
        <div className="mt-16 text-center">
          <Link
            href="/categories"
            className="inline-block px-7 py-3 rounded-full border border-ink/20 text-ink font-sans font-semibold text-sm hover:bg-ink hover:text-parchment transition-colors"
          >
            ← All Exhibits
          </Link>
        </div>
      </div>
    </div>
  )
}