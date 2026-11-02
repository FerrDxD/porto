---
name: The Kinematic Engineering Lab
description: Precision hardware test bench & interactive laboratory for senior full-stack engineering
colors:
  background: "#09090b"
  panel: "#121215"
  card: "#18181b"
  border: "#27272a"
  foreground: "#fafafa"
  muted-foreground: "#a1a1aa"
  accent-indigo: "#6366f1"
  accent-indigo-hover: "#818cf8"
  telemetry-emerald: "#10b981"
  telemetry-emerald-dim: "rgba(16,185,129,0.15)"
typography:
  display:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.05em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "9rem"
components:
  button-primary:
    backgroundColor: "{colors.accent-indigo}"
    textColor: "#ffffff"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    padding: "12px 24px"
---

## Overview

The Kinematic Engineering Lab visual identity treats every software project as an active, living engineering specimen inside a precision laboratory rather than a passive screenshot thumbnail. Designed for senior technical leads and hiring managers, it communicates dual mastery: rigorous production engineering discipline and high-craft kinetic interactivity.

## Colors

- **Background & Ground:** Obsidian dark ground (`#09090b`) calibrated for focused evaluation under dark ambient light.
- **Panels & Modules:** Anodized surfaces (`#121215`, `#18181b`) bounded by precision hairline borders (`#27272a`).
- **Signal Accents:**
  - Electric Indigo (`#6366f1` / `#818cf8`): Primary action channels, focused states, and key architectural highlights.
  - Telemetric Emerald (`#10b981`): Live operational telemetry, passing test indicators, and verified system status.
- **Text & Contrast:** Primary text near-white (`#fafafa`) ensuring ≥12:1 contrast against dark obsidian. Secondary text tinted zinc (`#a1a1aa`, ≥4.5:1 WCAG AA).

## Typography

- **Display & Headings:** Inter with heavy black weights (800/900), tight tracking (`-0.03em` to `-0.04em`), and balanced line breaks (`text-wrap: balance`).
- **Body:** Inter regular/medium with measure constrained between 60–75 characters for optimal cognitive readability.
- **Data & Telemetry:** Monospace (`JetBrains Mono` / system monospace) reserved exclusively for data, code, metrics, latency measurements, and system coordinates with proportional `tabular-nums`.

## Layout

- **Dual-Plane Terminal Hero:** Left column anchors high-impact command narrative; right column houses the interactive Kinematic Specimen Engine.
- **Asymmetric Specimen Matrix:** Clean, structured cards highlighting problem statements, system architectures, verified outcomes, and source repositories.
- **Generous Vertical Pacing:** `space-y-36` between major sections to let each technical discipline command individual attention.

## Elevation & Depth

- Depth is achieved via real surface hierarchy (base obsidian `#09090b` → panel `#121215` → interactive key `#18181b`) and soft ambient shadows (`shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]`).
- Zero-blur colored halos and harsh offset shadows are prohibited.

## Shapes

- Cohesive radius hierarchy: micro-controls (`rounded-md` 6–8px), module cards (`rounded-xl` to `rounded-2xl` 12–16px), and outer command terminals (`rounded-3xl` 24px).
- Hairline borders (`border border-zinc-800/80`) reinforce physical hardware chassis feel.

## Components

- **Kinematic Specimen Engine:** Interactive multi-channel console test-bench with tactile channel selector, pipeline step sequencer, live latency counters, and direct case study drill-downs.
- **Kinematic Specimen Matrix:** Grid of full-stack engineering records featuring problem breakdowns, tech stacks, and direct GitHub/demo links.
- **Tactile Keypad:** Step sequencer buttons that illuminate and inspect pipeline phases upon click.
- **Console Navigation:** Sticky header with live system status indicator and direct keyboard-accessible route links.

## Do's and Don'ts

- **DO** use `tabular-nums` and monospace for latency, metrics, and numerical telemetry.
- **DO** provide clear focus rings (`focus-visible:ring-2 focus-visible:ring-indigo-400`) on all interactive controls.
- **DO** respect `prefers-reduced-motion` across all motion and timing components.
- **DON'T** use kickers or eyebrows (`// Eyebrow`) above headings; headings carry their own authority.
- **DON'T** use gradient text; emphasis comes from font weight, size, and whitespace.
- **DON'T** use monospace as a costume on general prose; reserve it strictly for data and code.
- **DON'T** use generic 3-column card templates with identical icons and generic blur cards.
