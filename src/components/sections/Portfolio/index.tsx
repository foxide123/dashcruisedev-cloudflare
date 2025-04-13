"use server";
import FadeInSection from "@/components/common/FadeInSection";
import { getMessages } from "next-intl/server";
import Image from "next/image";

type PortfolioItem = {
  name: string;
  imageUrl: string;
};

type PortfolioDataType = {
  header: string;
  portfolioItems: PortfolioItem[];
};

export default async function PortfolioSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const messages = await getMessages();
  const portfolioData = messages.portfolio as PortfolioDataType;

  return (
    <section className="bg-white caret-transparent flex justify-center w-screen ">
      <FadeInSection>
        <div
          className={`lg:py-[150px] lg:text-start ${lg_screen_width} ${default_screen_width} text-center py-10`}
        >
          <h1 className="font-medium text-5xl leading-15 mb-6 tracking-tight">
            {portfolioData.header}
          </h1>
          {/* Portfolio Container */}
          <div className="lg:flex-row flex flex-col items-center justify-between text-center">
            {portfolioData.portfolioItems.map(
              (item: PortfolioItem, index: number) => (
                <div
                  key={index}
                  className="lg:mt-[58px] mt-[20px] highlight-container-custom"
                >
                  <div className="relative overflow-hidden lg:w-[400px] lg:h-[400px] rounded-2xl object-cover w-[200px] h-[200px] mx-auto">
                    <Image
                      src={item.imageUrl}
                      layout="fill"
                      style={{ objectFit: "cover" }}
                      alt="Portfolio Picture"
                    />
                  </div>
                  <p className="mt-3 font-medium text-2xl leading-8">
                    {item.name}
                  </p>
                </div>
              )
            )}
          </div>
          {/*<Testimonials1/>*/}
        </div>
      </FadeInSection>
    </section>
  );
}
