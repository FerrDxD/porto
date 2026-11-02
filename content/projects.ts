import { Project } from "@/types";
import {
  Bot,
  Globe,
  UserCheck,
  FileText,
  Sparkles,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import temanKosData from "./data/projects/teman-kos.json";
import elegyData from "./data/projects/elegy.json";
import nawaLearnData from "./data/projects/nawa-learn.json";
import sentraData from "./data/projects/sentra.json";
import nawaAbsenData from "./data/projects/nawa-absen.json";
import barrettTestData from "./data/projects/barrett-test.json";

export const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

export const statusLabels: Record<string, string> = {
  completed: "COMPLETE",
  "in-progress": "IN PROGRESS",
  pending: "PENDING",
};

const rawProjects = [
  { id: 1, slug: "teman-kos", relatedIds: [2], ...temanKosData },
  { id: 2, slug: "elegy", relatedIds: [3, 5], ...elegyData },
  { id: 3, slug: "nawa-learn", relatedIds: [1], ...nawaLearnData },
  { id: 4, slug: "sentra", relatedIds: [5, 6], ...sentraData },
  { id: 5, slug: "nawa-absen", relatedIds: [2, 4], ...nawaAbsenData },
  { id: 6, slug: "barrett-test", relatedIds: [4], ...barrettTestData },
];

export const projects: Project[] = rawProjects as unknown as Project[];

export const iconMap: Record<number, LucideIcon> = {
  1: Bot,
  2: Sparkles,
  3: GraduationCap,
  4: Globe,
  5: UserCheck,
  6: FileText,
};
