import SubscriptionSuccessComponent from "@/components/subscribe/SubscriptionSuccessComponent";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function SubscriptionSuccess({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }){
     const awaitedParams = await params;
      const locale = awaitedParams.locale;
      //eslint-disable-next-line
      if (!locale || !routing.locales.includes(locale as any)) {
        notFound();
      }
    
      setRequestLocale(locale);
    return (
        <SubscriptionSuccessComponent/>
    )
} 