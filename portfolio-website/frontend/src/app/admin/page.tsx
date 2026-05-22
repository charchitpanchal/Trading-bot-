"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api, type Project, type Skill, type ContactMessage } from "@/lib/api";

type Tab = "projects" | "messages" | "skills";

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("projects");
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [skillForm, setSkillForm] = useState({ name: "", icon: "code", level: 70 });

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (t) setToken(t);
  }, []);

  useEffect(() => {
    if (!token) return;
    loadData();
  }, [token, tab]);

  const loadData = async () => {
    if (!token) return;
    try {
      if (tab === "projects") {
        const res = await api.getAllProjects(token);
        setProjects(res.data);
      } else if (tab === "skills") {
        const res = await api.getSkills();
        setSkills(res.data);
      } else {
        const res = await api.getMessages(token);
        setMessages(res.data);
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Load failed");
      if (String(e).includes("401")) {
        localStorage.removeItem("admin_token");
        setToken(null);
      }
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.adminLogin(email, password);
      localStorage.setItem("admin_token", res.token);
      setToken(res.token);
      toast.success("Logged in");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
  };

  const addProject = async () => {
    if (!token) return;
    try {
      await api.createProject(token, {
        ...projectForm,
        technologies: projectForm.technologies.split(",").map((t) => t.trim()),
        featured: true,
      });
      toast.success("Project added");
      setProjectForm({ title: "", description: "", image: "", technologies: "", githubUrl: "", liveUrl: "" });
      loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const deleteProject = async (id: string) => {
    if (!token || !confirm("Delete project?")) return;
    await api.deleteProject(token, id);
    toast.success("Deleted");
    loadData();
  };

  const addSkill = async () => {
    if (!token) return;
    try {
      await api.createSkill(token, skillForm);
      toast.success("Skill added");
      setSkillForm({ name: "", icon: "code", level: 70 });
      loadData();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  };

  const deleteSkill = async (id: string) => {
    if (!token || !confirm("Delete skill?")) return;
    await api.deleteSkill(token, id);
    toast.success("Deleted");
    loadData();
  };

  const deleteMessage = async (id: string) => {
    if (!token || !confirm("Delete message?")) return;
    await api.deleteMessage(token, id);
    toast.success("Deleted");
    loadData();
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <form onSubmit={login} className="glass-card w-full max-w-md p-8">
          <h1 className="text-2xl font-bold gradient-text">Admin Login</h1>
          <p className="mt-2 text-sm text-slate-400">Hidden dashboard — authorized access only</p>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-6 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            required
          />
          <button type="submit" className="btn-primary mt-6 w-full">
            Login
          </button>
          <a href="/" className="mt-4 block text-center text-sm text-slate-400 hover:text-white">
            ← Back to site
          </a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-3">
            <a href="/" className="btn-secondary text-sm py-2">
              View Site
            </a>
            <button type="button" onClick={logout} className="btn-secondary text-sm py-2">
              Logout
            </button>
          </div>
        </div>
        <div className="mt-6 flex gap-2">
          {(["projects", "messages", "skills"] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 capitalize ${tab === t ? "bg-indigo-600" : "bg-white/10"}`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "projects" && (
          <div className="mt-8">
            <div className="glass-card mb-8 p-6">
              <h2 className="font-bold">Add Project</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {(["title", "description", "image", "technologies", "githubUrl", "liveUrl"] as const).map(
                  (field) => (
                    <input
                      key={field}
                      placeholder={field}
                      value={projectForm[field]}
                      onChange={(e) => setProjectForm({ ...projectForm, [field]: e.target.value })}
                      className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm"
                    />
                  )
                )}
              </div>
              <button type="button" className="btn-primary mt-4" onClick={addProject}>
                Add Project
              </button>
            </div>
            <ul className="space-y-4">
              {projects.map((p) => (
                <li key={p._id} className="glass-card flex justify-between p-4">
                  <div>
                    <p className="font-bold">{p.title}</p>
                    <p className="text-sm text-slate-400">{p.description.slice(0, 80)}…</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteProject(p._id)}
                    className="text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "skills" && (
          <div className="mt-8">
            <div className="glass-card mb-8 flex flex-wrap gap-3 p-6">
              <input
                placeholder="Skill name"
                value={skillForm.name}
                onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              />
              <input
                placeholder="icon key"
                value={skillForm.icon}
                onChange={(e) => setSkillForm({ ...skillForm, icon: e.target.value })}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              />
              <input
                type="number"
                placeholder="Level"
                value={skillForm.level}
                onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                className="w-24 rounded-lg border border-white/10 bg-white/5 px-3 py-2"
              />
              <button type="button" className="btn-primary" onClick={addSkill}>
                Add Skill
              </button>
            </div>
            <ul className="space-y-2">
              {skills.map((s) => (
                <li key={s._id} className="glass-card flex justify-between p-4">
                  <span>
                    {s.name} — {s.level}%
                  </span>
                  <button type="button" onClick={() => deleteSkill(s._id)} className="text-red-400">
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {tab === "messages" && (
          <ul className="mt-8 space-y-4">
            {messages.map((m) => (
              <li key={m._id} className="glass-card p-4">
                <p className="font-bold">
                  {m.name} &lt;{m.email}&gt;
                </p>
                <p className="mt-2 text-sm text-slate-400">{m.message}</p>
                <p className="mt-2 text-xs text-slate-500">
                  {new Date(m.createdAt).toLocaleString()} {m.read ? "· Read" : ""}
                </p>
                <button
                  type="button"
                  onClick={() => deleteMessage(m._id)}
                  className="mt-2 text-sm text-red-400"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
