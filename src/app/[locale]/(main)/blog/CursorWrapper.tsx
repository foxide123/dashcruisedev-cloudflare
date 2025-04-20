'use client';

import { useEffect, useState } from 'react';
import CustomCursor from '@/components/common/CustomCursor';
import "@/app/globals.css"
import { useIsMobile } from '@/hooks/use-mobile';

export default function CustomCursorWrapper({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState("READ");

  const isMobile = useIsMobile();

  let spanWrapper:HTMLElement | null;

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorText = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      spanWrapper = target.closest('span') ;
      if (cursorText && !isMobile) {
        setLabel(cursorText);
        setVisible(true);
        spanWrapper?.classList.add("hovered-outline")
      }else{
        setVisible(false);
        spanWrapper?.classList.remove("hovered-outline")
      }
    };

    const handleMouseOut = () => {
      setVisible(false);
      spanWrapper?.classList.remove("hovered-outline")
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div>
      {isMobile ? null : <CustomCursor isVisible={visible} label={label} />}
      {children}
    </div>
  );
}
