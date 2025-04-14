/* import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
 */

import { routing } from "@/i18n/routing";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PostParams } from "@/types/main_types";

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

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
  const posts: PostParams[] = messages.posts;

  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";

  const mainPost = posts[0];
  const otherPosts = posts.slice(1,);

  return (
    <div className="caret-transparent w-screen lg:py-10 min-h-[100vh]">
      <Link href={`/blog/${mainPost.slug}`} className="cursor-pointer">
        {/* Large post Preview */}
        <div
          className={`mx-auto w-screen ${lg_screen_width}  text-center bg-gray-100 flex flex-col`}
        >
          {/* Image */}
          <div className="lg:w-full lg:h-[620px] relative aspect-video">
            <Image
              alt="main post image"
              src={`${mainPost.image_src}/hd1920x1080`}
              fill
              priority
              decoding="async"
              style={{ objectFit: "cover" }}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAADAAUDAREAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EAB4QAAEDBAMAAAAAAAAAAAAAAAECAwQABgcRBSIx/8QAFAEBAAAAAAAAAAAAAAAAAAAABP/EABsRAAICAwEAAAAAAAAAAAAAAAECAAMEBRGR/9oADAMBAAIRAxEAPwBEpuIsd3DcM6VzNttyXGmWG0FUh4aT3OtBYHpNKfLucAs0BVrsWroROez/2Q=="
            />
          </div>

          <div className="p-2">
            {/*Post description */}
            <h1 className="lg:text-2xl text-base font-semibold">
              {mainPost.title}
            </h1>
            <h3 className="text-xs leading-7">{mainPost.date}</h3>
            <p className="lg:text-base text-xs tracking-wide text-muted-foreground">
              {mainPost.description}
            </p>
          </div>
        </div>
      </Link>
      {/* Posts (the rest) */}
      <div
        className={`lg:mt-16 ${lg_screen_width} ${default_screen_width} mx-auto flex flex-col gap-14 mt-15`}
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post: PostParams, index: number) => {
            {
              /* Individual Post */
            }
            return (
              <Link key={index} href={`/blog/${post.slug}`}>
                <div
                  key={index}
                  className="flex cursor-pointer flex-col gap-2 hover:opacity-75"
                >
                  <div className="relative aspect-video rounded-md bg-muted">
                    <Image src={`${post.image_src}/card600x400`} alt="post image" fill />
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
