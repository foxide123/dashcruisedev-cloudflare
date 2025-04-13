/* "use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";

type BgImageWrapperProps = {
  width: string;
  height: string;
  imgSrc: string;
  blurDataURL: string;
  imgAlt: string;
  mobileHeight: string;
};

export function BgImageWrapper({
  width,
  height,
  imgSrc,
  blurDataURL,
  imgAlt,
  mobileHeight,
}: BgImageWrapperProps) {
  const isMobile = useIsMobile();

  {
    return isMobile ? (
      mobileHeight && (
        <div className={`fixed relative -z-10  inset-0 ${width} ${mobileHeight}`}>
          <Image
            src={`${imgSrc}`}
            alt={`${imgAlt}`}
            layout="fill"
            objectFit="cover"
            priority
            decoding="async"
            placeholder="blur"
            blurDataURL={`${blurDataURL}`}
          />
        </div>
      )
    ) : (
      <div className={`fixed -z-10  inset-0 ${width} ${height}`}>
        <Image
          src={`${imgSrc}`}
          alt={`${imgAlt}`}
          layout="fill"
          objectFit="cover"
          priority
          decoding="async"
          placeholder="blur"
          blurDataURL={`${blurDataURL}`}

        />
      </div>
    );
  }
}
 */