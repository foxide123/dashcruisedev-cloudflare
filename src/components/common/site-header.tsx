"use client";

import { SidebarIcon } from "lucide-react";

import { SearchForm } from "@/components/common/search-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const pathnameConverted = pathname?.replace(/^\/[a-z]{2}/, "");
  console.log("Pathname without locale and dashboard:", pathnameConverted);
  const pathnameSegments = pathnameConverted?.split("/").filter(Boolean); // removes "" and any other falsy;
  console.log("Pathname segments:", pathnameSegments);
  let url = "";
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-12 w-12"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            {pathnameSegments
              ?.slice(0, pathnameSegments.length - 1)
              .map((item, id) => {
                url += `/${item}`;
                return (
                  <div key={id} className="flex items-center">
                    <BreadcrumbItem key={id}>
                      <BreadcrumbLink href={url}>{item}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </div>
                );
              })}
            <BreadcrumbItem>
              <BreadcrumbPage>
                {pathnameSegments![pathnameSegments!.length - 1]}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <SearchForm className="w-full sm:ml-auto sm:w-auto" />
      </div>
    </header>
  );
}
