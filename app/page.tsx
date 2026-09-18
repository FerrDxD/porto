// Trigger reload

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { ParallaxComponent } from "@/components/ui/parallax-scrolling";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center">

      {/* Sticky Header */}
      <header className="w-full sticky top-0 z-50 flex justify-center bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
        <nav className="w-full max-w-5xl flex items-center px-6 py-4 md:py-5">
          <div className="font-mono text-sm tracking-wider font-bold">
            <span className="text-indigo-400">~/</span>fer
          </div>
        </nav>
      </header>

      {/* Hero Parallax */}
      <section className="w-full">
        <ParallaxComponent />
      </section>

      <main className="w-full max-w-5xl px-6 py-20 space-y-32 overflow-x-hidden">
        {/* Orbital Timeline */}
        <section id="orbit" className="space-y-10 lg:space-y-0 lg:flex lg:flex-row lg:items-center lg:gap-20">
          <div className="lg:w-1/3 space-y-0">
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight">Project</h2>
            <p className="text-zinc-400 mt-2 lg:text-lg">All projects, orbiting together. Click a node to explore.</p>
          </div>
          <div className="lg:w-2/3 w-full">
            <RadialOrbitalTimeline />
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 md:py-24 flex flex-col items-center justify-center text-center space-y-8 overflow-hidden rounded-3xl bg-zinc-900/30 border border-zinc-800/50">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
          
          <div className="space-y-4 relative z-10 px-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Ready to collaborate?</h2>
            <p className="text-zinc-400 md:text-lg max-w-xl mx-auto leading-relaxed">
              I&apos;m always open to discussing product design work or partnership opportunities. Let&apos;s build something impactful together.
            </p>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
            <a 
              href="mailto:maulanaferdi0678@gmail.com"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-indigo-500 text-white font-medium hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 active:scale-95"
            >
              Get in Touch
            </a>
            <a 
              href="https://github.com/FerrDxD" 
              target="_blank"
              className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-zinc-800/80 text-zinc-300 font-medium hover:bg-zinc-700 transition-all border border-zinc-700 hover:text-white hover:-translate-y-0.5 active:scale-95"
            >
              View GitHub
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-900 py-12 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-zinc-500">
          <p>Based in Jonggol, Indonesia.</p>
          <div className="flex gap-6 font-medium">
            <a href="https://github.com/FerrDxD" target="_blank" className="hover:text-zinc-200 transition-colors">GitHub</a>
            <a href="https://instagram.com/ferr.decode" target="_blank" className="hover:text-zinc-200 transition-colors">Instagram</a>
            <a href="mailto:maulanaferdi0678@gmail.com" className="hover:text-zinc-200 transition-colors">Email</a>
          </div>
        </footer>

      </main>
    </div>
  );
}
