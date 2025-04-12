"use client";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
export function BgImageWrapper() {
  const isMobile = useIsMobile();
  return (
    !isMobile && (
      <div className="fixed -z-10  inset-0 w-screen h-screen">
        <Image
          src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
          alt="hero background"
          layout="fill"
          objectFit="cover"
          priority
          decoding="async"
          placeholder="blur"
          blurDataURL="/bg_image_train_mountains.jpg"
        />
      </div>
    )
  );
}
