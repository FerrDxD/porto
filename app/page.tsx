import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { KinematicSpecimenEngine } from "@/components/kinematic-specimen-engine";
import { KinematicSpecimenMatrix } from "@/components/kinematic-specimen-matrix";
import { ContactForm } from "@/components/contact-form";
import { skills } from "@/content/skills";
import { experience } from "@/content/experience";
import { socialLinks } from "@/content/social";
import { testimonials } from "@/content/testimonials";
import { CheckCircle2, Quote, ArrowRight, ShieldCheck, Zap, Code2, Globe } from "lucide-react";

export default function Home() {
  const skillCategories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center">
      {/* Sticky Navigation */}
      <Navigation />

      <main id="main-content" className="w-full max-w-6xl px-6 py-12 sm:py-20 space-y-36">
        {/* Hero Section: The Dual-Plane Kinematic Terminal */}
        <section
          aria-label="Introduction and Live Terminal"
          className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4 lg:pt-8"
        >
          {/* Left Column: Command Narrative */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>MAULANA FERDI IRAWAN {"//"} FULL-STACK &amp; UI</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.08] text-balance">
                Senior Full-Stack Rigour. Kinetic Craft.
              </h1>

              <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl">
                I engineer production-grade digital software in Next.js, React, and
                TypeScript—bridging scalable backend and edge architecture with high-craft
                interactive interfaces.
              </p>
            </div>

            {/* Verified Architectural Badges */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Strict TypeScript</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Sub-450ms Streaming</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <Code2 className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>Test-Driven Core</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800/80">
                <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WCAG 2.1 AA Compliant</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#specimens"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-[0_10px_25px_-5px_rgba(99,102,241,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                <span>Explore Production Systems</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 font-semibold text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
              >
                <span>Initiate Contact</span>
              </a>

              <Link
                href="/now"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-indigo-400 px-3 py-2 transition-colors"
              >
                <span>/now log</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Right Column: The Kinematic Specimen Engine */}
          <div className="lg:col-span-6 w-full">
            <KinematicSpecimenEngine />
          </div>
        </section>

        {/* Specimens Section: The Kinematic Specimen Matrix */}
        <section id="specimens" className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Engineering Specimens
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Full-stack digital products, open-source repositories, and interactive prototypes
              documented with architecture diagrams, verifiable metrics, and case studies.
            </p>
          </div>

          <KinematicSpecimenMatrix />
        </section>

        {/* Skills & Architecture Section */}
        <section id="skills" className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Skills &amp; Architecture
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Technical proficiencies honed across production applications—from low-latency edge
              streaming to strict database indexing and accessible motion orchestration.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((cat) => (
              <div
                key={cat}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-4 shadow-sm"
              >
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-bold border-b border-zinc-800/60 pb-3">
                  {cat}
                </div>
                <div className="space-y-3">
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

        {/* Work Experience Section */}
        <section id="experience" className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Work Experience
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Engineering engagements delivering dependable full-stack applications with verified
              operational reliability.
            </p>
          </div>

          <div className="space-y-6">
            {experience.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 space-y-5 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    <div className="text-sm text-indigo-400 font-medium">{exp.company}</div>
                  </div>
                  <div className="font-mono text-xs text-zinc-400 bg-zinc-950 px-3 py-1 rounded-full border border-zinc-800 w-fit">
                    {exp.startDate} — {exp.endDate ?? "Present"}
                  </div>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed max-w-2xl">{exp.description}</p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2.5 pt-3 border-t border-zinc-800/60">
                    <div className="text-xs font-mono uppercase text-zinc-500">Key Outcomes</div>
                    <div className="grid sm:grid-cols-2 gap-3 pt-1">
                      {exp.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 text-xs text-zinc-300 leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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

        {/* Testimonials / Peer Endorsements Section */}
        <section id="testimonials" className="space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Collaborator Endorsements
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Feedback from project coordinators, engineering peers, and product collaborators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between space-y-6 shadow-sm"
              >
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-indigo-500/40" />
                  <p className="text-sm text-zinc-300 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-800/60">
                  <div className="text-sm font-bold text-white">{t.name}</div>
                  <div className="text-xs text-indigo-400 font-medium">{t.role}</div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">{t.organization}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative py-16 px-6 sm:px-12 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-10 text-center"
        >
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              Initiate Contact
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Have an engineering opportunity, architectural question, or ambitious product vision?
              Transmit your message directly below.
            </p>
          </div>

          {/* Integrated Interactive Form with Anti-Spam & Rate Limiting */}
          <div className="max-w-xl mx-auto">
            <ContactForm />
          </div>

          <div className="pt-6 border-t border-zinc-800/60 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
            <span>Direct dispatch fallback:</span>
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
          <div className="flex items-center gap-6 font-mono">
            <Link href="/now" className="hover:text-zinc-200 transition-colors">
              /now
            </Link>
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
