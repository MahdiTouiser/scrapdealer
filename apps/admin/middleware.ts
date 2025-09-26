import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/forgot-password'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoggedIn = Boolean(req.cookies.get('auth_token'));

  if (pathname === '/') {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  if (!isLoggedIn && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  if (isLoggedIn && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
};
