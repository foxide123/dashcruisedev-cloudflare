import { cookies } from "next/headers";
import { ExclusivePlan } from "./ExclusivePlan";

export default async function ExclusivePlanWrapper(){
    const cookieStore = await cookies();
    const currency = cookieStore.get("currency")?.value || "usd";
    const language = cookieStore.get("language")?.value || "en";

    return <ExclusivePlan currency={currency} language={language}/>;
}