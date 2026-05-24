export interface BlogTakeaway {
  title: string;
  time: string; // MM:SS format
  seconds: number;
  text: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  episodeSub?: string; // e.g., 'a' or 'b'
  title: string;
  guestName: string;
  guestTitle: string;
  duration: string;
  category: "placement" | "academic" | "startup" | "global";
  youtubeId: string;
  spotifyUrl?: string;
  description: string;
  coverImage?: string;
  tags: string[];
  takeaways: BlogTakeaway[];
  fullStoryMarkdown: string;
  releaseDate?: string;
}

export const episodes: Episode[] = [
  {
    id: "suman-chakraborty-1",
    releaseDate: "June 2025",
    episodeNumber: 0,
    episodeSub: "a",
    title: "IIT Director's Candid Take on Grades, AI & Placements",
    guestName: "Prof. Suman Chakraborty",
    guestTitle: "Director of IIT Kharagpur (Part 1)",
    duration: "48:02",
    category: "academic",
    youtubeId: "4ivvkpPn9wk",
    spotifyUrl: "https://open.spotify.com/episode/suman-chakraborty-1",
    description: "An incredibly candid conversation with the Director of IIT Kharagpur. We tackle the harsh realities of student academic pressure, mental health struggles on campus, and the rise of AI—discussing whether it's a blessing or a curse for future engineers.",
    coverImage: "/thumbnails/Ep00-ProfSuman.png",
    tags: ["Mental Health", "IIT KGP", "AI & Tech", "Director Special"],
    takeaways: [
      { title: "The Illusion of Perfect Grades", time: "08:12", seconds: 492, text: "Academic performance is a single metric in a multi-dimensional life. A 10-pointer or a 5-pointer does not define your creative potential." },
      { title: "Mental Health Support", time: "18:45", seconds: 1125, text: "We are actively redesigning support networks. Asking for counseling is a sign of immense strength, not weakness." },
      { title: "AI as an Amplifier", time: "32:10", seconds: 1930, text: "AI will replace coders who only write basic boilerplate code. It will amplify those who understand core engineering principles." }
    ],
    fullStoryMarkdown: "Prof. Suman Chakraborty, Director of IIT Kharagpur, shares a refreshing, direct, and deeply human look into the realities of the IIT ecosystem."
  },
  {
    id: "suman-chakraborty-2",
    releaseDate: "June 2025",
    episodeNumber: 0,
    episodeSub: "b",
    title: "Addressing Research Gaps and Institutional Reforming",
    guestName: "Prof. Suman Chakraborty",
    guestTitle: "Director of IIT Kharagpur (Part 2)",
    duration: "35:15",
    category: "academic",
    youtubeId: "4ivvkpPn9wk",
    spotifyUrl: "https://open.spotify.com/episode/suman-chakraborty-2",
    description: "Part 2 of our deep dive with the Director of IIT Kharagpur, discussing the future of Indian research, breaking global loops, and systemic reforms needed to make campuses world-class.",
    coverImage: "/thumbnails/Ep00-ProfSuman2.png",
    tags: ["Research", "Higher Education", "Reform", "IIT KGP"],
    takeaways: [
      { title: "Solving Global Loop Failures", time: "05:10", seconds: 310, text: "Our local research pipelines must utilize pairwise refinement to overcome global closure constraints, replicating practical engineering successes." },
      { title: "Funding the Future", time: "15:40", seconds: 940, text: "Real research requires consistent institutional backing, reducing administrative roadblocks for young investigators." }
    ],
    fullStoryMarkdown: "In the second part of our Director Special, Prof. Suman Chakraborty tackles the institutional reform needed to foster world-class research on Indian soil."
  },
  {
    id: "arpit",
    releaseDate: "June 2025",
    episodeNumber: 1,
    title: "How did this SMALL TOWN BOY overcome his FEAR OF EXAMS to CRACK IITJEE (from Kota)?",
    guestName: "Arpit",
    guestTitle: "Core Software Systems Engineer",
    duration: "42:10",
    category: "placement",
    youtubeId: "a5RhmyDLMr0",
    spotifyUrl: "https://open.spotify.com/episode/arpit",
    description: "Arpit breaks down his precise DSA preparation strategy and explains how focusing on core systems engineering rather than rote learning led to a highly-coveted placement.",
    coverImage: "/thumbnails/Ep01-Arpit.png",
    tags: ["Placements", "Software Engineering", "Systems", "DSA"],
    takeaways: [
      { title: "Mastering Core Systems", time: "12:05", seconds: 725, text: "Understanding operating systems and databases deeply beats solving 500 duplicate LeetCode challenges." }
    ],
    fullStoryMarkdown: "Arpit shares a step-by-step breakdown of DSA pattern mastery and structural engineering preparation."
  },
  {
    id: "dheeraj",
    releaseDate: "May 2025",
    episodeNumber: 2,
    title: "TERRIBLE DECISION to DROPOUT of IIT and TAKING OWNERSHIP",
    guestName: "Dheeraj",
    guestTitle: "Student Leader & Community organizer",
    duration: "38:40",
    category: "academic",
    youtubeId: "upAxW9oPYeM",
    spotifyUrl: "https://open.spotify.com/episode/dheeraj",
    description: "An inspiring look into hostel administration, running large-scale NSS camps, and maintaining high academic standards while managing massive student operations.",
    coverImage: "/thumbnails/Ep02-Dheeraj.png",
    tags: ["Leadership", "NSS", "Campus Life", "Management"],
    takeaways: [
      { title: "Student Administration Realities", time: "09:30", seconds: 570, text: "Hostel politics and administration teach you more about real-world human resource management than any lecture hall." }
    ],
    fullStoryMarkdown: "Dheeraj recounts his journey running camps, handling crises, and balancing leadership duties with academics."
  },
  {
    id: "nikhil",
    releaseDate: "May 2025",
    episodeNumber: 3,
    title: "From SLEEPLESS NIGHTS before IIT JEE to getting PAMPERED at GOOGLE",
    guestName: "Nikhil",
    guestTitle: "Software Engineer at Top Tech",
    duration: "40:15",
    category: "placement",
    youtubeId: "vUW8YgPzDYg",
    spotifyUrl: "https://open.spotify.com/episode/nikhil",
    description: "Nikhil speaks candidly about maintaining a low CGPA in early semesters, handling intense peer pressure, and landing a top-tier software placement through projects.",
    coverImage: "/thumbnails/Ep03-Nikhil.png",
    tags: ["GPA Struggles", "Placements", "Resilience", "Projects"],
    takeaways: [
      { title: "Moving Past Low Grades", time: "07:45", seconds: 465, text: "Showcasing high-fidelity open source work can completely bypass early screening filters." }
    ],
    fullStoryMarkdown: "Nikhil's story is a shining guide for anyone who has struggled with early academic grades in highly competitive institutions."
  },
  {
    id: "kv",
    releaseDate: "April 2025",
    episodeNumber: 4,
    title: "From being an UNDERCONFIDENT kid at IIT to embracing his CREATIVE side",
    guestName: "KV",
    guestTitle: "Co-Founder of Stonks Media",
    duration: "45:30",
    category: "startup",
    youtubeId: "w5nmXFV6S_Q",
    spotifyUrl: "https://open.spotify.com/episode/kv",
    description: "A fun and deeply insightful chat about campus meme pages, late-night canteen talks, the business of chicken fried maggi, and scaling a digital media startup.",
    coverImage: "/thumbnails/Ep04-KV.png",
    tags: ["Meme Culture", "Startups", "Digital Media", "Canteen Tales"],
    takeaways: [
      { title: "Meme Marketing Power", time: "14:10", seconds: 850, text: "Virality is a science. Understanding internet humor is a powerful, highly-leveraged business skill today." }
    ],
    fullStoryMarkdown: "KV details how casual campus conversations morphed into a fully operational digital agency."
  },
  {
    id: "ankur",
    releaseDate: "April 2025",
    episodeNumber: 5,
    title: "IIT, IIM & Working at EY - From Failing 5th Grade to Mastering Success",
    guestName: "Ankur",
    guestTitle: "General Secretary of Cultural Affairs",
    duration: "52:10",
    category: "academic",
    youtubeId: "q02Ztg67hPY",
    spotifyUrl: "https://open.spotify.com/episode/ankur",
    description: "Ankur shares the behind-the-scenes engineering of KGP's famous Illumination night—designing complex chalkboard murals and coordinating thousands of glowing oil lamps.",
    coverImage: "/thumbnails/Ep05-Ankur.png",
    tags: ["Illumination", "Cultural Fest", "Logistics", "IIT Traditions"],
    takeaways: [
      { title: "Logistics of a Masterpiece", time: "18:20", seconds: 1100, text: "Stitching together efforts from 20+ hostels requires local pairwise alignment of teams to avoid loop failures." }
    ],
    fullStoryMarkdown: "Ankur brings the spectacular traditions of campus culture to life, discussing the engineering behind KGP's glowing art."
  },
  {
    id: "jayanta",
    releaseDate: "March 2025",
    episodeNumber: 6,
    title: "Self-Study HACKS for IITJEE SUCCESS (also ft. Makrand Deshpande)",
    guestName: "Jayanta",
    guestTitle: "Indie Singer & Songwriter",
    duration: "34:50",
    category: "academic",
    youtubeId: "j-zpE1mPznk",
    spotifyUrl: "https://open.spotify.com/episode/jayanta",
    description: "A soulful dialogue on balancing musical passions with an engineering degree, composing campus anthems, and recording indie tracks in dormitory rooms.",
    coverImage: "/thumbnails/Ep06-Jayanta.png",
    tags: ["Music", "Creativity", "Campus Anthems", "Balance"],
    takeaways: [
      { title: "Recording with Constraints", time: "10:15", seconds: 615, text: "You don't need a high-end studio; a simple microphone in a hostel room with blankets can sound incredibly professional." }
    ],
    fullStoryMarkdown: "Jayanta shares his journey producing indie tracks that captures the heart of campus life."
  },
  {
    id: "pranali",
    releaseDate: "March 2025",
    episodeNumber: 7,
    title: "7 Pointer at IIT KGP to Working at INSTAGRAM, follow her Blueprint",
    guestName: "Pranali",
    guestTitle: "Software Engineer at Google",
    duration: "44:15",
    category: "placement",
    youtubeId: "7Y9xgtR0EwU",
    spotifyUrl: "https://open.spotify.com/episode/pranali",
    description: "Pranali shares her roadmap through interview pipelines at Microsoft, Goldman Sachs, and Google, alongside her advocacy for diversity in engineering fields.",
    coverImage: "/thumbnails/Ep07-Pranali.png",
    tags: ["Women In Tech", "Big Tech", "Coding Strategy", "Google"],
    takeaways: [
      { title: "Navigating Tech Interviews", time: "15:30", seconds: 930, text: "Communicate your thought process out loud. Interviewers care more about how you think than the final syntax." }
    ],
    fullStoryMarkdown: "Pranali outlines her strategic coding approach and maps the transition from student to Google engineer."
  },
  {
    id: "bagathi",
    releaseDate: "February 2025",
    episodeNumber: 8,
    title: "From MATH GENIUS to 5 POINTER at IIT, Find out WHY (3 Idiots real-story)",
    guestName: "Bagathi",
    guestTitle: "Automotive Systems Engineer",
    duration: "47:20",
    category: "placement",
    youtubeId: "xmlZiS4qibU",
    spotifyUrl: "https://open.spotify.com/episode/bagathi",
    description: "Bagathi shares a hilarious, highly academic journey inside mechanical labs, building solar cars, and landing core automotive engineering jobs.",
    coverImage: "/thumbnails/Ep08-Bagathi.png",
    tags: ["Mechanical", "Automotive", "Engineering", "Core Jobs"],
    takeaways: [
      { title: "Core vs Software", time: "12:45", seconds: 765, text: "Mechanical engineering is highly rewarding if you focus on hardware-software interfaces like EV drivetrains." }
    ],
    fullStoryMarkdown: "Bagathi discusses core mechanical studies and the future of smart automotive design."
  },
  {
    id: "charu",
    releaseDate: "February 2025",
    episodeNumber: 9,
    title: "GeoPhysics to PM at WALMART, Kota to IIT KGP to HAWAII",
    guestName: "Charu",
    guestTitle: "Senior Developer at Walmart Tech",
    duration: "41:10",
    category: "placement",
    youtubeId: "bHr3ZnaSR4M",
    spotifyUrl: "https://open.spotify.com/episode/charu",
    description: "Charu reflects on her early years in Kota's intense coaching institutes, cracking the JEE, and later building scale frameworks for global retail technology.",
    coverImage: "/thumbnails/Ep09-Charu.png",
    tags: ["Kota Factory", "JEE Prep", "Walmart", "Scale"],
    takeaways: [
      { title: "Kota Survival Skills", time: "08:15", seconds: 495, text: "The extreme discipline of JEE preparation builds a deep resilience that helps you manage high-stress production environments." }
    ],
    fullStoryMarkdown: "Charu relates the intense transition from Kota classroom to massive global tech deployments."
  },
  {
    id: "sanghamitra",
    releaseDate: "January 2025",
    episodeNumber: 10,
    title: "IIT JEE to TOP Researcher to PROFESSOR in USA, follow BRILLIANT journey",
    guestName: "Sanghamitra & Sandeep",
    guestTitle: "Researchers & CMU PhD Candidates",
    duration: "55:12",
    category: "academic",
    youtubeId: "vrewbhtdcc0",
    spotifyUrl: "https://open.spotify.com/episode/sanghamitra",
    description: "A beautiful joint episode discussing their shared academic journey at IIT, applying for global master's programs, and pursuing research at Carnegie Mellon University (CMU).",
    coverImage: "/thumbnails/Ep10-Sanghamitra.png",
    tags: ["Research", "Carnegie Mellon", "Academic Couple", "PhDs"],
    takeaways: [
      { title: "Writing a Strong SOP", time: "22:15", seconds: 1335, text: "A successful statement of purpose is a story. Connect your undergraduate projects to the professor's current research agenda." }
    ],
    fullStoryMarkdown: "Sanghamitra and Sandeep share their joint blueprints for securing fully-funded global graduate opportunities."
  },
  {
    id: "akash",
    releaseDate: "January 2025",
    episodeNumber: 11,
    title: "IITJEE, Cricket, Varanasi to RESTAURANT SECRETS that NO ONE Tells You",
    guestName: "Akash",
    guestTitle: "Founder & Food Entrepreneur",
    duration: "49:30",
    category: "startup",
    youtubeId: "Hw5365OdRGQ",
    spotifyUrl: "https://open.spotify.com/episode/akash",
    description: "Akash details the messy reality of building food supply chains, optimizing cooking times in cloud kitchens, and scaling his startup from a single outlet to a major brand.",
    coverImage: "/thumbnails/Ep11-Akash.png",
    tags: ["Food Tech", "Entrepreneurship", "Supply Chain", "Bootstrapping"],
    takeaways: [
      { title: "The Cloud Kitchen Loophole", time: "16:40", seconds: 1000, text: "Optimize unit economics before raising capital. Food quality and delivery speed are your only true parameters." }
    ],
    fullStoryMarkdown: "Akash walks us through cloud kitchen operations, supply chains, and funding strategies."
  },
  {
    id: "gupthaji",
    releaseDate: "December 2024",
    episodeNumber: 12,
    title: "Real TRUTHs about ELECTRICAL ENGG, Cracking IIT and IIM",
    guestName: "Gupthaji",
    guestTitle: "Creative Director & Actor",
    duration: "36:45",
    category: "academic",
    youtubeId: "TFAedhUisqI",
    spotifyUrl: "https://open.spotify.com/episode/gupthaji",
    description: "Gupthaji shares his hilarious experiences in Hindi dramatic societies, directing late-night campus plays, and making the bold choice to pursue acting over corporate placements.",
    coverImage: "/thumbnails/Ep12-Gupthaji.png",
    tags: ["Dramatics", "Creative Careers", "Unconventional", "Acting"],
    takeaways: [
      { title: "Public Speaking & Confidence", time: "11:20", seconds: 680, text: "Dramatic societies teach you how to read a room and present ideas with high impact—essential traits for any leader." }
    ],
    fullStoryMarkdown: "Gupthaji shares how the stage became a classroom for life skills, communication, and creative pursuits."
  },
  {
    id: "goundla",
    releaseDate: "December 2024",
    episodeNumber: 13,
    title: "IIT KGP and Designing SOLAR PANELS, Jack of All Trades + Master of Many",
    guestName: "Goundla",
    guestTitle: "Systems Researcher at Virginia Tech",
    duration: "58:20",
    category: "global",
    youtubeId: "IAddKg8lL2I",
    spotifyUrl: "https://open.spotify.com/episode/goundla",
    description: "An expansive look at global academic pipelines, researching next-generation database systems, and transitioning from IIT to research careers in the US.",
    coverImage: "/thumbnails/Ep13-Goundla.png",
    tags: ["Global Education", "Database Systems", "US Research", "Google"],
    takeaways: [
      { title: "Securing US Research Assistantships", time: "24:10", seconds: 1450, text: "Build direct relationships with international professors by contributing to their open-source database engines." }
    ],
    fullStoryMarkdown: "Goundla shares a comprehensive guide to navigating research papers, graduate applications, and assistantships."
  },
  {
    id: "shrrinesh",
    releaseDate: "November 2024",
    episodeNumber: 14,
    title: "Tennis, IIT KGP, Startup and ZOMATO - Leading the Way",
    guestName: "Shrrinesh",
    guestTitle: "Founder & YC Alumnus",
    duration: "51:40",
    category: "startup",
    youtubeId: "brNr-LpGI9U",
    spotifyUrl: "https://open.spotify.com/episode/shrrinesh",
    description: "From playing competitive tennis to entering the world's most prestigious startup accelerator. Shrrinesh outlines how to pitch, build MVPs, and secure institutional backing.",
    coverImage: "/thumbnails/Ep14-Shrrinesh.png",
    tags: ["Y Combinator", "Sports", "Venture Capital", "Founder Life"],
    takeaways: [
      { title: "The YC Pitch Formula", time: "19:05", seconds: 1145, text: "Explain your product in three simple words. VCs buy momentum, product-market fit, and relentless focus." }
    ],
    fullStoryMarkdown: "Shrrinesh outlines his journey through tennis courts, Y-Combinator bootcamps, and boardrooms."
  },
  {
    id: "amrita",
    releaseDate: "November 2024",
    episodeNumber: 15,
    episodeSub: "a",
    title: "Navigating Pure Mathematics & Advanced Research",
    guestName: "Amrita",
    guestTitle: "Theoretical Mathematician",
    duration: "30:10",
    category: "academic",
    youtubeId: "m7H04R9Wp-o",
    spotifyUrl: "https://open.spotify.com/episode/amrita",
    description: "A fascinating look at the world of pure theoretical mathematics. We discuss why students shy away from math, and the deep beauty of theoretical research.",
    coverImage: "/Simple Neon Stand Up Comedy Show Youtube Thumbnail.jpg",
    tags: ["Pure Math", "Research", "Academia", "Algorithms"],
    takeaways: [
      { title: "The Beauty of Abstraction", time: "08:40", seconds: 520, text: "Pure math builds structural thinking. It is the language upon which all modern encryption and AI systems are based." }
    ],
    fullStoryMarkdown: "Amrita discusses theoretical mathematics and the joy of abstract problem solving."
  },
  {
    id: "prakhar",
    releaseDate: "October 2024",
    episodeNumber: 15,
    episodeSub: "b",
    title: "[#iitian + #ias Officer] SECRETS to Cracking UPSC in 1 YEAR!",
    guestName: "Prakhar",
    guestTitle: "UPSC Civil Servant & NCC Cadet",
    duration: "46:15",
    category: "global",
    youtubeId: "RKSmHM8bQFw",
    spotifyUrl: "https://open.spotify.com/episode/prakhar",
    description: "Prakhar shares how NCC military training on campus shaped his discipline and mindset, driving him to crack the rigorous UPSC Civil Services examination.",
    coverImage: "/thumbnails/Ep15-Prakhar.png",
    tags: ["UPSC", "NCC", "Civil Service", "Discipline"],
    takeaways: [
      { title: "UPSC Preparation Roadmap", time: "15:20", seconds: 920, text: "Consistency is key. Studying a few topics deeply every single day beats cramming 14 hours sporadically." }
    ],
    fullStoryMarkdown: "Prakhar outlines his path through military cadet squads, thick policy textbooks, and public administration."
  },
  {
    id: "akshay",
    releaseDate: "October 2024",
    episodeNumber: 16,
    episodeSub: "a",
    title: "Cracking Investment Banking from an Engineering Base",
    guestName: "Akshay",
    guestTitle: "Investment Banking Analyst",
    duration: "32:50",
    category: "placement",
    youtubeId: "m7H04R9Wp-o",
    spotifyUrl: "https://open.spotify.com/episode/akshay",
    description: "Akshay explains how engineers can leverage their quantitative skills to break into high-end finance, hedge funds, and investment banking firms.",
    coverImage: "/Simple Neon Stand Up Comedy Show Youtube Thumbnail.jpg",
    tags: ["Investment Banking", "Finance", "Quantitative", "Wall Street"],
    takeaways: [
      { title: "Financial Modeling for Engineers", time: "11:45", seconds: 705, text: "Engineers have a natural edge in quantitative analysis. Focus on derivatives, corporate finance, and system modeling." }
    ],
    fullStoryMarkdown: "Akshay maps out his financial modeling guide and tech-to-finance roadmap."
  },
  {
    id: "sai",
    releaseDate: "September 2024",
    episodeNumber: 16,
    episodeSub: "b",
    title: "EE, EVs, IIT and Real Truths about Bad Coaching Centre Practices",
    guestName: "Sai",
    guestTitle: "Veena Artist & Corporate Lead",
    duration: "43:30",
    category: "global",
    youtubeId: "X93mNP7qjfU",
    spotifyUrl: "https://open.spotify.com/episode/sai",
    description: "Sai shares a beautiful narrative on maintaining a deep connection to classical music (Veena) while working in demanding corporate roles and traveling the globe.",
    coverImage: "/thumbnails/Ep16-Sai.png",
    tags: ["Classical Music", "Corporate", "Global Travel", "Art"],
    takeaways: [
      { title: "Creative Outlets as Stress Relief", time: "14:10", seconds: 850, text: "Your art is not a distraction; it is a creative anchor that prevents corporate burnout and brings fresh cognitive perspectives." }
    ],
    fullStoryMarkdown: "Sai shares her journey balancing concert stages, corporate deliverables, and global adventures."
  },
  {
    id: "arijit",
    releaseDate: "September 2024",
    episodeNumber: 17,
    title: "5 THINGS He Learnt from Travelling to 100+ Countries",
    guestName: "Arijit",
    guestTitle: "Oxford Rhodes Scholar",
    duration: "53:15",
    category: "global",
    youtubeId: "fPbOY0rzC48",
    spotifyUrl: "https://open.spotify.com/episode/arijit",
    description: "An extraordinary narrative of academic excellence, winning the highly prestigious global Rhodes Scholarship, and transitioning to life and studies at Oxford University.",
    coverImage: "/thumbnails/Ep17-Arijit.png",
    tags: ["Oxford", "Rhodes Scholar", "Global Academia", "Excellence"],
    takeaways: [
      { title: "Rhodes Interview Secrets", time: "21:30", seconds: 1290, text: "The panel looks for deep intellectual curiosity combined with a commitment to public service. Authenticity beats standard scripts." }
    ],
    fullStoryMarkdown: "Arijit details the grueling Rhodes interview process and describes academic life inside Oxford's historic campuses."
  },
  {
    id: "pragya",
    releaseDate: "August 2024",
    episodeNumber: 18,
    title: "From DROP Year to SAMSUNG Research, 🔥 to PROVE oneself!",
    guestName: "Pragya",
    guestTitle: "AI Researcher at Samsung SRIB",
    duration: "40:20",
    category: "placement",
    youtubeId: "-F06brwpnCg",
    spotifyUrl: "https://open.spotify.com/episode/pragya",
    description: "Pragya discusses growing up in military bases, bringing that discipline to software engineering, and working on next-generation AI and mobile research at Samsung.",
    coverImage: "/thumbnails/Ep18-Pragya.png",
    tags: ["Samsung SRIB", "AI Research", "Military Upbringing", "Tech Careers"],
    takeaways: [
      { title: "Applying Military Discipline to Tech", time: "12:15", seconds: 735, text: "High-pressure situations in software releases require calm, systematic diagnostics, much like military tactical maneuvers." }
    ],
    fullStoryMarkdown: "Pragya reflects on her family roots, corporate tech research, and maintaining a balanced workspace."
  },
  {
    id: "soumi-abhisek",
    releaseDate: "August 2024",
    episodeNumber: 19,
    title: "MENTAL HEALTH and PhD at IITs, Causes and How to ask for HELP",
    guestName: "Soumi & Abhisek",
    guestTitle: "Researchers & Global Consultants",
    duration: "48:10",
    category: "global",
    youtubeId: "fgHoOdm-Z7k",
    spotifyUrl: "https://open.spotify.com/episode/soumi-abhisek",
    description: "A candid conversation on moving to Germany, adjusting to European work cultures, handling mental health struggles abroad, and publishing high-impact research.",
    coverImage: "/thumbnails/Ep19-SoumiAbhisek.png",
    tags: ["Germany", "Mental Health", "European Culture", "Research Life"],
    takeaways: [
      { title: "Adjusting to European Workplaces", time: "18:40", seconds: 1120, text: "Work-life balance is structural in Germany. Output quality matters more than spending hours sitting at your desk." }
    ],
    fullStoryMarkdown: "Soumi and Abhisek discuss life, research, and mental well-being in international ecosystems."
  },
  {
    id: "saumaric-aditi",
    releaseDate: "July 2024",
    episodeNumber: 20,
    episodeSub: "a",
    title: "WHY this IIT + HARVARD Couple returned to INDIA",
    guestName: "Saumaric & Aditi",
    guestTitle: "McKinsey Consultants & HBS Alum",
    duration: "59:45",
    category: "global",
    youtubeId: "EaXu_3c7AZM",
    spotifyUrl: "https://open.spotify.com/episode/saumaric-aditi",
    description: "An elite deep-dive comparing the academic and social environments of IIT and Harvard. We map the entire roadmap to entering top-tier consulting firms like McKinsey and Bain.",
    coverImage: "/thumbnails/Ep20-SaumAditi.png",
    tags: ["Harvard HBS", "McKinsey", "Consulting", "Elite Careers"],
    takeaways: [
      { title: "The HBS Case Study Method", time: "25:10", seconds: 1510, text: "IIT trains you to find the exact mathematical solution. Harvard trains you to make decisions with 60% of the data under uncertainty." }
    ],
    fullStoryMarkdown: "Saumaric and Aditi present a comprehensive masterclass on consulting, case interview prep, and corporate strategy."
  },
  {
    id: "subham",
    releaseDate: "July 2024",
    episodeNumber: 20,
    episodeSub: "b",
    title: "Reservation & Systemic Caste Discussions in Tech",
    guestName: "Subham",
    guestTitle: "Social Analyst & Tech Advocate",
    duration: "44:10",
    category: "academic",
    youtubeId: "m7H04R9Wp-o",
    spotifyUrl: "https://open.spotify.com/episode/subham",
    description: "A groundbreaking, respectful conversation on reservation, caste dynamics on competitive engineering campuses, and building inclusive tech cultures.",
    coverImage: "/thumbnails/Ep20-Subham.png",
    tags: ["Social Dynamics", "Inclusivity", "Systemic Reform", "Campus Life"],
    takeaways: [
      { title: "Building Inclusive Campuses", time: "16:15", seconds: 975, text: "Empathy is key. We must build peer networks that support students from all backgrounds without institutional biases." }
    ],
    fullStoryMarkdown: "Subham brings a constructive, deeply researched analysis of equity and representation in higher education."
  },
  {
    id: "dk",
    releaseDate: "June 2024",
    episodeNumber: 21,
    title: "GAMING ADDICT in IIT reveals his Recovery Journey from Low SELF-ESTEEM",
    guestName: "DK",
    guestTitle: "Developer & Professional Gamer",
    duration: "39:50",
    category: "placement",
    youtubeId: "mLo3KqXmV5M",
    spotifyUrl: "https://open.spotify.com/episode/dk",
    description: "A fascinating discussion on late-night hostel LAN gaming (DOTA, Age of Empires), managing screen addiction, and landing jobs in core enterprise systems at IBM.",
    coverImage: "/thumbnails/Ep21-DK.png",
    tags: ["Gaming", "DOTA", "IBM", "Screen Addiction"],
    takeaways: [
      { title: "Managing Digital Addiction", time: "14:20", seconds: 860, text: "LAN gaming builds extreme strategic teamwork, but it requires guardrails to prevent it from consuming your entire academic life." }
    ],
    fullStoryMarkdown: "DK talks gaming systems, strategic cognitive loops, and balancing digital habits with career development."
  },
  {
    id: "amarjeet",
    releaseDate: "June 2024",
    episodeNumber: 22,
    title: "IITian to MARATHON Runner, Learn about His Story",
    guestName: "Amarjeet",
    guestTitle: "Core Executive at ITC & Runner",
    duration: "45:10",
    category: "academic",
    youtubeId: "qEppc07tl50",
    spotifyUrl: "https://open.spotify.com/episode/amarjeet",
    description: "The incredible story of a corporate leader at ITC who has completed over 100 marathons. We discuss endurance training, physical health, and professional consistency.",
    coverImage: "/thumbnails/Ep22-Amarjeet.png",
    tags: ["Marathons", "ITC", "Consistency", "Physical Health"],
    takeaways: [
      { title: "The Consistency Equation", time: "18:10", seconds: 1090, text: "Completing a marathon is not a physical feat; it is a mental commitment to a daily training program. Translate this to your career." }
    ],
    fullStoryMarkdown: "Amarjeet details his marathon training schedule and discusses how athletic endurance fuels professional success."
  },
  {
    id: "anushree",
    releaseDate: "May 2024",
    episodeNumber: 23,
    title: "IIT Bombay to HARVARD - Stopping at Nothing",
    guestName: "Anushree",
    guestTitle: "Consulting Lead at Kearney & HBS Alum",
    duration: "48:50",
    category: "placement",
    youtubeId: "m7H04R9Wp-o",
    spotifyUrl: "https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH",
    description: "An extraordinary journey from the intense JEE prep corridors of Kota to playing Surbahaar at IIT Bombay assemblies, and eventually securing a consulting role at Kearney before entering Harvard Business School.",
    coverImage: "/thumbnails/Ep23-Anushree.png",
    tags: ["IIT Bombay", "Harvard Business School", "Kearney", "Stopwatch Method"],
    takeaways: [
      { title: "The Stopwatch Study Method", time: "11:55", seconds: 715, text: "Bansal Sir in Kota taught us to study exclusively by a physical stopwatch. If you stand up, take a water sip, or answer a phone, you must pause the timer. This discipline reveals that 14 desk hours are actually 8 hours of pure, concentrated learning." },
      { title: "Avoid Blind Peer Comparison", time: "23:50", seconds: 1430, text: "Once you enter IIT, everyone's paths will branch out wildly. Some will pursue competitive athletics, others classical music, and others research. Do not benchmark yourself against others; find your own distinct anchor." },
      { title: "The Consulting Buddy System", time: "30:50", seconds: 1850, text: "Preparing for elite consulting roles requires structured case-interview practice in pairs or trios. Leverage corporate buddies—IIT alumni at top firms who act as direct mentors to guide your boardroom analysis." }
    ],
    fullStoryMarkdown: "Anushree Singh shares a masterclass in career versatility and personal discipline.\n\n### The Kota Stopwatch Routine\nGrowing up in a household with a military background, Anushree was accustomed to moving every two years. Her journey to IIT started almost serendipitously when a friend in class 5 mentioned her goal of going to IIT. Years later, her family relocated to Kota. There, she discovered the stopwatch method pioneered by Bansal Sir: measuring every single second of active focus. Despite the grueling pressure, she managed to secure a rank of 1600+ and chose IIT Bombay.\n\n### Balancing Surbahaar and Athletics at Poy\nAt IIT Bombay, Anushree immediately decided to reactivate her artistic and physical pursuits to avoid academic burnout. She joined the athletics team—taking up shot put and discus—and actively managed major musical events like Sur Bahaar and Moody Indigo as convener, coordinating hundreds of campus vocalists and bands.\n\n### Breaking Into Elite Consulting & Harvard\nDuring her final year, Anushree decided to pursue consulting over core engineering, landing a placement at A.T. Kearney. She spent several years traveling across automotive factories in India and high-fashion offices in Dubai. Recognizing her ambition to study abroad, she transitioned to Abbott Pharma to gain corporate operational experience, which ultimately helped her construct the perfect application story to enter Harvard Business School."
  },
  {
    id: "shashwat",
    releaseDate: "May 2024",
    episodeNumber: 24,
    title: "Why I QUIT My Engineering Career After IIT Kharagpur",
    guestName: "Shashwat",
    guestTitle: "Finance PhD & Former McKinsey Analyst",
    duration: "42:15",
    category: "placement",
    youtubeId: "wGoU_5GjRro", // Matching the active working video ID for perfect modal rendering
    spotifyUrl: "https://open.spotify.com/show/2OkRCNNTbwaAB2CElTDdYH",
    description: "Shashwat shares his highly strategic blueprint for switching from Mechanical Engineering at IIT Kharagpur to top-tier McKinsey analyst roles, before quitting corporate tech during COVID to pursue a PhD in Finance in Boston.",
    coverImage: "/thumbnails/Ep24-Shashwat.png",
    tags: ["IIT KGP", "McKinsey", "Dummy School", "Boston PhD"],
    takeaways: [
      { title: "Dummy School Strategy", time: "09:26", seconds: 566, text: "To maximize competitive JEE Advanced focus, enrolling in a non-attending dummy school back home allows students to dedicate 100% of their physical and mental hours directly to problem solving without daily school attendance overheads." },
      { title: "The Problem-Solving Mindset", time: "12:45", seconds: 765, text: "Approaching studies like a sport or video game shifts the perspective from result-oriented anxiety to process-oriented enjoyment. If you genuinely enjoy cracking a hard equation, the 8+ study hours happen organically." },
      { title: "Collaboration Over Rank Obsession", time: "13:30", seconds: 810, text: "A ranking does not define your life capability. Make collaborators out of your competitors. Solving complex equations together with peers builds deep lifelong bonds that standard lecture hall seating can never replicate." }
    ],
    fullStoryMarkdown: "Shashwat Agrawal recounts his bold pivot from corporate engineering to academic finance.\n\n### The Sports Background and Dummy School\nComing from a strong athletic background in Indore, Shashwat was heavily invested in competitive swimming and soccer rather than rote learning. When his interest in mathematics blossomed, he moved to Kota for two years while enrolling in a dummy school in Indore to bypass attendance requirements. This strategic move allowed him to dedicate his full focus to Bansal classes, where he consistently placed in the top batches.\n\n### Life at IIT KGP and McKinsey\nAt IIT Kharagpur, Shashwat was highly active in water sports, representing his hall and the institute. Initially in Civil Engineering, he worked hard to switch to Mechanical Engineering. After graduating, he secured a consulting role at McKinsey, advising massive retail and tech conglomerates on operational scale.\n\n### The Pivot to Boston Academics\nDespite the elite corporate perks, the COVID-19 lockdown provided Shashwat with an intense period of self-reflection. He decided to leave McKinsey to follow his true academic passion: quantitative financial markets. He is currently pursuing a highly rigorous PhD in Finance in Boston, researching market efficiency and asset pricing."
  },
  {
    id: "imbesat",
    releaseDate: "April 2024",
    episodeNumber: 25,
    title: "From Super 30 to Filo CEO: Imbesat Ahmad's REMARKABLE EdTech Journey",
    guestName: "Imbesat",
    guestTitle: "CEO of Filo & RISE Kashmir Founder",
    duration: "55:40",
    category: "startup",
    youtubeId: "IaCg-ImYpEQ",
    spotifyUrl: "https://open.spotify.com/episode/imbesat",
    description: "A breathtaking conversation with Imbesat, who started in Anand Kumar's Super 30, cracked the JEE, established RISE Kashmir, and went on to build Filo, an edtech giant.",
    coverImage: "/thumbnails/Ep25-Imbesat.png",
    tags: ["Super 30", "Filo", "RISE Kashmir", "EdTech"],
    takeaways: [
      { title: "Lessons from Super 30", time: "10:15", seconds: 615, text: "Anand Sir taught us that resources don't determine outcomes—sheer focus and structured repetition do." },
      { title: "Addressing Kashmir Education", time: "25:40", seconds: 1540, text: "We realized that students in conflict-affected regions lack basic access to counseling. RISE Kashmir was built to close this gap." }
    ],
    fullStoryMarkdown: "Imbesat's journey is a legendary testament to resilience, taking him from severe poverty to heading a massive educational startup."
  },
  {
    id: "peter",
    releaseDate: "April 2024",
    episodeNumber: 26,
    title: "AI: Why Your \"Safe Job\" Will Disappear in 10 Years",
    guestName: "Peter (Boeckel)",
    guestTitle: "International Industrial Designer",
    duration: "53:10",
    category: "global",
    youtubeId: "8aQ3Mf6cqhw",
    spotifyUrl: "https://open.spotify.com/episode/peter",
    description: "Peter shares his international design journey working at Philips, Steelcase, and Bandlab, discussing the intersection of human design, AI, and universal basic income.",
    coverImage: "/thumbnails/Ep26-Peter.png",
    tags: ["Industrial Design", "AI", "Universal Basic Income", "Red Dot Award"],
    takeaways: [
      { title: "The Philosophy of Clean Design", time: "18:20", seconds: 1100, text: "Design is not about looks; it is about how it works. A simple, functional system always beats decorative complexity." }
    ],
    fullStoryMarkdown: "Peter shares a global masterclass on design systems, human interface principles, and industrial design."
  },
  {
    id: "samarth",
    releaseDate: "March 2024",
    episodeNumber: 27,
    title: "Borderlands, TheUnreserved & Alternative Storytelling",
    guestName: "Samarth",
    guestTitle: "Founder & Creative Storyteller",
    duration: "37:15",
    category: "startup",
    youtubeId: "m7H04R9Wp-o",
    spotifyUrl: "https://open.spotify.com/episode/samarth",
    description: "Samarth speaks about alternative journalistic storytelling, founding TheUnreserved and Borderlands, and capturing stories of marginalized voices on the borders.",
    coverImage: "/Simple Neon Stand Up Comedy Show Youtube Thumbnail.jpg",
    tags: ["Storytelling", "Alternative Journalism", "Unreserved", "Borderlands"],
    takeaways: [
      { title: "Storytelling as a Mission", time: "12:10", seconds: 730, text: "Real stories are on the margins. Alternative journalism captures human lives that corporate media pipelines completely bypass." }
    ],
    fullStoryMarkdown: "Samarth shares his journey recording alternative media journals and amplifying unheard voices."
  }
];
