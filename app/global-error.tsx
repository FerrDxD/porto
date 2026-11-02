"use client";

import { useEffect } from "react";
import { captureError } from "@/lib/observability";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    captureError(error, { route: "global-error", digest: error.digest });
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50 flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <div className="font-mono text-xs tracking-widest text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full inline-block">
            ERR_FATAL // SYSTEM_HALTED
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">System Error</h1>
          <p className="text-sm text-zinc-400 leading-relaxed">
            A fatal exception occurred in the root application boundary.
          </p>
          <div>
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-medium text-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
