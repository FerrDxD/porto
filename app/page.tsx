import dynamic from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { ProjectsExplorer } from "@/components/projects-explorer";
import { ContactForm } from "@/components/contact-form";
import { skills } from "@/content/skills";
import { experience } from "@/content/experience";
import { socialLinks } from "@/content/social";
import { Briefcase, Wrench, CheckCircle2 } from "lucide-react";

const RadialOrbitalTimeline = dynamic(
  () => import("@/components/ui/radial-orbital-timeline").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[600px] flex items-center justify-center text-zinc-500 font-mono text-sm">
        Initializing orbital system...
      </div>
    ),
  },
);

const ParallaxComponent = dynamic(
  () => import("@/components/ui/parallax-scrolling").then((mod) => mod.ParallaxComponent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen flex items-center justify-center text-zinc-500 font-mono text-sm">
        Calibrating view...
      </div>
    ),
  },
);

export default function Home() {
  const skillCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center">
      {/* Sticky Top Navigation */}
      <Navigation />

      {/* Hero Parallax with About Anchor */}
      <section className="w-full" aria-label="Hero section">
        <ParallaxComponent />
      </section>

      <main id="main-content" className="w-full max-w-5xl px-6 py-20 space-y-36 overflow-x-hidden">
        {/* Orbital Timeline & Case Studies */}
        <section id="projects" className="space-y-16">
          <div className="space-y-10 lg:space-y-0 lg:flex lg:flex-row lg:items-center lg:gap-20">
            <div className="lg:w-1/3 space-y-3">
              <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
                {"// System Orbit"}
              </div>
              <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-white">Projects</h2>
              <p className="text-zinc-400 text-sm lg:text-base leading-relaxed">
                Interconnected digital products and open-source applications orbiting in real-time.
                Select any node to launch its case study.
              </p>
            </div>
            <div className="lg:w-2/3 w-full">
              <RadialOrbitalTimeline />
            </div>
          </div>

          {/* Searchable and Filterable Projects Catalog */}
          <div className="pt-10 border-t border-zinc-900/80 space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl font-bold tracking-tight text-white">
                All Case Studies & Repositories
              </h3>
              <p className="text-xs text-zinc-400 font-mono">
                Explore by category or filter by technology stack.
              </p>
            </div>
            <ProjectsExplorer />
          </div>
        </section>

        {/* Technical Skills Section */}
        <section id="skills" className="space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-indigo-400">
              <Wrench className="w-4 h-4" />
              <span>{"// Technical Competencies"}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Skills & Architecture
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Languages, frameworks, and engineering tools leveraged for production applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat}
                className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-4"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold border-b border-zinc-800/50 pb-2">
                  {cat}
                </div>
                <div className="space-y-2.5">
                  {skills
                    .filter((s) => s.category === cat)
                    .map((s) => (
                      <div key={s.id} className="flex justify-between items-center text-xs">
                        <span className="font-medium text-zinc-200">{s.name}</span>
                        <span className="font-mono text-zinc-500 capitalize">{s.level}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="space-y-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-indigo-400">
              <Briefcase className="w-4 h-4" />
              <span>{"// Professional Timeline"}</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Work Experience
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Roles and client engagements delivering resilient web software.
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="p-8 rounded-2xl bg-zinc-900/30 border border-zinc-800/60 space-y-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm text-indigo-400 font-medium">{exp.company}</div>
                  </div>
                  <div className="font-mono text-xs text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800 w-fit">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-800/40">
                    <div className="text-xs font-mono uppercase text-zinc-500">Key Outcomes</div>
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      {exp.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-zinc-400 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative py-16 px-6 sm:px-12 rounded-3xl bg-zinc-900/30 border border-zinc-800/50 space-y-10 overflow-hidden text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />

          <div className="space-y-3 relative z-10 max-w-xl mx-auto">
            <div className="font-mono text-xs uppercase tracking-widest text-indigo-400">
              {"// Open Channels"}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Ready to collaborate?
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Have a product vision, architectural challenge, or engineering opportunity? Transmit a
              message directly below.
            </p>
          </div>

          {/* Integrated Interactive Form */}
          <div className="relative z-10 pt-2">
            <ContactForm />
          </div>

          <div className="relative z-10 pt-6 border-t border-zinc-800/50 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-400">
            <span>Direct dispatch:</span>
            <a
              href="mailto:maulanaferdi0678@gmail.com"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4"
            >
              maulanaferdi0678@gmail.com
            </a>
          </div>
        </section>

        {/* Complete Footer */}
        <footer className="border-t border-zinc-900 pt-12 pb-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-zinc-500">
          <div>
            <p>© {new Date().getFullYear()} Maulana Ferdi Irawan. Based in Jonggol, Indonesia.</p>
          </div>
          <div className="flex gap-6 font-mono">
            {socialLinks.map((s) => (
              <a
                key={s.id}
                href={s.url}
                target={s.url.startsWith("http") ? "_blank" : undefined}
                rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined}
                className="hover:text-zinc-200 transition-colors"
              >
                {s.platform}
              </a>
            ))}
            <a
              href="https://instagram.com/ferr.decode"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-200 transition-colors"
            >
              Instagram
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}
