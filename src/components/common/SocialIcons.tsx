import Image from "next/image"
import Link from "next/link";

export function SocialIcons() {
  return (
    <div className="flex ">
        <Link href="https://www.facebook.com/profile.php?id=61574463432787&notif_id=1743636704425943&notif_t=page_user_activity&ref=notif" target="_blank" className="pr-5 cursor-pointer">
        <Image width={35} height={35} src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/4fce755f-d7ee-44c6-1af4-e8f74c2cd800/smallicon50x50" alt="Facebook"/>
        </Link>

        <Link href="https://www.instagram.com/perspective_135/" target="_blank" className="pr-5 cursor-pointer">
        <Image width={35} height={35} src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/9815ab57-fb72-4f6f-3a42-2eafda4dbc00/smallicon50x50" alt="Instagram"/>
        </Link>

        <Link href="https://www.linkedin.com/in/jakub-cezary-kolando-137491269/" target="_blank" className="pr-5 cursor-pointer">
        <Image width={35} height={35} src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/fef5c877-c827-458e-7a52-d24343cd6a00/smallicon50x50" alt="Instagram"/>
        </Link>

   {/*      <Link href="h" target="_blank" className="pr-5 cursor-pointer">
        <Image src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/050663be-809e-47ab-a122-6224c2c3f300/smallicon50x50" alt="Twitter"/>
        </Link> */}
    </div>
  );
}
