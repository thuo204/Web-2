import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedPaths = ['/dashboard', '/admin'];
const authPaths = ['/auth/login', '/auth/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check auth cookie/token presence (lightweight check)
  const hasToken = request.cookies.has('accessToken') || 
    request.headers.get('authorization')?.startsWith('Bearer ');

  const isProtected = protectedPaths.some(p => pathname.startsWith(p));
  const isAuthPage = authPaths.some(p => pathname.startsWith(p));

  if (isProtected && !hasToken) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPage && hasToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/login', '/auth/register'],
};
