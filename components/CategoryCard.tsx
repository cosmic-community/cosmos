import Link from 'next/link'
import { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function CategoryCard({ category }: { category: Category }) {
  const image = category.metadata?.cover_image
  const accent = getMetafieldValue(category.metadata?.accent_color) || '#1a1830'
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block overflow-hidden rounded-lg border border-ink/10 aspect-[4/5]"
    >
      {image ? (
        <img
          src={`${image.imgix_url}?w=800&h=1000&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={500}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: accent }} />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <span
          className="museum-label mb-2"
          style={{ color: accent === '#1a1830' ? '#b08d57' : accent }}
        >
          Exhibit
        </span>
        <h3 className="font-serif text-2xl font-600 text-parchment leading-tight">
          {name}
        </h3>
        {description && (
          <p className="mt-2 text-parchment/70 text-sm line-clamp-2">
            {description}
          </p>
        )}
      </div>
    </Link>
  )
}