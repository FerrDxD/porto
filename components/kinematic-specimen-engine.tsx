"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Terminal, ArrowRight, ShieldCheck, Activity, Cpu } from "lucide-react";
import { projects } from "@/content/projects";

interface PipelineStep {
  name: string;
  stage: string;
  state: "nominal" | "active" | "cached";
  latency: string;
}

const specimenPipelines: Record<number, PipelineStep[]> = {
  1: [
    {
      name: "EDGE_PROXY",
      stage: "Next.js App Router API Route",
      state: "nominal",
      latency: "12ms",
    },
    {
      name: "STREAM_SSE",
      stage: "Server-Sent Events Token Pipe",
      state: "active",
      latency: "420ms",
    },
    {
      name: "INDEXED_DB",
      stage: "Client Encrypted History Cache",
      state: "cached",
      latency: "4ms",
    },
    { name: "STATE_ZUSTAND", stage: "Optimistic UI Hydration", state: "nominal", latency: "1ms" },
  ],
  2: [
    {
      name: "GSAP_ORCHESTRATION",
      stage: "ScrollTrigger Choreography",
      state: "nominal",
      latency: "16ms",
    },
    {
      name: "WEB_CRYPTO_AES",
      stage: "Zero-Knowledge In-Browser Crypto",
      state: "active",
      latency: "8ms",
    },
    {
      name: "SOCRATIC_LLM",
      stage: "Adaptive Sentiment Prompt Thread",
      state: "nominal",
      latency: "650ms",
    },
    {
      name: "LOCAL_VAULT",
      stage: "Key-derived Local Persistence",
      state: "cached",
      latency: "2ms",
    },
  ],
  3: [
    {
      name: "MULTI_TENANT_DB",
      stage: "PostgreSQL & Composite Indexing",
      state: "nominal",
      latency: "32ms",
    },
    {
      name: "CONCURRENT_ROOMS",
      stage: "SSE Room Sync & Event Bus",
      state: "active",
      latency: "45ms",
    },
    {
      name: "PRISMA_CLIENT",
      stage: "Strict Type-Safe Query Engine",
      state: "nominal",
      latency: "18ms",
    },
    {
      name: "ACHIEVEMENT_ENGINE",
      stage: "Real-Time Streak & Badging Logic",
      state: "nominal",
      latency: "5ms",
    },
  ],
};

export function KinematicSpecimenEngine() {
  const featuredProjects = projects.slice(0, 3);
  const [selectedId, setSelectedId] = useState<number>(featuredProjects[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(1);

  const currentProject = featuredProjects.find((p) => p.id === selectedId) || featuredProjects[0];
  const pipeline = specimenPipelines[currentProject.id] || specimenPipelines[1];
  const activeStep = pipeline[activeStepIndex] || pipeline[0];

  return (
    <div
      className="w-full rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 sm:p-7 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] flex flex-col gap-6"
      role="region"
      aria-label="Interactive Kinematic Specimen Engine"
    >
      {/* Console Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/80">
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-semibold tracking-wider text-zinc-300">KINEMATIC_SPECIMEN_LAB</span>
          <span className="text-zinc-600">{"//"}</span>
          <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LIVE TELEMETRY
          </span>
        </div>
        <div className="font-mono text-[11px] text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
          NODE: PROD_EDGE_NODE
        </div>
      </div>

      {/* Channel Switcher (Tactile Specimen Tabs) */}
      <div>
        <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mb-2.5">
          Select Specimen Channel
        </div>
        <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Specimen selection">
          {featuredProjects.map((proj, idx) => {
            const isSelected = proj.id === selectedId;
            return (
              <button
                key={proj.id}
                role="tab"
                id={`specimen-tab-${proj.id}`}
                aria-selected={isSelected}
                aria-controls={`specimen-panel-${proj.id}`}
                onClick={() => {
                  setSelectedId(proj.id);
                  setActiveStepIndex(1);
                }}
                className={`py-2.5 px-3 rounded-lg border text-left transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                    : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                }`}
              >
                <div className="font-mono text-[10px] text-zinc-500 font-bold">
                  0{idx + 1} {"//"} CHAN
                </div>
                <div className="text-xs sm:text-sm font-semibold truncate mt-0.5">{proj.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Specimen Inspection Panel */}
      <div
        id={`specimen-panel-${currentProject.id}`}
        role="tabpanel"
        aria-labelledby={`specimen-tab-${currentProject.id}`}
        className="rounded-xl bg-zinc-950/90 border border-zinc-800/80 p-5 space-y-5"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentProject.title}
              </h3>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-semibold uppercase">
                {currentProject.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg leading-relaxed">
              {currentProject.content}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {currentProject.liveUrl && (
              <a
                href={currentProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition-colors"
              >
                <span>Live App</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Step Sequencer Control Row */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
            <span>Execution Pipeline Step Sequencer</span>
            <span className="text-indigo-400">Probe Active Step</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {pipeline.map((step, idx) => {
              const isStepActive = idx === activeStepIndex;
              return (
                <button
                  key={step.name}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-2.5 rounded-lg border text-left transition-all font-mono focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isStepActive
                      ? "bg-zinc-900 border-indigo-500 shadow-[inset_0_0_10px_rgba(99,102,241,0.2)]"
                      : "bg-zinc-950 border-zinc-800/80 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-zinc-500">S-0{idx + 1}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isStepActive ? "bg-indigo-400" : "bg-zinc-600"
                      }`}
                    />
                  </div>
                  <div
                    className={`text-xs font-bold mt-1 truncate ${
                      isStepActive ? "text-white" : "text-zinc-300"
                    }`}
                  >
                    {step.name}
                  </div>
                  <div className="text-[10px] text-zinc-500 tabular-nums mt-0.5">
                    {step.latency}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Pipeline Step Inspector Box */}
        <div className="p-3.5 rounded-lg bg-zinc-900/40 border border-zinc-800/60 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-zinc-300">
            <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-zinc-500">{activeStep.name}:</span>
            <span className="text-zinc-200">{activeStep.stage}</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span className="tabular-nums text-emerald-400 font-semibold">
                {activeStep.latency}
              </span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase text-zinc-300">{activeStep.state}</span>
            </span>
          </div>
        </div>

        {/* Specimen Telemetry Grid */}
        {currentProject.metrics && currentProject.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {currentProject.metrics.map((m, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-center"
              >
                <div className="font-mono text-lg sm:text-xl font-bold text-white tabular-nums">
                  {m.value}
                </div>
                <div className="text-[10px] uppercase font-mono text-zinc-500 tracking-wider mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Link to Full Case Study */}
        <div className="pt-2 flex justify-end">
          <Link
            href={`/projects/${currentProject.slug}`}
            className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1 py-0.5"
          >
            <span>Launch Complete Architectural Case Study</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
