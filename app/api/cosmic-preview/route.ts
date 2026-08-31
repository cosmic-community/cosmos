// app/api/cosmic-preview/route.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getObjectById } from '@/lib/cosmic'

export const dynamic = 'force-dynamic'

// Object types that render at the site root rather than under /{type}/{slug}.
const ROOT_LEVEL_TYPES = new Set(['pages'])

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const objectId = searchParams.get('object_id')
  const previewToken = searchParams.get('preview_token')

  if (!objectId) {
    return new NextResponse('Missing object_id', { status: 400 })
  }

  const object = await getObjectById(objectId, previewToken)

  if (!object) {
    return new NextResponse('Object not found', { status: 404 })
  }

  const path = ROOT_LEVEL_TYPES.has(object.type)
    ? `/${object.slug}`
    : `/${object.type}/${object.slug}`

  const redirectUrl = new URL(path, origin)

  if (previewToken) {
    redirectUrl.searchParams.set('preview_token', previewToken)
  }

  return NextResponse.redirect(redirectUrl)
}