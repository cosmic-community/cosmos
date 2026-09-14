import type { MetadataRoute } from 'next'
import { getPosts, getCategories, getAuthors } from '@/lib/cosmic'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, authors] = await Promise.all([
    getPosts(),
    getCategories(),
    getAuthors(),
  ])

  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${SITE_URL}/posts`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/authors`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ]

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: new Date(post.modified_at || post.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/categories/${category.slug}`,
    lastModified: new Date(category.modified_at || category.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${SITE_URL}/authors/${author.slug}`,
    lastModified: new Date(author.modified_at || author.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...authorRoutes]
}
