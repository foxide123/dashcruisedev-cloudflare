"use client";

import { useLocale } from "next-intl";
import { MenuItemsData } from "@/data/MenuItemsData";
import { useRouter, usePathname } from "next/navigation";
//eslint-disable-next-line
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import Link from "next/link";
import CountrySelectionModal from "@/components/modals/CountrySelectionModal";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";

export default function NavBar({
  lg_screen_width,
  //eslint-disable-next-line
  default_screen_width,
}: {
  lg_screen_width: string;
  default_screen_width: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [isOpened, setIsOpened] = useState(false);
  const pageSlug = pathname?.split("/")[2];

  return (
    <nav
      className={`xl:flex-row xl:my-[48px] xl:h-[98px] rounded-4xl h-fit flex-col z-10 caret-transparent flex bg-black text-white justify-between items-center  ${lg_screen_width} w-screen`}
    >
      <div className="xl:w-[350px] xl:px-0 xl:justify-start xl:pl-6 sm:px-0 w-full justify-center flex items-center">
        {/* > XL Navbar (Only Icon)*/}
        <div className="xl:flex hidden self-center rounded-4xl p-2 justify-center items-center">
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/c0d6674f-31fc-4fc3-cdcd-7cd049c48700/logo240x240"
            alt="logo"
            width={240}
            height={240}
            loading="eager"
          />
        </div>
        {/* DEFAULT to XL Navbar (Hamburger, Icon and Locale)*/}
        <div className="xl:hidden w-screen self-center p-2 flex justify-around items-center">
          {/* Hamburger */}
          <button
            onClick={() => {
              setIsOpened(!isOpened);
            }}
            className="cursor-pointer"
          >
            <div className="md:hidden">
              <IconMenu2 stroke={3} width={50} height={50} />
            </div>
            <div className="md:block hidden">
              <IconMenu2 stroke={3} width={70} height={70} />
            </div>
          </button>
          {/* Logo */}
          <img
            src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/8b797d3f-6998-43c5-8c6e-ab7d5165b700/logo240x240"
            alt="logo"
            className="ml-10 md:w-[200px] md:h-[200px] w-[120px] h-[120px]"
            loading="eager"
          />
          <div className="ml-5">
            <CountrySelectionModal />
          </div>
        </div>
      </div>
      <ul
        className={`caret-transparent xl:flex-row flex flex-col justify-center items-center text-[20px] font-semibold cursor-pointer 
    transition-all duration-500 ease-in-out overflow-hidden 
    ${isOpened ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} xl:max-h-none xl:opacity-100`}
      >
        {MenuItemsData.map((item, index) => {
          const fullPath = `/${locale}${item.pathname}`;
          const currentPath = pathname!.endsWith("/")
            ? pathname!.slice(0, -1)
            : pathname;
          const comparePath = fullPath.endsWith("/")
            ? fullPath.slice(0, -1)
            : fullPath;
          const isActive =
            currentPath === comparePath ? "text-carrot-500" : "text-white";
          const isLast = index === MenuItemsData.length - 1;
          return (
            <li
              key={item.name}
              className={`${isActive} xl:mb-0 sm:pr-8 first:mt-0 last:pr-0 last:mb-5  xl:mt-0 md:mt-3 mt-5 ${isLast ? "mb-5" : ""}`}
              onClick={() => {
                setIsOpened(!isOpened);
                router.push(item.pathname);
              }}
            >
              {item.name}
            </li>
          );
        })}
        <li className="xl:block hidden">
          <CountrySelectionModal />
        </li>
      </ul>
      <div className="2xl:w-[350px] xl:w-[250px] xl:flex justify-end items-center scroll-smooth hidden">
        {pageSlug === "/" ? (
          <ScrollLink
            to="pricing_section"
            spy={true}
            smooth={true}
            duration={2000}
            offset={30}
            className="text-center bg-carrot-500  mr-12 rounded-4xl px-8 py-4 flex justify-center items-center cursor-pointer"
          >
            See Pricing
          </ScrollLink>
        ) : (
          <Link href="/#pricing_section" className="text-center bg-carrot-500  mr-12 rounded-4xl px-8 py-4 flex justify-center items-center cursor-pointer">See Pricing</Link>
        )}
      </div>
    </nav>
  );
}
