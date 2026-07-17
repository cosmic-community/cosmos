import { notFound } from 'next/navigation'
import { getPage } from '@/lib/cosmic'
import type { CosmicImage } from '@/types'

export const revalidate = 60

export const metadata = {
  title: 'About — Cosmos',
  description:
    'Learn about Cosmos, a publication exploring physics, cosmology, and space exploration for the endlessly curious.',
}

// Minimal, dependency-free markdown renderer for headings, paragraphs and bold.
function renderMarkdown(markdown: string): string {
  const escape = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

  const inline = (s: string) =>
    escape(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')

  const blocks = markdown.split(/\n{2,}/)
  return blocks
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      const heading = trimmed.match(/^(#{1,6})\s+(.*)$/)
      if (heading) {
        const hashes = heading[1] ?? ''
        const text = heading[2] ?? ''
        const level = Math.min(hashes.length, 6)
        return `<h${level}>${inline(text)}</h${level}>`
      }
      return `<p>${inline(trimmed.replace(/\n/g, ' '))}</p>`
    })
    .filter(Boolean)
    .join('\n')
}

function getImageUrl(hero: CosmicImage | string | undefined): string {
  if (!hero) return ''
  if (typeof hero === 'string') return hero
  return hero.imgix_url || hero.url || ''
}

export default async function AboutPage() {
  const page = await getPage('about')

  if (!page) {
    notFound()
  }

  const content = page.metadata?.content || ''
  const heroUrl = getImageUrl(page.metadata?.hero_image)

  return (
    <div className="max-w-exhibit mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="museum-label">The Publication</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-600 tracking-tight text-ink mt-3 mb-10">
          {page.title}
        </h1>

        {heroUrl ? (
          <img
            src={`${heroUrl}?w=1600&auto=format,compress`}
            alt={page.title}
            className="w-full rounded-lg mb-12 border border-ink/10"
          />
        ) : null}

        <div
          className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-ink prose-p:text-ink/80"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      </div>
    </div>
  )
}