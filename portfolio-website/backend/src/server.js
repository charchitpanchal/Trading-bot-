import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import contactRoutes from "./routes/contact.js";
import projectRoutes from "./routes/projects.js";
import skillRoutes from "./routes/skills.js";
import adminRoutes, { ensureAdminUser } from "./routes/admin.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(morgan("dev"));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json({ limit: "2mb" }));

app.get("/api/health", (_, res) => {
  res.json({ success: true, message: "Portfolio API is running" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/admin", adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ success: false, message: "Internal server error" });
});

async function start() {
  const connected = await connectDB();
  if (connected) {
    await ensureAdminUser();
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
