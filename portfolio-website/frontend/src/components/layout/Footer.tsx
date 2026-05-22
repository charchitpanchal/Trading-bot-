import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 md:flex-row md:px-6">
        <p className="text-sm text-slate-400">
          © {year} CHARCHIT PANCHAL. Built with Next.js & Express.
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="GitHub"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
          <a
            href="#contact"
            className="rounded-lg p-2 hover:bg-white/10"
            aria-label="Email"
          >
            <FaEnvelope className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
