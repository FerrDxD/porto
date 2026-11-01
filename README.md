# Portfolio WebApp

Personal portfolio website built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Lenis (smooth scroll)
- **Package Manager**: Bun
- **Linting**: ESLint with Next.js config
- **Formatting**: Prettier
- **Git Hooks**: Husky + lint-staged

## Getting Started

### Prerequisites

- Bun (recommended) or npm
- Node.js 18+

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run ESLint
- `bun run typecheck` - Run TypeScript type checking

## Architecture

```
app/
  layout.tsx          # Root layout with metadata
  page.tsx            # Main page composition
  globals.css         # Global styles
components/ui/
  badge.tsx           # Badge component
  parallax-scrolling.tsx  # Parallax scroll animation
  radial-orbital-timeline.tsx  # Interactive project timeline
lib/
  utils.ts            # Utility functions (cn, etc.)
```

## Code Quality

Pre-commit hooks run automatically:

- Prettier formatting
- ESLint auto-fix
- TypeScript type checking

## Deployment

Recommended deployment: Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## Development Status

See [AUDIT_AND_MILESTONES.md](./AUDIT_AND_MILESTONES.md) for detailed roadmap and acceptance criteria.
