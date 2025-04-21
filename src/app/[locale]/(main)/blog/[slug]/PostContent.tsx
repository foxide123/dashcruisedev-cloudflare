import Image from "next/image";
import { PostData } from "@/types/blog_types";
import { Source_Serif_4 } from "next/font/google";
import DOMPurify from "isomorphic-dompurify";

const source_serif_4 = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap"
});

export function PostContent({postData}: {postData: PostData}) {
  return (
    <div
      className={`${source_serif_4.className} text-gray-700 lg:w-1/2 font-normal text-medium-body leading-medium-body w-full text-base`}
    >
      <h1 className="font-medium text-center text-medium-header leading-medium-header">
        {postData.introduction}
      </h1>
      <div className="mt-10 relative w-full aspect-video">
        <Image
          alt="main-image"
          src="e097d49d-c0e4-4644-f379-8a731753de00/hd1920x1080"
          fill
          priority
          fetchPriority="high"
          loading="eager"
        />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(postData.body),
        }}
        className="mb-50"
      ></div>
    </div>
  );
}


{/*         Section 1
        <section id="what-is-seo-and-why-it-matters">
          <h2 className="mt-10 text-center leading-medium-section text-medium-section">
            🧠 What Is SEO and Why It Matters
          </h2>
          <p className="my-5">
            <b>Search Engine Optimization (SEO)</b> is the process of the
            website optimization that aims to make the website rank higher in
            search results. <br />
            <br />
            <span className="bg-green-50">
              By finding the right keywords, optimizing website performance as
              well as other metrics, we can increase the chances of the website
              being noticed.{" "}
            </span>
            <br />
            If someone is searching for example for a guitar to buy online, the
            google will first recommend websites that are most optimized in
            terms of SEO for the search (guitars in this case). Most of the time
            these websites would be fast, have plenty of pages with quality
            content and would be trusted by customers. <br />
            <br />
            The higher the website is positioned in Google, the higher is the
            change of a user visiting our website.
            <br />
            In this guide we will take a look at some of the methods to improve
            our website&apos;s ranking in Google.
          </p>
        </section>
        Section 2
        <section id="how-search-engines-work">
          <h2 className="text-center leading-medium-section text-medium-section">
            🕵️‍♀️ How Search Engines Work
          </h2>
          <p className="my-5">
            <span className="text-gray-600">
              Image idea: A cartoon magnifying glass over a search bar with
              results listed below.
            </span>{" "}
            <br /> Search engines like Google use bots to crawl web pages and
            index their content. Then, they use algorithms to decide which pages
            best match a search query. SEO helps your content match those
            criteria.
          </p>
        </section>

        Section 3
        <section id="3-key-elements-of-seo">
          <h2 className="text-center leading-medium-section text-medium-section">
            🔑 3 Key Elements of SEO
          </h2>
          <ol className="list-decimal pl-5 my-5">
            <li>
              {" "}
              On-Page SEO Image idea: A web page with highlighted keywords and a
              well-structured heading layout. This includes using the right
              keywords, optimizing headings, writing meta descriptions, and
              creating helpful, readable content
            </li>
            <li>
              Technical SEO Image idea: Gears behind a website, representing
              backend optimizations. This involves improving website speed,
              making sure your site is mobile-friendly, and having a proper site
              structure for bots to crawl
            </li>
            <li>
              Off-Page SEO Image idea: Websites linking to your site, shown as
              connected circles. This is mostly about backlinks—other websites
              linking to your content. The more trustworthy those sites are, the
              more valuable their link
            </li>
          </ol>
        </section>

        Section 4
        <section id="why-you-should-care">
          <h2 className="text-center leading-medium-section text-medium-section">
            🚀 Why You Should Care
          </h2>
          <p className="my-5">
            {" "}
            More Visibility = more traffic. SEO builds trust—users trust
            top-ranked results. It gives you a long-term advantage without
            paying for ads.
          </p>
        </section>

        Section 5 
        <section id="quick-tips-for-beginners">
          <h2 className="text-center leading-medium-section text-medium-section">
            📈 Quick Tips for Beginners
          </h2>
          <p className="my-5">
            Use tools like Google Search Console and Yoast SEO. Write for humans
            first, search engines second. Focus on quality over quantity.
          </p>
        </section> */}