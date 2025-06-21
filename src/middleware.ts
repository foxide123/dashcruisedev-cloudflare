import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { verifyJwt } from "./utils/jwt/jwt";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;
  const authRoutes = ["/", "/en"];

  /*   const { pathname } = request.nextUrl; */
  let response = handleI18nRouting(request);

  if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE");
  }

  response = await updateSession(request, response);

  if (authRoutes.includes(pathname)) {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return response;
    }

    try {
      const token = session.access_token;
      //eslint-disable-next-line
      const payload: any = verifyJwt(token);
      if (!payload) {
        return NextResponse.redirect(new URL("/", request.url));
      } else {
        const currentPath = request.nextUrl.pathname;
        if (payload.user_role === "admin") {
          if (
            currentPath === "/en" ||
            currentPath === "/"
          ) {
            return NextResponse.redirect(new URL("/en/admin", request.url));
          }
        } else {
          if (
            currentPath === "/en" ||
            currentPath === "/"
          ) {
            return NextResponse.redirect(new URL("/en/dashboard", request.url));
          }
        }
      }
    } catch (error) {
      console.error("Error verifying jwt:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

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
