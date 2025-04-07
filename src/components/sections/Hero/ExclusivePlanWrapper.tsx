import { cookies } from "next/headers";
import { ExclusivePlan } from "./ExclusivePlan";

export default async function ExclusivePlanWrapper(){
    const cookieStore = await cookies();
    const currency = cookieStore.get("currency")?.value || "usd";

    return <ExclusivePlan currency={currency} />;
}