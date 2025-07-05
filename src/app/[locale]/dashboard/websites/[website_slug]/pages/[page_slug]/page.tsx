import { PageEditor } from "@/features/page_editor/PageEditor";

type PageParams = {
  locale: string;
  website_slug: string;
  page_slug: string;
};

export default async function Page({
  params,
}: {
  params: Promise<PageParams>;
}) {
  //eslint-disable-next-line
  const { locale, website_slug, page_slug } = await params;

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://192.168.0.44:4321"
      : "https://nitrasolutions.com";

  return (
  <PageEditor baseUrl={baseUrl} pageSlug={page_slug}/>
  );
}
