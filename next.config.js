/** @type {import('next').NextConfig} */

// Keep in sync with CSP_FRAME_ANCESTORS in middleware.ts. Setting this here as
// well ensures the framing policy applies to responses that do not pass through
// middleware (static assets, cached routes).
const CSP_FRAME_ANCESTORS =
  "frame-ancestors 'self' http://localhost:3040 http://localhost:3000 https://app.cosmicjs.com https://*.cosmicjs.com"

const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: CSP_FRAME_ANCESTORS,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig