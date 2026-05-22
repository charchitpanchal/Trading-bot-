import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    technologies: [{ type: String }],
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    architecture: {
      techStack: [String],
      folderStructure: String,
      explanation: String,
      features: [String],
      screenshots: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
