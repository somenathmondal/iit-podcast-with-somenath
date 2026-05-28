import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "IIT Podcast with Somenath — Insights & Untold Alumni Stories",
  description: "A premium 3D editorial podcast platform exploring life before, during, and beyond the Indian Institutes of Technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0F0606] text-white">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
