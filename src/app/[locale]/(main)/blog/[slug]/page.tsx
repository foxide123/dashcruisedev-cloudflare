import { routing } from "@/i18n/routing";
/* import { createClient } from "@/utils/supabase/client"; */
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = "force-static";

const blogData = [
  {slug: "hello"},
  {slug: "world"}
]

export async function generateStaticParams() {
 /*  const supabase = createClient();
  const { data: slugs, error } = await supabase.from("PostTranslation").select("slug");
 */
    /* Combine locale with slug e.g. {locale: 'en', slug: '...'} 
  }*/
  const params = routing.locales.flatMap((locale) =>
    blogData?.map(({ slug }) => ({ locale, slug }))
  );
  return params;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{locale: string; slug: string}>;
}) {
  const awaitedParams = await params;
  console.log("awaited params:",awaitedParams);
  const locale = awaitedParams?.locale;
  console.log("locale", locale);
  const slug = awaitedParams?.slug;
  console.log("slug:", slug);
  //eslint-disable-next-line
  if (!locale || !slug || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  return <div></div>;
}
