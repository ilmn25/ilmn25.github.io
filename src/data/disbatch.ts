import { ASSETS_URL } from "../constants";

export interface DisbatchFeature {
  title: string;
  description: string;
  iconType: "cloud" | "zap" | "database" | "languages" | "layout";
  image: string;
}

const DISBATCH_BASE = `${ASSETS_URL}/discord`;

export const DISBATCH_HIGHLIGHTS = [
  "Cloud-hosted architecture",
  "Real-time Discord API interaction",
  "Automated deployment workflow",
  "Multi-tenant data isolation",
];

export const DISBATCH_FEATURES: DisbatchFeature[] = [
  {
    title: "Cloud-Hosted Deployment",
    description:
      "Deployed on AWS ECS Fargate with Docker, providing a managed, serverless hosting environment.",
    iconType: "cloud",
    image: `${DISBATCH_BASE}/8.png`,
  },
  {
    title: "CI/CD Pipeline",
    description:
      "Ensuring consistent build and deployment to the live environment by automating CI/CD using GitHub Actions.",
    iconType: "zap",
    image: `${DISBATCH_BASE}/7.png`,
  },
  {
    title: "Scalable Data Storage",
    description:
      "Utilizes MongoDB for flexible data storage, allowing for efficient handling of highly flexible Discord message structures.",
    iconType: "database",
    image: `${DISBATCH_BASE}/9.png`,
  },
  {
    title: "Global & Responsive UI",
    description:
      "A multi-language localization system paired with a fully responsive layout built with Tailwind CSS for cross-device compatibility.",
    iconType: "languages",
    image: `${DISBATCH_BASE}/1.png`,
  },
];

export const DISBATCH_STRUCTURED_STACK = [
  { category: "/server", tools: ["FastAPI", "Python"] },
  { category: "/web", tools: ["React", "Tailwind", "JSX"] },
  { category: "Database", tools: ["MongoDB"] },
  { category: "Storage", tools: ["AWS S3"] },
  { category: "Keys", tools: ["AWS Secrets Manager"] },
  { category: "Hosting", tools: ["AWS ECS Fargate", "AWS ECR", "Docker"] },
  { category: "Discord", tools: ["dolfies/discord.py-self"] },
];

export const DISBATCH_GALLERY = [
  `${DISBATCH_BASE}/9.png`,
  `${DISBATCH_BASE}/8.png`,
  `${DISBATCH_BASE}/7.png`,
  `${DISBATCH_BASE}/10.png`,
  `${DISBATCH_BASE}/6.png`,
  `${DISBATCH_BASE}/5.png`,
  `${DISBATCH_BASE}/4.png`,
  `${DISBATCH_BASE}/3.png`,
  `${DISBATCH_BASE}/1.png`,
];
