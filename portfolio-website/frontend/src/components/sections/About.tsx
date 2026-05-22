"use client";

import { motion } from "framer-motion";
import { FaPython, FaBrain, FaCode, FaGlobe } from "react-icons/fa";

const journeyCards = [
  {
    icon: FaPython,
    title: "Python Journey",
    text: "From scripting basics to building APIs, automation tools, and backend systems with clean architecture.",
    color: "from-yellow-500/20 to-amber-600/10",
  },
  {
    icon: FaCode,
    title: "DSA & Problem Solving",
    text: "Strengthening logic with data structures, algorithms, and competitive programming on LeetCode & GFG.",
    color: "from-indigo-500/20 to-violet-600/10",
  },
  {
    icon: FaBrain,
    title: "AI & Machine Learning",
    text: "Exploring supervised learning, neural networks, and practical ML projects with scikit-learn & TensorFlow.",
    color: "from-cyan-500/20 to-blue-600/10",
  },
  {
    icon: FaGlobe,
    title: "Web Development",
    text: "Crafting responsive UIs with React, Next.js, and Tailwind — blending design with performance.",
    color: "from-emerald-500/20 to-teal-600/10",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="section-title">About Me</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-400">
            I am a dedicated developer on a mission to become a world-class software engineer.
            My journey spans Python development, rigorous DSA practice, hands-on AI/ML experiments,
            and modern full-stack web projects — always learning, always building.
          </p>
        </motion.div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {journeyCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, rotateY: 2 }}
              className={`glass-card group p-6 bg-gradient-to-br ${card.color}`}
            >
              <card.icon className="mb-4 h-10 w-10 text-indigo-400 transition group-hover:scale-110 group-hover:text-cyan-400" />
              <h3 className="text-lg font-bold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{card.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
