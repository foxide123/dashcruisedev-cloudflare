import { Newsletter } from "@/components/common/Newsletter";
import { SocialIcons } from "@/components/common/SocialIcons";

export default function Footer({
  lg_screen_width,
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  return (
    <div className="w-screen pt-10 pb-[58px] bg-black flex flex-col justify-center items-center">
      <div className={`${lg_screen_width} ${default_screen_width}`}>
        <Newsletter />
        <div className="mt-10 flex justify-end">
          <SocialIcons />
        </div>
        <p className="text-white mt-10">
          Copyright&thinsp;@ 2025 Dashcruisedev.com. All Rights Reserved
        </p>
      </div>
    </div>
  );
}
