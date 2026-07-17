import Link from 'next/link'
import { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

export default function AuthorCard({ author }: { author: Author }) {
  const photo = author.metadata?.profile_photo
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const role = getMetafieldValue(author.metadata?.role)
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center p-8 rounded-lg border border-ink/10 bg-white transition-shadow hover:shadow-lg"
    >
      {photo ? (
        <img
          src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
          alt={name}
          width={160}
          height={160}
          className="w-32 h-32 rounded-full object-cover ring-4 ring-parchment-dark"
        />
      ) : (
        <div className="w-32 h-32 rounded-full bg-cosmos flex items-center justify-center text-4xl">
          👤
        </div>
      )}
      <h3 className="mt-5 font-serif text-xl font-600 text-ink group-hover:text-brass-dark transition-colors">
        {name}
      </h3>
      {role && <span className="museum-label mt-1">{role}</span>}
      {bio && (
        <p className="mt-3 text-ink/60 text-sm leading-relaxed line-clamp-3">
          {bio}
        </p>
      )}
    </Link>
  )
}