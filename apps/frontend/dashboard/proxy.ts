import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, verifySessionToken } from './lib/auth-session';

const PUBLIC_PATHS = ['/login'];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname);
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);

  if (!session && !isPublicPath(pathname)) {
    const loginUrl = new URL('/login', request.url);
    const nextPath = `${pathname}${search}`;
    if (nextPath !== '/') {
      loginUrl.searchParams.set('next', nextPath);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};
