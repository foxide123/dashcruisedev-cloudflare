import ContactUsForm from "@/components/sections/ContactUs/ContactUsForm";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = 'force-static'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";

  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="w-full h-full bg-white flex justify-center items-center">
      <div
        className={`flex flex-col justify-center items-center ${lg_screen_width} ${default_screen_width}`}
      >
        <div className="lg:w-fit w-full p-10 mb-24">
          <h1 className="font-normal text-[40px]">Contact Us</h1>
          <h2 className="text-base font-bold tracking-wide mt-8">Hours</h2>
          <h3 className="font-normal text-base tracking-wide text-start mt-8 leading-10">
            Monday - Friday: 10:00am - 7:30pm <br />
            Saturday: 10:00am - 6:00pm <br />
            Sunday: 11:00am - 6:00pm
          </h3>
          <ContactUsForm marginTop="mt-16" />
        </div>
      </div>
    </div>
  );
}
