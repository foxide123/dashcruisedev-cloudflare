"use server"
import FadeInSection from "@/components/common/FadeInSection";
import { getMessages } from "next-intl/server";
import dynamic from "next/dynamic";

const PricingPlan = dynamic(() => import("@/components/sections/Pricing/PricingPlan"))


type PricingFeatureProp = {
  featureHighlight: string;
  featureDescription: string;
};

type PricingPlanType = {
  name: string;
  price: string;
  description: string;
  additionalPagePrice: string;
  bgColor: string;
  textPrimaryColor: string;
  textSecondaryColor: string;
  features: PricingFeatureProp[];
  extraPagesHeader: string;
  iteration: string;
  extraPagesDescription: string;
};

type PricingDataType = {
  header: string;
  description: string;
}

export default async function PricingSection({
  lg_screen_width,
  default_screen_width,
  pricingPlans,
}: {
  lg_screen_width: string;
  default_screen_width: string;
  pricingPlans: PricingPlanType[];
}) {
  const messages = await getMessages();
  const pricingData = messages.pricing as PricingDataType;

  const pricingComponents = pricingPlans.map(
    (plan: PricingPlanType, index: number) => (
      <PricingPlan
        key={index}
        planName={plan.name}
        planPrice={plan.price}
        planDescription={plan.description}
        additionalPagePrice={plan.additionalPagePrice}
        bgColor={plan.bgColor}
        textPrimaryColor={plan.textPrimaryColor}
        textSecondaryColor={plan.textSecondaryColor}
        features={plan.features}
        extraPagesHeader={plan.extraPagesHeader}
        iteration={plan.iteration}
        extraPagesDescription={plan.extraPagesDescription}
      />
    )
  );

  /*   const pricingComponents = PricingPlans.map((plan, index) => (
    <PricingPlan
      key={index}
      planName={plan.name}
      planPrice={plan.price}
      planDescription={plan.description}
      additionalPagePrice={plan.additionalPagePrice}
      features={plan.features}
      bgColor={plan.bgColor}
      textPrimaryColor={plan.textPrimaryColor}
      textSecondaryColor={plan.textSecondaryColor}
    />
  ));
 */
  return (
    <section
      id="pricing_section"
      className=" bg-white caret-transparent lg:max-w-screen lg:px-30 w-full flex flex-col items-center mx-auto lg:py-[150px] py-10 px-8"
    >
      <FadeInSection>
      <div className={`${lg_screen_width} ${default_screen_width}`}>
        <div className="lg:px-10 max-w-[964px] w-full px-0 mx-auto text-center">
          <h1 className=" lg:text-5xl text-4xl font-semibold">
            {pricingData.header}
          </h1>
          <p className="mt-5 text-xl text-gray-500 font-medium">
            {pricingData.description}
          </p>
          <div className="mt-8 w-fit mx-auto flex flex-row items-center justify-between">
            {/*<p className="font-medium text-2xl pr-5 text-carrot-500">Monthly</p>
          <Switch className="cursor-pointer h-[30px] w-[65px]"/>
          <p className="font-medium text-2xl pl-5">Yearly</p>
          */}
          </div>
        </div>

        {/* Available Plans */}
        <div
          className={`lg:pt-14 pt-5 flex-wrap lg:items-start lg:flex-row lg:justify-around ${lg_screen_width} ${default_screen_width} flex flex-col justify-center items-center`}
        >
          {pricingComponents}
        </div>
      </div>
      </FadeInSection>
    </section>
  );
}
