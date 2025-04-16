"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function FadeInSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(
        "transition-all xl:duration-1600 xl:delay-400 duration-700 delay-200 ease-in-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-0"
      )}
    >
      {children}
    </div>
  );
}
