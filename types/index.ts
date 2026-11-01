export type ProjectStatus = "completed" | "in-progress" | "pending";
export type ProjectCategory = "showcase" | "organizational" | "experimental";

export interface Project {
  id: number;
  slug: string;
  title: string;
  date: string;
  year: number;
  content: string;
  category: ProjectCategory;
  stack: string[];
  role: string;
  status: ProjectStatus;
  energy: number;
  highlights: string[];
  repoUrl?: string;
  liveUrl?: string;
  coverImage?: string;
  relatedIds: number[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  years: number;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  description: string;
  achievements: string[];
}

export interface SocialLink {
  id: number;
  platform: string;
  url: string;
  icon: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  author: {
    name: string;
    email: string;
    location: string;
  };
}
