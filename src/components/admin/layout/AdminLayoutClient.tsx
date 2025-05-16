'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { SearchProvider } from "@/context/SearchContext";
import { AdminAppSidebar } from "@/components/admin/layout/AdminAppSidebar";
import SkipToMain from "@/components/dashboard/SkipToMain";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

export function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const defaultOpen = Cookies.get("sidebar:state") !== "false";

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen} className="py-2">
        <AdminAppSidebar className="w-[250px]"/>
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
