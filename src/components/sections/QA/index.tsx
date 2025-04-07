import { useTranslations } from "next-intl";
import QAComponent from "./QAComponent";

export default function QASection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {

  const qaData = useTranslations("qa");
  
  return (
    <div className="bg-white caret-transparent flex justify-center w-screen">
      <div
        className={`lg:py-[150px] lg:text-start py-10 text-center ${lg_screen_width} ${default_screen_width}`}
      >
        <div className="text-center">
          <h3 className="text-xl font-medium text-carrot-500">
            {qaData("sectionHighlight")}
          </h3>
          <h1 className=" font-medium text-5xl leading-15 tracking-tight">
            {qaData("header")}
          </h1>
        </div>

        <QAComponent />
      </div>
    </div>
  );
}
