import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { verifyJwt } from "./utils/jwt/jwt";

const handleI18nRouting = createMiddleware(routing);

function secureRedirect(path: string, request: NextRequest){
  const url = new URL(path, request.url);
  const response = NextResponse.redirect(url);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const redirectablePaths = ["/"];
  const protectedRoutes = [
    "/admin",
    "/dashboard",
    "/en/admin",
    "/en/dashboard",
  ];
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  const shouldRedirectFromRoot = redirectablePaths.includes(currentPath);

  /*   const { pathname } = request.nextUrl; */
  let response = handleI18nRouting(request);

  if(!response.ok){
    return response;
  }

/*   if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE");
  } */

  response = await updateSession(request, response);

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // Allow non-authenticated users to hit public routes, deny protected
    if (isProtectedRoute) {
      return secureRedirect("/", request);
    }
    return response;
  }

  try {
    const token = session.access_token;
    //eslint-disable-next-line
    const payload: any = await verifyJwt(token);
    console.log("Payload:", payload);

    if (shouldRedirectFromRoot) {
      if (payload.user_role === "admin") {
        return secureRedirect("/en/admin", request);
      } else {
        return secureRedirect("/en/dashboard", request);
      }
    }

    if (payload.user_role !== "admin" && currentPath.includes("/admin")) {
      return secureRedirect("/en/dashboard", request);
    }

    response.headers.set(
      "Cache-Control",
      "public, max-age=3600, s-maxage=300, stale-while-revalidate=2592000"
    );

    return response;
  } catch (error) {
    console.error("Error verifying jwt:", error);
    return secureRedirect("/", request);
  }
}

export const config = {
  /* matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' */
  //exclude /en/auth/supabase/callback from middleware
  matcher:
    "/((?!api|_next|static|public|.*\\..*|en/auth/supabase/callback|en/auth/callback).*)",
};
