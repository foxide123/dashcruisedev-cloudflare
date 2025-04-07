"use client";
import { useConsent } from "@/context/ConsentContext";

export default function CookieBanner() {
  const { consent, setConsent, isReady } = useConsent();

  if (!isReady) return null;
  if(consent) return null;

  return (

      <div className={`h-20 bg-carrot-300 fixed bottom-0 w-full flex justify-center items-center`}>
        We use Cookies <span className="text-3xl mx-2">🍪</span>
        <button onClick={() => setConsent(true)} className="bg-green-200 px-10 h-2/3 rounded-lg cursor-pointer">Accept All</button>
      </div>
  );
}
