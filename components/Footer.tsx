import Link from 'next/link'

function InstagramIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.55 15.57V8.43L15.82 12z" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12M7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink/10 bg-cosmos text-parchment">
      <div className="max-w-exhibit mx-auto px-6 py-14 grid gap-8 md:grid-cols-4">
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
        <div>
          <span className="museum-label text-brass">Follow</span>
          <ul className="mt-4 space-y-2 text-sm text-parchment/70">
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-parchment transition-colors"
              >
                <InstagramIcon />
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-parchment transition-colors"
              >
                <XIcon />
                X
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-parchment transition-colors"
              >
                <YouTubeIcon />
                YouTube
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-parchment transition-colors"
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-parchment/10 py-6 text-center text-xs text-parchment/40">
        © {new Date().getFullYear()} Cosmos. All observations reserved.
      </div>
    </footer>
  )
}
