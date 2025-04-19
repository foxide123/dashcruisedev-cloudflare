import HeroSection from "@/components/sections/Hero";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import dynamic from "next/dynamic";

const ComparisonSection = dynamic(() => import("@/components/sections/Comparison"))
const HighlightSection = dynamic(() => import("@/components/sections/Highlight"))
const PortfolioSection = dynamic(() => import("@/components/sections/Portfolio"))
const ContactUsSection = dynamic(()=> import("@/components/sections/ContactUs"))
const PricingSection = dynamic(() => import("@/components/sections/Pricing"))
const MeetingScheduleSection = dynamic (() => import("@/components/sections/MeetingSchedule"))
const QASection = dynamic(() => import("@/components/sections/QA"))
/* export const dynamicParams = false; */
/*export const dynamic = "force-dynamic";*/

export async function generateMetadata(){
  return {
    title: "DashcruiseDev - Web Design & Development",
    description: "Modern websites crafted with performance and user experience in mind",
    alternates: {
      canonical: "https://dashcruisedev.com/en",
      languages: {
        en: "https://dashcruisedev.com/en",
        de: "https://dashcruisedev.com/de",
        pl: "https://dashcruisedev.com/pl",
        ro: "https://dashcruisedev.com/ro"
      }
    }
  }
}

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
