import { createBucketClient } from '@cosmicjs/sdk'
import { Post, Author, Category, Page, hasStatus } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging',
})

type BucketConfig = Parameters<typeof createBucketClient>[0]

/**
 * Server-only. Returns a Cosmic client scoped to a preview token when one is
 * present, otherwise the shared published-content client. Never call this from
 * a client component: the token and write key must not reach the browser.
 */
export function getCosmic(previewToken?: string | null) {
  if (!previewToken) return cosmic

  return createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
    readKey: process.env.COSMIC_READ_KEY as string,
    writeKey: process.env.COSMIC_WRITE_KEY as string,
    apiEnvironment: 'staging',
    previewToken,
  } as BucketConfig)
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    const posts = response.objects as Post[]
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.publish_date || '').getTime()
      const dateB = new Date(b.metadata?.publish_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch posts')
  }
}

export async function getPost(
  slug: string,
  previewToken?: string | null
): Promise<Post | null> {
  try {
    const client = getCosmic(previewToken)
    const query = client.objects.findOne({ type: 'posts', slug }).depth(1)
    const response = previewToken ? await query.status('any') : await query
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch post')
  }
}

/**
 * Look up any object by id. Used by the preview route to resolve an object id
 * coming from the Cosmic dashboard into a slug it can redirect to.
 */
export async function getObjectById(
  id: string,
  previewToken?: string | null
): Promise<{ id: string; slug: string; type: string } | null> {
  try {
    const client = getCosmic(previewToken)
    const query = client.objects.findOne({ id }).props(['id', 'slug', 'type'])
    const response = previewToken ? await query.status('any') : await query
    const object = response.object as
      | { id?: string; slug?: string; type?: string }
      | undefined

    if (!object || !object.id || !object.slug || !object.type) return null
    return { id: object.id, slug: object.slug, type: object.type }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    return null
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .depth(1)
    return response.object as Category
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch category')
  }
}

export async function getPostsByCategory(categoryId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.category': categoryId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch posts by category')
  }
}

export async function getAuthors(): Promise<Author[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'authors' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Author[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch authors')
  }
}

export async function getAuthor(slug: string): Promise<Author | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'authors', slug })
      .depth(1)
    return response.object as Author
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch author')
  }
}

export async function getPostsByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.author': authorId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.objects as Post[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch posts by author')
  }
}

export async function getPage(slug: string): Promise<Page | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch page')
  }
}