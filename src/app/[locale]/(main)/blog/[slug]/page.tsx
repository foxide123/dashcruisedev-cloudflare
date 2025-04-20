import { routing } from "@/i18n/routing";
/* import { createClient } from "@/utils/supabase/client"; */
import { setRequestLocale } from "next-intl/server";
import { SocialIcons2 } from "@/components/common/SocialIcons2";
import { ArticleSidebarNav } from "@/components/layout/ArticleSidebarNav";
import { PostContent } from "./PostContent";
import { PostData } from "@/types/blog_types";
import { notFound } from "next/navigation";
/* import { PostParams } from "@/types/main_types";
 */

export const dynamicParams = false;
export const dynamic = "force-static";
//revalidate every 10 minutes
export const revalidate = 600;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

type SlugWithLocale = {
  slug: string;
  locale: string;
};

function generateHreflangs(slugsWithLocale: SlugWithLocale[]) {
  //eslint-disable-next-line
  const languages: any = {};
  console.log("slugs with locale: ");

  slugsWithLocale.forEach((item: SlugWithLocale) => {
    const { slug, locale } = item;
    languages[locale] = `${baseUrl}/${locale}/${slug}`;
  });

  return { languages: languages };
}

async function fetchSlugsWithLocale(postId?: string) {
  try {
    let query = `${baseUrl}/api/fetch-slugs-with-locale`;
    if (postId) {
      query = `${query}?postId=${postId}`;
    }

    const response = await fetch(query);
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const resultJson = await response.json();

    if (resultJson["error"]) {
      console.error(resultJson["error"]);
    }
    const result = resultJson["data"];

    //eslint-disable-next-line
    const slugsWithLocale = result.map((item: any) => {
      return { slug: item["slug"], locale: item["locale"]["locale"] };
    });
    console.log("Slugs with locale:", slugsWithLocale);

    return slugsWithLocale;
  } catch (error) {
    console.error(
      "Error fetching slugs:",
      error instanceof Error ? error.message : error
    );
    return null;
  }
}

async function fetchPostBySlug(slug: string): Promise<PostData | null> {
  try {
    const response = await fetch(
      `${baseUrl}/api/fetch-post-by-slug?slug=${slug}`
    );
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text);
    }
    const jsonResponse = await response.json();
    return jsonResponse["data"][0];
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const post: PostData | null = await fetchPostBySlug(slug);
  if (!post || post === null) notFound();

  const slugsWithLocale = await fetchSlugsWithLocale(post!.post_id);
  if (!slugsWithLocale) notFound();

  const { languages } = generateHreflangs(slugsWithLocale);
  console.log("languages:", languages);
  const canonical = `${baseUrl}/${locale}/${slug}`;
  return {
    title: "DashcruiseDev - Blog",
    description: "Modern Tech in Business: Insights & Strategies",
    alternates: {
      canonical: canonical,
      languages: languages,
    },
  };
}

export async function generateStaticParams() {
  const slugsWithLocale = await fetchSlugsWithLocale();
  if(slugsWithLocale === null) notFound();
  return slugsWithLocale;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  //eslint-disable-next-line
  if (!locale || !slug || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  //eslint-disable-next-line
  const postData: PostData | null = await fetchPostBySlug(slug);
  if (!postData || postData === null) notFound();

  const lg_screen_width = "lg:w-[75vw]";
  const default_screen_width = "w-[85vw]";

  return (
    <div
      className={`caret-transparent ${lg_screen_width} ${default_screen_width} mx-auto min-h-screen flex md:flex-row flex-col justify-center`}
    >
      {/* Sidebar navigation */}
      <ArticleSidebarNav />

      {/* Main Content in the Middle */}
      <PostContent postData={postData!} />

      {/* Social Media On the Right*/}
      <div className="md:sticky md:block hidden w-[200px] h-[250px] shadow-md ml-20 py-5 rounded-sm top-20 left-0 mt-50 flex flex-col justify-center">
        <h2 className="text-center mb-5 w-1/2 mx-auto">
          Check Our Social Media
        </h2>
        <SocialIcons2 linkedin_url="s" fb_url="s" direction="flex-col" />
      </div>
      {/* Social Media on Small Screens */}
      <div className="md:hidden block shadow-md py-5 my-5 rounded-sm w-full flex-wrap">
        <h2 className="text-center mb-5 w-1/2 mx-auto">
          Check Our Social Media
        </h2>
        <SocialIcons2
          linkedin_url="https://www.linkedin.com/in/jakub-cezary-kolando-137491269/"
          fb_url="https://www.facebook.com/profile.php?id=61574463432787&notif_id=1743636704425943&notif_t=page_user_activity&ref=notif"
          ig_url="https://www.instagram.com/perspective_135/"
          direction="flex-row"
        />
      </div>
    </div>
  );
}
