"use server"
import { getMessages } from "next-intl/server";
import ContactUsForm from "./ContactUsForm";

type ContactUsProps = {
  lg_screen_width: string;
  default_screen_width: string;
};

type ContactUsDataType = {
  header: string;
  description: string;
}

export default async function ContactUsSection({
  lg_screen_width,
  default_screen_width,
}: ContactUsProps) {
  const messages = await getMessages();
  const contactUsData = messages.contactUs as ContactUsDataType;
  const headerLines = contactUsData.header.split("\n")
  return (
    <div className="bg-white w-screen flex justify-center">
      {/* Wrapper with defined width */}
      <div
        className={`lg:justify-between lg:flex-row lg:py-0 py-10  flex flex-col  ${lg_screen_width} ${default_screen_width}`}
      >
        {/* Description */}
        <div className="caret-transparent lg:w-[530px] md:text-start text-center">
          {/* <h2 className="text-carrot-500 text-sm leading-5 mb-2">Contact Us</h2> */}
          <h1 className="text-5xl tracking-tight">
            {headerLines.map((text: string, index: number) => (
              <div key={index}>{text}</div>
            ))}
          </h1>
          <p className="text-base leading-6 mt-4">
           {contactUsData.description}
          </p>
        </div>
        <ContactUsForm padding="lg:p-10 p-0" marginTop="lg:mt-0 mt-10" />
      </div>
    </div>
  );
}
