"use client";
import { IconSizeEnum } from "@/types/icon_types";
import CheckIcon from "@/components/icons/CheckIcon";
import Link from "next/link";
import { useTranslations } from "next-intl";

type ExclusivePlanDataType = {
  header: string;
  description: string;
  interval: string;
  features: string[];
  cta: string;
};

type SupportedCurrency = "eur" | "pln" | "ron" | "usd";

const getCurrencySymbol = (currency:string) => {
  switch(currency){
    case "eur":
      return "€";
    case "pln":
      return "zł";
    case "ron":
      return "RON";
    default:
      return "$";
  }
}
 
const usdCurrencyConverter = (
  basePrice: number,
  targetCurrency: SupportedCurrency
) => {
  switch(targetCurrency){
    case "eur":
      return 45;
    case "pln":
      return 190;
    case "ron":
      return 215;
    default:
      return basePrice;
  }
};

export function ExclusivePlan({ currency }: { currency: string }) {
  const messages = useTranslations();
  const planData = messages.raw("exclusivePlan") as ExclusivePlanDataType;

  const basePrice = 49;

  const isSupportedCurrency = (value: string): value is SupportedCurrency =>
    ["eur", "pln", "ron", "usd"].includes(value);
  
  const price = isSupportedCurrency(currency)
    ? usdCurrencyConverter(basePrice, currency)
    : basePrice;
  
  const priceSymbol = isSupportedCurrency(currency) ? getCurrencySymbol(currency) : "$";
  

  return (
    <div className="z-20 lg:w-[640px] lg:h-[480px] lg:my-0 w-full my-5 bg-blur-500/90 backdrop-blur-md p-6 rounded-[1.25rem] flex items-center justify-center text-white border-[1px] border-carrot-600">
      <div>
        <h1 className="text-2xl font-medium leading-8 space-y-6">
          {planData.header}
        </h1>
        <h2 className="text-base font-normal leading-6 space-y-4">
          {planData.description}
        </h2>
        <h2 className="text-5xl font-medium leading-15 space-y-12 tracking-tight my-6">
          {priceSymbol}&thinsp; {price}{" "}
          <span className="text-2xl space-y-4 font-normal">
            /&thinsp;{planData.interval}
          </span>
        </h2>
        <ul className="text-base font-medium leading-6 space-y-4">
          {planData.features.map((feature: string, index: number) => (
            <li key={index}>
              <CheckIcon size={IconSizeEnum.small} />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          href="/#pricing_section"
          className="mt-5 flex justify-center items-center bg-carrot-500 rounded-xl py-6 px-4 text-center text-white text-2xl w-full cursor-pointer"
        >
          {planData.cta}
        </Link>
      </div>
    </div>
  );
}
