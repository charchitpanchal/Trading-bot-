import { Router } from "express";
import { body, validationResult } from "express-validator";
import Contact from "../models/Contact.js";
import { sendContactEmail } from "../services/mailer.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2, max: 100 }),
    body("email").isEmail().normalizeEmail(),
    body("message").trim().isLength({ min: 10, max: 5000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, message } = req.body;
    try {
      const doc = await Contact.create({ name, email, message });
      let emailResult = { sent: false };
      try {
        emailResult = await sendContactEmail({ name, email, message });
      } catch (mailErr) {
        console.error("Email send failed:", mailErr.message);
      }
      res.status(201).json({
        success: true,
        message: "Message received successfully",
        id: doc._id,
        emailSent: emailResult.sent,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to save message" });
    }
  }
);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: messages });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
});

router.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const msg = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!msg) return res.status(404).json({ success: false, message: "Not found" });
    res.json({ success: true, data: msg });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

export default router;
