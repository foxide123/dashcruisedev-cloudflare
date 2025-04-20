/* async function fetchSidebarData(){
    fetch("")
} */

export function ArticleSidebarNav() {
  return (
    <div className="md:sticky md:block hidden caret-accent h-[320px]  top-20 left-0 mt-50 mr-20 text-base w-[200px]">
      <h2 className="mb-5">ON THIS PAGE</h2>
      <hr />
      <ul>
        <li className="mt-5 cursor-pointer">
          <a href="#what-is-seo-and-why-it-matters">
            What Is SEO and Why It Matters
          </a>
        </li>
        <li className="mt-5 cursor-pointer">
          <a href="#how-search-engines-work">How Search Engines Work</a>
        </li>
        <li className="mt-5 cursor-pointer">
          <a href="#3-key-elements-of-seo">3 Key Elements of SEO</a>
        </li>
        <li className="mt-5 cursor-pointer">
          <a href="#why-you-should-care">Why You Should Care</a>
        </li>
        <li className="mt-5 cursor-pointer">
          <a href="#quick-tips-for-beginners">Quick Tips for Beginners</a>
        </li>
      </ul>
    </div>
  );
}
