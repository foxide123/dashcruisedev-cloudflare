import ContactUsForm from "./ContactUsForm";
import { useTranslations } from "next-intl";

type ContactUsProps = {
  lg_screen_width: string;
  default_screen_width: string;
};

export default function ContactUsSection({
  lg_screen_width,
  default_screen_width,
}: ContactUsProps) {
  const contactUsData = useTranslations("contactUs");
  return (
    <div className="bg-white caret-transparent w-screen flex justify-center">
      {/* Wrapper with defined width */}
      <div
        className={`lg:justify-between lg:flex-row lg:py-0 py-10  flex flex-col  ${lg_screen_width} ${default_screen_width}`}
      >
        {/* Description */}
        <div className="lg:w-[530px] md:text-start text-center">
          {/* <h2 className="text-carrot-500 text-sm leading-5 mb-2">Contact Us</h2> */}
          <h1 className="text-5xl tracking-tight">
            {contactUsData.raw("header").map((text: string, index: number) => (
              <div key={index}>{text}</div>
            ))}
          </h1>
          <p className="text-base leading-6 mt-4">
           {contactUsData("description")}
          </p>
        </div>
        <ContactUsForm padding="lg:p-10 p-0" marginTop="lg:mt-0 mt-10" />
      </div>
    </div>
  );
}
