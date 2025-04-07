import CheckIcon from "@/components/icons/CheckIcon";
import XIcon from "@/components/icons/XIcon";
import { useTranslations } from "next-intl";

export default function ComparisonSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const comparisonData = useTranslations("comparison");
  return (
    <div className="caret-transparent lg:text-start text-center flex justify-center w-screen bg-white">
      <div
        className={`lg:mb-0 lg:pt-[152px] lg:pb-[152px] pb-10 text-black ${lg_screen_width} ${default_screen_width}`}
      >
        {/* Build Faster Section */}
        <div className="">
          <h1 className="header-custom">{comparisonData("header")}</h1>
          <h1 className="header-custom"></h1>
        </div>

        <p className="font-normal text-base leading-6 mt-5">
          {comparisonData("description")}
        </p>
        <hr className="mt-8" />
        {/* LandingPageDev and WordPress container */}
        <div className="lg:flex-row items-center flex flex-col justify-between w-full overflow-hidden mt-10">
          {/* LandingPageDev container */}
          <div className="comparison-container-custom border-magenta-300">
            <div>
              <h2 className="font-medium text-2xl leading-8 my-6">
                {comparisonData.raw("dashcruiseDev")["title"]}
              </h2>
            </div>
            <ul className="text-start">
              {comparisonData
                .raw("dashcruiseDev")
                ["items"].map((item: string, index:number) => (
                  <li key={index} className="list-item-custom">
                    <div>
                      <CheckIcon />
                    </div>{" "}
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
          {/* WordPress container */}
          <div className="lg:mt-0 comparison-container-custom border-vampire-400 mt-5">
            <div>
              <h2 className="font-medium text-2xl leading-8 my-6">
                {comparisonData.raw("webBuilders")["title"]}
              </h2>
            </div>
            <ul>
              {comparisonData
                .raw("webBuilders")
                ["items"].map((item: string, index: number) => (
                  <li key={index} className="list-item-custom">
                    <div>
                      <XIcon />
                    </div>{" "}
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
