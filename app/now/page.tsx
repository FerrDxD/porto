import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Code, BookOpen, Compass, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "Now",
  description: "What Maulana Ferdi is working on, learning, and exploring right now.",
  openGraph: {
    title: "Now — Maulana Ferdi",
    description: "What Maulana Ferdi is working on, learning, and exploring right now.",
  },
};

export default function NowPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md px-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to portfolio</span>
          </Link>
          <div className="font-mono text-xs text-zinc-500">~/fer / now</div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated November 2026</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            What I&apos;m Doing Now
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            Inspired by Derek Sivers&apos;{" "}
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline"
            >
              /now page
            </a>{" "}
            movement. A public log of my current priorities, technical investigations, and focus
            areas.
          </p>
        </div>

        {/* Section: Building */}
        <section className="space-y-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
            <Code className="w-4 h-4" />
            <span>What I&apos;m Building</span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed list-disc list-inside">
            <li>
              Polishing production hardening, observability, and test automation across my
              open-source Next.js application suite.
            </li>
            <li>
              Iterating on local-first AI interfaces with streaming token synthesis and client-side
              zero-knowledge encryption.
            </li>
            <li>
              Refining high-performance web animations with GSAP and Lenis while enforcing strict
              WCAG accessibility standards.
            </li>
          </ul>
        </section>

        {/* Section: Learning */}
        <section className="space-y-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>What I&apos;m Learning & Exploring</span>
          </div>
          <ul className="space-y-3 text-sm text-zinc-300 leading-relaxed list-disc list-inside">
            <li>
              Advanced systems design patterns: sliding-window rate limiters, token-bucket
              throttling, and resilient distributed edge runtimes.
            </li>
            <li>
              Micro-interactions and typography rhythm that communicate confidence and calm utility.
            </li>
            <li>
              PostgreSQL schema indexing strategies for multi-tenant collaborative learning tools.
            </li>
          </ul>
        </section>

        {/* Section: Focus Goals */}
        <section className="space-y-4 p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold uppercase tracking-wider">
            <Target className="w-4 h-4" />
            <span>Current Goals</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            Collaborating with ambitious product teams, early-stage engineering startups, or senior
            peers where polished frontend execution and solid engineering craftsmanship are valued.
          </p>
        </section>

        {/* Location & Coordinates */}
        <div className="pt-6 border-t border-zinc-900 flex items-center justify-between text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-zinc-400" />
            <span>Based in Indonesia · UTC+7</span>
          </div>
          <Link
            href="/#contact"
            className="text-indigo-400 hover:text-indigo-300 font-sans text-xs font-medium"
          >
            Get in touch →
          </Link>
        </div>
      </main>
    </div>
  );
}
