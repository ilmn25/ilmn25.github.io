export const ILLUBOT_STACK = [
  { category: "Core", tools: ["Python", "MCP", "Voice Activation", "Discord Bot"] },
  { category: "LLM Support", tools: ["Azure AI", "GitHub Models", "Google Gemini", "Ollama"] },
  { category: "Memory", tools: ["Pinecone DB", "RAG"] },
  { category: "Skills", tools: ["Google Calendar", "Gmail", "System-Level Commands", "Github", "Web Search"] },
];

export const ILLUBOT_FEATURES = [
  {
    title: "Multiple LLM Providers",
    description:
      "Switch seamlessly between Azure, GitHub Models, Google Gemini, or Ollama for cost, latency, or capability.",
    iconType: "zap",
    image: "https://picsum.photos/seed/llm/800/450",
  },
  {
    title: "Google Calendar Integration",
    description:
      "Read, create, update and delete calendar events via the official Google Calendar API.",
    iconType: "calendar",
    image: "https://picsum.photos/seed/calendar/800/450",
  },
  {
    title: "Voice Activation & Discord Interfaces",
    description:
      "Interact with the agent anywhere as a Discord bot, or by talking to it via Voice Activation.",
    iconType: "terminal",
    image: "https://picsum.photos/seed/discord/800/450",
  },
  {
    title: "Extensible Skill System",
    description:
      "Built on MCP, the agent can load and run skills like calendar operations, utility commands, and more.",
    iconType: "puzzle",
    image: "https://picsum.photos/seed/skills/800/450",
  },
  {
    title: "Persistent Context & Memory",
    description:
      "Optional RAG memory backed by Pinecone allows the agent to recall previous conversations and data.",
    iconType: "database",
    image: "https://picsum.photos/seed/memory/800/450",
  },
];
