import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlindVibe",
  description: "Group-based blind dating with vibe-matched crews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="sticky top-0 z-50 w-full backdrop-blur bg-white/60 dark:bg-black/40 border-b border-black/10 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
            <a href="/" className="font-semibold tracking-tight">
              BlindVibe
            </a>
            <div className="flex items-center gap-4 text-sm">
              <a className="hover:opacity-80 transition" href="/questionnaire">
                Questionnaire
              </a>
              <a className="hover:opacity-80 transition" href="/results">
                Results
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
