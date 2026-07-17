import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-ink/10 bg-parchment/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-exhibit mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span className="text-2xl">🌌</span>
          <div className="leading-none">
            <span className="block font-serif text-2xl font-600 tracking-tight text-ink">
              Cosmos
            </span>
            <span className="museum-label mt-1">Museum of the Universe</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-sans text-sm font-medium">
          <Link href="/" className="text-ink/70 hover:text-ink transition-colors">
            Home
          </Link>
          <Link
            href="/posts"
            className="text-ink/70 hover:text-ink transition-colors"
          >
            Articles
          </Link>
          <Link
            href="/categories"
            className="text-ink/70 hover:text-ink transition-colors"
          >
            Exhibits
          </Link>
          <Link
            href="/authors"
            className="text-ink/70 hover:text-ink transition-colors"
          >
            Curators
          </Link>
        </nav>
      </div>
    </header>
  )
}