import Image from "next/image";
import { useTranslations } from "next-intl";

import ContainerTextFlipClient from "@/components/ui/ui_containers/ContainerTextFlipClient";
import ExclusivePlanWrapper from "./ExclusivePlanWrapper";


export default function HeroSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  // const [hasMounted, setHasMounted] = useState(false);

  {
    /* bg-[url(https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/6e425c1c-6c9b-48eb-c8fa-0a4ba4faf200/section1440x740)] */
  }
  const heroData = useTranslations('hero');

  
  return (
    <div className="relative caret-transparent w-screen  flex justify-center lg:min-h-[75vh]">
      <div className="absolute inset-0 bg-black z-[-1] lg:hidden" />
      {/* Background Image: rendered only on Large Screens */}
      <div className="fixed -z-10  inset-0 w-screen h-screen hidden lg:block">
        <Image
          src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
          alt="hero background"
          layout="fill"
          objectFit="cover"
          priority
          decoding="async"
          placeholder="blur"
          blurDataURL="/bg_image_train_mountains.jpg"
        />
      </div>
      <div
        className={`pb-[48px] ${lg_screen_width} flex ${default_screen_width}`}
      >
        {/* Main Hero Section */}
        <div className="z-10 lg:justify-between lg:flex-row flex flex-col justify-center items-center w-full">
          {/* Launch Your Site */}
          <div className="lg:w-[662px] flex flex-col lg:items-start text-white">
            <div className="lg:text-7xl lg:leading-[90px] lg:text-start text-6xl  my-5 leading-[80px] tracking-[-2%] font-bold font-sans text-center">
              <h1>
                {heroData("headerBeforeEffect")}
                <div>
                  <ContainerTextFlipClient
                    words={heroData.raw("headerEffect")}
                  />
                </div>{" "}
                {heroData("headerAfterEffect")}
              </h1>
              <div></div>
            </div>
            {/* <p className="lg:text-start text-base leading-6 text-center break-words mb-2">
              We craft custom websites designed to bring your ideas to life and
              help you grow your business.
              <br />
            </p> */}
          </div>

          <ExclusivePlanWrapper />
        </div>
      </div>
    </div>
  )
}
