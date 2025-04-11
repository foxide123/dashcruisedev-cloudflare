"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SubscriptionSuccessComponent from "@/components/subscribe/SubscriptionSuccessComponent";

export default function SubscriptionSuccessClient() {
    const searchParams = useSearchParams();
    const sessionId = searchParams?.get("session_id");
  
    const [stripeData, setStripeData] = useState<{
      email?: string;
      subscriptionId?: string;
      paymentStatus?: string;
      mode?: string;
      plan?: string;
    } | null>(null);

    useEffect(() => {
        if (!sessionId) return;
    
        const fetchData = async () => {
          const res = await fetch(`/api/stripe-session?session_id=${sessionId}`);
          const data = await res.json();
          setStripeData(data);
        };
    
        fetchData();
      }, [sessionId]);

    return stripeData ? (
        <SubscriptionSuccessComponent {...stripeData} />
      ) : (
        <div>Loading...</div>
      );
}