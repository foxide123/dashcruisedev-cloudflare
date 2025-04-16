import { ImageLoaderProps } from "next/image";

export default function cloudflareLoader({ src }: ImageLoaderProps) {
    const cleanedSrc = src.startsWith("/") ? src.slice(1) : src;
    return `https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/${cleanedSrc}`;
  }
  