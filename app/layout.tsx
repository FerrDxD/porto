import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.ferdi.dev"),
  title: {
    default: "Maulana Ferdi Irawan | Full-Stack Developer & UI Designer",
    template: "%s | ~/fer",
  },
  description:
    "Full-Stack Developer & UI Designer building modern web apps with Next.js, TypeScript, and GSAP.",
  keywords: ["Full-Stack Developer", "UI Designer", "Next.js", "TypeScript", "React", "Indonesia"],
  authors: [{ name: "Maulana Ferdi Irawan", url: "https://portfolio.ferdi.dev" }],
  creator: "Maulana Ferdi Irawan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio.ferdi.dev",
    siteName: "~/fer",
    title: "Maulana Ferdi Irawan | Full-Stack Developer & UI Designer",
    description:
      "Full-Stack Developer & UI Designer building modern web apps with Next.js, TypeScript, and GSAP.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Maulana Ferdi Irawan — Full-Stack Developer & UI Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maulana Ferdi Irawan | Full-Stack Developer & UI Designer",
    description:
      "Full-Stack Developer & UI Designer building modern web apps with Next.js, TypeScript, and GSAP.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  themeColor: "#09090b",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://portfolio.ferdi.dev/#person",
      name: "Maulana Ferdi Irawan",
      url: "https://portfolio.ferdi.dev",
      email: "kaptengaming67@gmail.com",
      jobTitle: "Full-Stack Developer & UI Designer",
      address: { "@type": "PostalAddress", addressCountry: "ID" },
      sameAs: ["https://github.com/FerrDxD", "https://instagram.com/ferr.decode"],
    },
    {
      "@type": "WebSite",
      "@id": "https://portfolio.ferdi.dev/#website",
      url: "https://portfolio.ferdi.dev",
      name: "~/fer",
      description: "Portfolio of Maulana Ferdi Irawan",
      author: { "@id": "https://portfolio.ferdi.dev/#person" },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-500 focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Skip to main content
        </a>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <script
            defer
            src={process.env.NEXT_PUBLIC_UMAMI_URL ?? "https://cloud.umami.is/script.js"}
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
        {children}
      </body>
    </html>
  );
}
