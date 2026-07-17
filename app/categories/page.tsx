import SectionHeading from '@/components/SectionHeading'
import CategoryCard from '@/components/CategoryCard'
import { getCategories } from '@/lib/cosmic'

export const revalidate = 60

export const metadata = {
  title: 'Exhibits — Cosmos',
  description: 'Browse exhibits by theme.',
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="max-w-exhibit mx-auto px-6 py-16">
      <SectionHeading
        label="Galleries"
        title="All Exhibits"
        description="Explore the cosmos, one gallery at a time."
      />
      {categories.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-center text-ink/50 py-20">No exhibits found.</p>
      )}
    </div>
  )
}