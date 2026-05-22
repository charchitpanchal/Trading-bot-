"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#architecture", label: "Architecture" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#home" className="text-lg font-bold gradient-text">
          CP
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl border border-white/10 p-2.5 hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <HiOutlineSun className="h-5 w-5" />
              ) : (
                <HiOutlineMoon className="h-5 w-5" />
              )}
            </button>
          )}
          <button
            type="button"
            className="rounded-xl border border-white/10 p-2.5 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <HiX className="h-6 w-6" /> : <HiMenuAlt3 className="h-6 w-6" />}
          </button>
        </div>
      </nav>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="glass border-t border-white/10 md:hidden"
        >
          <ul className="flex flex-col gap-4 p-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
