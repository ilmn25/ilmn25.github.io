import { Project, Experience, SkillGroup } from "./types";

export const ASSETS_URL =
  "https://raw.githubusercontent.com/ilmn25/ilmn25.github.io/refs/heads/prod/assets";

export const PERSONAL_INFO = {
  name: "illu",
  avatar: `${ASSETS_URL}/pfp.png`,
  title: "Full stack developer | Game developer | Digital illustrator",
  education:
    "BSc (Hons) in Computer Science + Minor in Japanese @ The Hong Kong Polytechnic University Sep 2023 – Jul 2027",
  birthday: "20/05/2005",
  decoration: "+-= ═.·:·.☽ ✧  ✦  ✧ ☾.·:·.═ =-+",
  contact: {
    whatsapp: "+852 6236 5318",
    email: "kilmn025@gmail.com",
    discord: "ilmn",
  },
  social: {
    github: "https://github.com/ilmn25",
    twitter: "https://x.com/ilmn25/",
    instagram: "https://www.instagram.com/ilmnnnnnnnnnn/",
    linkedin: "https://www.linkedin.com/in/ilmn25/",
    youtube: "https://www.youtube.com/@ilmn25",
    resume:
      "https://docs.google.com/document/d/1EXzindBoId3J1ePtDNtXYuC0-K_bDDBOZi4cdc-akdk/edit?usp=sharing",
  },
};

export const PROJECT_NAV = [
  { id: "illubot", label: "illubot", category: "MCP Agent" },
  { id: "unity-game", label: "3D Unity Game", category: "Game Dev" },
  {
    id: "tutor-db",
    label: "Tutor Centre Management System",
    category: "Web App",
  },
  {
    id: "discord-tool",
    label: "Discord Message Tool",
    category: "Cloud Tools",
  },
  {
    id: "spa-tree",
    label: "SPA Specifications Generator",
    category: "Automation",
  },
  { id: "illustrations", label: "Digital Illustrations", category: "Art" },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Spoken Languages",
    skills: [
      "Native English",
      "Native Cantonese",
      "Fluent Mandarin",
      "Beginner Japanese",
    ],
  },
  {
    category: "Languages",
    skills: [
      "Python",
      "JavaScript/TypeScript",
      "C#",
      "C/C++",
      "Java",
      "Lua",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Frameworks",
    skills: [
      "Node.js",
      "React",
      "React Native",
      "FastAPI",
      "Next.js",
      "Vite",
      "Tailwind",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "AWS (IAM, ECS, ECR, S3)",
      "Docker",
      "Git",
      "GitHub Actions",
      "Supabase",
      "Vercel",
    ],
  },
  {
    category: "AI & Databases",
    skills: ["MCP", "RAG", "Pinecone", "PostgreSQL", "MySQL", "MongoDB"],
  },
  {
    category: "Virtual Machines & OS",
    skills: ["VirtualBox", "VMWare", "Windows Server 2022"],
  },
  {
    category: "Tools",
    skills: ["Unity", "Stripe", "Word", "Excel", "Lark", "Zoom"],
  },
  {
    category: "Design",
    skills: [
      "Figma",
      "Canva",
      "Photoshop",
      "After Effects",
      "Clip Studio Paint",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "illubot",
    title: "illubot",
    description:
      "A high‑performance MCP AI personal agent capable of reducing daily workload for multi‑step digital tasks.",
    category: "ai",
    tags: ["AI Agent", "MCP", "LLM", "RAG", "Pinecone", "Vector DB"],
    highlights: [
      "Integrated support for multiple LLM providers, enabling cost‑free usage by seamlessly switching between endpoints when the free tier of one provider is temporarily exhausted.",
      "Introduced hands free use via voice command, or remote access via Discord Bot.",
      "Implemented long-term memory retrieval utilizing RAG with Pinecone vector database.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/260228" }],
  },
  {
    id: "discord-tool",
    title: "Discord Message Tool",
    description:
      "An automated marketing system for Discord that streamlines cross-server posting and deployments.",
    category: "web",
    tags: [
      "FastAPI",
      "React",
      "AWS",
      "Docker",
      "MongoDB",
      "Tailwind",
      "GitHub Actions",
    ],
    highlights: [
      "Developed a system that automates organic marketing by posting across multiple Discord servers, reducing effort from 2–3 hours to just minutes after setup.",
      "Implemented containerized CI/CD workflows using Docker and GitHub Actions, streamlining AWS ECS Fargate deployments into a single command.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/251128" }],
  },
  {
    id: "unity-game",
    title: "2.5D Survival Game Project",
    description:
      "A survival game featuring infinite procedural generation and optimized map partitioning.",
    category: "game",
    tags: ["Unity", "C#"],
    highlights: [
      "Built an optimized map partitioning system that manages world data in 3D chunks, enabling near-infinite procedural world generation.",
      "Developed a custom set of DevTools for streamlining asset creation and debugging, boosting the speed of adding content by ~80%.",
      "Designed interconnected pathfinding and behavioral algorithms to address limitations in Unity’s NavMesh, including heuristics for parkour.",
      "Integrated Unity's Job System and Burst Compiler to offload heavy computations, allowing the game to run at 200-400 FPS with no frame drops on a mid-end PC.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/240809" }],
  },
  {
    id: "tutor-db",
    title: "Tutor Centre Management System",
    description:
      "A custom ERP and CRM solution built to streamline Attendance, client communication, and operations management for education centers..",
    category: "web",
    tags: ["Supabase", "PostgreSQL", "React", "Tailwind", "Stripe"],
    highlights: [
      "Features issues detection, multi-tenancy, Stripe Payment API integration for parents to pay online, and more",
      "Advanced data management with robust data filtering, sorting, backup, analysis, and also batch import / exporting",
      "Automated attendance with fingerprint & facial recognition hardware integration",
      "Used by a Tutor Centre in Hung Hom",
    ],
    links: [],
  },
  {
    id: "spa-tree",
    title: "SPA HTML Tree Specification Generator",
    description:
      "A prompt driven workflow to speed up the migration of legacy SPAs to AI-first IDEs such as Google AI Studio.",
    category: "workflow",
    tags: ["Prompt Engineering", "Specification Generation"],
    highlights: [
      "Processes SPA HTML trees to extract routes, page structure and asset information",
      "Employs LLMs to generate clear and comprehensive specifications.",
      "Facilitates the cleanup of asset names and paths for improved organization",
      "Enables full migration of medium sized websites within a single day.",
    ],
    links: [],
  }, 
  {
    id: "illustrations",
    title: "Digital Illustration",
    description: "A collection of my illustrations, animations, and other art.",
    category: "art",
    tags: [
      "Clip Studio Paint",
      "Character Design",
      "Animation",
      "Video Editing",
    ],
    highlights: [
      "Drew character design, illustration, and concept sketches tailored to client specifications",
      "Managing personal social media and freelance commissions",
    ],
    links: [
      { label: "Twitter", url: "https://x.com/ilmn25/" },
      { label: "Instagram", url: "https://www.instagram.com/ilmnnnnnnnnnn/" },
      { label: "Youtube", url: "https://www.youtube.com/@ilmn25" },
    ],
  },
  {
    id: "ilmnnn-website",
    title: "ILMNNNNNNNN",
    description:
      "This is a conceptual mockup for a clothing and accessories brand, all products displayed do not exist.",
    category: "web",
    tags: ["Pet Project"],
    highlights: [],
    links: [],
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Time Super English Learning Centre",
    role: "Full Stack Developer",
    period: "Jan 2026 – Present",
    type: "Part-time",
    description: [
      "Developing an internal end-to-end ERP and CRM system, replacing manual spreadsheet workflows and saving staff ~30 hours per month.",
      "Researched, procured, and integrated biometric scanning hardware to enable self check-in for younger students, fully automating attendance and eliminating manual entry errors.",
      "Collaborating with staff and owners to understand the pain points of their workflow, and deliver iterative releases that increasingly cuts down turnaround time.",
      "Reliably integrated features in a live environment with sensitive data, including attendance tracking, RBAC, payment discrepancy detection, and rollback systems.",
    ],
  },
  {
    company: "All Walks Limited",
    role: "Software Developer Intern",
    period: "Dec 2025 – Jan 2026",
    type: "Full-time",
    description: [
      "Completed all assigned modules 4 days ahead of schedule, including settings, localization, content data pipelines and other core components.",
      "Audited outdated specifications and wrote onboarding documentation for future interns, greatly reducing handover friction and shortening ramp-up time from 2 weeks to 3-4 days.",
      "Spotted and resolved issues in the asset creation pipeline, helping design interns unfamiliar with best practices avoid ~3 days of wasted work.",
      "Reshaped long-term project direction through providing insight on the budget and scalability of different visual styles to the director during group meetings.",
    ],
  },
  {
    company: "Freelance",
    role: "Digital Illustrator",
    period: "Jan 2023 – Present",
    type: "Freelance",
    description: [
      "Secured repeat clients by consistently delivering high‑quality concept sketches and character art within 2-4 days.",
      "Independently managed project lifecycles across multiple clients, overseeing communication, revisions, and final delivery.",
    ],
  },
];
