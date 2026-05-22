"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    setEnabled(fine);
    if (!fine) return;
    document.body.classList.add("custom-cursor");
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[150] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-400 mix-blend-difference"
        style={{ x: springX, y: springY }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[149] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/50"
        style={{ x: springX, y: springY }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
    </>
  );
}
