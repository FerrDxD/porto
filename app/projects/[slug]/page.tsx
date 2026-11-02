import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Lightbulb,
} from "lucide-react";
import { projects, statusStyles } from "@/content";
import { Badge } from "@/components/ui/badge";

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: `${project.title} | Case Study`,
    description: project.content,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.content,
      type: "article",
    },
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects.filter((p) => project.relatedIds.includes(p.id));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.content,
    applicationCategory: project.category,
    operatingSystem: "Web",
    author: {
      "@type": "Person",
      name: "Maulana Ferdi Irawan",
    },
    ...(project.liveUrl ? { url: project.liveUrl } : {}),
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md px-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to projects</span>
          </Link>
          <div className="font-mono text-xs text-zinc-500">~/fer / {project.slug}</div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        {/* Hero Section */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className={`text-xs uppercase tracking-wider ${statusStyles[project.status]}`}>
              {project.status}
            </Badge>
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
              {project.category}
            </span>
            <span className="text-xs font-mono text-zinc-500">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed max-w-2xl">
            {project.content}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Role</div>
            <div className="text-sm font-medium text-zinc-200">{project.role}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Timeline</div>
            <div className="text-sm font-medium text-zinc-200">{project.date}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Category</div>
            <div className="text-sm font-medium text-zinc-200 capitalize">{project.category}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase text-zinc-500 mb-1">Energy Metric</div>
            <div className="text-sm font-medium text-indigo-400 font-mono">{project.energy}%</div>
          </div>
        </div>

        {/* Key Metrics / Quantitative Impact */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-500">
              Measured Impact & Outcomes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 flex flex-col justify-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-indigo-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problem & Approach */}
        {(project.problem || project.approach) && (
          <div className="grid md:grid-cols-2 gap-8">
            {project.problem && (
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>The Challenge</span>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {project.problem}
                </p>
              </div>
            )}
            {project.approach && (
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
                  <Layers className="w-4 h-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {project.approach}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Architecture Notes */}
        {project.architecture && (
          <div className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <Cpu className="w-4 h-4" />
              <span>Technical Architecture</span>
            </div>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.architecture}
            </p>
          </div>
        )}

        {/* Tech Stack */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold tracking-tight text-white">Technologies Used</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 rounded-lg bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Key Deliverables & Highlights
            </h2>
            <div className="space-y-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/20 border border-zinc-800/40 text-sm text-zinc-300 leading-relaxed"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Engineering Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Engineering Insights</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {project.learnings.map((learning, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 text-sm text-zinc-300 leading-relaxed"
                >
                  {learning}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Comprehensive Case Study Narrative */}
        {project.caseStudy && (
          <div className="space-y-6 pt-6 border-t border-zinc-900">
            <h2 className="text-2xl font-bold tracking-tight text-white">In-Depth Case Study</h2>
            <div className="prose prose-invert max-w-none space-y-6 text-zinc-300 leading-relaxed text-sm sm:text-base">
              {project.caseStudy.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-semibold text-white pt-4">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                return <p key={i}>{paragraph}</p>;
              })}
            </div>
          </div>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <div className="pt-8 border-t border-zinc-900 space-y-6">
            <h2 className="text-xl font-bold tracking-tight text-white">Related Projects</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/projects/${rel.slug}`}
                  className="group p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-indigo-500/50 hover:bg-zinc-900/60 transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                >
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-zinc-500 uppercase">{rel.category}</div>
                    <div className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {rel.title}
                    </div>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {rel.content}
                    </p>
                  </div>
                  <div className="pt-4 flex items-center gap-1 text-xs text-indigo-400 font-medium">
                    <span>Read case study</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
