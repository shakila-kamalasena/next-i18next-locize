import { NextRequest, NextResponse } from 'next/server';
import { languages, fallbackLng } from './app/i18n/settings';

export function middleware(request: NextRequest): NextResponse {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname has a supported language
  const pathnameHasLocale = languages.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect if there is no locale
  const locale = request.cookies.get('NEXT_LOCALE')?.value || fallbackLng;
  
  // e.g. incoming request is /products
  // The new URL is now /en/products
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname === '/' ? '' : pathname}`,
      request.url
    )
  );
}

export const config = {
  // Match all routes except public folders
  matcher: ['/((?!api|_next|static|public|favicon.ico).*)']
};
