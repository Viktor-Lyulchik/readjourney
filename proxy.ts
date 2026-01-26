import { NextRequest, NextResponse } from 'next/server';

const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/recommended', '/reading', '/books'];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('token')?.value;

  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some(route =>
    pathname.startsWith(route)
  );

  // ✅ авторизований
  if (token) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/recommended', request.url));
    }
    return NextResponse.next();
  }

  // ❌ не авторизований
  if (!token && isPrivateRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/recommended/:path*',
    '/reading/:path*',
    '/books/:path*',
  ],
};
