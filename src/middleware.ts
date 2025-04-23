/* import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const hasCookies = request.cookies.getAll().length > 0;

  if (hasCookies) {
    console.log("Incoming cookies detected:", request.cookies.getAll());
  }

  let response = handleI18nRouting(request);

  if (request.cookies.get('NEXT_LOCALE')) {
    response.cookies.delete('NEXT_LOCALE');
  }

  const outgoingCookies = response.cookies.getAll();

  if (outgoingCookies.length > 0) {
    console.log('Outgoing cookies set on response:', outgoingCookies);
  }


  if (response.cookies.get("NEXT_LOCALE")) {
    response.cookies.delete("NEXT_LOCALE");
  }

  if (
    request.nextUrl.pathname.startsWith("/en/dashboard") ||
    request.nextUrl.pathname.startsWith("/de/dashboard") ||
    request.nextUrl.pathname.startsWith("/ro/dashboard") ||
    request.nextUrl.pathname.startsWith("/pl/dashboard")
  ) {
    response = await updateSession(request, response);
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
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
 */

import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export function middleware(request: NextRequest) {
  console.log("middleware");
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/en", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  const cloudflareContext = getCloudflareContext();

  requestHeaders.set(
    "x-cloudflare-context",
    `typeof \`cloudflareContext.env\` = ${typeof cloudflareContext.env}`
  );

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};