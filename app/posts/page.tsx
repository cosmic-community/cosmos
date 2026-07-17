import SectionHeading from '@/components/SectionHeading'
import PostCard from '@/components/PostCard'
import { getPosts } from '@/lib/cosmic'

export const revalidate = 60

export const metadata = {
  title: 'Articles — Cosmos',
  description: 'Every article in the Cosmos collection.',
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <div className="max-w-exhibit mx-auto px-6 py-16">
      <SectionHeading
        label="The Collection"
        title="All Articles"
        description="Browse the complete archive of cosmic exhibits."
      />
      {posts.length > 0 ? (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/50 py-20">No articles found.</p>
      )}
    </div>
  )
}