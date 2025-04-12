import HeroSection from "@/components/sections/Hero";
import ComparisonSection from "@/components/sections/Comparison";
import HighlightSection from "@/components/sections/Highlight";
import PortfolioSection from "@/components/sections/Portfolio";
import ContactUsSection from "@/components/sections/ContactUs";
import PricingSection from "@/components/sections/Pricing";
import MeetingScheduleSection from "@/components/sections/MeetingSchedule";
import QASection from "@/components/sections/QA";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
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
  const messages = await getMessages();
  const pricingPlans = messages.pricingPlan; 

  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";
  return (
    <div className="w-full">
<HeroSection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      />
      <ComparisonSection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      />
      <HighlightSection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      />
      <PortfolioSection
        lg_screen_width="lg:w-[75vw]"
        default_screen_width="w-[85vw]"
      />
      <ContactUsSection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      />
     <PricingSection
        pricingPlans={pricingPlans}
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      /> 
      <MeetingScheduleSection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      />
      <QASection
        lg_screen_width={lg_screen_width}
        default_screen_width={default_screen_width}
      /> 
      {/*  <CookieBanner />*/}
    </div>
  );
}
