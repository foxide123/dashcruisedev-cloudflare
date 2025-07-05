import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

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
  const response = handleI18nRouting(request);

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return await updateSession(request, response);

  /*   try {
    //eslint-disable-next-line
    const payload: any = await verifyJwt(session.access_token);
    if (!payload) {
      return secureRedirect("/", request);
    }
    const userRole = payload.payload.user_role;

    if (userRole !== "admin" && currentPath.includes("/admin")) {
      return secureRedirect("/en/dashboard", request);
    }

    if (userRole === "admin" && currentPath.includes("/dashboard")) {
      return secureRedirect("/en/admin", request);
    }

    return updatedResponse;
  } catch (error) {
    console.error("Error verifying jwt:", error);
    return secureRedirect("/", request);
  } */
}

export const config = {
  /* matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)' */
  //exclude /en/auth/supabase/callback from middleware
  matcher:
    "/((?!api|_next|static|public|.*\\..*|en/auth/supabase/callback|en/auth/callback|api/auth/callback).*)",
};
