import { useTranslations } from "next-intl";
import MeetingSchedule from "./MeetingSchedule";

export default function MeetingScheduleSection({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {

  const meetingData = useTranslations("meeting");

  return (
    <div className="bg-white w-screen flex items-center justify-center">
      <div
        className={`lg:px-20 lg:py0 py-10 flex flex-col items-center justify-center ${lg_screen_width} ${default_screen_width}`}
      >
        {/* Header with description */}
        <div className="flex flex-col items-center justify-centertext-center text-center">
          <h1 className="text-5xl font-medium tracking-tight">
            {meetingData("header")}
          </h1>
          <h3 className="lg:w-[610px] mt-4 leading-7 text-base font-normal text-gray-500">
            {meetingData("description")}
          </h3>
        </div>
        {/* Schedule a meeting with us div above the calendar */}
        <div className="flex flex-row justify-between items-center mt-13 w-full py-8 px-12 bg-carrot-500 mb-8 rounded-lg">
          <p className="text-white text-2xl font-bold">
            {meetingData("cta")}
          </p>
          {/* Icons */}
          <div className="flex flex-row ">
            <div className="mr-9 w-[50px] h-[50px] relative">
              <img
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/912efd56-89df-4499-5d75-b11629a69f00/icon100x100"
                width={100}
                height={100}
                alt="meeting icon"
                className="object-cove"
              />
            </div>
            <div className="w-[50px] h-[50px] relative">
              <img
                src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/9aeff982-f71c-4efe-c4ae-66667a161200/icon100x100"
                width={100}
                height={100}
                alt="meeting icon"
                className="object-cover"
              />
            </div>
          </div>
        </div>
        <MeetingSchedule />
      </div>
    </div>
  );
}
