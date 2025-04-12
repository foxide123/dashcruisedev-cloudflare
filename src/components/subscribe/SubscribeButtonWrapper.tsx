"use client";

import dynamic from "next/dynamic";

const SubscribeButton = dynamic(() => import("./SubscribeButton"), {
  ssr: false, // ⬅️ Important!
  loading: () => (
    <button
      disabled
      className="flex justify-center items-center bg-carrot-500 rounded-xl py-6 px-4 text-center text-white text-2xl w-full cursor-not-allowed"
    >
      Loading...
    </button>
  ),
});
//eslint-disable-next-line
export default function SubscribeButtonWrapper(props: any) {
  return <SubscribeButton {...props} />;
}
