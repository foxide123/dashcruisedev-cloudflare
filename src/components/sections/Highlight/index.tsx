import Image from "next/image";
import {useTranslations} from "next-intl";

export default function HighlightSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {

  const highlightData = useTranslations("highlight");

  return (
    <div className="caret-transparent xl:text-start lg:text-center text-center flex flex-row justify-center bg-magenta-500  w-screen">
      <div
        className={`lg:justify-between ${lg_screen_width} lg:py-0 lg:flex-row ${default_screen_width} flex flex-col py-10 text-white items-center justify-center`}
      >
        {/* Boost Your Business */}
        <div className="lg:px-10 lg:w-1/2 flex flex-col px-10">
          <div>
            <h1 className=" lg:text-start font-medium text-5xl leading-15 tracking-tight text-center">
              {
              highlightData.raw("header").map((text:string, index:string) => (
               <div key={index}>{text}</div>
              ))}
              {/* Boost Your Business with <br />
              Unmatched Speed and <br />
              Security */}
            </h1>
            <p className="lg:pr-10 font-normal text-base leading-6 my-6 pr-0">
              {highlightData("description")}
            </p>
          </div>
            <Image
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/aac4f90f-a064-4352-4cc8-9aee41df7100/thumbnail300x300"
              sizes="300px"
              width={130}
              height={43}
              alt="Cloudflare Logo"
              className="lg:mx-0 lg:mb-0 mx-auto"
            />
        </div>
        {/* Highlight Images */}
        <div className="xl:flex xl:flex-row lg:w-1/2 lg:h-full lg:py-22 hidden">
          <div className="mr-8 self-end">
            <div className="highlight-image-custom overflow-hidden relative">
            <Image
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/b6d68cab-6b97-4c5e-e5d0-0bfdc5b9cb00/thumbnail300x300"
                objectFit="cover"
                layout="fill"
                sizes="200px"
                alt="Highlight"
              />
            </div>
            <div className="mt-6 highlight-image-custom overflow-hidden relative">
              <Image
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/65616a9d-b78b-48a0-9f8d-7d3b5b26ed00/thumbnail300x300"
                objectFit="cover"
                layout="fill"
                sizes="200px"
                alt="Highlight"
              />
            </div>
          </div>
          <div className="self-start">
            <div className="highlight-image-custom relative overflow-hidden">
              <Image
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/e6019818-faad-4647-772a-3405f7ca1500/thumbnail300x300"
                objectFit="cover"
                layout="fill"
                sizes="200px"
                alt="Highlight"
              />
            </div>
            <div className="highlight-image-custom relative overflow-hidden">
              <Image
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/5cb955a6-241f-4190-8dad-2783d0e5a200/thumbnail300x300"
                objectFit="cover"
                layout="fill"
                sizes="200px"
                alt="Highlight"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
