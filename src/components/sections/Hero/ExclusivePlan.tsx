import { IconSizeEnum } from "@/types/icon_types";
import CheckIcon from "@/components/icons/CheckIcon";
import { useTranslations } from "next-intl";
import { ExclusivePlanClient } from "./ExclusivePlanClient";

export function ExclusivePlan({currency}: {currency:string}) {
  const planData = useTranslations("exclusivePlan");

  const priceSymbol = currency === "eur" ? "€": "$"

  return (
    <div className="z-20 lg:w-[640px] lg:h-[480px] lg:my-0 w-full my-5 bg-blur-500/90 backdrop-blur-md p-6 rounded-[1.25rem] flex items-center justify-center text-white border-[1px] border-carrot-600">
      <div>
        <h1 className="text-2xl font-medium leading-8 space-y-6">
          {planData("header")}
        </h1>
        <h2 className="text-base font-normal leading-6 space-y-4">
          {planData("description")}
        </h2>
        <h2 className="text-5xl font-medium leading-15 space-y-12 tracking-tight my-6">
          {priceSymbol}&thinsp;49{" "}
          <span className="text-2xl space-y-4 font-normal">
            /&thinsp;{planData("interval")}
          </span>
        </h2>
        <ul className="text-base font-medium leading-6 space-y-4">
          {planData.raw("features").map((feature: string, index:number) => (
            <li key={index}>
              <CheckIcon size={IconSizeEnum.small} />
              {feature}
            </li>
          ))}
        </ul>
        <ExclusivePlanClient ctaText={planData("cta")} currency={currency}/>
      </div>
    </div>
  );
}
