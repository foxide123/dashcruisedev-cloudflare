// /pages/api/stripe-session.ts

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    //eslint-disable-next-line
  apiVersion: "2025-02-24.acacia; custom_checkout_beta=v1" as any,
});

type SessionParams = {
  sessionId: string;
};

export async function POST(req: Request) {
  const { sessionId } = (await req.json()) as SessionParams;

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return NextResponse.json(
      {
        email: session.customer_email,
        subscriptionId: session.subscription,
        paymentStatus: session.payment_status,
        mode: session.mode,
        plan: session.metadata?.plan,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({error: `Stripe error: ${err}`}, {status: 500});
  }
}
