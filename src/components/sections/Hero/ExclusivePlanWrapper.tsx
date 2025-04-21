import { ExclusivePlan } from "./ExclusivePlan";
import { cookies } from "next/headers";

export async function ExclusivePlanWrapper() {

  const cookieStore = await cookies();
  const currency = cookieStore.get("currency")?.value || "usd";

  console.log("Currency from cookies:", currency);

  return <ExclusivePlan currency={currency} />;
}
