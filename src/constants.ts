import { Project, Experience, SkillGroup } from "./types";

export const ASSETS_URL =
  "https://raw.githubusercontent.com/ilmn25/ilmn25.github.io/refs/heads/prod/assets";

/**
 * Bundled images served from `public/`, so they resolve in dev, preview and
 * production builds without depending on the raw GitHub assets branch.
 */
const BUNDLED_ASSETS_URL = import.meta.env.BASE_URL;

export const PERSONAL_INFO = {
  name: "illu",
  avatar: `${ASSETS_URL}/pfp.png`,
  title:
    "CS student specializing in cloud-hosted services, enterprise systems, and AI-powered tools.",
  description1: "CS student specializing in",
  description2: "cloud-hosted services, enterprise",
  description3: "systems, and AI-powered tools.",
  education:
    "BSc (Hons) in Computer Science + Minor in Japanese @ The Hong Kong Polytechnic University Sep 2023 – Jul 2027",
  degree: "BSc (Hons) in Computer Science + Minor in Japanese",
  degreeMobile: "BSc (Hons) in Computer Science",
  uni: "@ The Hong Kong Polytechnic University",
  uniPeriod: "Sep 2023 – Jul 2027",
  birthday: "20/05/2005 EN 中",
  decoration: "+-= ═.·:·.☽ ✧  ✦  ✧ ☾.·:·.═ =-+",
  contact: {
    whatsapp: "+852 6236 5318",
    email: "kilmn025@gmail.com",
    discord: "ilmn",
  },
  social: {
    github: "https://github.com/ilmn25",
    resume:
      "https://docs.google.com/document/d/1EXzindBoId3J1ePtDNtXYuC0-K_bDDBOZi4cdc-akdk/edit?usp=sharing",
  },
};

export const PROJECT_NAV = [
  { id: "illubot", label: "illubot", category: "MCP Agent" },
  { id: "morimori", label: "morimori", category: "Game Dev" },
  {
    id: "counter",
    label: "Counter",
    category: "Web App",
  },
  {
    id: "disbatch",
    label: "Disbatch",
    category: "Cloud Tools",
  },
  {
    id: "specify",
    label: "Specify",
    category: "Automation",
  },
  { id: "illustrations", label: "Art Portfolio", category: "ilmnn.net" },
];

export const SKILLS: SkillGroup[] = [
  {
    category: "Programming Languages",
    skills: [
      "Python",
      "R",
      "Lua",
      "Java",
      "C#",
      "C/C++",
      "HTML",
      "CSS",
      "JS/TS",
      "SQL",
    ],
  },
  {
    category: "AI & Databases",
    skills: [
      "MCP",
      "RAG",
      "Fine-tuning",
      "n8n",
      "Pinecone",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
    ],
  },
  {
    category: "Frameworks",
    skills: [
      "Node.js",
      "React",
      "React Native",
      "Flask",
      "FastAPI",
      "Next.js",
      "Vite",
      "Tailwind CSS",
    ],
  },
  {
    category: "Cloud & DevOps",
    skills: [
      "Linux",
      "Docker",
      "Git",
      "GitHub Actions",
      "Supabase",
      "Vercel",
      "Cloudflare",
      "AWS (IAM, ECS, ECR, S3)",
    ],
  },
  {
    category: "Tools",
    skills: [
      "VMWare",
      "VirtualBox",
      "Excel/Word",
      "Photoshop",
      "AfterEffects",
      "Figma",
      "Lark",
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
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/illubot.jpg`,
      alt: "illubot chat interface answering a question from conversation memory",
    },
    tags: ["AI Agent", "MCP", "LLM", "RAG", "Pinecone", "Vector DB"],
    highlights: [
      "Integrated support for multiple LLM providers, enabling cost‑free usage by seamlessly switching between endpoints when the free tier of one provider is temporarily exhausted.",
      "Introduced hands free use via voice command, or remote access via Discord Bot.",
      "Implemented long-term memory retrieval utilizing RAG with Pinecone vector database.",
    ],
    links: [{ label: "GitHub Repo", url: "https://github.com/ilmn25/260228" }],
  },
  {
    id: "disbatch",
    title: "Disbatch",
    description:
      "A three-tier automated marketing system for Discord that streamlines cross-server posting and deployments.",
    category: "web",
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/disbatch.jpg`,
      alt: "Disbatch post composer interface",
    },
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
    links: [
      { label: "Landing Page", url: "https://portfolio.ilmnn.net/Disbatch/" },
      { label: "GitHub Repo", url: "https://github.com/ilmn25/251128" },
    ],
  },
  {
    id: "morimori",
    title: "morimori",
    description:
      "A survival game featuring infinite procedural generation and optimized map partitioning.",
    category: "game",
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/morimori.jpg`,
      alt: "morimori procedural world populated with characters",
    },
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
    id: "counter",
    title: "Counter",
    description:
      "A three-tier custom ERP and CRM web application built to streamline Attendance, client communication, and operations management for education centers.",
    category: "web",
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/counter.jpg`,
      alt: "Counter student directory with portal access management",
    },
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
    id: "specify",
    title: "Specify",
    description:
      "A prompt driven workflow to speed up the migration of legacy SPAs to AI-first IDEs such as Google AI Studio.",
    category: "workflow",
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/specify.jpg`,
      alt: "Generated specification output for a migrated site",
    },
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
    title: "Art Portfolio",
    description: "My digital art portfolio site.",
    category: "art",
    image: {
      src: `${BUNDLED_ASSETS_URL}projects/illustrations.jpg`,
      alt: "Colored digital illustration of an original character",
    },
    tags: ["cloudflare", "dns", "design"],
    highlights: [
      "Hosted on custom via Cloudflare and Github Pages",
      "Secured repeat clients by consistently delivering high‑quality sketches and character art on time.",
      "Independently managed project lifecycles across multiple clients, overseeing communication, revisions, and final delivery.", 
    ],
    links: [{ label: "ilmnn.net", url: "https://ilmnn.net/illustrations/colored" }],
  },
  // {
  //   id: "ilmnnn-website",
  //   title: "ILMNNNNNNNN",
  //   description:
  //     "This is a work-in-progress conceptual mockup for a clothing and accessories brand.",
  //   category: "web",
  //   tags: [],
  //   highlights: [],
  //   links: [],
  // },
];

export const EXPERIENCES: Experience[] = [ 
  {
    company: "HK Hospital Authority",
    role: "Intern - Technical Infrastructure Services",
    period: "Jul. 2026 – Jun. 2027",
    type: "Full-time",
    featured: true,
    tags: [
      "Python",
      "Bash",
      "VBS",
      "Linux",
      "UNIX",
      "TCP/IP",
      "SSH",
      "MySQL",
      "Excel",
    ],
    description: [
      "Engineered automated pipelines to handle daily inventory updates, SSH key provisioning, Networker backup scheduling, and deadline reminders, significantly reducing operational overhead.",
      "Automated the validation of network configuration, storage allocations, and account privilege across new servers, saving hours of review and auditing and preventing human checking error.",
    ],
    images: [
      {
<<<<<<< HEAD
        src: `${BUNDLED_ASSETS_URL}ha/1.jpg`,
        alt: "Reception and pantry area of the Hospital Authority office",
      },
      {
        src: `${BUNDLED_ASSETS_URL}ha/2.jpg`,
=======
        src: `${ASSETS_URL}/ha/1.jpg`,
        alt: "Reception and pantry area of the Hospital Authority office",
      },
      {
        src: `${ASSETS_URL}/ha/2.jpg`,
>>>>>>> 3ea0583ac7564c205c2f3aea1eabb73e5af70dd9
        alt: "Multi-monitor workstation used for infrastructure automation work",
      },
    ],
    active: true,
  },
  {
    company: "FCMS, The Hong Kong Polytechnic University",
    role: "AI Project Assistant",
    period: "Oct. 2026 – Jun. 2027",
    type: "Part-time",
    featured: true,
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "Docker",
      "DeepSeek",
      "AI Orchestration",
      "Video Generation",
    ],
    description: [
      "Collaborating on a faculty research project to engineer an autonomous pipeline that generates personalized AI educational content for diverse user profiles.",
      "Formulating multi-shot prompt architectures and script generation workflows to dynamically adjust lesson pacing, tone, and complexity based on target demographics.",
    ],
    active: true,
  }, 
  {
    company: "FCMS, The Hong Kong Polytechnic University",
    role: "Data Science Project Assistant",
    period: "Nov. 2027",
    type: "Part-time",
    featured: false, 
    description: [
      "Recorded accelerometer telemetry and synchronized video footage from official Hong Kong national football team athletes for AI training dataset generation."
    ],
    images: [
      {
        src: `${BUNDLED_ASSETS_URL}fcms/1.jpg`,
        alt: "Capture session software tracking accelerometer telemetry beside the training hall",
      },
      {
        src: `${BUNDLED_ASSETS_URL}fcms/2.jpg`,
        alt: "Sports hall set up with a numbered target board during data collection",
      },
    ],
    active: false,
  },
  {
    company: "FCMS, The Hong Kong Polytechnic University",
    role: "PolyU Info Day Student Assistant",
    period: "Oct. 2026",
    type: "Part-time",
    description: [
      "Answered questions and provided guidance to prospective students and their families during the PolyU Info Day event.",
    ],
  },
  {
    company: "St. Joan of Arc Secondary School",
    role: "STEM Instructor",
    period: "Jul. 2026",
    type: "Service Learning",
    featured: true,
    tags: ["C++", "Arduino", "React", "Google AI Studio"],
    description: [
      "Prepared material and taught students embedded programming with C++ for Arduino-powered DIY 3D printers and AI-assisted web development using Google AI Studio.",
    ],
  },
  {
    company: "Time Super Centre",
    role: "Full Stack Developer & IT Support",
    period: "Jan. 2026 – Jun. 2026",
    type: "Part-time",
    featured: true,
    tags: [
      "HTML",
      "CSS",
      "JavaScript/TypeScript",
      "RESTful API",
      "React",
      "PostgreSQL",
      "Supabase",
    ],
    description: [
      "Developed an internal ERP/CRM administrative system, working with staff and owners to understand business pain points, saving staff 30+ hours per month.",
      "Reliably integrated features in a live environment with 1200+ booking data entries, including RBAC, payment reconciliation, and rollback systems.",
      "Researched, procured, and integrated biometric scanning hardware to enable self check-in for younger students, fully automating attendance and eliminating manual entry errors.",
    ],
    links: [
      {
        label: "Showcase",
        url: "/counter",
      },
    ],
  },
  {
    company: "FCMS, The Hong Kong Polytechnic University",
    role: "CMS Competition Student Assistant",
    period: "Jun. 2026",
    type: "Part-time",
    description: [
      "Assisted in the operations of the PolyU Young Minds in Computer and Mathematical Sciences Competition",
    ],
  },
  {
    company: "AWIL Group Limited",
    role: "Software Engineer - Winter Intern",
    period: "Dec. 2025 - Jan. 2026",
    type: "Full-time",
    featured: true,
    tags: ["C#", "GitHub", "Excel", "Unity"],
    description: [
      "Developed application-wide settings, localization systems, and content pipelines, delivering 4 days ahead of schedule.",
      "Resolved asset pipeline issues and guided interns unfamiliar with best practices, preventing ~3 days of wasted work while influencing project direction with budget/scalability insights.",
      "Audited outdated specs and authored onboarding documentation, reducing intern ramp-up time from 2 weeks to 3–4 days.",
    ],
    links: [
      {
        label: "Internship Report",
        url: "https://drive.google.com/file/d/1W13QO1ru_nBYM8w-aaxUVdNtevZwl_wx/view?usp=sharing",
      },
    ],
  },
  {
    company: "Freelance",
    role: "Digital Illustrator",
    period: "Aug. 2022 - present",
    type: "Part-time", 
    description: [
      "Secured repeat clients by consistently delivering high‑quality sketches and character art on time.",
      "Independently managed project lifecycles across multiple clients, overseeing communication, revisions, and final delivery.",
    ],
  },
];
