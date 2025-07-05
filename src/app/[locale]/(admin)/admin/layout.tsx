// app/[locale]/layout.tsx
import { notFound, redirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
/* import { Geist, Geist_Mono } from "next/font/google"; */
import { ReactNode } from "react";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AdminLayoutClient } from "@/features/admin/layout/AdminLayoutClient";
import Script from "next/script";
import BackgroundAnimation from "@/components/bgAnimation/BackgroundAnimation";

import ClientScripts from "@/features/admin/ClientScripts";
import { createClient } from "@/utils/supabase/server";
import { verifyJwt } from "@/utils/jwt/jwt";

config.autoAddCss = false;

/* const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
 */

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (
    !locale ||
    !routing.locales.includes(locale as (typeof routing.locales)[number])
  ) {
    notFound();
  }

  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const supabase = await createClient();

    const { data, error } = await supabase.auth.getSession();
    if(error) redirect("/");
    const accessToken = data.session?.access_token;
    if (!accessToken) {
      redirect("/");
    }
    //eslint-disable-next-line
    const payload: any = await verifyJwt(accessToken);
    const userRole = payload.payload.user_role;

    if (payload && userRole !== "admin") {
      redirect("/en/dashboard");
    }


  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Load gtag library */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        {/* Initialize gtag */}
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{ send_page_view: false });
          `}
        </Script>
      </head>
      <body>
        {/*         <PrivateAdminRoute> */}
        <BackgroundAnimation />

        <ClientScripts />

        <AdminLayoutClient>{children}</AdminLayoutClient>
        {/*         </PrivateAdminRoute> */}
      </body>
    </html>
  );
}
