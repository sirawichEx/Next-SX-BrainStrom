import createMiddleware from 'next-intl/middleware';

import { routing } from './src/libs/navigation';
import { NextRequest, NextResponse } from 'next/server';


export default function middleware(request: NextRequest) {
  console.log("🚀 ~ middleware ~ request:", request)
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const isProtectedRoute = pathname.startsWith('/checkout');
  const isAuthRoute = pathname.startsWith('/auth');
  
  if (isProtectedRoute && !isAuthRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  const response = createMiddleware(routing);

  return response
}

export const config = {
  // Match root path and internationalized pathnames
  matcher: ['/', '/(th|en)/:path*'],
};
