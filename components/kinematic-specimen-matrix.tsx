"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, ArrowRight, CheckCircle2, Code2, Layers } from "lucide-react";
import { projects, statusStyles, statusLabels } from "@/content";
import { Badge } from "@/components/ui/badge";

export function KinematicSpecimenMatrix() {
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", "showcase", "organizational"];
  const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="space-y-10">
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
        <div className="text-sm font-medium text-zinc-300">
          Showing <span className="font-mono text-white font-bold">{filtered.length}</span>{" "}
          documented engineering systems
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-zinc-900 border border-zinc-800">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                filter === cat
                  ? "bg-zinc-800 text-white font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {cat === "all" ? "All Systems" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Specimen Cards Grid (Asymmetric High-Craft Layout) */}
      <div className="grid md:grid-cols-2 gap-8">
        {filtered.map((item, idx) => (
          <article
            key={item.id}
            className="rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md"
          >
            {/* Top Meta Bar */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-zinc-400 tracking-wider">
                    SPECIMEN {"//"} 0{idx + 1}
                  </span>
                  <Badge
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 ${
                      statusStyles[item.status]
                    }`}
                  >
                    {statusLabels[item.status]}
                  </Badge>
                </div>
                <span className="font-mono text-xs text-zinc-500 tabular-nums">{item.year}</span>
              </div>

              {/* Title & Core Value */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-2">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.content}</p>
              </div>

              {/* Problem / Approach Summary */}
              {item.problem && (
                <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/60 text-xs text-zinc-300 leading-relaxed space-y-1.5">
                  <div className="font-mono text-[10px] uppercase tracking-wider text-indigo-400 font-semibold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>The Engineering Problem</span>
                  </div>
                  <p>{item.problem}</p>
                </div>
              )}

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-zinc-950 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Highlights List */}
              {item.highlights && item.highlights.length > 0 && (
                <ul className="space-y-2 pt-2 border-t border-zinc-800/50 text-xs text-zinc-300">
                  {item.highlights.slice(0, 2).map((h, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-3">
              <Link
                href={`/projects/${item.slug}`}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Read Full Case Study</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2">
                {item.repoUrl && (
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                )}
                {item.liveUrl && (
                  <a
                    href={item.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-200 px-3 py-1.5 rounded-lg bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
