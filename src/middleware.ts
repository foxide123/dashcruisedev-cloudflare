import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { verifyJwt } from "./utils/jwt/jwt";

const handleI18nRouting = createMiddleware(routing);

function secureRedirect(path: string, request: NextRequest) {
  const url = new URL(path, request.url);
  const response = NextResponse.redirect(url);
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  return response;
}

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;
  const protectedRoutes = [
    "/admin",
    "/dashboard",
    "/en/admin",
    "/en/dashboard",
  ];
/*   const redirectableRoutes = ["/", "/en"]; */
  const isProtectedRoute = protectedRoutes.includes(currentPath);
  //eslint-disable-next-line
/*   const shouldRedirectFromRoot = redirectableRoutes.includes(currentPath); */

  /*   const { pathname } = request.nextUrl; */
  let response = handleI18nRouting(request);

  if (!response.ok) {
    return response;
  }

  /*   if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE");
  } */

  const { response:updatedResponse, session } = await updateSession(
    request, response
  );


  const token = session?.access_token;

  if (!token) {
    if (protectedRoutes) {
      return secureRedirect("/", request);
    }
  }
  
    try {
      //eslint-disable-next-line
      const payload: any = await verifyJwt(token!);
      if(!payload){
        return secureRedirect('/', request);
      }
      const userRole = payload.payload.user_role;
      console.log("User role:", userRole);

      if (userRole !== "admin" && currentPath.includes("/admin")) {
        return secureRedirect("/en/dashboard", request);
      }

      if (userRole === "admin" && currentPath.includes("/dashboard")) {
        return secureRedirect("/en/admin", request);
      }

     /*  updatedResponse.headers.set(
        "Cache-Control",
        "public, max-age=3600, s-maxage=300, stale-while-revalidate=2592000"
      ); */

      return updatedResponse;
    } catch (error) {
      console.error("Error verifying jwt:", error);
      return secureRedirect("/", request);
    }

}

export const config = {
  /* matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' */
  //exclude /en/auth/supabase/callback from middleware
  matcher:
    "/((?!api|_next|static|public|.*\\..*|en/auth/supabase/callback|en/auth/callback|api/auth/callback).*)",
};
