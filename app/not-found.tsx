import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="font-mono text-sm tracking-widest text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full inline-block">
          ERR_404 // NOT_FOUND
        </div>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">Signal Lost</h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          The requested coordinate does not exist in this orbit. It might have drifted or been
          relocated.
        </p>
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Orbit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
