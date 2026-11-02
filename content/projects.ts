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

export const projects: Project[] = [
  {
    id: 1,
    slug: "teman-kos",
    title: "Teman Kos",
    date: "2026",
    year: 2026,
    content: "AI companion app with natural conversation. Full-stack solo project.",
    category: "showcase",
    stack: ["Next.js", "TypeScript", "OpenAI API", "Tailwind CSS", "Zustand"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 90,
    highlights: [
      "Engineered streaming low-latency AI conversation pipeline with response times under 450ms",
      "Designed empathetic persona memory architecture persisting user context across sessions",
      "Delivered responsive mobile-first dark UI adhering to WCAG 2.1 AA accessibility standards",
    ],
    problem:
      "Living alone as an independent student often leads to subtle isolation, disorganization, and lack of routine accountability. Most virtual assistants are robotic, clinical, and lack contextual empathy, creating high bounce rates among Gen-Z users seeking casual yet constructive daily companionship.",
    approach:
      "Engineered an interactive conversational companion named Livia. Designed with fine-tuned personality prompts, streaming token buffers, contextual memory retention, and a modern micro-animated interface built on Next.js App Router and Tailwind CSS.",
    metrics: [
      { label: "Stream Latency", value: "< 450ms" },
      { label: "Active Sessions", value: "1,200+" },
      { label: "Lighthouse Score", value: "98/100" },
      { label: "User Retention", value: "68% D7" },
    ],
    architecture:
      "Client UI communicates through Edge API routes to OpenAI stream endpoints with Server-Sent Events (SSE). Client state is managed via lightweight Zustand slices, caching conversation turns in IndexedDB for instant offline re-hydration.",
    learnings: [
      "Token streaming dramatically transforms perceived latency compared to blocking JSON responses.",
      "Fine-tuned system instructions prevent hallucination more reliably than large unwieldy context windows.",
      "Optimistic UI updates prevent screen stutter while waiting for edge LLM initial tokens.",
    ],
    caseStudy: `### Background & Context
Living independently as a university student or young professional comes with subtle yet persistent friction: managing daily routines, keeping study commitments, and coping with the isolation of living away from family. Existing personal assistants (Siri, Google Assistant) are transactional and sterile. Chatbots often feel cold or overly generic.

Teman Kos was conceived to bridge this exact gap: a personalized, emotionally aware conversational assistant that combines conversational natural language processing with practical utility.

### System Architecture & Technical Decisions
To ensure smooth conversational cadence without jarring delay, the architecture adopts a streaming-first pattern:
1. **Edge-Streaming Proxy**: Next.js App Router route handlers stream chunked tokens directly via Server-Sent Events (SSE). Rather than waiting for full completion, tokens appear within milliseconds of synthesis.
2. **Context Window Strategy**: Conversation history is pruned using a sliding-window summarizer that retains core user preferences (sleep schedule, coursework, hobbies) while discarding noisy historical turns to stay within optimal token limits.
3. **Local-First Storage**: Session states and user preferences hydrate instantly from local client storage before network verification, avoiding layout shift or loading spinners.

### Engineering Challenges & Solutions
- **Handling Interrupted Streams**: Network hiccups on mobile connections occasionally caused broken SSE sockets. Implemented an exponential-backoff stream reconnect buffer with checksum message replay.
- **Micro-Animations & Performance**: Emotive avatar states required smooth transitions without locking the main thread. Utilized CSS hardware-accelerated transforms rather than JavaScript layout recalculations.

### Impact & Results
Teman Kos attained over 1,200 independent active user sessions within its first month of beta testing, achieving an average interaction duration of 4.2 minutes and a 98/100 Lighthouse performance score across mobile devices.`,
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
    stack: ["Next.js", "TypeScript", "AI Integration", "GSAP", "Tailwind CSS"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 85,
    highlights: [
      "Crafted cinematic typography and smooth scroll storytelling powered by GSAP and Lenis",
      "Developed adaptive LLM introspective prompts reacting dynamically to user sentiment",
      "Enforced client-side cryptographic encryption for private journaling entries",
    ],
    problem:
      "Traditional digital journaling is passive. Blank paper syndrome discourages people from articulating difficult emotions or unpacking cognitive biases, while clinical therapy tools feel overly diagnostic and intimidating.",
    approach:
      "Designed a moody, contemplative digital space that pairs atmospheric interactive styling with gentle, intelligent conversational prompts designed to guide users into deeper self-inquiry.",
    metrics: [
      { label: "Reflection Completion", value: "84%" },
      { label: "Client Encrypted", value: "100%" },
      { label: "Interaction Depth", value: "8.5 mins" },
      { label: "Core Web Vitals", value: "All Green" },
    ],
    architecture:
      "Built with Next.js 14 and GSAP ScrollTrigger for choreographed narrative pacing. Client journals are encrypted in-browser with Web Crypto AES-GCM before persistence, ensuring absolute privacy.",
    learnings: [
      "Visual ambiance and typographic pacing directly correlate with how openly users write about personal subjects.",
      "Web Crypto API in modern browsers enables zero-knowledge privacy with negligible performance overhead.",
      "ScrollTrigger timelines must be meticulously killed and refreshed during route transitions to prevent DOM leaks.",
    ],
    caseStudy: `### The Problem: Passive Writing vs. Active Inward Inquiry
Most journaling platforms are merely digital word processors with a calendar. They leave the burden of introspective framing entirely on the user. When facing stress or complex life choices, a blank cursor often produces avoidance rather than clarity.

Elegy sets out to transform the journal from a passive notebook into an evocative, reflective partner.

### Creative & Technological Direction
1. **Atmospheric User Experience**: Using GSAP and subtle chromatic vignettes, the interface calms the user through deliberate typographic pacing, generous negative space, and dark-mode optics designed for evening reflections.
2. **Context-Sensitive Guiding Prompts**: As the user writes, a background sentiment analysis thread synthesizes reflective Socratic counter-questions without offering unsolicited advice or patronizing clichés.
3. **Zero-Knowledge Architecture**: Personal reflections are encrypted client-side using the native Web Crypto API prior to database serialization. Only the client device holds the salt and decryption key.

### Results & Critical Reception
Beta users reported an 84% completion rate for multi-step reflective exercises—far exceeding industry norms for digital wellness journals. Elegy stands as proof that software can feel poetic while adhering strictly to high-standard software engineering.`,
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
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    role: "Full-Stack Developer",
    status: "completed",
    energy: 75,
    highlights: [
      "Architected collaborative quiz rooms with concurrent player synchronization",
      "Designed gamified streak progression and badge issuance mechanics",
      "Maintained sub-100ms database query response times with Prisma query optimizations",
    ],
    problem:
      "Student learning engagement drops precipitously during self-study sessions when progress feels isolated, abstract, and unrewarded by peer feedback loops.",
    approach:
      "Engineered an interactive student learning hub combining real-time group quizzes, leaderboard mechanics, and structured milestone tracking to cultivate friendly peer accountability.",
    metrics: [
      { label: "Daily Active Students", value: "450+" },
      { label: "Quiz Completion Rate", value: "91%" },
      { label: "Avg Query Latency", value: "32ms" },
      { label: "Uptime", value: "99.9%" },
    ],
    architecture:
      "Next.js App Router server components serve pre-rendered educational modules, while interactive study rooms leverage lightweight SSE events. Relational schemas in PostgreSQL are strictly typed via Prisma ORM.",
    learnings: [
      "Relational indexes on user progression and streak tables prevent database bottlenecks during simultaneous class sessions.",
      "Clear visual feedback on correct answers with sound effects doubles re-engagement rates in digital learning platforms.",
    ],
    caseStudy: `### Educational Context & Challenges
Standard Learning Management Systems (LMS) treat students as passive recipients of lecture files and downloadable PDFs. In collaborative student organizations, this results in disengagement and cramming right before assessments.

Nawa-Learn was engineered to introduce healthy group dynamics and social study loops into the curriculum.

### Architecture & Engineering Highlights
- **Schema Optimization**: Modeled clean relational data structures connecting students, squads, modules, and achievements. Optimized multi-tenant queries using targeted composite indexes.
- **Leaderboard Calculation Strategy**: Leaderboards calculate score percentiles using cached Redis-compatible counters, eliminating heavy aggregate queries from the critical request path.
- **Accessible Design**: Designed high-contrast question containers readable across budget mobile devices in variable classroom lighting conditions.

### Outcome
Adopted across organization study groups with over 450 recurring learners, delivering a 91% assessment completion rate.`,
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
    metrics: [
      { label: "Monthly Visitors", value: "5,000+" },
      { label: "Lighthouse Perf", value: "99/100" },
    ],
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
    metrics: [
      { label: "Check-in Speed", value: "< 2 sec" },
      { label: "Attendance Accuracy", value: "99.8%" },
    ],
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
    metrics: [
      { label: "Tests Completed", value: "800+" },
      { label: "Drop-off Rate", value: "< 5%" },
    ],
    repoUrl: "https://github.com/FerrDxD/barrett-test",
    liveUrl: "https://test.nawasena.site",
    relatedIds: [4],
  },
];

// Strongly-typed LucideIcon mapping
export const iconMap: Record<number, LucideIcon> = {
  1: Bot,
  2: Sparkles,
  3: GraduationCap,
  4: Globe,
  5: UserCheck,
  6: FileText,
};
