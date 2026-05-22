"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMail, HiUser, HiChat } from "react-icons/hi";
import { api } from "@/lib/api";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix form errors");
      return;
    }
    setLoading(true);
    try {
      const res = await api.sendContact(form);
      toast.success(res.message || "Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
      setErrors({});
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 md:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="section-title text-center"
        >
          Get In Touch
        </motion.h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-slate-400">
          Have a project or opportunity? Send me a message — I&apos;ll get back to you soon.
        </p>
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-xl glass-card p-8"
        >
          <div className="mb-5">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <HiUser /> Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
          </div>
          <div className="mb-5">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <HiMail /> Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="you@email.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <HiChat /> Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Your message..."
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Sending…" : "Send Message"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
