import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    icon: { type: String, default: "code" },
    level: { type: Number, min: 0, max: 100, default: 70 },
    category: { type: String, default: "general" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Skill || mongoose.model("Skill", skillSchema);
