"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Fallback if clipboard API is unavailable
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Link copied to clipboard" : "Copy case study link"}
      className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-lg border border-zinc-800 bg-zinc-900/60 hover:bg-zinc-800/80 hover:border-zinc-700 text-xs font-mono text-zinc-400 hover:text-zinc-200 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
          <span className="text-emerald-400 font-medium">Copied</span>
        </>
      ) : (
        <>
          <Link2 className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
          <span>Copy link</span>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </button>
  );
}
