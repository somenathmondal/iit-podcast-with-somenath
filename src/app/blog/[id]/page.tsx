import React from "react";
import { Metadata } from "next";
import { blogs } from "../../../data/blogs";
import { episodes } from "../../../data/episodes";
import BlogReadingClient from "./BlogReadingClient";

interface PageParams {
  id: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// Highly optimized dynamic SEO metadata generator for search queries like "[Guest Name] IIT Podcast"
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  // 1. Resolve source
  const editorial = blogs.find((b) => b.id === id);
  const episode = episodes.find((ep) => ep.id === id);

  if (!editorial && !episode) {
    return {
      title: "Entry Not Found | IIT Podcast",
      description: "This blog or alumni journal entry could not be located in our system.",
    };
  }

  const title = editorial ? editorial.title : episode!.title;
  const description = editorial ? editorial.description : episode!.description;
  const guestName = editorial?.guestName || episode?.guestName || "IIT Podcast Editorial";
  const guestTitle = editorial?.guestTitle || episode?.guestTitle || "IIT PODCAST EDITORIAL";
  const category = editorial ? editorial.category : episode!.category;
  const tags = editorial ? editorial.tags : episode!.tags;

  const seoTitle = `${guestName} | ${title} | IIT Podcast`;
  const seoDescription = `Untold stories and survival blueprints. Deconstructing ${guestName}'s (${guestTitle}) career roadmap: "${description}" Read the full takeaways, checklist blueprints, and chronicles.`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [
      guestName,
      `${guestName} IIT Podcast`,
      `${guestName} placement`,
      `${guestName} IIT Kharagpur`,
      `${guestName} interview blueprint`,
      `${guestName} career roadmap`,
      `${category} checklist`,
      ...tags,
      "IIT Podcast",
      "Somenath Mondal",
      "Alumni Chronicle",
      "Alumni Survival Notebook",
    ],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: `https://iit-podcast.vercel.app/blog/${id}`,
      siteName: "IIT Podcast",
      tags: tags,
      images: [
        {
          url: episode?.youtubeId 
            ? `https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg` 
            : (editorial?.coverImage || "/IIT_Podcast_Thumbnail_3K.jpg"),
          width: 1200,
          height: 630,
          alt: `${guestName} Editorial Banner`,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [
        episode?.youtubeId 
          ? `https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg` 
          : (editorial?.coverImage || "/IIT_Podcast_Thumbnail_3K.jpg")
      ],
    }
  };
}

export default async function BlogReadingPage({ params }: PageProps) {
  const { id } = await params;
  
  return <BlogReadingClient id={id} />;
}
