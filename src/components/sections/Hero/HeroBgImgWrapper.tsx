"use client"

import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image"

export function HeroBgImageWrapper()
{
    const isMobile = useIsMobile();

    return isMobile ? null : (
        <div className={`fixed -z-10  inset-0 w-screen h-screen sm:block hidden`}>
        <Image
          src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/22218a4e-1efb-43dd-ff1e-562588e15a00/hd1920x1080"
          alt="hero background"
          layout="fill"
          style={{ objectFit: "cover" }}
          priority
          decoding="async"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkJCQkKCQoLCwoODw0PDhUTERETFR8WGBYYFh8wHiMeHiMeMCozKScpMypMOzU1O0xXSUVJV2pfX2qFf4WuruoBCQkJCQoJCgsLCg4PDQ8OFRMRERMVHxYYFhgWHzAeIx4eIx4wKjMpJykzKkw7NTU7TFdJRUlXal9faoV/ha6u6v/CABEIAAUACQMBIgACEQEDEQH/xAApAAEBAQAAAAAAAAAAAAAAAAAABQYBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAADJSCq//8QAHhAAAQQBBQAAAAAAAAAAAAAAAgABAwQRBRNSU5H/2gAIAQEAAT8A1C1HM5GNcQHjnK3o+hvV/8QAFhEAAwAAAAAAAAAAAAAAAAAAAAIx/9oACAECAQE/AFh//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwB//9k="
        />
      </div>
    )
}