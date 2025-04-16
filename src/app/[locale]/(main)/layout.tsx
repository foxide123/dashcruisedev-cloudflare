import type { Metadata } from "next";
import "@/app/globals.css";
import Script from "next/script";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import NavWrapper from "@/components/layout/NavWrapper";
import Footer from "@/components/layout/Footer";

import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { CountryProvider } from "@/context/CountryContext";
import { setRequestLocale } from "next-intl/server";

import {Plus_Jakarta_Sans} from "next/font/google"


const jakartaPlus = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})
export const dynamicParams = false;
export const dynamic = "force-static";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: "DashcruiseDev - Web Design & Development Agency",
  description:
    "We build fast, beautiful websites for startups, businesses and individuals looking for a custom design and SEO",
  keywords: ["web agency", "frontend development", "custom website"],
  authors: [{ name: "DashcruiseDev", url: "https://dashcruisedev.com" }],
  creator: "DashcruiseDev",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "DashcruiseDev - Web Design & Development",
    description:
      "Modern websites crafted with performance and user experience in mind",
    siteName: "DashcruiseDev",
    images: [
      {
        url: "/oopengraph-image.png",
        width: 1200,
        height: 630,
        alt: "DashcruiseDev Preview Image",
      },
    ],
    type: "website",
  },
  other: {
    "og:image": "https://dashcruisedev.com/opengraph-image.png",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";

  return (
    <html lang="en">
      <head>
        <link rel="alternate" href="/en" hrefLang="en" />
        <link rel="alternate" href="/de" hrefLang="de" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://dashcruisedev.com/opengraph-image.png"
        />
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png?v=2"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png?v=2"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </head>
      <body className={`${jakartaPlus.className} antialiased`}>
        <CountryProvider>
          <NextIntlClientProvider>
           <NavWrapper
              lg_screen_width={lg_screen_width}
              default_screen_width={default_screen_width}
            > 
              {children}
           </NavWrapper>
            <Footer
              lg_screen_width={lg_screen_width}
              default_screen_width={default_screen_width}
            />
          </NextIntlClientProvider>
        </CountryProvider>

        {/* Moving analytics script at the bottom */}
        <Script
          src="https://scripts.simpleanalyticscdn.com/latest.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
