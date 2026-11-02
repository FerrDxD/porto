import { Skill } from "@/types";
import tsData from "./data/skills/typescript.json";
import jsData from "./data/skills/javascript.json";
import nextData from "./data/skills/nextjs.json";
import reactData from "./data/skills/react.json";
import tailwindData from "./data/skills/tailwind-css.json";
import pgData from "./data/skills/postgresql.json";
import gsapData from "./data/skills/gsap.json";

export const skills: Skill[] = [
  { id: 1, ...tsData },
  { id: 2, ...jsData },
  { id: 3, ...nextData },
  { id: 4, ...reactData },
  { id: 5, ...tailwindData },
  { id: 6, ...pgData },
  { id: 7, ...gsapData },
] as unknown as Skill[];
