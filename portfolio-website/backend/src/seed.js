import dotenv from "dotenv";
import mongoose from "mongoose";
import Project from "./models/Project.js";
import Skill from "./models/Skill.js";
import { connectDB } from "./config/db.js";
import { ensureAdminUser } from "./routes/admin.js";

dotenv.config();

const defaultSkills = [
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

const defaultProjects = [
  {
    title: "Student Management System",
    description:
      "Full-stack CRUD application for managing students, courses, and grades with role-based access.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    technologies: ["Python", "Flask", "SQLite", "HTML", "CSS"],
    githubUrl: "https://github.com",
    liveUrl: "",
    order: 1,
    architecture: {
      techStack: ["Python", "Flask", "SQLite", "Jinja2"],
      folderStructure: "app/\n  models/\n  routes/\n  templates/\n  static/",
      explanation:
        "Users interact with Flask routes that validate input, query SQLite, and render templates.",
      features: ["CRUD", "Search", "Export reports", "Auth"],
      screenshots: [],
    },
  },
  {
    title: "AI Chatbot",
    description:
      "Conversational assistant powered by NLP APIs with context-aware responses and chat history.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    technologies: ["Python", "OpenAI API", "FastAPI", "React"],
    githubUrl: "https://github.com",
    order: 2,
    architecture: {
      techStack: ["React", "FastAPI", "OpenAI", "MongoDB"],
      folderStructure: "client/\nserver/\n  api/\n  services/",
      explanation: "React sends prompts to FastAPI which calls the LLM and stores sessions.",
      features: ["Streaming", "History", "Markdown render"],
      screenshots: [],
    },
  },
  {
    title: "Weather App using API",
    description: "Real-time weather dashboard with geolocation, forecasts, and beautiful UI.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
    technologies: ["JavaScript", "OpenWeather API", "Tailwind"],
    githubUrl: "https://github.com",
    order: 3,
  },
  {
    title: "Expense Tracker",
    description: "Track income and expenses with charts, categories, and monthly summaries.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    technologies: ["React", "Chart.js", "LocalStorage"],
    githubUrl: "https://github.com",
    order: 4,
  },
  {
    title: "Portfolio Website",
    description: "This premium full-stack portfolio with admin panel and MongoDB backend.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    technologies: ["Next.js", "Express", "MongoDB", "Tailwind"],
    githubUrl: "https://github.com",
    liveUrl: "",
    order: 5,
  },
  {
    title: "Task Manager",
    description: "Kanban-style task board with drag-and-drop, filters, and persistence.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    technologies: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    order: 6,
  },
];

async function seed() {
  await connectDB();
  await ensureAdminUser();
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany(defaultSkills);
    console.log("Skills seeded");
  }
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(defaultProjects);
    console.log("Projects seeded");
  }
  console.log("Seed complete");
  await mongoose.disconnect();
}

seed().catch(console.error);
