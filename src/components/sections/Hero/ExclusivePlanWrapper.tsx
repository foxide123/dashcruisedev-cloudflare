"use server";

import { ExclusivePlan } from "./ExclusivePlan";
import { cookies } from "next/headers";

export default async function ExclusivePlanWrapper() {

  const cookieStore = await cookies();
  const currency = cookieStore.get("currency")?.value || "usd";

  return <ExclusivePlan currency={currency} />;
}
