"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import LoadingScreen from "@/components/effects/LoadingScreen";
import ScrollProgress from "@/components/effects/ScrollProgress";
import CustomCursor from "@/components/effects/CustomCursor";
import ParticlesBackground from "@/components/effects/ParticlesBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import SystemDesign from "@/components/sections/SystemDesign";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  const handleProjectLink = (url: string) => {
    try {
      new URL(url);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      toast.error("Invalid URL");
    }
  };

  return (
    <>
      <AnimatePresence>{loading && <LoadingScreen onDone={() => setLoading(false)} />}</AnimatePresence>
      {!loading && (
        <>
          <ScrollProgress />
          <CustomCursor />
          <ParticlesBackground />
          <div className="animated-bg fixed inset-0 -z-20 opacity-40 dark:opacity-60" />
          <Navbar />
          <main className="relative z-10">
            <Hero onViewProjectLink={handleProjectLink} />
            <About />
            <Skills />
            <Projects />
            <SystemDesign />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
