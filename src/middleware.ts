import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
/*   const { pathname } = request.nextUrl; */
  let response = handleI18nRouting(request);

  if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE");
  }

  response = await updateSession(request, response);

  response.headers.set(
    "Cache-Control",
    "public, max-age=3600, s-maxage=300, stale-while-revalidate=2592000"
  );
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  /* matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' */
  //exclude /en/auth/supabase/callback from middleware
  matcher:
    "/((?!api|_next|static|public|.*\\..*|en/auth/supabase/callback|en/auth/callback).*)",
};
