import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const origin = request.nextUrl.origin;

  const code = searchParams.get("code");

  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv || origin.includes("localhost")) {
        /* return NextResponse.redirect(`${origin}${next}`); */
        return NextResponse.redirect('http://localhost:3000/admin');
      } else if (forwardedHost) {
        /* return NextResponse.redirect(`https://${forwardedHost}${next}`); */
        return NextResponse.redirect('http://localhost:3000/admin');
      } else {
        /* return NextResponse.redirect(`${origin}${next}`); */
        return NextResponse.redirect('http://localhost:3000/admin');
      }
    }
    if(error){
          return new NextResponse(
    JSON.stringify({
      message: "OAuth session exchange failed",
      details: error.message || error,
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
    }
  }

  console.error("No code in search params:", searchParams);
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
