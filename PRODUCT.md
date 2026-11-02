# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** Tech recruiters, engineering hiring managers, and technical leads evaluating Maulana Ferdi Irawan for senior, full-stack, and frontend roles. They look for architectural discipline, production readiness, clean code practices, and depth in modern web ecosystems.
- **Secondary:** Startup founders and freelance clients seeking an autonomous builder capable of delivering end-to-end digital products, MVPs, and distinctive interactive experiences.

## Product Purpose

The portfolio serves as the authoritative digital presence and proof-of-work for Maulana Ferdi Irawan (`~/fer`). Its purpose is to demonstrate dual mastery: senior engineering rigor (scalable Next.js architecture, TypeScript strictness, performance, accessibility) and creative craft (GSAP animations, interactive orbital timelines, cinematic typography). Success is measured by converting visits into interview requests, high-value freelance inquiries, and engineering collaborations.

## Positioning

Full-Stack Developer & UI Designer bridging production-grade engineering with high-craft interactive digital experiences. Unlike standard cookie-cutter developer portfolios or style-over-substance demos, this platform demonstrates real shipped applications (AI companion apps, reflective journaling systems, biometric operations) supported by structured domain models, typed data layers, and clean architectural separation.

## Operating Context

- Evaluated primarily on desktop displays by hiring managers during structured candidate reviews, but frequently viewed on mobile devices via direct links on GitHub, LinkedIn, and social profiles.
- Reviewers operate under high cognitive load with short attention spans (30–60 seconds initial scan); the surface must immediately convey seniority and creative capability, while offering seamless drill-downs into deep case studies and verified repos.

## Capabilities and Constraints

- **Stack:** Next.js 14 (App Router), React 18, TypeScript (strict mode), Bun, Tailwind CSS, GSAP, Lenis smooth scrolling, Lucide icons.
- **Content Architecture:** Centralized domain models in `content/` (`projects.ts`, `experience.ts`, `skills.ts`, `site.ts`, `social.ts`) keeping UI components decoupled from data.
- **Technical Constraints:** Must maintain high Core Web Vitals, provide complete keyboard accessibility, and respect user system preferences (such as `prefers-reduced-motion`).
- **Language & Copy:** English for all visitor-facing UI copy and case studies.

## Brand Commitments

- **Identity & Handles:** Maulana Ferdi Irawan (`~/fer`), GitHub `@FerrDxD`, location: Jonggol, Indonesia.
- **Voice & Tone:** Confident, articulate, pragmatic, and craft-driven. Focuses on concrete outcomes, architectural decisions, and shipped products rather than buzzwords.
- **Visual Identity Baseline:** Dark theme aesthetic (`bg-zinc-950` with zinc neutrals and indigo `#6366f1` accent).

## Evidence on Hand

- **Production Applications:**
  - _Teman Kos_: AI companion app with conversational NLP (`https://livia.qzz.io/`, repo: `FerrDxD/AI-Waifu`).
  - _Elegy_: AI-powered self-reflection platform combining generative AI with cinematic GSAP design (`https://refleksi-elegy.vercel.app/`, repo: `FerrDxD/elegy`).
  - _Nawa-Learn_: Gamified educational and collaborative learning platform.
- **Curated Assets & Documentation:**
  - Typed project datasets in `content/projects.ts` containing tech stacks, roles, energy metrics, and live URLs.
  - Comprehensive engineering roadmap and audit in `AUDIT_AND_MILESTONES.md`.
  - Design token specifications in `docs/design-tokens.md`.
- **Honesty Guarantee:** No fabricated testimonials or mock company affiliations; all displayed work reflects genuine solo development, client projects, and verified repositories.

## Product Principles

1. **Dual Authority (Craft & Rigor):** Every visual delight must be grounded in robust engineering—accessible, performant, and cleanly structured.
2. **Artifact-First Storytelling:** Let actual code and shipped products speak first. Enable rapid high-level scanning alongside rigorous case study inspection.
3. **Inclusive Motion:** Animations and interactive canvas/orbital elements must enhance the narrative, with graceful degradation and zero motion friction when reduced motion is preferred.
4. **Authentic Evidence:** Present verified achievements, live URLs, and real metrics without synthetic fluff.

## Accessibility & Inclusion

- WCAG 2.1 AA compliance target for color contrast, focus indicators, and semantic structure.
- Accessible orbital timeline and interactive components supporting full keyboard navigation (`role`, `tabIndex`, `aria-*` states).
- Motion sensitivity protection: Lenis smooth scroll and GSAP auto-rotation must automatically respect `prefers-reduced-motion`.
