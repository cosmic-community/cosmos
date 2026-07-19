import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-cosmos text-parchment">
      <div className="max-w-exhibit mx-auto px-6 py-14 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🌌</span>
            <span className="font-serif text-xl font-600">Cosmos</span>
          </div>
          <p className="text-parchment/60 text-sm max-w-xs leading-relaxed">
            A curated collection of ideas on physics, gravity, time, space, and
            everything the universe has to offer.
          </p>
        </div>
        <div>
          <span className="museum-label text-brass">Explore</span>
          <ul className="mt-4 space-y-2 text-sm text-parchment/70">
            <li>
              <Link href="/posts" className="hover:text-parchment transition-colors">
                Articles
              </Link>
            </li>
            <li>
              <Link
                href="/categories"
                className="hover:text-parchment transition-colors"
              >
                Exhibits
              </Link>
            </li>
            <li>
              <Link
                href="/authors"
                className="hover:text-parchment transition-colors"
              >
                Curators
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-parchment transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <span className="museum-label text-brass">About</span>
          <p className="mt-4 text-sm text-parchment/70 leading-relaxed">
            Content managed with Cosmic. Every article is an exhibit in an
            ever-expanding gallery of cosmic wonder.
          </p>
        </div>
      </div>
      <div className="border-t border-parchment/10 py-6 text-center text-xs text-parchment/40">
        © {new Date().getFullYear()} Cosmos. All observations reserved.
      </div>
    </footer>
  )
}