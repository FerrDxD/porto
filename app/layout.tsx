import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Maulana Ferdi Irawan | Frontend Developer',
  description: 'Frontend Developer & UI Designer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30`}>
        {children}
      </body>
    </html>
  );
}
