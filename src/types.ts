export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  links: {
    label: string;
    url: string;
    icon?: string;
  }[];
  category: "game" | "web" | "art" | "workflow" | "ai";
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
  tags?: string[];
  type?:
    | "Full-time"
    | "Part-time"
    | "Freelance"
    | "Contract"
    | "Internship"
    | "Service Learning";
  links?: {
    label: string;
    url: string;
  }[];
  active?: boolean;
  /** Shown when the experience list is collapsed to highlights only. */
  featured?: boolean;
  /** Optional workplace photos shown inside the experience card. */
  images?: {
    src: string;
    alt: string;
  }[];
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
