const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function request<T>(
  path: string,
  options?: RequestInit & { token?: string }
): Promise<T> {
  const { token, ...init } = options || {};
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(init.headers || {}),
  };
  if (token) {
    (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, { ...init, headers });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || data.errors?.[0]?.msg || "Request failed");
  }
  return data;
}

export const api = {
  getProjects: () => request<{ success: boolean; data: Project[] }>("/projects"),
  getSkills: () => request<{ success: boolean; data: Skill[] }>("/skills"),
  sendContact: (body: { name: string; email: string; message: string }) =>
    request<{ success: boolean; message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  adminLogin: (email: string, password: string) =>
    request<{ success: boolean; token: string }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getAllProjects: (token: string) =>
    request<{ success: boolean; data: Project[] }>("/projects/all", { token }),
  createProject: (token: string, body: Partial<Project>) =>
    request("/projects", { method: "POST", token, body: JSON.stringify(body) }),
  updateProject: (token: string, id: string, body: Partial<Project>) =>
    request(`/projects/${id}`, { method: "PUT", token, body: JSON.stringify(body) }),
  deleteProject: (token: string, id: string) =>
    request(`/projects/${id}`, { method: "DELETE", token }),
  getMessages: (token: string) =>
    request<{ success: boolean; data: ContactMessage[] }>("/contact", { token }),
  deleteMessage: (token: string, id: string) =>
    request(`/contact/${id}`, { method: "DELETE", token }),
  markMessageRead: (token: string, id: string) =>
    request(`/contact/${id}/read`, { method: "PATCH", token }),
  createSkill: (token: string, body: Partial<Skill>) =>
    request("/skills", { method: "POST", token, body: JSON.stringify(body) }),
  updateSkill: (token: string, id: string, body: Partial<Skill>) =>
    request(`/skills/${id}`, { method: "PUT", token, body: JSON.stringify(body) }),
  deleteSkill: (token: string, id: string) =>
    request(`/skills/${id}`, { method: "DELETE", token }),
};

export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  order?: number;
  architecture?: {
    techStack: string[];
    folderStructure: string;
    explanation: string;
    features: string[];
    screenshots: string[];
  };
}

export interface Skill {
  _id: string;
  name: string;
  icon: string;
  level: number;
  order?: number;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}
