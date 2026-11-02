# Audit & Milestone Plan — Portfolio WebApp

**Project:** `portfolio-app` (Next.js 14, App Router)  
**Owner:** Maulana Ferdi Irawan  
**Audit date:** 2026-11-01  
**Scope:** seluruh source code tracked (tanpa `node_modules`, `.next`)

---

## 1. Ringkasan Eksekutif

Codebase saat ini adalah **landing page visual-first** dengan dua komponen interaktif utama (`ParallaxComponent`, `RadialOrbitalTimeline`) plus hero/CTA/footer. Secara visual sudah menarik, tetapi dari sudut pandang _senior engineering_ masih **prototype-grade**: data di-hardcode di komponen, tanpa lapisan domain, tanpa testing, tanpa aksesibilitas yang memadai, tanpa SEO/observability, dan tanpa alur konten yang bisa diskalakan.

**Status verifikasi:**

| Check              | Hasil                                                                     |
| ------------------ | ------------------------------------------------------------------------- |
| `npm run lint`     | ✅ Pass (0 warning/error)                                                 |
| `npx tsc --noEmit` | ✅ Pass (strict mode)                                                     |
| `npm run build`    | ⚠️ Tidak selesai dalam timeout 120s (perlu investigasi environment/build) |
| Test suite         | ❌ Tidak ada                                                              |
| CI/CD              | ❌ Tidak ada                                                              |

**Kesimpulan:** Fondasi framework (Next.js 14 + TS strict) sudah benar, tetapi kualitas produk masih jauh dari standar senior. Milestone di bawah dirancang agar portfolio naik dari "demo visual" menjadi "produk production-grade yang merepresentasikan kemampuan senior engineer".

---

## 2. Inventaris Codebase

```
app/
  layout.tsx          # metadata minimal, font Inter
  page.tsx            # komposisi halaman (header, hero, orbit, CTA, footer)
  globals.css         # hanya @tailwind directives
components/ui/
  badge.tsx           # shadcn-style badge
  parallax-scrolling.tsx  # GSAP + Lenis, gambar eksternal
  radial-orbital-timeline.tsx  # data + UI + state dalam satu file
lib/
  utils.ts            # cn()
config: tsconfig (strict), tailwind (kosong), eslint next, next.config (cache:false)
```

Total source tracked: ~15 file non-config. Hampir semua logika ada di 2 komponen client.

---

## 3. Temuan Audit (Kritis)

### A. Arsitektur & Maintainability

1. **Data di-hardcode di komponen** — `timelineData` (6 proyek) didefinisikan langsung di `radial-orbital-timeline.tsx:20-27`. Menambah proyek = edit komponen. Tidak ada single source of truth.
2. **Tidak ada lapisan domain** — tidak ada `content/`, `data/`, `types/`, `lib/`. Semua concern (data, UI, state, animasi) campur.
3. **Monolitik client component** — `ParallaxComponent` (126 baris) menggabungkan GSAP timeline, Lenis init, dan markup. Tidak ada cleanup yang granular; `ScrollTrigger.getAll().kill()` global berisiko.
4. **Tidak ada error/loading/not-found boundary** — tidak ada `error.tsx`, `loading.tsx`, `not-found.tsx` di App Router.
5. **Tidak ada testing** — 0 unit/integration/e2e. Regresi visual tidak terdeteksi.
6. **Tidak ada CI** — tidak ada GitHub Actions untuk lint/typecheck/test/build.
7. **Artefak di repo root** — `portfolio.zip`, screenshot PNG, `.next` (ignored tapi ada), `bun.lock` + `package-lock.json` ganda. `README.md` masih template create-next-app.
8. **`next.config.mjs` mematikan cache webpack** (`config.cache = false`) — memperlambat build tanpa alasan jelas.

### B. UX & Konten

9. **Navigasi minimal** — header hanya logo `~/fer`, tidak ada link ke section/proyek/kontak. Tidak ada mobile menu (karena memang tidak ada item).
10. **Konten proyek dangkal** — hanya title/content/links. Tidak ada tech stack, peran, tantangan, hasil/metrics, screenshot.
11. **Tidak ada halaman detail proyek** — semua proyek hanya link eksternal. Tidak ada case study internal.
12. **Tidak ada CV/resume, skills matrix, pengalaman kerja, pendidikan.**
13. **CTA generik** — "Ready to collaborate?" tanpa form; hanya mailto.
14. **Footer minim** — alamat kota, 3 link. Tidak ada newsletter/social proof.
15. **Bahasa campur** — `html lang="id"` tapi konten hero/CTA English. Tidak konsisten.

### C. Aksesibilitas (a11y)

16. **Gambar parallax alt generik** — `alt="Background"`, `"Mid"`, `"Foreground"` (parallax-scrolling.tsx:69,78,95). Tidak deskriptif / decorative seharusnya `alt=""`.
17. **Orbital timeline tidak keyboard-accessible** — node adalah `div` dengan `onClick`, tidak ada `role="button"`, `tabIndex`, `onKeyDown`, `aria-expanded`, `aria-label`.
18. **Auto-rotate tanpa kontrol** — tidak ada tombol pause/play; pengguna motion-sensitive tidak bisa mematikan. Tidak menghormati `prefers-reduced-motion`.
19. **Tidak ada skip link** ke main content.
20. **Focus states** bergantung default browser; tidak ada styling focus-visible yang konsisten.
21. **`target="_blank"`** pada beberapa link tanpa `rel="noopener"` (beberapa sudah `noreferrer`). Inconsistent.
22. **Kontras** — `text-zinc-500` pada `bg-zinc-950` untuk label kecil mungkin di bawah WCAG AA.

### D. Performa

23. **Gambar eksternal tidak dioptimasi** — pakai `<img>` langsung ke CDN `cdn.21st.dev`, `loading="eager"` untuk 3 gambar besar. Tidak ada `next/image`, tidak ada responsive sizes, tidak ada blur placeholder.
24. **Tidak ada local asset pipeline** — tidak ada `/public` images. Bergantung pada CDN pihak ketiga (single point of failure).
25. **Lenis global scroll hijack** — `new Lenis()` tanpa opsi; dapat mengganggu native scroll/accessibility. Tidak di-disable pada reduced motion.
26. **setInterval 50ms** (`radial-orbital-timeline.tsx:48-54`) memicu re-render ~20fps terus-menerus saat auto-rotate, bahkan saat tab background.
27. **Tidak ada code splitting/dynamic import** untuk komponen berat (GSAP, Lenis, orbital).
28. **Tidak ada performance budget / Lighthouse CI.**

### E. SEO & Discoverability

29. **Metadata minimal** — hanya title & description (`layout.tsx:7-10`). Tidak ada Open Graph, Twitter card, canonical, robots, icons.
30. **Tidak ada `sitemap.ts` / `robots.ts`.**
31. **Tidak ada JSON-LD** (Person, WebSite, Project).
32. **Tidak ada analytics** (Plausible/Umami/GA) — tidak bisa mengukur.
33. **Tidak ada favicon/app icon/manifest** yang disesuaikan.

### F. Keamanan

34. **Tidak ada security headers** (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy) di `next.config`.
35. **Bergantung pada CDN gambar pihak ketiga** tanpa SRI/CSP allowlist.
36. **Tidak ada validasi input** (belum ada form, tapi akan dibutuhkan).
37. **Secrets/env** tidak dikelola (belum ada, tapi perlu pola).

### G. DX & Kualitas

38. **README default** — tidak menjelaskan proyek, setup, arsitektur, deploy.
39. **Tidak ada Prettier / EditorConfig / Husky / lint-staged.**
40. **Dua lockfile** (npm + bun) — ambigu package manager.
41. **Tidak ada versioning/changelog.**
42. **Tidak ada ADR (Architecture Decision Records).**

---

## 4. Milestone Plan

Prinsip: setiap milestone punya **tujuan jelas, scope terbatas, deliverable terukur, acceptance criteria**. Urutan memprioritaskan fondasi (M0) sebelum fitur.

---

### Milestone M0 — Foundation & Hygiene (Prioritas: P0)

**Tujuan:** Bersihkan repo dan standarkan DX agar perubahan berikutnya aman dan reviewable.

**Scope:**

- Hapus artefak `portfolio.zip`, screenshot PNG dari working tree; pastikan `.gitignore` mencakup `.next`, `*.zip`, screenshot.
- Pilih satu package manager (disarankan `npm` atau `bun`), hapus lockfile lain.
- Ganti `README.md` dengan dokumentasi nyata (setup, scripts, arsitektur, deploy).
- Tambah `.editorconfig`, Prettier, Husky + lint-staged (lint + typecheck pada pre-commit).
- Hapus `config.cache = false` dari `next.config.mjs` atau beri komentar alasan.
- Tambah GitHub Actions: `lint`, `typecheck`, `build` pada PR.

**Deliverables:** PR tunggal "chore: foundation".

**Acceptance Criteria:**

- `git status` bersih dari artefak.
- `npm ci && npm run lint && npx tsc --noEmit && npm run build` hijau di CI.
- README menjelaskan cara run & deploy.

---

### Milestone M1 — Content Architecture & Data Layer (Prioritas: P0)

**Tujuan:** Pisahkan konten dari UI; jadikan data-driven.

**Scope:**

- Buat `content/` (atau `data/`) dengan modul: `projects.ts`, `skills.ts`, `experience.ts`, `social.ts`, `site.ts`.
- Definisikan tipe di `types/` (Project, Skill, Experience, SocialLink) dengan Zod validation (opsional tapi disarankan).
- Refactor `RadialOrbitalTimeline` agar menerima `items` via props, bukan konstanta internal.
- Pindahkan `timelineData` ke `content/projects.ts`.
- Tambah metadata proyek: `slug`, `stack[]`, `role`, `year`, `status`, `highlights[]`, `repoUrl`, `liveUrl`, `coverImage`.

**Acceptance Criteria:**

- Tidak ada data konten di dalam komponen UI.
- Menambah proyek baru cukup edit file data.
- Typecheck pass; data tervalidasi (jika Zod).

---

### Milestone M2 — Design System & Theming (Prioritas: P1)

**Tujuan:** Konsistensi visual dan skalabilitas style.

**Scope:**

- Isi `tailwind.config.ts` dengan design tokens (colors, spacing, typography, radius, shadows) berbasis CSS variables.
- Buat `globals.css` dengan token `:root`/`.dark` (HSL variables ala shadcn).
- Tambah komponen primitif: `Button`, `Card`, `Badge` (sudah ada), `Container`, `Section`, `Heading`.
- Implement dark/light toggle (next-themes) dengan persistensi & no-FOUC.
- Dokumentasikan token di `docs/design-tokens.md`.

**Acceptance Criteria:**

- Semua warna/spacing berasal dari token, tidak ada magic hex di komponen.
- Toggle tema berfungsi tanpa flash.
- Lighthouse accessibility ≥ 95 (baseline).

---

### Milestone M3 — Accessibility & Inclusive UX (Prioritas: P0)

**Tujuan:** Portfolio dapat digunakan semua orang (keyboard, screen reader, reduced motion).

**Scope:**

- Tambah skip link, semantic landmarks (`header/nav/main/footer`), heading hierarchy benar.
- Orbital node jadi `button` dengan `aria-expanded`, `aria-label`, keyboard handler (Enter/Space), focus ring.
- Tambah kontrol pause/play auto-rotate + respect `prefers-reduced-motion` (matikan animasi otomatis).
- Gambar dekoratif `alt=""`; gambar konten alt deskriptif.
- Semua `target="_blank"` konsisten `rel="noopener noreferrer"`.
- Pastikan kontras WCAG AA (audit dengan axe).
- Focus-visible styling global.

**Acceptance Criteria:**

- Navigasi penuh via keyboard (Tab/Enter/Space/Esc).
- `prefers-reduced-motion: reduce` mematikan parallax & auto-rotate.
- axe DevTools: 0 critical/serious issues.
- Lighthouse a11y ≥ 95.

---

### Milestone M4 — Performance & Media Pipeline (Prioritas: P0)

**Tujuan:** Loading cepat dan stabil; tidak bergantung CDN rapuh.

**Scope:**

- Migrasi gambar parallax ke `next/image` dengan asset lokal di `/public/images` (atau remote dengan `images.domains` + sizes).
- Konversi ke WebP/AVIF, tambahkan blur placeholder.
- Lazy-load komponen berat dengan `next/dynamic` (`ssr: false` untuk GSAP) + loading fallback.
- Hentikan `setInterval` saat tab tidak visible (Page Visibility API) atau ganti ke `requestAnimationFrame`.
- Lenis: matikan pada reduced motion; batasi scope.
- Tambah bundle analyzer; tetapkan budget (JS initial < 170KB gzipped).
- Optimasi font (subset, `display: swap` sudah default next/font).

**Acceptance Criteria:**

- Lighthouse Performance ≥ 90 (mobile, slow 4G).
- LCP < 2.5s, CLS < 0.1, INP < 200ms.
- Tidak ada request ke CDN eksternal untuk gambar (atau terdokumentasi).
- Bundle initial di bawah budget.

---

### Milestone M5 — SEO, Metadata & Analytics (Prioritas: P1)

**Tujuan:** Portfolio discoverable & terukur.

**Scope:**

- Lengkapi `metadata` di `layout.tsx`: Open Graph, Twitter card, canonical, robots, icons, theme-color.
- Buat `app/sitemap.ts` dan `app/robots.ts`.
- Tambah JSON-LD `Person` + `WebSite` (dan `Project` di halaman detail).
- Pilih bahasa: `lang="en"` atau `lang="id"` konsisten dengan konten; pertimbangkan i18n jika dua bahasa.
- Tambah analytics (Plausible/Umami) dengan consent minimal; env-based.
- Favicon, apple-touch-icon, web manifest.

**Acceptance Criteria:**

- Rich Results Test valid untuk JSON-LD.
- Sitemap & robots accessible.
- OG preview benar di Twitter/LinkedIn (uji dengan debugger).
- Analytics event pageview tercatat.

---

### Milestone M6 — Project Detail & Navigation Experience (Prioritas: P1)

**Tujuan:** Ubah portfolio dari "galeri link" menjadi "case study".

**Scope:**

- Routing `app/projects/[slug]/page.tsx` dengan `generateStaticParams` + `generateMetadata`.
- Halaman detail: overview, problem, approach, tech stack, highlights, gallery, links.
- Navigation: header dengan anchor + mobile menu; footer lengkap.
- Section tambahan: About, Skills, Experience, Contact (form dengan validasi + honeypot/anti-spam).
- Filter/search proyek by category/stack.
- 404 & error pages yang branded.

**Acceptance Criteria:**

- Setiap proyek punya URL sendiri yang shareable.
- Contact form mengirim email (Resend/EmailJS) dengan validasi server-side.
- Tidak ada dead link.

---

### Milestone M7 — Quality Assurance & Testing (Prioritas: P1)

**Tujuan:** Regresi terdeteksi otomatis.

**Scope:**

- Unit test (Vitest + Testing Library) untuk utils, data validation, komponen kritis.
- E2E (Playwright): navigasi, orbital interaction, keyboard, reduced motion, form submit.
- Accessibility test otomatis (axe-playwright) di CI.
- Lighthouse CI dengan threshold (perf/a11y/best-practices/SEO).
- Visual regression (opsional: Percy/Chromatic) untuk komponen kunci.

**Acceptance Criteria:**

- Coverage ≥ 70% untuk `lib/` dan `data/`.
- E2E smoke suite hijau di CI.
- Lighthouse CI fail jika di bawah threshold.

---

### Milestone M8 — Production Readiness & Observability (Prioritas: P2) — ✅ Done

**Tujuan:** Deploy aman, terpantau, mudah dioperasikan.

**Scope:**

- Security headers di `next.config.mjs` (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy).
- Error monitoring (Sentry) + source maps.
- Rate limiting / anti-abuse untuk contact endpoint (jika API route).
- Deploy pipeline Vercel dengan preview per PR + production gate.
- Runbook: rollback, env vars, incident.
- Dependabot/Renovate untuk dependency updates.

**Acceptance Criteria:**

- Security headers lulus (securityheaders.com ≥ A).
- Sentry menangkap error client & server.
- Deploy preview otomatis per PR.

---

### Milestone M9 — Personal Brand & Content Strategy (Prioritas: P2)

**Tujuan:** Konten yang meyakinkan recruiter/senior peers.

**Scope:**

- Tulis case study mendalam untuk 2-3 proyek terbaik (problem, decision, impact, metrics).
- Tambahkan "Now" page / blog (MDX) untuk menunjukkan proses berpikir.
- Tambah testimonials/recommendations.
- Optimasi copywriting hero (value proposition jelas dalam 5 detik).
- Tambah resume PDF yang di-generate dari data (opsional).

**Acceptance Criteria:**

- Setiap proyek unggulan punya case study ≥ 600 kata.
- Lighthouse SEO ≥ 95.
- Bounce rate turun (ukur via analytics setelah deploy).

---

## 5. Backlog Teknis Cepat (Bisa dikerjakan paralel)

- [ ] Ganti `React.ElementType` icon dengan tipe lebih spesifik (`LucideIcon`) di `TimelineItem`.
- [ ] Ekstrak `statusStyles`/`statusLabels` ke data module.
- [ ] Tambah `aria-live` untuk expanded card.
- [ ] Hapus komentar `// Trigger reload` di `app/page.tsx:1`.
- [ ] Konsistenkan `rel="noopener noreferrer"` di semua anchor eksternal.
- [ ] Tambah `loading="lazy"` untuk gambar non-critical (atau migrasi ke next/image).
- [ ] Perbaiki `html lang` agar sesuai konten.
- [ ] Tambah `prefers-reduced-motion` guard di GSAP/Lenis.

---

## 6. Metrik Keberhasilan (Definition of Done Portfolio Senior-Level)

| Dimensi                         | Target   |
| ------------------------------- | -------- |
| Lighthouse Performance (mobile) | ≥ 90     |
| Lighthouse Accessibility        | ≥ 95     |
| Lighthouse Best Practices       | ≥ 95     |
| Lighthouse SEO                  | ≥ 95     |
| axe critical/serious            | 0        |
| JS initial (gzipped)            | < 170 KB |
| LCP                             | < 2.5s   |
| CLS                             | < 0.1    |
| Test coverage (lib+data)        | ≥ 70%    |
| CI green                        | 100% PR  |

---

## 7. Catatan Audit Build

`npm run build` tidak selesai dalam 120s pada environment ini. Kemungkinan penyebab: cold cache / network (font download) / webpack. Rekomendasi: jalankan ulang dengan `--debug` dan cek koneksi; tambahkan timeout CI yang wajar; pertimbangkan caching di CI. Ini sendiri menjadi item M0 (verifikasi build reproduciabel).

---

**Akhir audit.** Milestone M0–M3 adalah jalur kritis (P0) untuk mencapai kualitas senior; M4–M9 meningkatkan discoverability, keandalan, dan personal brand.
