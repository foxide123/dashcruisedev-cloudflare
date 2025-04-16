import { routing } from "@/i18n/routing";
/* import { createClient } from "@/utils/supabase/client"; */
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = "force-static";
//revalidate every 10 minutes
export const revalidate = 600;

const blogSlugs = [
  { slug: "seo-introduction" },
  { slug: "website-builders" },
  { slug: "professional-email" },
  { slug: "add-business-on-google-maps" },
];

export async function generateMetadata() {
  return {
    title: "DashcruiseDev - Blog",
    description: "Modern Tech in Business: Insights & Strategies",
    alternates: {
      canonical: "https://dashcruisedev.com/en/blog",
      languages: {
        en: "https://dashcruisedev.com/en/blog",
        de: "https://dashcruisedev.com/de/blog",
        pl: "https://dashcruisedev.com/pl/blog",
        ro: "https://dashcruisedev.com/ro/blog",
      },
    },
  };
}

export async function generateStaticParams() {
  /*  const supabase = createClient();
  const { data: slugs, error } = await supabase.from("PostTranslation").select("slug");
 */
  /* Combine locale with slug e.g. {locale: 'en', slug: '...'} 
  }*/

  /* const messages = await getMessages();
  const blogSlugs = messages.posts.map((post: PostParams) => ({
    slug: post.slug as string,
  })); */

  const params = routing.locales.flatMap((locale) =>
    blogSlugs?.map(({ slug }: { slug: string }) => ({ locale, slug }))
  );
  return params;
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
/*   const res = await fetch("/api/fetch-post-by-slug", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  });
  console.log(res); */
  return <div>This is the blog page for post {slug}</div>;
}
