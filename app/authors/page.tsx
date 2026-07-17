import SectionHeading from '@/components/SectionHeading'
import AuthorCard from '@/components/AuthorCard'
import { getAuthors } from '@/lib/cosmic'

export const revalidate = 60

export const metadata = {
  title: 'Curators — Cosmos',
  description: 'Meet the curators behind the cosmos.',
}

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="max-w-exhibit mx-auto px-6 py-16">
      <SectionHeading
        label="The Team"
        title="Our Curators"
        description="The minds who gather and present each cosmic exhibit."
      />
      {authors.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/50 py-20">No curators found.</p>
      )}
    </div>
  )
}