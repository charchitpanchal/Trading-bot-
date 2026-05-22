"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaServer,
  FaDatabase,
  FaCloud,
  FaReact,
  FaArrowRight,
} from "react-icons/fa";
import Modal from "@/components/ui/Modal";

const flowSteps = [
  { label: "Frontend", icon: FaReact, desc: "Next.js · React · Tailwind" },
  { label: "API", icon: FaCloud, desc: "REST · JSON · Auth" },
  { label: "Backend", icon: FaServer, desc: "Node.js · Express" },
  { label: "Database", icon: FaDatabase, desc: "MongoDB Atlas" },
];

const defaultArch = {
  techStack: ["Next.js", "Express", "MongoDB", "Tailwind CSS", "Framer Motion"],
  folderStructure: `portfolio-website/
├── frontend/     # Next.js app
│   └── src/
└── backend/      # Express API
    └── src/`,
  explanation:
    "The browser loads the Next.js frontend. User actions call REST APIs on Express, which validates data, talks to MongoDB, and optionally sends emails via Nodemailer.",
  features: [
    "SSR & SEO metadata",
    "JWT admin auth",
    "Contact form + MongoDB storage",
    "Dynamic projects & skills",
    "Dark/light theme",
  ],
  screenshots: [] as string[],
};

export default function SystemDesign() {
  const [modalOpen, setModalOpen] = useState(false);
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [details, setDetails] = useState(defaultArch);

  const handleSubmit = () => {
    setDetails({
      ...defaultArch,
      techStack: [
        ...defaultArch.techStack,
        githubUrl ? `Repo: ${githubUrl}` : "",
      ].filter(Boolean),
    });
    setModalOpen(false);
  };

  return (
    <section id="architecture" className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          System Design
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          How this portfolio and my projects are architected end-to-end.
        </p>

        <div className="mt-14 flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-2">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 md:gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="glass-card flex min-w-[140px] flex-col items-center p-6 text-center"
              >
                <step.icon className="mb-3 h-10 w-10 text-indigo-400" />
                <h3 className="font-bold">{step.label}</h3>
                <p className="mt-1 text-xs text-slate-400">{step.desc}</p>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <FaArrowRight className="hidden h-5 w-5 rotate-90 text-indigo-400 md:block md:rotate-0" />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button type="button" className="btn-primary" onClick={() => setModalOpen(true)}>
            How This Was Built
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 glass-card p-8"
        >
          <h3 className="text-2xl font-bold gradient-text">Architecture Details</h3>
          <div className="mt-6 grid gap-8 lg:grid-cols-2">
            <div>
              <h4 className="font-semibold text-indigo-400">Tech Stack</h4>
              <ul className="mt-2 flex flex-wrap gap-2">
                {details.techStack.map((t) => (
                  <li key={t} className="rounded-lg bg-white/10 px-3 py-1 text-sm">
                    {t}
                  </li>
                ))}
              </ul>
              <h4 className="mt-6 font-semibold text-indigo-400">Features</h4>
              <ul className="mt-2 list-inside list-disc text-sm text-slate-400">
                {details.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-indigo-400">Folder Structure</h4>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs text-cyan-300">
                {details.folderStructure}
              </pre>
              <h4 className="mt-6 font-semibold text-indigo-400">How It Works</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {details.explanation}
              </p>
            </div>
          </div>
          {(githubUrl || liveUrl) && (
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  GitHub Repository →
                </a>
              )}
              {liveUrl && (
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">
                  Live Project →
                </a>
              )}
            </div>
          )}
          {details.screenshots.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold">Screenshots</h4>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {details.screenshots.map((src) => (
                  <img key={src} src={src} alt="Screenshot" className="rounded-xl" />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="How This Was Built">
        <p className="mb-4 text-sm text-slate-400">
          Provide your GitHub repository and live project links to display in the architecture section.
        </p>
        <label className="mb-2 block text-sm font-medium">GitHub Repository</label>
        <input
          type="url"
          value={githubUrl}
          onChange={(e) => setGithubUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <label className="mb-2 block text-sm font-medium">Live Project Link</label>
        <input
          type="url"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="https://your-app.vercel.app"
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <button type="button" className="btn-primary w-full" onClick={handleSubmit}>
          Show Details
        </button>
      </Modal>
    </section>
  );
}
