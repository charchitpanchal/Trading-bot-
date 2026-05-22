"use client";

import { motion } from "framer-motion";
import { HiDownload, HiMail } from "react-icons/hi";
import { FaFolderOpen } from "react-icons/fa";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { TYPING_PHRASES } from "@/data/defaults";
import Modal from "@/components/ui/Modal";
import { useState } from "react";

interface HeroProps {
  onViewProjectLink: (url: string) => void;
}

export default function Hero({ onViewProjectLink }: HeroProps) {
  const typed = useTypingEffect(TYPING_PHRASES);
  const [projectModal, setProjectModal] = useState(false);
  const [projectUrl, setProjectUrl] = useState("");

  const handleViewProject = () => {
    if (!projectUrl.trim()) return;
    onViewProjectLink(projectUrl.trim());
    setProjectModal(false);
    setProjectUrl("");
  };

  const resumeUrl = process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf";

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center px-4 pt-24 md:px-6"
    >
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-indigo-400"
        >
          Welcome to my portfolio
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl"
        >
          <span className="gradient-text">CHARCHIT PANCHAL</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-lg text-slate-300 md:text-xl"
        >
          Python Developer | AI & ML Learner | Future Software Engineer
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg"
        >
          I build clean, scalable applications with Python and modern web technologies.
          Passionate about algorithms, machine learning, and crafting delightful user
          experiences that solve real-world problems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 h-8 text-xl font-semibold text-cyan-400 md:text-2xl"
        >
          {typed}
          <span className="typing-cursor ml-1 text-indigo-400">|</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button type="button" className="btn-primary" onClick={() => setProjectModal(true)}>
            <FaFolderOpen /> View Project
          </button>
          <a href="#contact" className="btn-secondary">
            <HiMail /> Contact Me
          </a>
          <a href={resumeUrl} download className="btn-secondary">
            <HiDownload /> Download Resume
          </a>
          <a href="#projects" className="btn-secondary hidden sm:inline-flex">
            Browse Projects
          </a>
        </motion.div>
      </div>

      <Modal open={projectModal} onClose={() => setProjectModal(false)} title="Open Project">
        <p className="mb-4 text-sm text-slate-400">
          Enter the project URL you want to view (live demo or repository).
        </p>
        <input
          type="url"
          value={projectUrl}
          onChange={(e) => setProjectUrl(e.target.value)}
          placeholder="https://your-project.com"
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <div className="flex gap-3">
          <button type="button" className="btn-primary flex-1" onClick={handleViewProject}>
            Open Link
          </button>
          <button type="button" className="btn-secondary" onClick={() => setProjectModal(false)}>
            Cancel
          </button>
        </div>
      </Modal>
    </section>
  );
}
