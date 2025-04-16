import TermsComponent from "@/components/Terms/TermsComponent";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = 'force-static';

export const metadata: Metadata = {
  metadataBase: new URL("https://dashcruisedev.com"),
  title: "DashcruiseDev - Blog",
  description: "Modern Tech in Business: Insights & Strategies",
  keywords: "technology, business, web development",
  authors: [{ name: 'Alexandru' }, { name: 'Jakub', url: '/terms' }],
  creator: 'Jakub Cezary Kolando',
  publisher: 'Alexandru Cotruta',
  alternates: {
    canonical: "/en/terms",
    languages: {
      en: "/en/terms",
      de: "/de/terms",
      pl: "/pl/terms",
      ro: "/ro/terms",
    },
  },
};

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Terms({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  return <TermsComponent />;
}
