import { getMessages } from "next-intl/server";
const MeetingSchedule = dynamic(import("./MeetingSchedule"));
import FadeInSection from "@/components/common/FadeInSection";
import dynamic from "next/dynamic";

type MeetingDataType = {
  header: string;
  description: string;
  cta: string;
}

export default async function MeetingScheduleSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {

  const messages = await getMessages();
  const meetingData = messages.meeting as MeetingDataType;

  return (
    <section className="bg-white w-screen flex items-center justify-center">
      <FadeInSection>
      <div
        className={`lg:px-20 lg:py0 py-10 flex flex-col items-center justify-center ${lg_screen_width} ${default_screen_width}`}
      >
        {/* Header with description */}
        <div className="flex flex-col items-center justify-centertext-center text-center">
          <h1 className="text-5xl font-medium tracking-tight">
            {meetingData.header}
          </h1>
          <h3 className="lg:w-[610px] mt-4 leading-7 text-base font-normal text-gray-500">
            {meetingData.description}
          </h3>
        </div>
        {/* Schedule a meeting with us div above the calendar */}
        <div className="flex justify-between items-center mt-13 w-full py-8 px-12 bg-carrot-500 mb-8 rounded-lg">
          <p className="text-white text-2xl font-bold">
            {meetingData.cta}
          </p>
          {/* Icons */}
          <div className="lg:flex-row lg:justify-baseline flex flex-col justify-between items-center h-full">
            <div className="lg:mr-9 w-[50px] h-[50px] relative">
              <img
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/912efd56-89df-4499-5d75-b11629a69f00/icon100x100"
                width={100}
                height={100}
                alt="meeting icon"
                className="object-cove"
                loading="lazy"
              />
            </div>
            <div className="lg:mt-0 w-[50px] h-[50px] relative mt-7">
              <img
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/9aeff982-f71c-4efe-c4ae-66667a161200/icon100x100"
                width={100}
                height={100}
                alt="meeting icon"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <MeetingSchedule />
      </div>
      </FadeInSection>
    </section>
  );
}
