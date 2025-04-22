import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware";

 
const handleI18nRouting = createMiddleware(routing);
 
export async function middleware(request: NextRequest) {

  const {pathname} = request.nextUrl;

  if (pathname === "/") {
    const header = request.headers.get("accept-language") || "";
    const preferred = header.split(",")[0].split("-")[0];  
    const locale = routing.locales.includes('en')
      ? preferred
      : routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url), 307);
  }

  let response = handleI18nRouting(request);

  if (request.nextUrl.pathname.startsWith('/en/dashboard') ||
      request.nextUrl.pathname.startsWith('/de/dashboard') ||
      request.nextUrl.pathname.startsWith('/ro/dashboard') ||
      request.nextUrl.pathname.startsWith('/pl/dashboard')) {
    response = await updateSession(request, response);
  }

  response.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=300, stale-while-revalidate=2592000');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}
 
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};