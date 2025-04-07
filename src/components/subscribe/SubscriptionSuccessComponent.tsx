"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";

export default function SubscriptionSuccessComponent() {

    const router = useRouter();

    return (
    <div className="w-screen h-screen bg-white flex flex-col justify-center items-center text-center">
      <div>
        <Image
          src="/check_icon_2.svg"
          width={132}
          height={132}
          alt="check icon"
          className="mx-auto"
        />
        <h1 className="text-[58px] font-bold tracking-tight mt-[40px]">
          Subscription Confirmed
        </h1>
        <h3 className="font-normal text-2xl tracking-tight mt-[20px]">
          Thank you for subscribing to our Web Development Plan!{" "}
        </h3>
        <h2 className="font-medium text-2xl tracking-tight mt-[20px]">
          Your payment was successful, and your subscription is now active.
        </h2>
        <p className="font-normal text-xl tracking-tight mt-[40px] w-[815px] px-10">
          You&apos;ll receive an email from us with all the details and next steps to
          get started. If you don&apos;t see the email within a few minutes,
          check spam or contact us at{" "}
          <span className="font-semibold text-carrot-500">
            contact@dashcruisedev.com
          </span>
        </p>
        <button onClick={() => router.push('/')} className="bg-carrot-500 px-[48px] py-[16px] rounded-xl mt-[56px] cursor-pointer text-white">
            Go to Dashboard
        </button>
      </div>
    </div>
  );
}
