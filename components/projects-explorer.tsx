"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";

const categories = ["all", "showcase", "organizational"] as const;

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "in-progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  pending: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

export function ProjectsExplorer() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
      const q = query.toLowerCase().trim();
      const matchQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q));

      return matchCategory && matchQuery;
    });
  }, [selectedCategory, query]);

  return (
    <div className="space-y-8 w-full">
      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/80 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`flex-1 sm:flex-none px-4 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or stack..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Grid of Projects */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group relative rounded-2xl bg-zinc-900/30 border border-zinc-800/60 hover:border-indigo-500/40 p-6 flex flex-col justify-between transition-all hover:bg-zinc-900/50"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Badge className={`text-[10px] uppercase font-mono ${statusStyles[item.status]}`}>
                  {item.status}
                </Badge>
                <span className="text-xs font-mono text-zinc-500">{item.year}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {item.stack.slice(0, 3).map((st) => (
                  <span
                    key={st}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 border border-zinc-700/40"
                  >
                    {st}
                  </span>
                ))}
                {item.stack.length > 3 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">
                    +{item.stack.length - 3}
                  </span>
                )}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between border-t border-zinc-800/50 mt-6">
              <Link
                href={`/projects/${item.slug}`}
                className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <span>Case study</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {item.liveUrl && (
                <a
                  href={item.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                  aria-label={`Open live demo for ${item.title}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-sm text-zinc-500 border border-dashed border-zinc-800 rounded-2xl">
          No projects matching &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
