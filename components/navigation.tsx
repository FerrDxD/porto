"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Now", href: "/now" },
  { label: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 flex justify-center bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <nav
        className="w-full max-w-5xl flex items-center justify-between px-6 py-4 md:py-5"
        aria-label="Main navigation"
      >
        <Link href="/" className="font-mono text-sm tracking-wider font-bold">
          <span className="text-indigo-400">~/</span>fer
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-zinc-400">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-indigo-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded px-1"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/FerrDxD"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950/95 border-b border-zinc-900 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 text-sm font-mono tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-indigo-400 py-1 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/FerrDxD"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-center py-2 rounded-lg bg-zinc-900 text-zinc-200 border border-zinc-800"
          >
            GitHub
          </a>
        </div>
      )}
    </header>
  );
}
