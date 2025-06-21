type PageParams = {
  locale: string;
  website_slug: string;
  page_slug: string;
};

export default async function Page({ params }: { params: Promise<PageParams> }) {
  //eslint-disable-next-line
  const { locale, website_slug, page_slug } = await params;
  console.log("Page:", page_slug);

  const baseUrl = "https://nitrasolutions.com/en";
  const iframe_src = page_slug === 'home' ? baseUrl :`${baseUrl}/${page_slug}`

  return (
    <div className="flex flex-col items-center justify-start w-full h-full pr-5 pb-5">
        <div className="w-full h-[100px] bg-black text-white text-2xl flex items-center justify-between px-5">
            <p>Page: {page_slug.toUpperCase()}</p>
            <a href="#" className="border-2 border-green-500">Publish 🎉</a>
        </div>
      <iframe
        src={iframe_src}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
}
