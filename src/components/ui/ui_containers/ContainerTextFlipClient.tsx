// src/components/ui/ContainerTextFlipClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import ContainerTextFlip from "@/components/ui/ui_containers/container-text-flip";
//eslint-disable-next-line
export function ContainerTextFlipClient(props: any) {
  const [showAnimation, setShowAnimation] = useState(false);
  const fallbackText = (
    <span className="text-carrot-500">
      {props.words && props.words[props.words.length - 1]
        ? props.words[props.words.length - 1]
        : "Brand"}
    </span>
  );

  useEffect(() => {
    if ("requestIdleCallback" in window) {
      //eslint-disable-next-line
      (window as any).requestIdleCallback(() => {
        setShowAnimation(true);
      });
    } else {
      setTimeout(() => setShowAnimation(true), 1000);
    }
  }, []);

  if (!showAnimation) {
    return fallbackText
  }
  return <ContainerTextFlip {...props} />;
}
