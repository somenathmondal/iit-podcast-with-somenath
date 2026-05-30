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
  gallery?: string[];
  views?: number;
  tags: string[];
  takeaways: BlogTakeaway[];
  fullStoryMarkdown: string;
  releaseDate?: string;
  guestProfiles?: { name: string; url: string }[];
}

export const episodes: Episode[] = [
  {
    id: "suman-chakraborty-1",
    releaseDate: "June 2025",
    episodeNumber: 0,
    episodeSub: "a",
    title: "IIT KGP Director's Candid Take on Grades, AI & Placements",
    guestName: "Prof. Suman Chakraborty",
    guestTitle: "Director of IIT Kharagpur (Part 1)",
    duration: "48:02",
    category: "academic",
    youtubeId: "4ivvkpPn9wk",
    spotifyUrl: "https://open.spotify.com/episode/6FWmZmk4lXus44k5Tk855Z",
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
    title: "Rethinking Education, AI, and the Future of Work",
    guestName: "Prof. Suman Chakraborty",
    guestTitle: "Director of IIT Kharagpur",
    duration: "35:15",
    category: "academic",
    youtubeId: "4ivvkpPn9wk",
    spotifyUrl: "https://open.spotify.com/episode/45UTNZFKOWZD1zYjpLX67b",
    description: "Prof. Suman Chakraborty, Director of IIT Kharagpur, discusses the AI revolution, the future of work, rethinking the JEE exam, and the evolving role of the B.Tech degree.",
    coverImage: "/thumbnails/Ep00-ProfSuman2.png",
    tags: ["Academia", "AI Revolution", "Future of Work", "IIT KGP Director"],
    takeaways: [
      { title: "Solving Global Loop Failures", time: "05:10", seconds: 310, text: "Our local research pipelines must utilize pairwise refinement to overcome global closure constraints, replicating practical engineering successes." },
      { title: "Funding the Future", time: "15:40", seconds: 940, text: "Real research requires consistent institutional backing, reducing administrative roadblocks for young investigators." }
    ],
    fullStoryMarkdown: "Welcome back to Part 2 of our deep-dive podcast with Professor Suman Chakraborty, the new Director of IIT Kharagpur. In this episode, we continue our discussion on crucial topics including AI, education, and his vision for the institution. If you missed Part 1, we covered his strategic direction and immediate administration priorities, enhancing research facilities, mental health initiatives and his plans to engage mothers on campus, and whether AI is a blessing or a curse.\n\n### The AI Revolution and the Future of Work\nProfessor Chakraborty weighs in on the increasing capabilities of AI models in the software domain and the push toward physical frontiers like humanoid robots and self-driven taxis. He emphasizes that the entire world is being transformed by technology, particularly AI. He argues that students should focus on a \"cocktail\" of core knowledge and advanced technologies like AI, emphasizing \"cyber physical systems\". He also notes the importance of semiconductor research as the \"next buzz after the quantum boom,\" stressing India's need to focus on hardware innovation.\n\n### Rethinking Education and JEE in the AI Era\nWe tackle the evolving role of the JEE exam, especially after AI models demonstrated the capability to top the exam. Professor Chakraborty argues that the JEE is an elimination exam and suggests a change is needed: reducing the JEE syllabus and focusing on deeper foundations rather than just formula cracking. He asserts that modern teaching methodologies must change, moving away from rote learning and focusing on context and analytical insight.\n\n### The Future of B.Tech and IIT Kharagpur's Priorities\nProfessor Chakraborty discusses the value of the traditional four-year B.Tech course in the AI era. He supports the National Education Policy 2020 (NEP) and its provision for different exit routes, allowing students to leave with a diploma or certificate if they have sufficient knowledge for the working world. He also touches on administrative priorities such as addressing student mental health and introducing a \"Dean, campus and community development\" position to tackle campus issues like the canine problem.\n\n### Rapid-Fire Session\nWe conclude with a rapid-fire session, where he shares why he believes IIT Kharagpur is the \"dreamiest institute in the world\" and his immediate plans to connect with young alumni."
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
    title: "From Confident Kid to Top Tech Jobs – Meet Pranali Jalgam",
    guestName: "Pranali Jalgam",
    guestTitle: "Software Engineer at Instagram",
    duration: "44:15",
    category: "placement",
    youtubeId: "7Y9xgtR0EwU",
    spotifyUrl: "https://open.spotify.com/episode/0HTlBvn481UJYPpaDgXd6r",
    description: "Pranali reveals how she cleared interviews at top companies like Ola, LinkedIn, Grab, Disney+ Hotstar, Google, and Instagram after starting with a 7-pointer.",
    coverImage: "/thumbnails/Ep07-Pranali.png",
    tags: ["Tech", "Big Tech", "Coding Strategy", "Instagram"],
    guestProfiles: [
      { name: "Pranali Jalgam", url: "https://www.linkedin.com/in/pranali-jalgam-7b83743b" }
    ],
    takeaways: [
      { title: "Navigating Tech Interviews", time: "15:30", seconds: 930, text: "Communicate your thought process out loud. Interviewers care more about how you think than the final syntax." }
    ],
    fullStoryMarkdown: `In this episode, I talk to Pranali Jalgam about her incredible journey from being a confident yet naughty kid commuting 3 hours daily to Prashanti classes in Hyderabad to making her mark in the tech world! 🌍

### 🌳 IIT KGP Life
Pranali shares her love for the lush greenery at IIT Kharagpur, the challenges of dealing with food she didn’t enjoy, and how her HOD helped her convert to a Dual degree program. 🎓

### 💻 Finding Her Passion
After initially getting a 7-pointer, she discovered her passion for Software Engineering and shares tales about the exhausting placement season at IIT.

### 💼 Top Tech Interviews
Pranali reveals how she cleared interviews at top companies like Ola, LinkedIn, Grab, Disney+ Hotstar, Google, Instagram – with valuable tips for anyone aspiring to land their dream job! ✨

Listen to Pranali's views on the Gender Imbalance at IIT and Tech and how she does her bit to correct it!`
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
    title: "From South Point to Professor at UMD: Meet Sanghamitra Dutta",
    guestName: "Sanghamitra Dutta",
    guestTitle: "Assistant Professor at UMD",
    guestProfiles: [
      { name: "Sanghamitra Dutta", url: "https://www.linkedin.com/in/sanghamitra-dutta-b2938852" }
    ],
    duration: "55:12",
    category: "academic",
    youtubeId: "vrewbhtdcc0",
    spotifyUrl: "https://open.spotify.com/episode/1igV4jMmoFJ3SRcPOnd8lJ",
    description: "Sanghamitra Dutta, Assistant Professor at the University of Maryland, discusses her journey from Kolkata to academia, surviving IIT placements, and finding her true calling in research.",
    coverImage: "/thumbnails/Ep10-Sanghamitra.png",
    tags: ["Academia", "Higher Studies", "Research", "Relationships"],
    takeaways: [
      { title: "Writing a Strong SOP", time: "22:15", seconds: 1335, text: "A successful statement of purpose is a story. Connect your undergraduate projects to the professor's current research agenda." }
    ],
    fullStoryMarkdown: "In this episode, Somenath chats with Sanghamitra Dutta, now an Assistant Professor at the University of Maryland College Park, about her incredible journey from South Point School in Kolkata to the world of academia.\n\n### Math Lover & School Days\nSanghamitra shares how she grew up loving Maths and embracing the competitive culture at her school, all while enjoying her favorite chicken curry!\n\n### First Day Struggles at IIT\nShe reminisces about her first day at IIT, carrying heavy bags and learning to cycle around campus. Sanghamitra also talks about her deep involvement with the Bengali Dramatics Society and teaching kids through NSS.\n\n### Placement Advice & Academia\nShe offers valuable placement tips for navigating that stressful season at IIT and explicitly shares her reasons for choosing academia over industry. Sanghamitra dives into her daily life as a professor, offering insights into the academic world and explaining exactly why it was her calling.\n\n### Finding Love at IIT\nShe fondly talks about her relationship with Sandeep, whom she met during her time at IIT, and how they’ve built a beautiful life together."
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
    id: "prakhar",
    releaseDate: "October 2024",
    episodeNumber: 15,
    episodeSub: "b",
    title: "IITian + IAS Officer shares SECRETS to Cracking UPSC in 1 YEAR!",
    guestName: "Prakhar Singh",
    guestTitle: "IAS Officer & IIT KGP Alum",
    guestProfiles: [
      { name: "Prakhar Singh", url: "https://www.linkedin.com/in/prakhars246" }
    ],
    duration: "46:15",
    category: "global",
    youtubeId: "RKSmHM8bQFw",
    spotifyUrl: "https://open.spotify.com/episode/3qtlfRCBXwCb7hKGpQGn8a",
    description: "Prakhar shares his journey from feeling overwhelmed in Kota to cracking IIT, declining JPMorgan, and successfully clearing the UPSC exams in 1 year.",
    coverImage: "/thumbnails/Ep15-Prakhar.png",
    tags: ["UPSC", "IAS Officer", "Kota Prep", "IIT KGP"],
    takeaways: [
      { title: "UPSC Preparation Roadmap", time: "15:20", seconds: 920, text: "Consistency is key. Studying a few topics deeply every single day beats cramming 14 hours sporadically." }
    ],
    fullStoryMarkdown: "In this inspiring episode, Somenath chats with his wingmate, Prakhar Singh, who cracked both IIT JEE and UPSC to become an IAS Officer in Madhya Pradesh.\n\n### Journey to IIT\nComing from a small town, Prakhar details his experience of moving to Kota, being overwhelmed by its magnitude, and intensely preparing for IIT in just 3-4 months.\n\n### Life at IIT KGP\nFrom NSS activities to the vibrant traditions of Illu and Rangoli, Prakhar paints a vivid picture of IIT life, including surviving Mechanical coursework and navigating canteen food.\n\n### From JPMorgan to IAS\nPrakhar shares a funny story about being placed at JPMorgan and why he chose to pivot toward his dream of becoming an IAS officer, preparing for UPSC with a strict 1-year plan—and succeeding.\n\n### Life in Government Service\nHe delves into the challenges of working in public administration and provides highly actionable advice for dedicated UPSC aspirants."
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
    title: "From Kharagpur to Oxford: Arijit Patra's Inspiring Journey",
    guestName: "Arijit Patra",
    guestTitle: "Rhodes Scholar & AI Researcher",
    guestProfiles: [
      { name: "Arijit Patra", url: "https://www.linkedin.com/in/arijit-patra-92a18457" }
    ],
    duration: "53:15",
    category: "global",
    youtubeId: "fPbOY0rzC48",
    spotifyUrl: "https://open.spotify.com/episode/7nOY9TMCfmw8K6rQtCE8QI",
    description: "Arijit Patra discusses his transition from Mechanical Engineering at IIT to becoming an Oxford Rhodes Scholar, his work in medical AI, and traveling to 90+ countries.",
    coverImage: "/thumbnails/Ep17-Arijit.png",
    tags: ["Higher Studies", "Rhodes Scholar", "Medical AI", "Travel"],
    takeaways: [
      { title: "Rhodes Interview Secrets", time: "21:30", seconds: 1290, text: "The panel looks for deep intellectual curiosity combined with a commitment to public service. Authenticity beats standard scripts." }
    ],
    fullStoryMarkdown: "In this fascinating episode, Somenath chats with his friend Arijit Patra, who went from being a Mechanical Engineer at IIT Kharagpur to becoming a Rhodes Scholar, working on cutting-edge AI in the medical domain, and traveling to 90+ countries while indulging his love for cats.\n\n### Life at IIT\nArijit reminisces about his love for Bhatu Maggi, the joy of participating in Illu and Rangoli, and how he managed the intense coursework at KGP. He also shares how he earned the prestigious Rhodes Scholarship, diving into its rich history and selection process.\n\n### Life After IIT\nTransitioning to Oxford culture wasn’t easy, but Arijit embraced the challenge during his PhD. He opens up about his groundbreaking work on AI in prenatal imagery to detect congenital diseases, later pivoting to AI in the pharma industry to make an even bigger impact.\n\n### Travel Adventures & Cats\nWith an incredible tally of 90+ countries, Arijit shares wild stories from his travels and even reveals the extreme lengths he’s gone to just to meet and pet cats along the way!"
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
    guestName: "Imbesat Ahmad",
    guestTitle: "CEO of Filo & RISE Kashmir Founder",
    guestProfiles: [
      { name: "Imbesat Ahmad", url: "https://www.linkedin.com/in/imbesatahmad1/" }
    ],
    duration: "55:40",
    category: "startup",
    youtubeId: "IaCg-ImYpEQ",
    spotifyUrl: "https://open.spotify.com/episode/0NVYbJsJFxDgDxQOpomgGd",
    description: "Imbesat Ahmad, CEO of Filo, shares his journey from Super 30's grueling IIT prep in Bihar to launching an EdTech startup that delivers 80K daily classes globally.",
    coverImage: "/thumbnails/Ep25-Imbesat.png",
    tags: ["EdTech", "Super 30", "Startup CEO", "Mental Health"],
    takeaways: [
      { title: "Lessons from Super 30", time: "10:15", seconds: 615, text: "Anand Sir taught us that resources don't determine outcomes—sheer focus and structured repetition do." },
      { title: "Addressing Kashmir Education", time: "25:40", seconds: 1540, text: "We realized that students in conflict-affected regions lack basic access to counseling. RISE Kashmir was built to close this gap." }
    ],
    fullStoryMarkdown: "In this inspiring episode, Somenath chats with Imbesat Ahmad, CEO & Founder of Filo—an instant tutoring app revolutionizing education for millions. Imbesat shares his epic tale of grit, from cracking Super 30's cutthroat IIT prep to building a highly successful EdTech startup.\n\n### The Super 30 Experience\nImbesat recounts a rain-soaked bike ride to join Super 30 in Bihar. He shares his raw resilience, detailing his daily routine of waking at dawn, battling self-doubt, managing intense distractions, and forging lifelong bonds with his peers.\n\n### Life at IIT KGP & Mental Health\nFrom campus chaos and roommate hacks to navigating academic pressure, Imbesat provides a candid look at IIT life. He also opens up about the critical importance of mental health, tackling the sensitive topic of student burnout and the dangers of constant comparison.\n\n### Igniting the Entrepreneurial Fire\nImbesat details his journey into entrepreneurship, starting with launching the RISE initiative in Kashmir to help turn dropouts into NIT stars.\n\n### Founding Filo\nHe dives into the massive scale of Filo—now operating in 50+ countries with 80K daily classes. Imbesat explains how they are integrating AI tutors that feel human, proving that with the right mission, toughness is temporary but impact is forever."
  },
  {
    id: "peter",
    releaseDate: "April 2024",
    episodeNumber: 26,
    title: "AI: Why Your \"Safe Job\" Will Disappear in 10 Years",
    guestName: "Peter Boeckel",
    guestTitle: "Global Design Leader & Futurist",
    guestProfiles: [
      { name: "Peter Boeckel", url: "https://www.linkedin.com/in/peterboeckel" },
      { name: "Newsletter", url: "https://peterboeckel.com/newsletter" },
      { name: "Peter's Podcast", url: "https://spotify.link/C7fpnTNRxXb" }
    ],
    duration: "53:10",
    category: "global",
    youtubeId: "8aQ3Mf6cqhw",
    spotifyUrl: "https://open.spotify.com/episode/3mOHUCFjZrHNRMpORZSsfS",
    description: "Global Design Leader Peter Boeckel (ex-Peloton, Philips) shares blunt truths about the future of work, AI replacing jobs, and his experience teaching at IIT Hyderabad.",
    coverImage: "/thumbnails/Ep26-Peter.png",
    gallery: [
      "/thumbnails/Ep26-Peter.png",
      "/thumbnails/Ep25-Imbesat.png",
      "/thumbnails/Ep24-Shashwat.png"
    ],
    tags: ["Design & AI", "Future of Work", "Industrial Design", "IIT Hyderabad"],
    takeaways: [
      { title: "The Philosophy of Clean Design", time: "18:20", seconds: 1100, text: "Design is not about looks; it is about how it works. A simple, functional system always beats decorative complexity." }
    ],
    fullStoryMarkdown: "In this mind-bending conversation, Somenath chats with Peter Boeckel, a Global Design Leader (ex-Peloton, Steelcase, Philips) and Futurist, who is currently teaching Industrial Design at IIT Hyderabad. Peter shares his incredible journey—from being born in Germany to leading design teams in Hong Kong, Singapore, New York, and San Francisco, including pioneering work in cutting-edge surgical robotics.\n\n### The Future is Unstable: AI, Jobs, and Education\nPeter gives us the blunt truth about the future of work and the changing role of designers. He states that many jobs will simply \"go away,\" and most current education systems \"will not be here within the next five to ten years.\" The technological revolution is accelerating so fast that it is rapidly destabilizing traditional social and employment systems. \n\nWe discuss how AI models are already achieving top marks in exams like the IIT JEE, underscoring the extreme urgency for change. Peter argues that the solution isn't simply acquiring more skills; it's a fundamental shift, noting that \"the future of design lies more in retooling towards entrepreneurship.\"\n\n### Global Design & Medical Device Challenges\nPeter breaks down how corporate culture and innovation differ fundamentally across Asia, Europe, and the US. He also provides an insider's look at the extreme complexity of designing for high-stakes environments like surgical robotics, navigating the challenges of a highly regulated and risk-averse medical industry.\n\n### Cultural Insight from IIT\nTeaching at IIT Hyderabad, Peter shares his profound observation on the \"afterburner\" effect he sees in India—a generation incredibly \"hungry\" to excel because they see a clear, structured path to a vastly better life.\n\n### Recommended Books\nPeter highly recommends reading:\n- **[Life 3.0](https://amzn.to/4nYS9Bx)**\n- **[The Nvidia Way](https://amzn.to/4nVd74g)**"
  }
];
