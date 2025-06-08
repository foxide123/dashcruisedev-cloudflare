// app/[locale]/layout.tsx
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "@/i18n/routing";
/* import { Geist, Geist_Mono } from "next/font/google"; */
import { ReactNode } from "react";
import "@/app/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { AdminLayoutClient } from "@/components/admin/layout/AdminLayoutClient";
import Script from "next/script";
import BackgroundAnimation from "@/components/bgAnimation/BackgroundAnimation";

import ClientScripts from "@/components/admin/ClientScripts";

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
export const dynamicParams = false;
export const dynamic = "force-static";

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
        <BackgroundAnimation />

        {/* NavBar is a client component */}
       {/*  <NavBar /> */}

        {/* ClientScripts will fire page‐view events on route change */}
        <ClientScripts />

        <AdminLayoutClient>{children}</AdminLayoutClient>
      {/*   <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255, 255, 255, 0.8)"
            d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,90.7C672,128,768,192,864,186.7C960,181,1056,107,1152,85.3C1248,64,1344,96,1392,112L1440,128L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg> */}
        
      </body>
    </html>
  );
}
