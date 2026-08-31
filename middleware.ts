import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Allow the Cosmic dashboard to embed the site in its preview iframe.
// localhost origins support running the dashboard locally against this site.
const CSP_FRAME_ANCESTORS =
  "frame-ancestors 'self' http://localhost:3040 http://localhost:3000 https://app.cosmicjs.com https://*.cosmicjs.com"

const PREVIEW_COOKIE = 'cosmic_preview'
const PREVIEW_MAX_AGE = 60 * 60 // 1 hour

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const previewToken = request.nextUrl.searchParams.get('preview_token')

  if (previewToken) {
    // httpOnly so the token is never readable from client JS. SameSite=None is
    // required for the cookie to survive inside the dashboard preview iframe.
    response.cookies.set(PREVIEW_COOKIE, previewToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: PREVIEW_MAX_AGE,
    })
  }

  response.headers.set('Content-Security-Policy', CSP_FRAME_ANCESTORS)

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}