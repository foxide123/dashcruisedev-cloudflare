/* import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
 */

import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const dynamicParams = false;

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
  
  return (
    <div className="caret-transparent w-full py-20 lg:py-40 min-h-[100vh]">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="font-regular max-w-xl text-3xl tracking-tighter md:text-5xl">
            Latest articles
          </h4>
          {/*  <Button className="gap-4 cursor-pointer">
            View all articles <MoveRight className="h-4 w-4" />
          </Button> */}
        </div>
        <div>No Articles Published Yet</div>

        {/*         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight"></h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
          <div className="flex cursor-pointer flex-col gap-2 hover:opacity-75">
            <div className="mb-4 aspect-video rounded-md bg-muted"></div>
            <h3 className="text-xl tracking-tight">Pay supplier invoices</h3>
            <p className="text-base text-muted-foreground">
              Our goal is to streamline SMB trade, making it easier and faster
              than ever.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}
