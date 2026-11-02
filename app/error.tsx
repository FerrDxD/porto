"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { captureError } from "@/lib/observability";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureError(error, { route: "app-error", digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="space-y-6 max-w-md">
        <div className="font-mono text-xs tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full inline-block">
          ERR_500 // ANOMALY_DETECTED
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          System Interrupted
        </h1>
        <p className="text-sm text-zinc-400 leading-relaxed">
          An unexpected anomaly occurred while rendering this view.
        </p>
        <div>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    </div>
  );
}
