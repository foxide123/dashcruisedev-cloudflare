"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ArrowDown } from "lucide-react";
import { useCountry } from "@/context/CountryContext";
import { setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function CountrySelectionModal() {
  const { language, currency, setLanguage, setCurrency } = useCountry();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setCookie("currency", value, { path: "/" });
  };

  const handleSave = () => {
    const newLocale = language.split(" ")[1]; // from "🇩🇪 de" → "de"
    // ### IMPORTANT ### Add / Remove new language to currentPathWithoutLocale below
    const currentPathWithoutLocale = pathname!.replace(/^\/(en|de|ro|pl)/, ""); // remove existing locale from path

    // Save cookie
    setCookie("currency", currency, { path: "/" });
    setCookie("locale", newLocale, { path: "/" });

    setOpen(false);

    // Navigate to new locale route
    router.push(`/${newLocale}${currentPathWithoutLocale}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button type="button" className="text-xl cursor-pointer flex">
          {`${language.toUpperCase()} / ${currency.toUpperCase()}`}{" "}
          <span className="pl-2 pt-0.5">
            <ArrowDown className="w-5" />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col justify-center items-center">
        {/* Language Selection */}
        <div>
          <p className="text-sm mb-1 font-medium">Language</p>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="🇺🇸 en">🇺🇸 EN</SelectItem>
              <SelectItem value="🇩🇪 de">🇩🇪 DE</SelectItem>
              <SelectItem value="🇷🇴 ro">🇷🇴 RO</SelectItem>
              <SelectItem value="🇵🇱 pl">🇵🇱 PL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Currency Selection */}
        <div>
          <p className="text-sm mb-1 font-medium">Currency</p>
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-[180px]">
            <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="pln">PLN</SelectItem>
              <SelectItem value="ron">RON</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <button
          className="bg-carrot-400 py-3 px-10 mt-4 rounded-2xl cursor-pointer"
          onClick={handleSave}
        >
          Save
        </button>
      </PopoverContent>
    </Popover>
  );
}
