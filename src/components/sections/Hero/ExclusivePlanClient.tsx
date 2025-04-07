import SubscribeButton from "@/components/subscribe/SubscribeButton";

export function ExclusivePlanClient({
  ctaText,
  currency,
}: {
  ctaText: string;
  currency: string;
}) {
  return (
    <div className="mt-10 cursor-pointer">
      <SubscribeButton customAmount="49" text={ctaText} currency={currency} />
    </div>
  );
}
