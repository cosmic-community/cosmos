import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cosmos text-parchment">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(176,141,87,0.25), transparent 40%), radial-gradient(circle at 80% 70%, rgba(45,42,74,0.6), transparent 50%)',
        }}
      />
      <div className="relative max-w-exhibit mx-auto px-6 py-24 md:py-32 text-center">
        <span className="museum-label text-brass">Permanent Collection</span>
        <h1 className="mt-6 font-serif text-5xl md:text-7xl font-700 leading-[1.05] tracking-tight">
          A Museum of
          <br />
          the Universe
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-parchment/70 text-lg leading-relaxed">
          Wander the halls of physics, gravity, time, and space. Each article is
          an exhibit — a carefully curated encounter with the cosmos.
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/posts"
            className="px-7 py-3 rounded-full bg-brass text-ink font-sans font-semibold text-sm hover:bg-brass-dark hover:text-parchment transition-colors"
          >
            Browse Articles
          </Link>
          <Link
            href="/categories"
            className="px-7 py-3 rounded-full border border-parchment/30 text-parchment font-sans font-semibold text-sm hover:bg-parchment/10 transition-colors"
          >
            View Exhibits
          </Link>
        </div>
      </div>
    </section>
  )
}