import { Project, Experience, SkillGroup } from "./types";

export const ASSETS_URL =
  "https://raw.githubusercontent.com/ilmn25/ilmn25.github.io/refs/heads/prod/assets";

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
    cv: "https://docs.google.com/document/d/1EXzindBoId3J1ePtDNtXYuC0-K_bDDBOZi4cdc-akdk/edit?tab=t.y8yet742xmnd",
  },
};

export const PROJECT_NAV = [
  { id: "illubot", label: "illubot", category: "MCP Agent" },
  { id: "morimori", label: "Morimori", category: "Game Dev" },
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
      src: `${ASSETS_URL}/illubot/3.png`,
      alt: "illubot console logs for speech input",
    },
    tags: ["AI Agent", "MCP", "LLM", "RAG", "Pinecone", "Vector DB"],
    highlights: [
      "Built an MCP-based AI agent integrating retrieval-augmented generation (RAG) and vector memory using Pinecone, enabling persistent context retrieval and multi-step task execution.",
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
      src: `${ASSETS_URL}/disbatch/1.png`,
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
      "Developed a marketing automation tool for Discord, reducing manual labour of bulk messaging from hours to just minutes.",
      "Designed containerized CI/CD workflows using Docker and GitHub Actions, streamlining AWS ECS Fargate deployments into a single command.",
    ],
    links: [
      { label: "GitHub Repo", url: "https://github.com/ilmn25/251128" },
    ],
  },
  {
    id: "morimori",
    title: "Morimori",
    description:
      "A survival game featuring infinite procedural generation and optimized map partitioning.",
    category: "game",
    image: {
      src: `${ASSETS_URL}/morimori/1.png`,
      alt: "Morimori procedural world populated with characters",
    },
    tags: ["Unity", "C#"],
    highlights: [
      "Built an optimized map partitioning system that manages world data in 3D chunks, enabling vast procedural world generation.",
      "Achieved 200-400 FPS on integrated graphics through Unity Job System parallelization and Burst Compiler optimization.",
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
      src: `${ASSETS_URL}/counter/18.png`,
      alt: "Counter bookings page",
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
      src: `${ASSETS_URL}/specify/3.png`,
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
      src: `${ASSETS_URL}/illustrations/colored/19.png`,
      alt: "Colored digital illustration of a character",
    },
    tags: ["cloudflare", "dns", "design"],
    highlights: [
      "Hosted on custom via Cloudflare and Github Pages",
      "Secured repeat clients by consistently delivering high‑quality sketches and character art on time.",
      "Independently managed project lifecycles across multiple clients, overseeing communication, revisions, and final delivery.", 
    ],
    links: [{ label: "ilmnn.net", url: "https://ilmnn.net/illustrations/colored" }],
  },
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
        src: `${ASSETS_URL}/ha/1.jpg`,
        alt: "Reception and pantry area of the Hospital Authority office",
      },
      {
        src: `${ASSETS_URL}/ha/2.jpg`,
        alt: "Multi-monitor workstation used for infrastructure automation work",
      },
    ],
    active: true,
  },
  {
    company: "FCMS, The Hong Kong Polytechnic University",
    role: "AI Project Assistant",
    period: "Jul. 2026 – Jun. 2027",
    type: "Part-time",
    featured: true,
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "Docker",
      "AI Orchestration",
      "Video Generation",
    ],
    description: [
      "Collaborating on a faculty research project to engineer an autonomous pipeline that generates personalized AI educational content for diverse user profiles.",
      "Formulating multi-shot prompt architectures and script generation workflows to dynamically adjust lesson pacing, tone, and complexity based on target demographics.",
    ],
    images: [
      {
        src: `${ASSETS_URL}/fcms/6.png`,
        alt: "Post-render editor",
      },
      {
        src: `${ASSETS_URL}/fcms/7.png`,
        alt: "Script and prompt editor pre-render",
      },
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
        src: `${ASSETS_URL}/fcms/1.jpg`,
        alt: "Capture session software tracking accelerometer telemetry beside the training hall",
      },
      {
        src: `${ASSETS_URL}/fcms/2.jpg`,
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
    images: [
      {
        src: `${ASSETS_URL}/fcms/4.jpg`,
        alt: "Classroom",
      }, 
      {
        src: `${ASSETS_URL}/fcms/8.jpg`,
        alt: "Cookie printed via Arduino-powered 3D printer, controlled with C++ code",
      }, 
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
      "Built and deployed an ERP/CRM platform used by teaching staff, automating administrative workflows and reducing manual workload by 30+ hours per month.",
      "Delivered RBAC, payment reconciliation, and rollback functionality in a production environment containing 1,200+ booking records while maintaining system reliability.",
      "Researched, procured, and integrated biometric attendance hardware, enabling fully automated student check-ins and eliminating manual attendance-entry errors.",
    ],
    images: [
      {
        src: `${ASSETS_URL}/counter/18.png`,
        alt: "Reception and pantry area of the Hospital Authority office",
      },
      {
        src: `${ASSETS_URL}/counter/13.png`,
        alt: "Multi-monitor workstation used for infrastructure automation work",
      },
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
    images: [
      {
        src: `${ASSETS_URL}/fcms/3.jpg`,
        alt: "IT Lab where a stage of the competition was held",
      }, 
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
      "Audited outdated specs and authored onboarding documentation, reducing intern ramp-up time from 2 weeks to 3–4 days.",
      "Developed application-wide settings, localization systems, and content pipelines, delivering 4 days ahead of schedule.",
      "Resolved asset pipeline issues and guided interns unfamiliar with best practices, preventing ~3 days of wasted work while influencing project direction with budget/scalability insights.",
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
    images: [
      {
        src: `${ASSETS_URL}/illustrations/sketch/17.png`,
        alt: "IT Lab where a stage of the competit  ion was held",
      }, 
    ],
  },
];