export interface BlogArticle {
  id: string;
  title: string;
  description: string;
  author: string;
  readTime: string;
  category: "placement" | "academic" | "startup" | "global";
  releaseDate: string;
  coverImage: string;
  contentMarkdown: string;
  tags: string[];
  youtubeId?: string;
  guestName?: string;
  guestTitle?: string;
}

export const blogs: BlogArticle[] = [
  {
    id: "mckinsey-consulting-blueprint",
    title: "The McKinsey Case Interview Survival Guide: Pivoting from Engineering to Consulting",
    description: "A comprehensive combined guide synthesised from IIT alumni lessons on breaking into top-tier management consulting, passing McKinsey case rounds, and adjusting your mindset.",
    author: "Somenath Mondal",
    readTime: "2 min read",
    category: "placement",
    releaseDate: "MAY 2025",
    coverImage: "/thumbnails/Ep24-Shashwat.png",
    youtubeId: "wGoU_5GjRro",
    guestName: "Shashwat",
    guestTitle: "McKinsey Analyst",
    tags: ["Consulting", "McKinsey", "Case Interview", "Career Pivot"],
    contentMarkdown: `Many IIT graduates aspire to transition from technical engineering backgrounds into top-tier management consulting firms like McKinsey, BCG, and Bain. However, the shift requires a fundamental rewiring of how you analyze and communicate problems. 

This guide synthesizes key blueprints shared by consultants who successfully crossed the bridge.

---

### Part 1: The Core Consulting Mindset Shift
As engineers, we are trained to dive deep into execution, mathematics, and technical details. Consulting, however, demands **MECE (Mutually Exclusive, Collectively Exhaustive)** structures and **high-level, result-oriented synthesis**. 

Instead of showing *how* you solved every equation, a consultant must state the **recommendation first** (using the Minto Pyramid Principle) and support it with structured pillars.

*   **The Bottom-Up Engineer:** Analyzes all data points, conducts dozens of tests, and eventually presents a conclusion.
*   **The Top-Down Consultant:** Starts with a hypothesis, drafts a structured tree of possibilities, quickly validates or rejects paths, and presents recommendations immediately.

---

### Part 2: Cracking the Case Interview (Step-by-Step)
McKinsey case interviews assess how you think under pressure. They are not looking for the "perfect" number; they are evaluating your **logical structure**.

#### 1. The Structure (First 2 Minutes)
When presented with a prompt (e.g., *"Our client is a retail giant seeing a 15% drop in profitability"*), do not guess. Take a breath, ask clarifying questions, and request 1-2 minutes to sketch a structure.
*   **Pillars:** Divide the problem logically into **Revenue** and **Cost**.
*   **Sub-components:** Under Revenue, evaluate *Price per Unit* and *Volume*. Under Cost, divide into *Fixed Costs* and *Variable Costs*.
*   **MECE check:** Ensure your branches do not overlap, but cover the entire landscape.

#### 2. Quantitative Estimation (Guesstimates)
You might be asked to estimate the number of smartphones sold in India annually. 
*   **The Setup:** Always lay out your formula *before* doing any math. E.g., \`Population × Smartphone Penetration % × Replacement Rate per Year\`.
*   **Calculations:** Use round numbers to keep your math fast and error-free. Talk through your assumptions out loud so the interviewer can follow your logic.

#### 3. The Synthesis & Recommendation
At the end of the case, you must present a sharp recommendation.
*   **Structure:** *"I recommend the client does [Action X] due to three reasons: 1..., 2..., 3... The main risks are [Risk Y], which we can mitigate by [Mitigation Z]."*

---

### Part 3: Survival Tips for the First 100 Days
Transitioning from the relaxed environment of college or pure research to corporate consulting can be intense. 
*   **Over-Communicate:** Manage client expectations proactively. If a slide deck is going to be late, raise the red flag early.
*   **Understand the 'So What?':** Every data point you put on a PowerPoint slide must have a direct business implication. Never show a chart just because it looks nice.`
  },
  {
    id: "dsa-vs-systems-engineering",
    title: "DSA vs. Systems Programming: Preparing for High-Growth Tech Roles",
    description: "An editorial analysis of how to balance competitive programming (LeetCode) with deep systems engineering (operating systems, databases) to secure premium tech placements.",
    author: "Somenath Mondal",
    readTime: "3 min read",
    category: "placement",
    releaseDate: "MAY 2025",
    coverImage: "/thumbnails/Ep01-Arpit.png",
    youtubeId: "a5RhmyDLMr0",
    guestName: "Arpit",
    guestTitle: "Systems Engineer",
    tags: ["DSA", "Systems Engineering", "LeetCode", "Placements", "Software Engineering"],
    contentMarkdown: `Securing a premium software engineering placement is a major goal for many IIT students. However, the campus placement ecosystem often creates a hyper-focus on competitive programming and LeetCode, sometimes at the expense of core engineering capability.

In this editorial, we break down why a balance between **Data Structures & Algorithms (DSA)** and **Systems Programming** is the ultimate key to a high-impact, long-term tech career.

---

### The LeetCode Paradox
There is no denying it: to pass the initial automated coding rounds of top-tier tech companies, you *must* be proficient in DSA. You need to recognize patterns like sliding windows, prefix sums, tree traversals, and dynamic programming.

However, the paradox is that **cracking competitive challenges is a screening metric, not the day-to-day job**. 

Once you clear the screening, a senior engineer will rarely ask you to reverse a binary tree. Instead, they will ask you:
*   *"How do we scale our database writes to handle 50,000 requests per second?"*
*   *"Why is this database query causing thread pool starvation in our system?"*
*   *"How do we maintain strong consistency across three microservices?"*

---

### The Systems Engineering Pillars
To stand out in high-level architectural interviews and build software that scales, you must master the fundamental layers of computer systems:

#### 1. Operating Systems & Concurrency
Understand how your code interacts with hardware.
*   **Key Concepts:** Processes vs. Threads, CPU Scheduling, Virtual Memory, Concurrency primitives (mutexes, semaphores, locks), and I/O multiplexing (epoll/kqueue).
*   **Practical Exercise:** Write a simple multi-threaded web server from scratch in C or Rust. You will learn more about socket programming and race conditions than you ever would from solving 100 array challenges.

#### 2. Databases & Storage Engines
Never treat databases as a black box.
*   **Key Concepts:** ACID transactions, indexes (B-Trees vs. LSM Trees), transaction isolation levels (Read Committed, Serializable), and replication/sharding strategies.
*   **Practical Exercise:** Build a simple key-value store database that persists to disk using a basic log-structured approach.

#### 3. Distributed Systems Basics
At scale, single machines fail. You must design for networks of machines.
*   **Key Concepts:** The CAP Theorem, consistent hashing, message queues (Kafka/RabbitMQ), and horizontal vs. vertical scaling.

---

### The Ultimate Prep Blueprint
1.  **Stage 1 (Screening Pass):** Solve 150-200 curated, high-frequency LeetCode questions focusing on core patterns (Binary Search, Graphs, Two Pointers, Trees) rather than rote memorization.
2.  **Stage 2 (Engineering Depth):** Learn systems programming. Read classics like *Designing Data-Intensive Applications* by Martin Kleppmann and build small practical systems (databases, web servers, protocol parsers).
3.  **Stage 3 (The Interview Synthesis):** In system design rounds, talk about trade-offs. Never say "I will use Redis." Instead, say: *"I will introduce an in-memory cache using Redis here because our read-to-write ratio is 95:5, and this will alleviate load on our primary database cluster."*`
  }
];
