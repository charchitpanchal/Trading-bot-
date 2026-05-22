"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return p + 8;
      });
    }, 80);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="mb-8 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-glow"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <p className="mb-4 text-lg font-semibold gradient-text">CHARCHIT PANCHAL</p>
      <div className="h-1 w-48 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="mt-2 text-sm text-slate-400">Loading portfolio… {progress}%</p>
    </motion.div>
  );
}
