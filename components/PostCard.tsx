import Link from 'next/link'
import { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/format'

interface PostCardProps {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: PostCardProps) {
  const image = post.metadata?.featured_image
  const category = post.metadata?.category
  const excerpt = getMetafieldValue(post.metadata?.excerpt)
  const readingTime = post.metadata?.reading_time
  const accent = getMetafieldValue(category?.metadata?.accent_color) || '#b08d57'

  return (
    <article
      className={`group relative overflow-hidden rounded-lg border border-ink/10 bg-white transition-shadow hover:shadow-xl ${
        featured ? 'md:flex' : ''
      }`}
    >
      {image && (
        <Link
          href={`/posts/${post.slug}`}
          className={`block overflow-hidden ${
            featured ? 'md:w-1/2' : ''
          }`}
        >
          <img
            src={`${image.imgix_url}?w=${featured ? 1200 : 800}&h=${
              featured ? 800 : 500
            }&fit=crop&auto=format,compress`}
            alt={post.title}
            width={featured ? 600 : 400}
            height={featured ? 400 : 250}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      )}
      <div className={`p-6 ${featured ? 'md:w-1/2 md:p-10 flex flex-col justify-center' : ''}`}>
        {category && (
          <span
            className="museum-label mb-3"
            style={{ color: accent }}
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </span>
        )}
        <h3
          className={`font-serif font-600 text-ink leading-tight ${
            featured ? 'text-3xl' : 'text-xl'
          }`}
        >
          <Link href={`/posts/${post.slug}`} className="hover:text-brass-dark transition-colors">
            {post.title}
          </Link>
        </h3>
        {excerpt && (
          <p className="mt-3 text-ink/60 text-sm leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}
        <div className="mt-5 flex items-center gap-3 text-xs text-ink/50 font-sans">
          {post.metadata?.publish_date && (
            <span>{formatDate(post.metadata.publish_date)}</span>
          )}
          {readingTime ? (
            <>
              <span className="w-1 h-1 rounded-full bg-ink/30" />
              <span>{readingTime} min read</span>
            </>
          ) : null}
        </div>
      </div>
    </article>
  )
}