// components/LayoutComponents/NavWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import { ConsentProvider } from "@/context/ConsentContext";

export default function NavWrapper({
  children,
  lg_screen_width,
  default_screen_width
}: {
  children: React.ReactNode;
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1];
  const hideNav = pathname === "/subscription/success";

  const navbarBgColor = pathname === `/${locale}/about` ? "" : "lg:bg-transparent";

  return (
    <>
      {!hideNav && (
        <div className={`${navbarBgColor} bg-black w-screen flex justify-center`}>
          <NavBar
            lg_screen_width={lg_screen_width}
            default_screen_width={default_screen_width}
          />
        </div>
      )}
      <ConsentProvider>{children}</ConsentProvider>
    </>
  );
}
