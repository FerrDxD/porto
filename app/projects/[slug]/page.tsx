import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Lightbulb,
  BookOpen,
  Clock,
} from "lucide-react";
import { projects, statusStyles } from "@/content";
import { Badge } from "@/components/ui/badge";
import { CopyLinkButton } from "@/components/copy-link-button";

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

interface Chapter {
  title: string;
  blocks: string[];
}

function parseCaseStudyChapters(content: string): Chapter[] {
  const lines = content.split("\n");
  const chapters: Chapter[] = [];
  let currentChapter: Chapter = { title: "Overview", blocks: [] };
  let currentBlock: string[] = [];

  const flushBlock = () => {
    if (currentBlock.length > 0) {
      currentChapter.blocks.push(currentBlock.join("\n").trim());
      currentBlock = [];
    }
  };

  for (const line of lines) {
    if (line.startsWith("### ")) {
      flushBlock();
      if (currentChapter.blocks.length > 0 || currentChapter.title !== "Overview") {
        chapters.push(currentChapter);
      }
      currentChapter = {
        title: line.replace("### ", "").trim(),
        blocks: [],
      };
    } else if (line.trim() === "") {
      flushBlock();
    } else {
      currentBlock.push(line);
    }
  }
  flushBlock();
  if (currentChapter.blocks.length > 0) {
    chapters.push(currentChapter);
  }

  return chapters;
}

interface ParsedListItem {
  num?: string;
  title?: string;
  body: string;
}

function parseListItems(block: string, isOrdered: boolean): ParsedListItem[] {
  const lines = block.split("\n").filter((l) => l.trim().length > 0);
  return lines.map((line, idx) => {
    let cleanLine = line;
    let num = `${idx + 1}`;
    if (isOrdered) {
      const match = line.match(/^(\d+)\.\s*(.*)$/);
      if (match) {
        num = match[1];
        cleanLine = match[2];
      }
    } else {
      cleanLine = line.replace(/^[-*]\s*/, "");
    }

    const colonIdx = cleanLine.indexOf(":");
    if (colonIdx > 0 && colonIdx < 50) {
      return {
        num,
        title: cleanLine.slice(0, colonIdx).trim(),
        body: cleanLine.slice(colonIdx + 1).trim(),
      };
    }
    return {
      num,
      body: cleanLine.trim(),
    };
  });
}

function renderChapterBlocks(blocks: string[]) {
  return blocks.map((block, i) => {
    // Numbered specification items
    if (/^\d+\.\s+/.test(block)) {
      const items = parseListItems(block, true);
      return (
        <div key={i} className="grid gap-3 pt-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-start gap-3.5 hover:border-zinc-700/60 transition-colors"
            >
              <span className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-950/60 border border-indigo-800/50 text-xs font-mono tabular-nums text-indigo-400 font-medium">
                {item.num ? item.num.padStart(2, "0") : `${idx + 1}`.padStart(2, "0")}
              </span>
              <div className="space-y-1">
                {item.title && (
                  <div className="text-sm font-semibold text-white tracking-tight">
                    {item.title}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Bullet specification items
    if (/^-\s+/.test(block)) {
      const items = parseListItems(block, false);
      return (
        <div key={i} className="grid gap-3 pt-2">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/60 flex items-start gap-3.5 hover:border-zinc-700/60 transition-colors"
            >
              <span
                className="w-2 h-2 rounded-full bg-indigo-400 shrink-0 mt-2"
                aria-hidden="true"
              />
              <div className="space-y-1">
                {item.title && (
                  <div className="text-sm font-semibold text-white tracking-tight">
                    {item.title}
                  </div>
                )}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }

    // Standard paragraph with constrained measure
    return (
      <p key={i} className="text-zinc-300 leading-relaxed text-sm sm:text-base max-w-prose">
        {block}
      </p>
    );
  });
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((p) => p.slug === params.slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

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
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-md py-1 px-1.5"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to projects</span>
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline font-mono text-xs text-zinc-500">
              ~/projects/{project.slug}
            </span>
            <CopyLinkButton />
          </div>
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
            <span className="text-xs font-mono tabular-nums text-zinc-500">{project.year}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white text-balance">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-zinc-300 leading-relaxed max-w-prose">
            {project.content}
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-sm shadow-indigo-950/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-medium text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/60">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Role
            </div>
            <div className="text-sm font-medium text-zinc-200">{project.role}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Timeline
            </div>
            <div className="text-sm font-medium text-zinc-200 font-mono tabular-nums">
              {project.date}
            </div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Category
            </div>
            <div className="text-sm font-medium text-zinc-200 capitalize">{project.category}</div>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-1">
              Energy Metric
            </div>
            <div className="text-sm font-semibold text-indigo-400 font-mono tabular-nums flex items-center gap-2">
              <span>{project.energy}%</span>
              <span className="inline-block w-12 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
                <span
                  className="block h-full bg-indigo-500 rounded-full"
                  style={{ width: `${project.energy}%` }}
                />
              </span>
            </div>
          </div>
        </div>

        {/* Key Metrics / Quantitative Impact */}
        {project.metrics && project.metrics.length > 0 && (
          <section aria-labelledby="metrics-heading" className="space-y-4">
            <h2 id="metrics-heading" className="text-xl font-bold tracking-tight text-white">
              Measured Impact & Outcomes
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700/60 transition-colors flex flex-col justify-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-indigo-400">
                    {metric.value}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Problem & Approach */}
        {(project.problem || project.approach) && (
          <section
            aria-label="Challenge and Solution"
            className="grid md:grid-cols-2 gap-6 sm:gap-8"
          >
            {project.problem && (
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-3">
                <h3 className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>The Challenge</span>
                </h3>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {project.problem}
                </p>
              </div>
            )}
            {project.approach && (
              <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 space-y-3">
                <h3 className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
                  <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>The Solution</span>
                </h3>
                <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                  {project.approach}
                </p>
              </div>
            )}
          </section>
        )}

        {/* Architecture Notes */}
        {project.architecture && (
          <section
            aria-label="Technical Architecture"
            className="p-6 rounded-2xl bg-zinc-900/20 border border-zinc-800/40 space-y-3"
          >
            <h3 className="flex items-center gap-2 text-indigo-400 text-sm font-semibold tracking-wide uppercase">
              <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Technical Architecture</span>
            </h3>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {project.architecture}
            </p>
          </section>
        )}

        {/* Tech Stack */}
        <section aria-labelledby="stack-heading" className="space-y-4">
          <h2 id="stack-heading" className="text-xl font-bold tracking-tight text-white">
            Technologies Used
          </h2>
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
        </section>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section aria-labelledby="highlights-heading" className="space-y-4">
            <h2 id="highlights-heading" className="text-xl font-bold tracking-tight text-white">
              Key Deliverables & Highlights
            </h2>
            <div className="space-y-3">
              {project.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-zinc-900/20 border border-zinc-800/40 text-sm text-zinc-300 leading-relaxed"
                >
                  <CheckCircle2
                    className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Engineering Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <section aria-labelledby="learnings-heading" className="space-y-4">
            <h2
              id="learnings-heading"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
            >
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" aria-hidden="true" />
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
          </section>
        )}

        {/* Comprehensive Case Study Narrative */}
        {project.caseStudy &&
          (() => {
            const chapters = parseCaseStudyChapters(project.caseStudy);
            const wordCount = project.caseStudy.trim().split(/\s+/).length;
            const readMinutes = Math.max(1, Math.round(wordCount / 200));

            return (
              <section
                aria-labelledby="case-study-narrative-heading"
                className="space-y-8 pt-8 border-t border-zinc-900"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <h2
                      id="case-study-narrative-heading"
                      className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5"
                    >
                      <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" aria-hidden="true" />
                      <span>In-Depth Case Study</span>
                    </h2>
                    <p className="text-xs sm:text-sm text-zinc-400">
                      Comprehensive architectural retrospective, technical trade-offs, and
                      operational results
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400">
                    <Clock className="w-3.5 h-3.5 text-zinc-500" aria-hidden="true" />
                    <span>~{readMinutes} min read</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {chapters.map((chapter, chapterIdx) => (
                    <article
                      key={chapterIdx}
                      className="p-6 sm:p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-4 hover:border-zinc-700/60 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-800/60">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-xs font-mono font-medium text-indigo-400">
                            CHAPTER 0{chapterIdx + 1}
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                            {chapter.title}
                          </h3>
                        </div>
                      </div>

                      <div className="space-y-4 pt-1">{renderChapterBlocks(chapter.blocks)}</div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })()}

        {/* Chronological Traversal: Previous & Next Case Study */}
        <nav
          aria-label="Case study navigation"
          className="pt-12 border-t border-zinc-900 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2">
                <ArrowLeft
                  className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform"
                  aria-hidden="true"
                />
                <span>Previous Case Study</span>
              </div>
              <div className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {prevProject.title}
              </div>
              <div className="text-xs text-zinc-500 font-mono uppercase mt-1">
                {prevProject.category}
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-zinc-900/10 border border-zinc-900/50 flex flex-col justify-center text-zinc-600 text-xs font-mono">
              <span>First Case Study in Sequence</span>
            </div>
          )}

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all flex flex-col justify-between text-right sm:items-end focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            >
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-2 justify-end">
                <span>Next Case Study</span>
                <ArrowRight
                  className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </div>
              <div className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {nextProject.title}
              </div>
              <div className="text-xs text-zinc-500 font-mono uppercase mt-1">
                {nextProject.category}
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-zinc-900/10 border border-zinc-900/50 flex flex-col justify-center items-end text-zinc-600 text-xs font-mono text-right">
              <span>Latest Case Study in Sequence</span>
            </div>
          )}
        </nav>

        {/* Related Projects */}
        {related.length > 0 && (
          <section
            aria-labelledby="related-heading"
            className="pt-8 border-t border-zinc-900 space-y-6"
          >
            <h2 id="related-heading" className="text-xl font-bold tracking-tight text-white">
              Related Projects
            </h2>
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
                    <span
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
