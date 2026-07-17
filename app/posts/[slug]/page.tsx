// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPost, getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/format'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const image = post.metadata?.featured_image
  const category = post.metadata?.category
  const author = post.metadata?.author
  const content = getMetafieldValue(post.metadata?.content)
  const tags = post.metadata?.tags
  const accent = getMetafieldValue(category?.metadata?.accent_color) || '#b08d57'

  return (
    <article>
      <header className="relative bg-cosmos text-parchment">
        {image && (
          <div className="absolute inset-0">
            <img
              src={`${image.imgix_url}?w=2000&h=1000&fit=crop&auto=format,compress`}
              alt={post.title}
              width={1000}
              height={500}
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cosmos via-cosmos/60 to-cosmos/20" />
          </div>
        )}
        <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="museum-label"
              style={{ color: accent }}
            >
              {getMetafieldValue(category.metadata?.name) || category.title}
            </Link>
          )}
          <h1 className="mt-4 font-serif text-4xl md:text-6xl font-700 leading-tight tracking-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-3 text-sm text-parchment/70 font-sans">
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="hover:text-parchment transition-colors"
              >
                {getMetafieldValue(author.metadata?.name) || author.title}
              </Link>
            )}
            {post.metadata?.publish_date && (
              <>
                <span className="w-1 h-1 rounded-full bg-parchment/40" />
                <span>{formatDate(post.metadata.publish_date)}</span>
              </>
            )}
            {post.metadata?.reading_time ? (
              <>
                <span className="w-1 h-1 rounded-full bg-parchment/40" />
                <span>{post.metadata.reading_time} min read</span>
              </>
            ) : null}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {post.metadata?.excerpt && (
          <p className="font-serif text-xl md:text-2xl text-ink/70 leading-relaxed mb-10 italic">
            {getMetafieldValue(post.metadata.excerpt)}
          </p>
        )}

        {content && (
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-a:text-brass-dark"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}

        {tags && tags.length > 0 && (
          <div className="mt-14 pt-8 border-t border-ink/10">
            <span className="museum-label">Tags</span>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-parchment-dark text-ink/70 text-xs font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {author && (
          <div className="mt-14 pt-8 border-t border-ink/10 flex items-center gap-5">
            {author.metadata?.profile_photo && (
              <img
                src={`${author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                alt={author.title}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
            <div>
              <span className="museum-label">Curated by</span>
              <h4 className="font-serif text-lg font-600 text-ink">
                <Link
                  href={`/authors/${author.slug}`}
                  className="hover:text-brass-dark transition-colors"
                >
                  {getMetafieldValue(author.metadata?.name) || author.title}
                </Link>
              </h4>
              {author.metadata?.role && (
                <p className="text-ink/60 text-sm">
                  {getMetafieldValue(author.metadata.role)}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/posts"
            className="inline-block px-7 py-3 rounded-full border border-ink/20 text-ink font-sans font-semibold text-sm hover:bg-ink hover:text-parchment transition-colors"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    </article>
  )
}