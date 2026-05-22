import { Router } from "express";
import Skill from "../models/Skill.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json({ success: true, data: skills });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch skills" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: skill });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
