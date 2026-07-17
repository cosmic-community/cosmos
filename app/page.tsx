import Hero from '@/components/Hero'
import SectionHeading from '@/components/SectionHeading'
import PostCard from '@/components/PostCard'
import CategoryCard from '@/components/CategoryCard'
import Link from 'next/link'
import { getPosts, getCategories } from '@/lib/cosmic'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()])

  const featured = posts[0]
  const rest = posts.slice(1, 7)

  return (
    <>
      <Hero />

      <div className="max-w-exhibit mx-auto px-6 py-20">
        {featured && (
          <section className="mb-24">
            <SectionHeading
              label="Featured Exhibit"
              title="Now on Display"
            />
            <PostCard post={featured} featured />
          </section>
        )}

        {categories.length > 0 && (
          <section className="mb-24">
            <SectionHeading
              label="Galleries"
              title="Exhibits by Theme"
              description="Each gallery gathers articles around a single wonder of the cosmos."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </section>
        )}

        {rest.length > 0 && (
          <section>
            <SectionHeading
              label="Recent Acquisitions"
              title="Latest Articles"
            />
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/posts"
                className="inline-block px-7 py-3 rounded-full border border-ink/20 text-ink font-sans font-semibold text-sm hover:bg-ink hover:text-parchment transition-colors"
              >
                View All Articles
              </Link>
            </div>
          </section>
        )}

        {posts.length === 0 && (
          <p className="text-center text-ink/50 py-20">
            No articles have been added to the collection yet.
          </p>
        )}
      </div>
    </>
  )
}