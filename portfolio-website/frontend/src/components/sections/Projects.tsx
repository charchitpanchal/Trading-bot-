"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { api, type Project } from "@/lib/api";
import { DEFAULT_PROJECTS } from "@/data/defaults";
import Modal from "@/components/ui/Modal";
import toast from "react-hot-toast";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [viewModal, setViewModal] = useState(false);
  const [viewUrl, setViewUrl] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    api
      .getProjects()
      .then((res) => setProjects(res.data))
      .catch(() =>
        setProjects(
          DEFAULT_PROJECTS.map((p, i) => ({ ...p, _id: String(i) })) as Project[]
        )
      );
  }, []);

  const openViewProject = (project: Project) => {
    setActiveProject(project);
    setViewUrl(project.liveUrl || "");
    setViewModal(true);
  };

  const handleViewSubmit = () => {
    const url = viewUrl.trim() || activeProject?.liveUrl || activeProject?.githubUrl;
    if (!url) {
      toast.error("Please enter a project URL");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    setViewModal(false);
  };

  return (
    <section id="projects" className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Featured Projects
        </motion.h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          A selection of applications showcasing my full-stack and AI skills.
        </p>
        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.article
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-card group overflow-hidden"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder-project.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-slate-400">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies?.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg bg-indigo-500/20 px-2 py-1 text-xs text-indigo-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={project.githubUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex-1 text-xs py-2"
                  >
                    <FaGithub /> GitHub
                  </a>
                  <button
                    type="button"
                    className="btn-primary flex-1 text-xs py-2"
                    onClick={() => openViewProject(project)}
                  >
                    <FaExternalLinkAlt /> View Project
                  </button>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full text-xs py-2"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Modal
        open={viewModal}
        onClose={() => setViewModal(false)}
        title={`View: ${activeProject?.title || "Project"}`}
      >
        <p className="mb-4 text-sm text-slate-400">
          Enter or confirm the project link to open in a new tab.
        </p>
        <input
          type="url"
          value={viewUrl}
          onChange={(e) => setViewUrl(e.target.value)}
          placeholder="https://..."
          className="mb-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
        />
        <button type="button" className="btn-primary w-full" onClick={handleViewSubmit}>
          Open Project
        </button>
      </Modal>
    </section>
  );
}
