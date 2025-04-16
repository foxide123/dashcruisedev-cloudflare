import { NextResponse } from "next/server";

type StripeLocale = "auto" | "en" | "de";

type StripeParams = {
  amount: string;
  currency: string;
  language: StripeLocale;
  planName: string;
};

export async function POST(req: Request) {
  try {
    const { amount, currency, language, planName } = (await req.json()) as StripeParams;

    const res = await fetch("https://api.dashcruisedev.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, currency, language, planName }),
    });

    const contentType = res.headers.get("content-type");
    if (!res.ok || !contentType?.includes("application/json")) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status })
    }

    //eslint-disable-next-line
    const data = await res.json() as any;

    if (!res.ok) {
      return NextResponse.json({ error:data }, { status: res.status });
    }

    if (!data.sessionId) {
      return NextResponse.json(
        { error: "Invalid response from Stripe session API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ sessionId: data.sessionId });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Stripe session creation failed",
      },
      { status: 500 }
    );
  }
}
