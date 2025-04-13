"use server";
import { getMessages } from "next-intl/server";
import QAComponent from "./QAComponent";
import FadeInSection from "@/components/common/FadeInSection";

type QaItemType = {
  question: string;
  answer: string;
};

type QaDataType = {
  sectionHighlight: string;
  header: string;
  qaData: QaItemType;
};

export default async function QASection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const messages = await getMessages();
  const qaData = messages.qa as QaDataType;

  return (
    <section className="bg-white caret-transparent flex justify-center w-screen">
      <FadeInSection>
        <div
          className={`lg:py-[150px] lg:text-start py-10 text-center ${lg_screen_width} ${default_screen_width}`}
        >
          <div className="text-center">
            <h3 className="text-xl font-medium text-carrot-500">
              {qaData.sectionHighlight}
            </h3>
            <h1 className=" font-medium text-5xl leading-15 tracking-tight">
              {qaData.header}
            </h1>
          </div>

          <QAComponent />
        </div>
      </FadeInSection>
    </section>
  );
}
