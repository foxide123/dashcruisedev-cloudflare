"use server"
import { IconSizeEnum } from "@/types/icon_types";
import CheckIcon from "@/components/icons/CheckIcon";
import Link from "next/link";
import { getMessages } from "next-intl/server";

type ExclusivePlanDataType = {
  header: string;
  description: string;
  interval: string;
  features: string[];
  cta:string;
}

export async function ExclusivePlan({ currency }: { currency: string }) {

  const messages = await getMessages();
  const planData = messages.exclusivePlan as ExclusivePlanDataType;

  const priceSymbol = currency === "eur" ? "€" : "$";

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
          {priceSymbol}&thinsp;49{" "}
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
