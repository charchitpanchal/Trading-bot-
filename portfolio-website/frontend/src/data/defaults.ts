import type { Project, Skill } from "@/lib/api";

export const DEFAULT_SKILLS: Omit<Skill, "_id">[] = [
  { name: "Python", icon: "python", level: 90, order: 1 },
  { name: "C++", icon: "cpp", level: 75, order: 2 },
  { name: "DSA", icon: "dsa", level: 80, order: 3 },
  { name: "HTML", icon: "html", level: 90, order: 4 },
  { name: "CSS", icon: "css", level: 88, order: 5 },
  { name: "JavaScript", icon: "javascript", level: 85, order: 6 },
  { name: "React", icon: "react", level: 82, order: 7 },
  { name: "Tailwind CSS", icon: "tailwind", level: 88, order: 8 },
  { name: "Git & GitHub", icon: "git", level: 85, order: 9 },
  { name: "Machine Learning", icon: "ml", level: 70, order: 10 },
  { name: "APIs", icon: "api", level: 78, order: 11 },
];

export const DEFAULT_PROJECTS: Omit<Project, "_id">[] = [
  {
    title: "Student Management System",
    description:
      "Full-stack CRUD application for managing students, courses, and grades with role-based access.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    technologies: ["Python", "Flask", "SQLite", "HTML"],
    githubUrl: "https://github.com",
    liveUrl: "",
  },
  {
    title: "AI Chatbot",
    description:
      "Conversational assistant powered by NLP APIs with context-aware responses.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: ["Python", "FastAPI", "React", "OpenAI"],
    githubUrl: "https://github.com",
  },
  {
    title: "Weather App using API",
    description: "Real-time weather dashboard with geolocation and forecasts.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    technologies: ["JavaScript", "OpenWeather API", "Tailwind"],
    githubUrl: "https://github.com",
  },
  {
    title: "Expense Tracker",
    description: "Track income and expenses with charts and monthly summaries.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    technologies: ["React", "Chart.js", "LocalStorage"],
    githubUrl: "https://github.com",
  },
  {
    title: "Portfolio Website",
    description: "Premium full-stack portfolio with admin panel and MongoDB.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    technologies: ["Next.js", "Express", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com",
  },
  {
    title: "Task Manager",
    description: "Kanban-style task board with drag-and-drop and filters.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
  },
];

export const TYPING_PHRASES = [
  "Python Developer",
  "AI & ML Enthusiast",
  "Problem Solver",
  "Future Software Engineer",
];
