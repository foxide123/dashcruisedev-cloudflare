import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware";

 
const handleI18nRouting = createMiddleware(routing); 
 
export async function middleware(request: NextRequest) {
 let response = handleI18nRouting(request);

  response.headers.delete('set-cookie');


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
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};