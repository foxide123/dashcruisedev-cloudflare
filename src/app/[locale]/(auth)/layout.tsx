import "@/app/globals.css";

import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

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
  //eslint-disable-next-line
  const lg_screen_width = "lg:w-[75vw]";
  //eslint-disable-next-line
  const default_screen_width = "w-[85vw]";

  return (
    <html lang="en">
      <head>
        <link rel="alternate" href="/en" hrefLang="en" />
        <link rel="alternate" href="/de" hrefLang="de" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          property="og:image"
          content="https://dashcruisedev.com/og-image.png"
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
      <body className={` antialiased`}>
        <div className="w-screen grid h-svh flex-col items-center justify-center bg-primary-foreground lg:max-w-none lg:px-0">
          <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] lg:p-8">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
