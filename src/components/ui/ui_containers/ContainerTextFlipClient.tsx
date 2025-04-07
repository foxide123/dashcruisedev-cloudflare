// src/components/ui/ContainerTextFlipClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ContainerTextFlip } from "@/components/ui/ui_containers/container-text-flip";

//eslint-disable-next-line
export default function ContainerTextFlipClient(props: any) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [startAnimation, setStartAnimation]= useState(false);

  useEffect(() => {
    setIsHydrated(true);
    setStartAnimation(true);
  }, []);

  if(!isHydrated || !startAnimation) {
    return (
      <span className="text-carrot-500">
         {props.words && props.words[props.words.length - 1] ? props.words[props.words.length - 1] : "Brand"}
      </span>
    )
  }
  return <ContainerTextFlip {...props} />;
}
