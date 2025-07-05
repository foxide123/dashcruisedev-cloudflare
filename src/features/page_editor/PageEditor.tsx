"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useRef, useState } from "react";

const supabase = createClient();

export function PageEditor({
  baseUrl,
  pageSlug,
}: {
  baseUrl: string;
  pageSlug: string;
}) {
  const [iframeLocale, setIframeLocale] = useState("en");
  const [isEditable, setIsEditable] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframe = iframeRef.current;

  useEffect(() => {
    async function getAccessToken() {
      const { data, error } = await supabase.auth.getSession();
      console.log("data:", data);
      console.log("access token:", data.session?.access_token);
      setAccessToken(data.session?.access_token);
    }
    getAccessToken();
  }, []);

  console.log("iframeLocale:", iframeLocale);
  const iframeSrc =
    pageSlug === "home"
      ? `${baseUrl}/${iframeLocale}/preview`
      : `${baseUrl}/${iframeLocale}/${pageSlug}/preview`;

  const toggleEditMode = () => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "DESIGN_MODE",
          isEditable: !isEditable,
          token: accessToken,
        },
        iframeSrc
      );
    }
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex flex-col items-center justify-start w-full h-full pr-5 pb-5">
      <div className="w-full h-[100px] bg-black text-white text-2xl flex items-center justify-between px-5">
        <p>Page: {pageSlug.toUpperCase()}</p>
        <select
          value={iframeLocale}
          onChange={(e) => {
            setIframeLocale(e.target.value);
            setIsEditable(false);
          }}
          className=""
        >
          <option value="en">EN</option>
          <option value="tr">TR</option>
        </select>
        <button onClick={toggleEditMode} className="border-2 border-green-500">
          {isEditable ? "Save Changes 🎉" : "Edit Page ✍️"}
        </button>
      </div>
      <iframe
        ref={iframeRef}
        src={iframeSrc}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
}
