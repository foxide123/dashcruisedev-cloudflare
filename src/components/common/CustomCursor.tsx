'use client';

import { useEffect, /* useRef */ useState } from 'react';
import { Anton } from "next/font/google";
import clsx from "clsx";

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
});

export default function CustomCursor({isVisible, label}: {isVisible:boolean, label:string}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false)

    /* const cursorRef = useRef<HTMLDivElement>(null); */

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHasMoved(true);
      console.log("X:", e.clientX, "Y:", e.clientY)
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  if(!hasMoved || !position) return null;

/*   const offset = cursorRef.current
  ? {
      x: cursorRef.current.offsetWidth / 2,
      y: cursorRef.current.offsetHeight / 2,
    }
  : { x: 40, y: 40 };  */

  return (
    <div
      className={`z-20 fixed pointer-events-none transition-opacity ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: `translate(${position.x -124}px, ${position.y -290}px)`,
        cursor: "none"
      }}
    > 
      <div className={clsx(anton.className,"text-center bg-transparent z-20 w-fit font-[Anton] font-semibold  text-carrot-500 tracking-wider text-8xl transition-opacity duration-2000 delay-[5s] ease-in-out shadow-md rounded-full py-5 px-10",
        isVisible && "opacity-100"
      )}>
        {label}
      </div>
   </div> 
  );
}
