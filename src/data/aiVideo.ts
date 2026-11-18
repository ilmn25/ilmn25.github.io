export type AiVideoBubbleKind = "step" | "artifact" | "guardrail";

export interface AiVideoBubble {
  id: string;
  label: string;
  subtitle?: string;
  /** Small numbered badge rendered on the left of the bubble. */
  step?: string;
  /** Model / provider badge rendered under the label. */
  tag?: string;
  bullets?: string[];
  /** Context listed inside the bubble instead of flowing in from outside. */
  inputs?: string[];
  /** Artifacts the step produces, listed inside the bubble. */
  outputs?: { label: string; detail?: string }[];
  kind: AiVideoBubbleKind;
}

export interface AiVideoRow {
  nodes: AiVideoBubble[];
  connector?: "single" | "split" | "merge" | "none";
  /** Render the incoming connector as a dashed line. */
  dashed?: boolean;
  /** Caption attached to the incoming connector. */
  linkLabel?: string;
  /** Draw an arrow between the nodes of this row. */
  inline?: boolean;
  /** Caption attached to the inline arrow. */
  inlineLabel?: string;
}

export interface AiVideoPhase {
  id: string;
  eyebrow: string;
  title: string;
  summary: string;
  rows: AiVideoRow[];
}

export const AI_VIDEO_HUB: AiVideoBubble = {
  id: "character-persona",
  label: "Character",
  subtitle: "Persona & visuals reused by every downstream step",
  kind: "artifact",
};

export const AI_VIDEO_PHASES: AiVideoPhase[] = [
  {
    id: "character-definition",
    eyebrow: "Phase 1",
    title: "Character Definition",
    summary:
      "Lock down who the lesson is about. A written persona plus a rendered reference sheet become the conditioning input for every generated clip.",
    rows: [
      {
        connector: "none",
        nodes: [
          {
            id: "choose-character",
            step: "1",
            label: "Choose or Generate Starring Character",
            subtitle: "Name & description",
            tag: "DeepSeek API",
            kind: "step",
          },
        ],
      },
      {
        connector: "split",
        nodes: [
          { id: "character-name", label: "Character Name", kind: "artifact" },
          {
            id: "character-description",
            label: "Character Description",
            kind: "artifact",
          },
        ],
      },
      {
        connector: "merge",
        nodes: [
          {
            id: "reference-sheet",
            step: "2",
            label: "Upload / Generate Reference Sheet",
            subtitle: "Visual consistency",
            tag: "Kling Omni API",
            inputs: ["Stylistic & requirements prompts"],
            kind: "step",
          },
        ],
      },
    ],
  },
  {
    id: "story-and-script",
    eyebrow: "Phase 2 – 3",
    title: "Story & Script Generation",
    summary:
      "The story is expanded into narration, environment and teaching questions, then cut into script snippets that map one-to-one onto clips.",
    rows: [
      {
        connector: "single",
        nodes: [
          {
            id: "story-idea",
            step: "3",
            label: "Choose or Generate Story Idea",
            subtitle: "Lesson premise",
            tag: "DeepSeek API",
            inputs: [
              "Character persona & visuals",
              "Account interests (personalization)",
            ],
            kind: "step",
          },
        ],
      },
      {
        connector: "single",
        nodes: [
          {
            id: "generate-story",
            step: "4a",
            label: "Generate Story",
            subtitle: "Dialogue & actions",
            tag: "DeepSeek API",
            inputs: ["Story idea", "Character persona & visuals"],
            kind: "step",
          },
        ],
      },
      {
        connector: "single",
        nodes: [
          {
            id: "generate-environment",
            step: "4b",
            label: "Generate Environment",
            subtitle: "Scenery & key props",
            tag: "DeepSeek API",
            inputs: ["Story & dialogue from 4a"],
            outputs: [
              {
                label: "Story script snippets",
                detail:
                  "Dialogue + actions + scenery & key props · est. 3–5s clip",
              },
            ],
            kind: "step",
          },
        ],
      },
      {
        connector: "single",
        nodes: [
          {
            id: "generate-teaching",
            step: "4c",
            label: "Generate Teaching Questions",
            subtitle: "Questions from story visuals",
            tag: "DeepSeek API",
            inputs: ["Environment & key props", "Teaching topics (curriculum)"],
            outputs: [
              {
                label: "Question script snippets",
                detail:
                  "Question dialogue + 3 answers (preset emoji / icon) · fixed 3s clip",
              },
            ],
            kind: "step",
          },
        ],
      },
    ],
  },
  {
    id: "guardrails-and-clips",
    eyebrow: "Phase 4",
    title: "Guardrails & Clip Generation",
    summary:
      "Every snippet is moderated before rendering, then branched by clip type so story clips can hand their last frame to the looping question clip.",
    rows: [
      {
        connector: "single",
        linkLabel: "Story & question snippets",
        nodes: [
          {
            id: "guardrail",
            label: "Vulgarity & Safety Guardrail",
            subtitle: "Content moderation filter",
            kind: "guardrail",
          },
        ],
      },
      {
        connector: "single",
        nodes: [
          {
            id: "generate-clips",
            step: "5",
            label: "Generate Clips One by One",
            subtitle: "Branch by clip type",
            tag: "Kling Omni API",
            inputs: [
              "Moderated snippets (story & question)",
              "Character reference sheet",
              "Stylistic & requirements prompts",
            ],
            kind: "step",
          },
        ],
      },
      {
        connector: "split",
        inline: true,
        inlineLabel: "Last Frame",
        nodes: [
          {
            id: "story-clip",
            label: "Story Clip",
            tag: "Kling 4.0 Flash",
            bullets: [
              "Generates the narrative clip as usual",
              "Uses character reference & script segment",
              "Outputs last frame for the question",
            ],
            kind: "artifact",
          },
          {
            id: "question-clip",
            label: "Question Clip",
            tag: "Kling 4.0",
            bullets: [
              "Sets the previous last frame as start & end",
              "Generates a seamless loop for the question",
              "Flash lacks start_frame support",
            ],
            kind: "artifact",
          },
        ],
      },
    ],
  },
  {
    id: "lesson-dataset",
    eyebrow: "Step 6",
    title: "Lesson Dataset",
    summary:
      "Clips are persisted against the lesson and assembled into the final interactive video.",
    rows: [
      {
        connector: "merge",
        nodes: [
          {
            id: "save-dataset",
            step: "6",
            label: "Save All as Lesson Dataset",
            subtitle: "Assembles into the final interactive video",
            kind: "step",
          },
        ],
      },
    ],
  },
];

export const AI_VIDEO_STACK = [
  "DeepSeek API",
  "Kling Omni API",
  "Kling 4.0 Flash",
  "React",
  "TypeScript",
  "FastAPI",
  "Docker",
  "GitHub Actions",
];
