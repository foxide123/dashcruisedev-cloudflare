import { getMessages } from "next-intl/server";
import { ExclusivePlanWrapper } from "./ExclusivePlanWrapper";
import Image from "next/image";
import { ContainerTextFlipClient } from "@/components/ui/ui_containers/ContainerTextFlipClient";
/* import Image from "next/image";
 */
type HeroDataType = {
  headerBeforeEffect: string;
  headerEffect: string[];
  headerAfterEffect: string;
};

export default async function HeroSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const messages = await getMessages();
  const heroData = messages.hero as HeroDataType;

  return (
    <div className="relative caret-transparent w-screen  flex justify-center lg:min-h-[75vh]">
      <div className="absolute inset-0 bg-black z-[-1] md:hidden" />
      <div className={`fixed -z-10  inset-0 w-screen h-screen sm:block hidden`}>
        <Image
          src="22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
          alt="hero background"
          layout="fill"
          style={{ objectFit: "cover" }}
          priority
          placeholder="blur"
          loading="eager"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCQkKCQoLCwoODw0PDhUTERETFR8WGBYYFh8wHiMeHiMeMCozKScpMypMOzU1O0xXSUVJV2pfX2qFf4WuruoBCQkJCQoJCgsLCg4PDQ8OFRMRERMVHxYYFhgWHzAeIx4eIx4wKjMpJykzKkw7NTU7TFdJRUlXal9faoV/ha6u6v/CABEIAAUACQMBIgACEQEDEQH/xAApAAEBAQAAAAAAAAAAAAAAAAAABQYBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAADJSCq//8QAHhAAAQQBBQAAAAAAAAAAAAAAAgABAwQRBRNSU5H/2gAIAQEAAT8A1C1HM5GNcQHjnK3o+hvV/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAIx/9oACAECAQE/AFh//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwB//9k="
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
                {heroData.headerBeforeEffect}
                <span className="block">
                  <ContainerTextFlipClient words={heroData.headerEffect} />
                </span>{" "}
                {heroData.headerAfterEffect}
              </h1>
            </div>
            <p className="sm:hidden lg:text-start text-base leading-6 text-center break-words mb-2">
              We craft custom websites designed to bring your ideas to life and
              help you grow your business.
              <br />
            </p>
          </div>
            <ExclusivePlanWrapper />
        </div>
      </div>
    </div>
  );
}
