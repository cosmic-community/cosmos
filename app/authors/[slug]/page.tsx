// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PostCard from '@/components/PostCard'
import SectionHeading from '@/components/SectionHeading'
import { getAuthor, getPostsByAuthor, getMetafieldValue } from '@/lib/cosmic'

export const revalidate = 60

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthor(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const role = getMetafieldValue(author.metadata?.role)
  const bio = getMetafieldValue(author.metadata?.bio)
  const photo = author.metadata?.profile_photo

  return (
    <div>
      <header className="bg-cosmos text-parchment">
        <div className="max-w-exhibit mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          {photo ? (
            <img
              src={`${photo.imgix_url}?w=320&h=320&fit=crop&auto=format,compress`}
              alt={name}
              width={160}
              height={160}
              className="w-40 h-40 rounded-full object-cover ring-4 ring-brass/40"
            />
          ) : (
            <div className="w-40 h-40 rounded-full bg-cosmos-light flex items-center justify-center text-5xl">
              👤
            </div>
          )}
          <div>
            {role && (
              <span className="museum-label text-brass">{role}</span>
            )}
            <h1 className="mt-2 font-serif text-4xl md:text-5xl font-700 tracking-tight">
              {name}
            </h1>
            {bio && (
              <p className="mt-4 max-w-2xl text-parchment/70 leading-relaxed">
                {bio}
              </p>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-exhibit mx-auto px-6 py-16">
        <SectionHeading label="Contributions" title="Articles by this Curator" />
        {posts.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-ink/50 py-20">
            No articles by this curator yet.
          </p>
        )}
        <div className="mt-16 text-center">
          <Link
            href="/authors"
            className="inline-block px-7 py-3 rounded-full border border-ink/20 text-ink font-sans font-semibold text-sm hover:bg-ink hover:text-parchment transition-colors"
          >
            ← All Curators
          </Link>
        </div>
      </div>
    </div>
  )
}