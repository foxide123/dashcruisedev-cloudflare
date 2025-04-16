// context/CountryContext.tsx
"use client";
import { getCookie } from "cookies-next";
import { usePathname } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

type CountryContextType = {
  language: string;
  currency: string;
  setLanguage: (lang: string) => void;
  setCurrency: (cur: string) => void;
};

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState("🇺🇸 en");
  const [currency, setCurrency] = useState("usd");
  const pathname = usePathname();

  useEffect(() => {
    const savedCurrency = getCookie("currency");

    // Fallback to URL-based locale
    const localeFromPath = pathname?.split("/")[1];

    switch(localeFromPath){
      case "de":
        setLanguage("🇩🇪 de");
        return;
      case "ro":
        setLanguage("🇷🇴 ro");
        return;
      case "pl":
        setLanguage("🇵🇱 pl");
        return;
      default:
        setLanguage("🇺🇸 en");
    }

    if (savedCurrency) {
      setCurrency(savedCurrency as string);
    }
  }, [pathname]);

  return (
    <CountryContext.Provider
      value={{ language, currency, setLanguage, setCurrency }}
    >
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => {
  const context = useContext(CountryContext);
  if (!context)
    throw new Error("useCountry must be used within CountryProvider");
  return context;
};
