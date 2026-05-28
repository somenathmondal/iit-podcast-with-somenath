import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iit-podcast.vercel.app"),
  title: {
    default: "IIT Podcast with Somenath — Insights & Untold Alumni Stories",
    template: "%s | IIT Podcast with Somenath"
  },
  description: "Deconstructing life before the JEE, Kota coachings, hostel fests, fiver-point struggles, campus placement diaries, and high-impact paths following graduation.",
  keywords: ["IIT Podcast", "IIT Kharagpur", "JEE Advanced preparation", "IIT placements", "Somenath Mondal", "IIT alumni stories", "IIT Director Special", "IIT Admissions", "Consulting Prep", "Software Engineering placements"],
  authors: [{ name: "Somenath Mondal" }],
  openGraph: {
    title: "IIT Podcast with Somenath — Insights & Untold Alumni Stories",
    description: "Deconstructing life before the JEE, Kota coachings, hostel fests, campus placement diaries, and high-impact paths following graduation.",
    url: "https://iit-podcast.vercel.app",
    siteName: "IIT Podcast with Somenath",
    images: [
      {
        url: "/IIT_Podcast_Thumbnail_3K.jpg",
        width: 1200,
        height: 630,
        alt: "IIT Podcast with Somenath Banner"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IIT Podcast with Somenath",
    description: "Untold stories, survival blueprints, and high-leverage career paths of IIT alumni.",
    images: ["/IIT_Podcast_Thumbnail_3K.jpg"],
  }
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
