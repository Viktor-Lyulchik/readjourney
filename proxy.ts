import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/recommended', '/reading', '/library'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(token ? '/recommended' : '/login', request.url)
    );
  }

  if (token) {
    // Authorized users should not access login or register pages
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/recommended', request.url));
    }
  } else {
    // Unauthorized users should not access private routes
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/recommended/:path*',
    '/reading/:path*',
    '/library/:path*',
  ],
};
