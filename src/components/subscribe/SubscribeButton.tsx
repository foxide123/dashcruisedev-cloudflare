"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { CheckoutApiResponse } from "@/types/api_types";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
export default function 
SubscribeButton({
  customAmount,
  text,
  currency
}: {
  customAmount: string;
  text:string;
  currency: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setLoading(false); // Reset on mount
  }, [router]);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: customAmount, currency: currency }),
      });

      const data = (await response.json()) as CheckoutApiResponse;

      if (response.status !== 200 || !data.sessionId) {
        console.error("Error creating session:", data);
        return;
      }

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="flex justify-center items-center bg-carrot-500 rounded-xl py-6 px-4 text-center text-white text-2xl w-full cursor-pointer"
      >
        {loading ? "Processing..." : text}
      </button>
    </div>
  );
}
