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
import Script from "next/script";
import BackgroundAnimation from "@/components/bgAnimation/BackgroundAnimation";

/* import ClientScripts from "@/features/admin/ClientScripts"; */
import { ClientLayout } from "@/features/client/layout/ClientLayout";

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

        <ClientLayout>{children}</ClientLayout>
        {/*         </PrivateAdminRoute> */}
      </body>
    </html>
  );
}
