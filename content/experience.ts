import { Experience } from "@/types";
import expData from "./data/experience/full-stack-developer.json";

export const experience: Experience[] = [{ id: 1, ...expData }] as unknown as Experience[];
