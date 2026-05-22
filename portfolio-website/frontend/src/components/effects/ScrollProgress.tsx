"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-1 origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400"
      style={{ scaleX }}
    />
  );
}
