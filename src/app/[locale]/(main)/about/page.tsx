import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { SocialIcons2 } from "@/components/common/SocialIcons2";
/* import { BgImageWrapper } from "@/components/common/BgImageWrapper"; */
export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type AboutType = {
  header: string;
  description: string;
  sectionHeader: string;
  sectionDescription: string;
  teamHeader: string;
  teamDescription: string;
};

type TeamMemberType = {
  name: string;
  imageUrl: string;
  role: string;
  description: string;
  bgColor: string;
  fb_url: string;
  ig_url: string;
  linkedin_url: string;
  tw_url: string;
  upwork_url: string;
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }
  setRequestLocale(locale);

  const messages = await getMessages();
  const teamMembers: TeamMemberType[] = messages.teamMembers;
  const aboutData: AboutType = messages.about;
  const sectionDescriptionLines = aboutData.sectionDescription.split("\n");

  return (
    <div className="caret-transparent w-screen">
      {/* Hero */}
      <div className="lg:h-[530px] relative sm:items-center relative w-full z-[-10] flex justify-center items-start">
        {/* Big Screens Bg Image */}

        {/*            <div className={`fixed relative -z-10  inset-0 w-screen h-full`}>
                  <Image
                    src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/hd1920x1080"
                    alt="About Bg Image"
                    layout="fill"
                    objectFit="cover"
                    priority
                    decoding="async"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIAAUACgMBEQACEQEDEQH/xAAqAAEBAAAAAAAAAAAAAAAAAAAHCgEAAwEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAhRepoM//xAAfEAACAgEEAwAAAAAAAAAAAAADBAECBQAGEyISFDH/2gAIAQEAAT8AAjjDbTym4GEos2szjseoBb11U6RIzQczFIVKc97UqHh4mVvAtTGal3lpQFjdp6V+zr//xAAcEQACAwADAQAAAAAAAAAAAAABAgMREgAhYpH/2gAIAQIBAT8AWUI6RCNCpSR2ZtNISF0tNYAGibtWsUq471ryvzn/xAAbEQEBAQADAQEAAAAAAAAAAAACAQMEEhMAUf/aAAgBAwEBPwDwm3D5HKTc0GvFyyI6DKFNTWswdnUIYLHn1crfrLBOk/b9/9k="
                  />
                </div>

        <BgImageWrapper
          width="w-screen"
          height="h-full"
          imgSrc="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/hd1920x1080"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIAAUACgMBEQACEQEDEQH/xAAqAAEBAAAAAAAAAAAAAAAAAAAHCgEAAwEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAhRepoM//xAAfEAACAgEEAwAAAAAAAAAAAAADBAECBQAGEyISFDH/2gAIAQEAAT8AAjjDbTym4GEos2szjseoBb11U6RIzQczFIVKc97UqHh4mVvAtTGal3lpQFjdp6V+zr//xAAcEQACAwADAQAAAAAAAAAAAAABAgMREgAhYpH/2gAIAQIBAT8AWUI6RCNCpSR2ZtNISF0tNYAGibtWsUq471ryvzn/xAAbEQEBAQADAQEAAAAAAAAAAAACAQMEEhMAUf/aAAgBAwEBPwDwm3D5HKTc0GvFyyI6DKFNTWswdnUIYLHn1crfrLBOk/b9/9k="
          imgAlt="About Bg Image"
          mobileHeight="aspect-video"
        /> */}

        <div className="hidden sm:flex fixed inset-0">
          <Image
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/hd1920x1080"
            alt="About Bg Image"
            style={{ objectFit: "cover" }}
            decoding="async"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIAAUACgMBEQACEQEDEQH/xAAqAAEBAAAAAAAAAAAAAAAAAAAHCgEAAwEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAhRepoM//xAAfEAACAgEEAwAAAAAAAAAAAAADBAECBQAGEyISFDH/2gAIAQEAAT8AAjjDbTym4GEos2szjseoBb11U6RIzQczFIVKc97UqHh4mVvAtTGal3lpQFjdp6V+zr//xAAcEQACAwADAQAAAAAAAAAAAAABAgMREgAhYpH/2gAIAQIBAT8AWUI6RCNCpSR2ZtNISF0tNYAGibtWsUq471ryvzn/xAAbEQEBAQADAQEAAAAAAAAAAAACAQMEEhMAUf/aAAgBAwEBPwDwm3D5HKTc0GvFyyI6DKFNTWswdnUIYLHn1crfrLBOk/b9/9k="
            fill
            className="z-[-10]"
          />
        </div>
        <div className="sm:hidden relative w-screen z-[-10] aspect-video self-start">
          <Image
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/7528164d-c2ec-4d98-84a0-17a4a96e5500/mobile640x480"
            alt="contact background image"
            style={{ objectFit: "cover" }}
            decoding="async"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/CABEIAAUACgMBEQACEQEDEQH/xAAqAAEBAAAAAAAAAAAAAAAAAAAHCgEAAwEAAAAAAAAAAAAAAAAAAQIDBP/aAAwDAQACEAMQAAAAhRepoM//xAAfEAACAgEEAwAAAAAAAAAAAAADBAECBQAGEyISFDH/2gAIAQEAAT8AAjjDbTym4GEos2szjseoBb11U6RIzQczFIVKc97UqHh4mVvAtTGal3lpQFjdp6V+zr//xAAcEQACAwADAQAAAAAAAAAAAAABAgMREgAhYpH/2gAIAQIBAT8AWUI6RCNCpSR2ZtNISF0tNYAGibtWsUq471ryvzn/xAAbEQEBAQADAQEAAAAAAAAAAAACAQMEEhMAUf/aAAgBAwEBPwDwm3D5HKTc0GvFyyI6DKFNTWswdnUIYLHn1crfrLBOk/b9/9k="
            fill
            className="z-[-10]"
          />
        </div>
        <div className="absolute w-fit z-10 text-white text-center z-10">
          <h1 className="sm:text-[4rem] font-bold leading-[6rem] text-5xl">
            {aboutData.header}
          </h1>
          <p className="lg:w-[48rem] lg:p-0 sm:text-2xl text-x px-7 mt-5">
            {aboutData.description}
          </p>
        </div>
      </div>
      {/* About Section with introduction and team*/}
      <div className="bg-white w-screen">
        <div
          className={` z-10 bg-white ${lg_screen_width} ${default_screen_width} flex flex-col mx-auto items-center`}
        >
          <div className="lg:my-[120px] my-10 mx-auto w-full ">
            <h1 className="lg:w-[809px] text-3xl font-bold text-carrot-500 text-center mx-auto">
              {aboutData.sectionHeader}
            </h1>
            <p className="lg:px-[220px] px-5 text-lg font-normal leading-7 text-center mt-6">
              {sectionDescriptionLines.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          {/* Meet Our Team */}
          <div className="flex flex-col items-center w-full">
            <h1 className="text-center text-5xl leading-14 font-medium tracking-tight">
              {aboutData.teamHeader}
            </h1>
            <p className="mt-4 text-center font-normal text-base leading-6 text-gray_highlight">
              {aboutData.teamDescription}
            </p>
            {/* Team Members Photos and Description */}
            <div className="lg:px-10 xl:grid-cols-2 my-12 grid grid-cols-1 gap-10 w-full">
              {teamMembers.map((member, index) => {
                const lines = member.description.split("\n");
                const formattedDescription = lines.map((line) => (
                  <React.Fragment key={index}>
                    {line}
                    <br />
                  </React.Fragment>
                ));
                return (
                  <div
                    key={index}
                    className="lg:px-15 shadow-lg rounded-2xl px-5 text-center border-2 border-profile_border"
                  >
                    {/* Team Member Photo */}
                    <div
                      className={`lg:w-[280px] lg:h-[280px] sm:w-1/2 shadow-xl mt-5 mx-auto rounded-xl overflow-hidden relative w-full h-[280px] border-2 ${member.bgColor}`}
                    >
                      <Image
                        src={member.imageUrl}
                        style={{ objectFit: "cover" }}
                        alt="Profile Image Jakub"
                        fill
                      />
                    </div>
                    <h2 className="font-semibold text-[1.4rem] mt-2">
                      {member.name}
                    </h2>
                    <h3 className="text-gray_highlight font-[Inter] text-base">
                      {member.role}
                    </h3>
                    <p className="pt-5 pb-10">{formattedDescription}</p>
                    <hr />
                    <div className="w-2/3 mx-auto mt-5  mb-10">
                      <SocialIcons2
                        fb_url={member.fb_url}
                        linkedin_url={member.linkedin_url}
                        tw_url={member.tw_url}
                        ig_url={member.ig_url}
                        upwork_url={member.upwork_url}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
