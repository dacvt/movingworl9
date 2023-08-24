import { type NextRequest, NextResponse } from 'next/server';

// Runs on every page
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const slug = pathname.replace('/post/', '');
  if (request.nextUrl.searchParams.get('fbclid') && slug) {
    return NextResponse.redirect(`https://movingworl.com/${slug}`);
  }
  return NextResponse.next();
}
