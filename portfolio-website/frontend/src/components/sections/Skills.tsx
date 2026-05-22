"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiTensorflow,
} from "react-icons/si";
import { FaDatabase, FaCode } from "react-icons/fa";
import { api, type Skill } from "@/lib/api";
import { DEFAULT_SKILLS } from "@/data/defaults";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  python: SiPython,
  cpp: SiCplusplus,
  dsa: FaCode,
  html: SiHtml5,
  css: SiCss3,
  javascript: SiJavascript,
  react: SiReact,
  tailwind: SiTailwindcss,
  git: SiGit,
  ml: SiTensorflow,
  api: FaDatabase,
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    api
      .getSkills()
      .then((res) => setSkills(res.data))
      .catch(() =>
        setSkills(
          DEFAULT_SKILLS.map((s, i) => ({ ...s, _id: String(i) })) as Skill[]
        )
      );
  }, []);

  return (
    <section id="skills" className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title text-center"
          onViewportEnter={() => setInView(true)}
        >
          Skills & Expertise
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          Technologies I work with daily — proficiency shown below.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = iconMap[skill.icon] || FaCode;
            return (
              <motion.div
                key={skill._id || skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className={cn("h-7 w-7", iconColor(skill.icon))} />
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-sm font-bold text-indigo-400">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-fill"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: i * 0.08 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function iconColor(icon: string) {
  const colors: Record<string, string> = {
    python: "text-yellow-400",
    cpp: "text-blue-400",
    javascript: "text-yellow-300",
    react: "text-cyan-400",
    tailwind: "text-teal-400",
    git: "text-orange-400",
    ml: "text-orange-500",
  };
  return colors[icon] || "text-indigo-400";
}
