/* import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
 */

import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type PostParams = {
  title: string;
  description: string;
  small_image_src: string;
};

export default async function Blog({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const postPreviews: PostParams[] = messages.postPreviews;

  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";

  return (
    <div className="caret-transparent w-screen lg:py-10 min-h-[100vh]">
      <Link href="/" className="cursor-pointer">
        {/* Large post Preview */}
        <div
          className={`mx-auto w-screen ${lg_screen_width}  text-center bg-gray-100 flex flex-col`}
        >
          {/* Image */}
          <div className="lg:w-full lg:h-[620px] relative aspect-video">
            <Image
              alt="main post image"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/e097d49d-c0e4-4644-f379-8a731753de00/hd1920x1080"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="p-2">
            {/*Post description */}
            <h1 className="lg:text-2xl text-base font-semibold">
              SEO Introduction
            </h1>
            <h3 className="text-xs leading-7">APRIL 2025</h3>
            <p className="lg:text-base text-xs tracking-wide text-muted-foreground">
              What is SEO and how it affects your website?
            </p>
          </div>
        </div>
      </Link>
      {/* Posts (the rest) */}
      <div
        className={`lg:mt-16 ${lg_screen_width} ${default_screen_width} mx-auto flex flex-col gap-14 mt-15`}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {postPreviews.map((post: PostParams, index: number) => {
            {
              /* Individual Post */
            }
            return (
              <Link href="/">
                <div
                  key={index}
                  className="flex cursor-pointer flex-col gap-2 hover:opacity-75"
                >
                  <div className="relative aspect-video rounded-md bg-muted">
                    <Image src={post.small_image_src} alt="post image" fill />
                  </div>
                  <h1 className="lg:text-xl text-sm font-bold tracking-tight">
                    {post.title}
                  </h1>
                  <p className="lg:text-base mt-[-6px] text-[13px] text-muted-foreground">
                    {post.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* View more */}
      <div className="flex justify-center w-full mt-6 mb-[60px]">
        <button className="border-1 border-black text-center w-fit py-2 px-5 rounded-sm">
          {" "}
          View more
        </button>
      </div>
    </div>
  );
}
