import Link from "next/link";

type SocialIconsProps = {
  fb_url?: string;
  ig_url?: string;
  tw_url?: string;
  linkedin_url?: string;
  upwork_url?: string;
};

export function SocialIcons2({
  fb_url,
  ig_url,
  tw_url,
  linkedin_url,
  upwork_url
}: SocialIconsProps) {
  return (
    <div className="w-full flex justify-around items-center">
      {fb_url && (
        <Link href={fb_url} target="_blank">
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/27a3a0b7-b40f-4f72-c53e-8e5bfbe29d00/smallicon50x50"
            alt="facebook icon"
          />
        </Link>
      )}
      {ig_url && (
        <Link href={ig_url} target="_blank">
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/e927be9f-23d0-41d1-6e06-3b250ac59d00/smallicon50x50"
            alt="instagram icon"
          />
        </Link>
      )}
      {tw_url && (
        <Link href={tw_url} target="_blank">
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/c1af55b9-099c-4c65-3b1c-64bf151b9000/smallicon50x50"
            alt="twitter icon"
          />
        </Link>
      )}
      {linkedin_url && (
        <Link href={linkedin_url} target="_blank">
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/a571737d-7d0b-4cea-a17c-f11b96675f00/smallicon50x50"
            alt="linkedin icon"
          />
        </Link>
      )}
      {
        upwork_url && (
          <Link href={upwork_url} target="_blank">
             <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/317b942b-1c86-46e8-98e1-41a340333000/smallicon50x50"
            alt="upwork icon"
            width={70}
            height={70}
          />
          </Link>
        )
      }
    </div>
  );
}
