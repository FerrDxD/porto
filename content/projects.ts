import { Project } from "@/types";
import { Bot, Globe, UserCheck, FileText, Sparkles, GraduationCap } from "lucide-react";

export const projects: Project[] = [
  {
    id: 1,
    slug: "teman-kos",
    title: "Teman Kos",
    date: "2026",
    year: 2026,
    content: "AI companion app with natural conversation. Full-stack solo project.",
    category: "showcase",
    stack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 90,
    highlights: [
      "Implemented natural language processing for conversational AI",
      "Built responsive UI with modern animations",
      "Deployed with CI/CD pipeline",
    ],
    problem:
      "Students living away from home often struggle with isolation and lack a responsive daily task companion.",
    approach:
      "Engineered an interactive conversational companion with fine-tuned personality prompts, modern animated UI, and rapid response latency.",
    repoUrl: "https://github.com/FerrDxD/AI-Waifu",
    liveUrl: "https://livia.qzz.io/",
    relatedIds: [2],
  },
  {
    id: 2,
    slug: "elegy",
    title: "Elegy",
    date: "2026",
    year: 2026,
    content:
      "AI-powered self-reflection platform combining generative AI, personal journaling, and cinematic web design.",
    category: "showcase",
    stack: ["Next.js", "TypeScript", "AI Integration", "GSAP"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 85,
    highlights: [
      "Integrated generative AI for self-reflection prompts",
      "Cinematic web design with GSAP animations",
      "Personal journaling system with data persistence",
    ],
    problem:
      "Traditional journals are passive and lack guided interactive questioning to unlock genuine self-reflection.",
    approach:
      "Designed a cinematic, moody interface with GSAP micro-animations and LLM-driven introspective prompts that adapt to user reflections.",
    repoUrl: "https://github.com/FerrDxD/elegy",
    liveUrl: "https://refleksi-elegy.vercel.app/",
    relatedIds: [3, 5],
  },
  {
    id: 3,
    slug: "nawa-learn",
    title: "Nawa-Learn",
    date: "2026",
    year: 2026,
    content: "Empowering Education Through Gamification and Collaborative Learning.",
    category: "showcase",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 75,
    highlights: [
      "Gamified learning experience with progress tracking",
      "Collaborative features for group study",
      "Real-time notifications and updates",
    ],
    problem:
      "Learner retention drops rapidly when online study tools lack collaborative motivation loops.",
    approach:
      "Integrated gamified achievement tracking, collaborative squad rooms, and clean progress visualization using Next.js and Prisma.",
    repoUrl: "https://github.com/NAWASENA-Development-Team/nawa-learn",
    liveUrl: "https://learn.nawasena.site",
    relatedIds: [1],
  },
  {
    id: 4,
    slug: "sentra",
    title: "SENTRA",
    date: "2026",
    year: 2026,
    content: "Official website for OSIS Nawasena (nawasena.site).",
    category: "organizational",
    stack: ["Nuxt.js", "TypeScript", "Tailwind CSS"],
    role: "Frontend Developer",
    status: "completed",
    energy: 95,
    highlights: [
      "Modern, responsive organizational website",
      "SEO-optimized with fast loading times",
      "Content management system integration",
    ],
    problem:
      "The student council needed a high-performance, authoritative public portal with zero maintenance friction.",
    approach:
      "Crafted a responsive Nuxt/TypeScript web portal with optimized assets, dynamic news feeds, and strong SEO metadata.",
    repoUrl: "https://github.com/FerrDxD/sentra-frontend-nuxt",
    liveUrl: "https://nawasena.site",
    relatedIds: [5, 6],
  },
  {
    id: 5,
    slug: "nawa-absen",
    title: "NAWA-ABSEN",
    date: "2026",
    year: 2026,
    content: "Biometric attendance system for OSIS Nawasena.",
    category: "organizational",
    stack: ["Next.js", "TypeScript", "Biometric API", "PostgreSQL"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 70,
    highlights: [
      "Biometric authentication integration",
      "Real-time attendance tracking",
      "Admin dashboard for management",
    ],
    problem:
      "Paper-based attendance caused frequent delays, proxy sign-ins, and tedious reporting for organizational meetings.",
    approach:
      "Developed a biometric verification flow connected to PostgreSQL and real-time dashboard analytics with instant export capability.",
    repoUrl: "https://github.com/FerrDxD/nawa-absen",
    liveUrl: "https://nawa-absen.vercel.app/",
    relatedIds: [2, 4],
  },
  {
    id: 6,
    slug: "barrett-test",
    title: "Barrett Test",
    date: "2026",
    year: 2026,
    content:
      "Digital assessment platform designed to help users identify their potential through profile testing.",
    category: "organizational",
    stack: ["Next.js", "TypeScript", "Assessment Logic", "Tailwind CSS"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 40,
    highlights: [
      "Comprehensive assessment algorithm",
      "User-friendly test interface",
      "Detailed result analysis and reporting",
    ],
    problem:
      "Psychological profile evaluations were clunky and confusing for young applicants to complete without supervisor help.",
    approach:
      "Engineered an intuitive single-flow questionnaire interface with instant scoring algorithm and clear visual archetype breakdowns.",
    repoUrl: "https://github.com/FerrDxD/barrett-test",
    liveUrl: "https://test.nawasena.site",
    relatedIds: [4],
  },
];

// Icon mapping for backward compatibility
export const iconMap: Record<number, React.ElementType> = {
  1: Bot,
  2: Sparkles,
  3: GraduationCap,
  4: Globe,
  5: UserCheck,
  6: FileText,
};
