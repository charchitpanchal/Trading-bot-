import { Router } from "express";
import Project from "../models/Project.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find({ featured: true }).sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
});

router.get("/all", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json({ success: true, data: projects });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch projects" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch project" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
