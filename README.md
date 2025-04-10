## Getting Started

Run the following command when running locally:
**npm run dev**
open: localhost:3000 to see the result

-----------------

To test the production code before commiting changes:
**npm run preview**
open: localhost:8788 to see the result
^ The above command will run the Cloudflare Pages & Workers build and start the server. 
It will output ESlint errors if there are any present. Fix them before commiting changes


## Common errors

![Alt text](https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/0e99a6d0-f832-46b4-92a9-7f208cd22100/square800x800)

The above error "The following routes were not configure to run with the Edge Runtime:" means the compiler expects the page to be rendered on server (SSR).
Unless the page has to actually be rendered on the server, it is better to use static generation (SSG).
Since we use [locale] in the root, it means ALL of the routes are dynamic and Nextjs expects them to be rendered on server.
To generate these pages statically, we should add the following code:

```typescript
export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}


export default async function YourFunction({params}: {params: Promise<{locale:string}>}) {

  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  //eslint-disable-next-line
  if (!locale || !routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  ...
}
```
Adding export const dynamicParams = false; and export const dynamic = "force-static"; helps the Next.js understand that this page has to be rendered static

We have to use "generateStaticParams" function so that Next.js knows which routes to pre-render. 
You should return the array of objects from this function.

Additionally in Next.js params are promise so we have to await them inside the function.

If we would like to use 'generateStaticParams' with dynamic routes such as [slug] for /[locale]/blog/[slug] we should first fetch them from api and combine them with locale so the final returned array contains objects of: {locale: string, slug: string}
