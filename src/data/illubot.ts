import { ASSETS_URL } from "../constants";

export interface IllubotFeature {
  title: string;
  description: string;
  iconType: "zap" | "calendar" | "terminal" | "puzzle" | "database";
  image: string;
}

const ILLUBOT_BASE = `${ASSETS_URL}/illubot`;

export const ILLUBOT_HIGHLIGHTS = [
  "Multi-LLM provider support",
  "Voice & Discord interfaces",
  "RAG-based long-term memory",
  "Extensible MCP skill system",
];

export const ILLUBOT_FEATURES: IllubotFeature[] = [
  {
    title: "Multiple LLM Providers",
    description:
      "Switch seamlessly between Azure, GitHub Models, Google Gemini, or Ollama for cost, latency, or capability.",
    iconType: "zap",
    image: `${ILLUBOT_BASE}/1.png`,
  },
  {
    title: "Google Calendar Integration",
    description:
      "Read, create, update and delete calendar events via the official Google Calendar API.",
    iconType: "calendar",
    image: `${ILLUBOT_BASE}/2.png`,
  },
  {
    title: "Voice Activation & Discord Interfaces",
    description:
      "Interact with the agent anywhere as a Discord bot, or by talking to it via Voice Activation.",
    iconType: "terminal",
    image: `${ILLUBOT_BASE}/3.png`,
  },
  {
    title: "Extensible Skill System",
    description:
      "Built on MCP, the agent can load and run skills like calendar operations, utility commands, and more.",
    iconType: "puzzle",
    image: `${ILLUBOT_BASE}/4.png`,
  },
  {
    title: "Persistent Context & Memory",
    description:
      "Optional RAG memory backed by Pinecone allows the agent to recall previous conversations and data.",
    iconType: "database",
    image: `${ILLUBOT_BASE}/5.png`,
  },
];

export const ILLUBOT_STRUCTURED_STACK = [
  {
    category: "Core",
    tools: ["Python", "MCP", "Voice Activation", "Discord Bot"],
  },
  {
    category: "LLM Support",
    tools: ["Azure AI", "GitHub Models", "Google Gemini", "Ollama"],
  },
  { category: "Memory", tools: ["Pinecone DB", "RAG"] },
  {
    category: "Skills",
    tools: [
      "Google Calendar",
      "Gmail",
      "System-Level Commands",
      "Github",
      "Web Search",
    ],
  },
];

export const ILLUBOT_GALLERY = [
  `${ILLUBOT_BASE}/1.png`,
  `${ILLUBOT_BASE}/2.png`,
  `${ILLUBOT_BASE}/3.png`,
  `${ILLUBOT_BASE}/4.png`,
  `${ILLUBOT_BASE}/5.png`,
];
