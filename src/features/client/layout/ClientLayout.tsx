'use client'

/* import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator"; */
import { SiteHeader } from "@/components/common/site-header"
import { SidebarProvider, /* SidebarTrigger */ } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/SearchContext";
import { ClientAppSidebar } from "@/features/client/layout/ClientAppSidebar";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen} className="flex flex-col">
        <SiteHeader/>
        <ClientAppSidebar className="w-[250px] pt-12 pl-0"/>
        <div
          id="content"
          className={cn(
            "ml-auto w-full max-w-full",
            "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
            "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
            "transition-[width] duration-200 ease-linear",
            "flex h-svh flex-col",
            "group-data-[scroll-locked=1]/body:h-full",
            "group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh"
          )}
        >
          {children}
        </div>
      </SidebarProvider>
    </SearchProvider>
  );
}
