import SubscribeButton from "@/components/subscribe/SubscribeButton";

export function ExclusivePlanClient({
  ctaText,
  currency,
  language
}: {
  ctaText: string;
  currency: string;
  language: string;
}) {
  return (
    <div className="mt-10 cursor-pointer">
      <SubscribeButton customAmount="49" text={ctaText} currency={currency} language={language}/>
    </div>
  );
}
