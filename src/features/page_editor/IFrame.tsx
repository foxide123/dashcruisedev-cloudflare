"use client";
import { useEffect, useRef } from "react";

export function IFrame({iframeSrc}: {iframeSrc:string}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    const sendToken = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          {
            type: "AUTH_TOKEN",
            token: "123",
          },
        iframeSrc
        );
      }
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener("load", sendToken);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", sendToken);
      }
    };
  }, []);
  return (
    <iframe
      ref={iframeRef}
      src={iframeSrc}
      className="w-full h-full"
      sandbox="allow-scripts allow-same-origin"
    ></iframe>
  );
}
