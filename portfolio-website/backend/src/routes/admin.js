import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import Admin from "../models/Admin.js";

const router = Router();

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const admin = await Admin.findOne({ email: email.toLowerCase() });
      if (!admin || !(await admin.comparePassword(password))) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
      res.json({ success: true, token, email: admin.email });
    } catch {
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }
);

export async function ensureAdminUser() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) return;
  const existing = await Admin.findOne({ email: email.toLowerCase() });
  if (existing) return;
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email: email.toLowerCase(), passwordHash });
  console.log("Default admin user created");
}

export default router;
