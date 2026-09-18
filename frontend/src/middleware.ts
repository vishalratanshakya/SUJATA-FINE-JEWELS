import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if it's an admin route
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const isAdminLoginRoute = request.nextUrl.pathname === '/admin/login';
    
    // Allow access to the login page itself
    if (isAdminLoginRoute) {
      return NextResponse.next();
    }

    // Check for the admin_token cookie
    const adminToken = request.cookies.get('admin_token');
    
    if (!adminToken) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
