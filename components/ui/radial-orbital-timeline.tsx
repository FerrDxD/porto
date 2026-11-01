"use client";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { projects, iconMap } from "@/content";
import { Project } from "@/types";

interface TimelineItem extends Project {
  icon: React.ElementType;
}

const timelineData: TimelineItem[] = projects.map((project) => ({
  ...project,
  icon: iconMap[project.id] || (() => null),
}));

const statusStyles = {
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "in-progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  pending: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const statusLabels = {
  completed: "COMPLETE",
  "in-progress": "IN PROGRESS",
  pending: "PENDING",
};

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

  const getNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) * (Math.PI / 180);
    const radius = 170;
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
    };
  };

  const handleNodeClick = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
      setAutoRotate(true);
    } else {
      setExpandedId(id);
      setAutoRotate(false);
    }
  };

  const handleNodeKeyDown = (e: React.KeyboardEvent, id: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNodeClick(id);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current) {
      setExpandedId(null);
      setAutoRotate(true);
    }
  };

  const activeItem = items.find((i) => i.id === expandedId);

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center min-h-[600px] select-none py-10"
      onClick={handleBackdropClick}
    >
      {/* Orbital visualization container */}
      <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center overflow-visible">
        <div className="absolute inset-0 flex items-center justify-center transform scale-[0.65] sm:scale-100">
          <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Decorative Rings */}
            <div className="absolute inset-4 rounded-full border border-dashed border-zinc-700/30 opacity-50 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-12 rounded-full border border-zinc-800/40" />
            <div className="absolute inset-24 rounded-full border border-dashed border-zinc-800/50 opacity-30 animate-[spin_120s_linear_infinite_reverse]" />

            {/* Center glowing core */}
            <div className="absolute w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center z-10 backdrop-blur-sm shadow-[0_0_30px_rgba(99,102,241,0.2)]">
              <div className="w-3 h-3 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
            </div>

            {/* Nodes */}
            {items.map((item, index) => {
              const { x, y } = getNodePosition(index, items.length);
              const Icon = item.icon;
              const isExpanded = expandedId === item.id;
              const isRelated = activeItem?.relatedIds.includes(item.id) ?? false;

              return (
                <button
                  key={item.id}
                  type="button"
                  className={`absolute flex flex-col items-center cursor-pointer group ${isExpanded ? "z-50" : "z-20"}`}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(item.id);
                  }}
                  onKeyDown={(e) => handleNodeKeyDown(e, item.id)}
                  aria-expanded={isExpanded}
                  aria-label={`View details for ${item.title}`}
                >
                  {/* Connection Line to Center (only when hovered or active) */}
                  {(isExpanded || isRelated) && (
                    <svg
                      className="absolute top-1/2 left-1/2 -z-10 pointer-events-none"
                      style={{ overflow: "visible" }}
                    >
                      <line
                        x1={0}
                        y1={0}
                        x2={-x}
                        y2={-y}
                        stroke={isExpanded ? "rgba(99, 102, 241, 0.4)" : "rgba(255, 255, 255, 0.1)"}
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                    </svg>
                  )}

                  {/* Node circle */}
                  <div
                    className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 backdrop-blur-md
                  ${
                    isExpanded
                      ? "bg-indigo-500/90 border border-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.6)] scale-110"
                      : isRelated
                        ? "bg-white/10 border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] animate-pulse"
                        : "bg-zinc-900/80 border border-zinc-700/80 group-hover:bg-zinc-800 group-hover:border-indigo-500/50 group-hover:shadow-[0_0_10px_rgba(99,102,241,0.3)] group-hover:scale-105"
                  }
                `}
                  >
                    <Icon
                      size={18}
                      className={
                        isExpanded
                          ? "text-white"
                          : "text-zinc-400 group-hover:text-indigo-300 transition-colors"
                      }
                    />
                  </div>

                  {/* Label */}
                  <span
                    className={`
                  absolute top-14 whitespace-nowrap text-xs font-semibold tracking-wider uppercase transition-all duration-300
                  ${isExpanded ? "text-indigo-300 drop-shadow-[0_0_5px_rgba(99,102,241,0.8)]" : "text-zinc-500 group-hover:text-zinc-300"}
                `}
                  >
                    {item.title}
                  </span>

                  {/* Expanded Card */}
                  {isExpanded && (
                    <div
                      className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-zinc-950/80 backdrop-blur-2xl border border-zinc-800/80 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Decorative top gradient border */}
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
                        <div className="flex gap-3">
                          {item.repoUrl && (
                            <a
                              href={item.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-medium text-zinc-300 transition-colors"
                            >
                              Repository
                            </a>
                          )}
                          {item.liveUrl && (
                            <a
                              href={item.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-center py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 rounded-lg text-xs font-medium text-indigo-300 transition-colors"
                            >
                              Live Site
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4 sm:mt-12">
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
          aria-label={autoRotate ? "Pause auto-rotation" : "Resume auto-rotation"}
        >
          {autoRotate ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
              Play
            </>
          )}
        </button>
        <span className="text-xs text-zinc-600">Click a node to explore</span>
      </div>
    </div>
  );
}
