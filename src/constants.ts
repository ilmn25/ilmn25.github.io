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
    category: "Languages",
    skills: [
      "Native English",
      "Native Cantonese",
      "Fluent Mandarin",
      "Beginner Japanese",
    ],
  },
  {
    category: "Frontend",
    skills: ["React", "React Native", "Vite", "Tailwind", "Google AI Studio"],
  },
  {
    category: "Backend & Full stack",
    skills: ["Node.js", "FastAPI", "Next.js", "MongoDB", "PostgreSQL"],
  },
  {
    category: "Cloud & Platforms",
    skills: ["AWS (IAM, ECS, ECR, S3)", "Supabase", "Vercel", "Stripe"],
  },
  {
    category: "DevOps & VCS",
    skills: ["Docker", "GitHub Actions", "Git"],
  },
  {
    category: "Game Development",
    skills: ["Unity", "Godot", "Defold"],
  },
  {
    category: "AI & Tools",
    skills: ["MCP", "RAG", "Pinecone", "OpenClaw"],
  },
  {
    category: "Design & Graphics",
    skills: ["Clip Studio Paint", "Canva", "Figma"],
  },
];

export const PROJECTS: Project[] = [
  {
    id: "illubot",
    title: "illubot",
    description:
      "A custom-built high-performance MCP AI agent.",
    category: "ai",
    tags: ["AI Agent", "MCP", "LLM", "RAG", "Pinecone", "Vector DB"],
    highlights: [
      "A comprehensive toolset for Google Calendar, Gmail, Github, system-level commands, and more.",
      "Real time voice activation and access from Discord Bot.",
      "Long-term memory retrieval architecture utilizing RAG with Pinecone vector database.",
      "Native support for LLM providers including GitHub, OpenAI, Ollama, and Gemini.",
      "Built for high reliability, capable of executing multi-step tasks autonomously.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/260228" }],
  },
  {
    id: "discord-tool",
    title: "Discord Message Tool",
    description:
      "A cloud-native web app for automating posts across many channels on Discord.",
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
      "A cloud-native web app for automating posts across many channels on Discord.",
      "Hosted on AWS ECS Fargate with Docker containerization.",
      "Integrated CI/CD pipeline via GitHub Actions.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/251128" }],
  },
  {
    id: "unity-game",
    title: "3D Unity Game",
    description:
      "A game project with procedural systems and interconnected behavioral algorithms.",
    category: "game",
    tags: ["Unity", "C#"],
    highlights: [
      "An optimized map partitioning system that manages world data in 3D chunks, enabling infinite procedural world generation.",
      "A custom-made set of DevTools for speeding up asset creation and systems testing.",
      "An advanced Pathfinding Algorithm and Navigation system, designed for 3D Voxel Maps where Unity's NavMesh fails, such as real time parkour.",
      "Integration with Unity's Job System and Burst Compiler to offload heavy computations, maintaining 200-300+ FPS on Average with no Frame Drops.",
      "Save and Load system that can maintain the World's Map, Inventory, all Entity Behaviours, and other Metadata.",
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
      "Sole developer of an internal end-to-end ERP and CRM application, covering bookings and attendance management, RBAC, payment discrepancy system, and more.",
      "Researched, bought, and integrated biometric scanning hardware support to automate check-in and improve data accuracy.",
      "Collaborated directly with business stakeholders to prioritize requirements and deliver iterative releases.",
    ],
  },
  {
    company: "All Walks Limited",
    role: "Software Developer Intern",
    period: "Dec 2025 – Jan 2026",
    type: "Full-time",
    description: [
      "Developed core app modules within the Unity framework and existing codebase. including settings, localization, game content pipeline, and more.",
      "Collaborated with leadership to scope and prioritize sprint tasks, complete planned deliverables on schedule.",
      "Authored and reviewed technical specifications and onboarding documentation, reducing handover friction and shortening intern ramp-up time.",
      "Diagnosed and resolved workflow issues in assets creation, improving UX quality and reducing art and animation rework.",
    ],
  },
  {
    company: "Freelance",
    role: "Digital Illustrator",
    period: "Jan 2023 – Present",
    type: "Freelance",
    description: [
      "Delivered concept sketches and character art for online clients with consistent on-time completion.",
      "Managed end-to-end project communication, revisions, and delivery across multiple concurrent commissions.",
    ],
  },
];
