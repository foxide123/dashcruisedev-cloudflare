import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { type NextRequest } from "next/server"
import { updateSession } from "@/utils/supabase/middleware";

 
const handleI18nRouting = createMiddleware(routing);
 
export async function middleware(request: NextRequest) {
  const i18nResponse = handleI18nRouting(request);
 
  // A `response` can now be passed here
  const finalResponse = await updateSession(request, i18nResponse);

  finalResponse.headers.set('Cache-Control', 'public, max-age=3600, s-maxage=300, stale-while-revalidate=2592000');
  finalResponse.headers.set('X-Content-Type-Options', 'nosniff');
  finalResponse.headers.set('X-Frame-Options', 'DENY');
  finalResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return finalResponse;
}
 
 
export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};