"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { projects, iconMap, statusStyles, statusLabels } from "@/content";
import { Project } from "@/types";
import type { LucideIcon } from "lucide-react";

interface TimelineItem extends Project {
  icon: LucideIcon;
}

const timelineData: TimelineItem[] = projects.map((project) => ({
  ...project,
  icon: iconMap[project.id],
}));

interface RadialOrbitalTimelineProps {
  items?: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  items = timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(
    typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-rotate
  useEffect(() => {
    if (!autoRotate) return;

    let timer: NodeJS.Timeout;

    const startRotation = () => {
      timer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 50);
    };

    const stopRotation = () => {
      clearInterval(timer);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopRotation();
      } else {
        startRotation();
      }
    };

    startRotation();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopRotation();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [autoRotate]);

  const handleNodeClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl h-[650px] mx-auto flex items-center justify-center select-none overflow-visible"
    >
      {/* Central Core / Avatar Node */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 shadow-[0_0_50px_rgba(99,102,241,0.2)] flex items-center justify-center relative group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/20 to-purple-500/0 animate-spin-slow" />
          <span className="font-mono text-sm font-bold tracking-widest text-zinc-200">~/fer</span>
        </div>
        <span className="mt-4 font-mono text-xs text-zinc-500 tracking-wider">SYSTEM_CORE</span>
      </div>

      {/* Orbit Rings (Concentric Circles) */}
      <div className="absolute w-[320px] h-[320px] rounded-full border border-zinc-800/40 pointer-events-none" />
      <div className="absolute w-[460px] h-[460px] rounded-full border border-zinc-800/60 dashed-border pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full border border-zinc-800/20 pointer-events-none" />

      {/* Orbiting Nodes Container */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-75"
        style={{ transform: `rotate(${rotationAngle}deg)` }}
      >
        {items.map((item, index) => {
          const totalItems = items.length;
          const angleStep = 360 / totalItems;
          const currentAngle = angleStep * index;
          const radius = 230; // distance from center

          // Calculate node position in circular space
          const rad = (currentAngle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;

          const isExpanded = expandedId === item.id;
          const IconComponent = item.icon;

          return (
            <div
              key={item.id}
              className="absolute"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              {/* Counter-rotate content so text and icons remain upright */}
              <div
                style={{
                  transform: `rotate(${-rotationAngle}deg)`,
                }}
                className="relative flex flex-col items-center"
              >
                {/* Orbital Node Button */}
                <button
                  type="button"
                  onClick={() => handleNodeClick(item.id)}
                  aria-expanded={isExpanded}
                  aria-label={`${item.title} project details`}
                  className={`
                    relative group flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400
                    ${
                      isExpanded
                        ? "bg-indigo-600 border-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110 z-30"
                        : "bg-zinc-900 border-zinc-700/80 hover:border-zinc-500 hover:scale-105 z-20"
                    }
                  `}
                >
                  <IconComponent
                    className={`w-5 h-5 ${
                      isExpanded
                        ? "text-white"
                        : "text-zinc-400 group-hover:text-indigo-300 transition-colors"
                    }`}
                  />
                </button>

                {/* Node Label */}
                <span
                  className={`
                    absolute top-14 whitespace-nowrap text-xs font-semibold tracking-wider uppercase transition-all duration-300
                    ${
                      isExpanded
                        ? "text-indigo-300 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]"
                        : "text-zinc-500 group-hover:text-zinc-300"
                    }
                  `}
                >
                  {item.title}
                </span>

                {/* Expanded Card with Accessible Region */}
                {isExpanded && (
                  <div
                    role="region"
                    aria-label={`${item.title} preview details`}
                    aria-live="polite"
                    className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-zinc-950/90 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Decorative gradient top bar */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />

                    <div className="p-5">
                      <div className="flex justify-between items-center mb-3">
                        <Badge
                          className={`text-[10px] px-2 py-0.5 font-medium uppercase tracking-wider bg-transparent border ${statusStyles[item.status]}`}
                        >
                          {statusLabels[item.status]}
                        </Badge>
                        <span className="text-xs font-mono text-zinc-500">{item.date}</span>
                      </div>

                      <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-relaxed mb-5">{item.content}</p>

                      {/* Links */}
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/projects/${item.slug}`}
                          className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-xs font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        >
                          View Case Study →
                        </Link>
                        <div className="flex gap-2">
                          {item.repoUrl && (
                            <a
                              href={item.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[11px] font-medium text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                            >
                              Code
                            </a>
                          )}
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-[11px] font-medium text-zinc-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                            >
                              Demo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Play/Pause Control Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className="p-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          title={autoRotate ? "Pause orbit rotation" : "Resume orbit rotation"}
          aria-label={autoRotate ? "Pause orbit rotation" : "Resume orbit rotation"}
        >
          {autoRotate ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
