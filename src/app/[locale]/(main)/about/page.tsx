import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = 'force-static'

export async function generateStaticParams(){
  return routing.locales.map((locale) => ({locale}))
}

export default async function AboutPage({params}: {params: Promise<{locale: string}>}) {
  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if(!locale || !routing.locales.includes(locale as any)){
    notFound()
  }
  setRequestLocale(locale);

  return (
    <div className="w-screen">
      {/* Hero */}
      <div className="sm:items-center relative w-full z-[-10] h-[530px] flex justify-center items-start">
       {/* Big Screens Bg Image */}
        <div className="hidden sm:flex">
          <Image
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/hd1920x1080"
            alt="contact background image"
            style={{ objectFit: "cover" }}
            fill
            className="z-[-10]"
          />
        </div>
        {/* Small Screen Bg Image */}
         <div className="sm:hidden relative w-screen z-[-10] aspect-video self-start">
          <Image
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/mobile640x480"
            alt="contact background image"
            style={{ objectFit: "cover" }}
            fill
            className="z-[-10]"
          />
        </div>
        <div className="absolute w-fit z-10 text-white text-center">
          <h1 className="sm:text-[4rem] font-bold leading-[6rem] text-5xl">About Us</h1>
          <h3 className="lg:w-[48rem] lg:p-0 sm:text-2xl text-x px-7 mt-5">
            We build unqiue, high-performing websites - without huge upfront
            cost.{" "}
          </h3>
        </div>
      </div>
      {/* About Introduction */}
      <div className={`${lg_screen_width} ${default_screen_width} flex justify-center`}>
        <h1 className="text-3xl font-bold">All-In-One Website Solution. One Simple Subscription</h1>
      </div>
    </div>
  );
}
