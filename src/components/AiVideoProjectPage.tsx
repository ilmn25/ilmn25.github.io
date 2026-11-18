import React, { useEffect } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import {
  AI_VIDEO_HUB,
  AI_VIDEO_PHASES,
  AI_VIDEO_STACK,
} from "../data/aiVideo";
import type {
  AiVideoBubble,
  AiVideoBubbleKind,
  AiVideoPhase,
  AiVideoRow,
} from "../data/aiVideo";

interface AiVideoProjectPageProps {
  onBack: () => void;
}

const BubbleIcon: React.FC<{ kind: AiVideoBubbleKind }> = ({ kind }) => {
  switch (kind) {
    case "artifact":
      return <Sparkles className="w-3.5 h-3.5" />;
    case "guardrail":
      return <ShieldCheck className="w-3.5 h-3.5" />;
    default:
      return <Workflow className="w-3.5 h-3.5" />;
  }
};

const Bubble: React.FC<{ bubble: AiVideoBubble; feeder?: boolean }> = ({
  bubble,
  feeder = false,
}) => {
  const dark = bubble.kind === "artifact" && !feeder;

  return (
    <div
      className={`flex-1 min-w-0 rounded-2xl border px-4 py-3 transition-all duration-300 ${
        dark
          ? "border-slate-900 bg-slate-900 text-white shadow-md shadow-slate-900/10"
          : feeder
            ? "border-dashed border-slate-300 bg-white hover:border-slate-400"
            : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-2.5">
        {bubble.step ? (
          <span
            className={`mt-0.5 flex h-6 min-w-6 shrink-0 items-center justify-center rounded-lg px-1 text-[10px] font-bold ${
              dark ? "bg-white/15 text-white" : "bg-slate-900 text-white"
            }`}
          >
            {bubble.step}
          </span>
        ) : (
          <span
            className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg ${
              dark ? "bg-white/10 text-white" : "bg-slate-100 text-slate-500"
            }`}
          >
            <BubbleIcon kind={bubble.kind} />
          </span>
        )}
        <div className="min-w-0">
          <p
            className={`text-[13px] font-semibold leading-snug ${
              dark ? "text-white" : "text-slate-900"
            }`}
          >
            {bubble.label}
          </p>
          {bubble.subtitle && (
            <p
              className={`mt-0.5 text-[11px] leading-snug ${
                dark ? "text-slate-300" : "text-slate-500"
              }`}
            >
              {bubble.subtitle}
            </p>
          )}
          {bubble.inputs && bubble.inputs.length > 0 && (
            <div
              className={`mt-2 rounded-xl border border-dashed px-2.5 py-2 ${
                dark ? "border-white/15" : "border-slate-200 bg-slate-50/60"
              }`}
            >
              <p
                className={`font-mono text-[8px] uppercase tracking-[0.18em] ${
                  dark ? "text-slate-400" : "text-slate-400"
                }`}
              >
                Context in
              </p>
              <ul className="mt-1 space-y-0.5">
                {bubble.inputs.map((input) => (
                  <li
                    key={input}
                    className={`flex gap-1.5 text-[11px] leading-snug ${
                      dark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    <span
                      className={dark ? "text-slate-500" : "text-slate-300"}
                      aria-hidden="true"
                    >
                      ↳
                    </span>
                    <span className="min-w-0">{input}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {bubble.bullets && bubble.bullets.length > 0 && (
            <ul className="mt-2 space-y-1">
              {bubble.bullets.map((bullet) => (
                <li
                  key={bullet}
                  className={`flex gap-1.5 text-[11px] leading-snug ${
                    dark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <span
                    className={dark ? "text-slate-500" : "text-slate-300"}
                    aria-hidden="true"
                  >
                    •
                  </span>
                  <span className="min-w-0">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          {bubble.tag && (
            <span
              className={`mt-2 inline-block rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest ${
                dark
                  ? "border-white/15 text-slate-300"
                  : "border-slate-200 text-slate-400"
              }`}
            >
              {bubble.tag}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const VConnector: React.FC<{ dashed?: boolean; label?: string }> = ({
  dashed,
  label,
}) => (
  <div className="flex flex-col items-center py-1">
    <span
      className={`h-4 ${dashed ? "border-l border-dashed border-slate-300" : "w-px bg-slate-200"}`}
    />
    <ArrowDown className="w-3.5 h-3.5 text-slate-300" />
    {label && (
      <span className="mt-1 rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">
        {label}
      </span>
    )}
  </div>
);

const InlineArrow: React.FC<{ label?: string }> = ({ label }) => (
  <div className="flex items-center justify-center gap-2 sm:flex-col sm:gap-1">
    <ArrowDown className="w-3.5 h-3.5 shrink-0 text-slate-300 sm:hidden" />
    <ArrowRight className="hidden w-3.5 h-3.5 shrink-0 text-slate-300 sm:block" />
    {label && (
      <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">
        {label}
      </span>
    )}
  </div>
);

const SideBubbles: React.FC<{
  bubbles: AiVideoBubble[];
  direction: "in" | "out";
}> = ({ bubbles, direction }) => (
  <div className="flex flex-col gap-2 lg:w-72 lg:shrink-0">
    <div className="flex items-center gap-2 lg:hidden">
      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
        {direction === "in" ? "Feeds in" : "Produces"}
      </span>
      <span className="h-px flex-1 border-t border-dashed border-slate-200" />
    </div>
    {bubbles.map((bubble) => (
      <div key={bubble.id} className="flex items-center gap-2">
        <span className="hidden h-px w-4 border-t border-dashed border-slate-300 lg:block" />
        <ArrowLeft
          className={`hidden w-3 h-3 shrink-0 text-slate-300 lg:block ${
            direction === "out" ? "rotate-180" : ""
          }`}
        />
        <Bubble bubble={bubble} feeder />
      </div>
    ))}
  </div>
);

const FlowRow: React.FC<{ row: AiVideoRow }> = ({ row }) => (
  <div>
    {row.connector && row.connector !== "none" && (
      <VConnector dashed={row.dashed} label={row.linkLabel} />
    )}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-stretch">
        {row.nodes.map((node, i) => (
          <React.Fragment key={node.id}>
            {i > 0 && row.inline && <InlineArrow label={row.inlineLabel} />}
            <Bubble bubble={node} />
          </React.Fragment>
        ))}
      </div>
      {row.outputs && row.outputs.length > 0 && (
        <SideBubbles bubbles={row.outputs} direction="out" />
      )}
    </div>
  </div>
);

const PhaseCard: React.FC<{ phase: AiVideoPhase }> = ({ phase }) => (
  <RevealOnScroll direction="up">
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:p-8">
      <div className="mb-6 flex flex-wrap items-start gap-3">
        <span className="rounded-full bg-slate-900 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
          {phase.eyebrow}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 md:text-lg">
            {phase.title}
          </h3>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
            {phase.summary}
          </p>
        </div>
      </div>
      <div>
        {phase.rows.map((row, i) => (
          <FlowRow key={`${phase.id}-${i}`} row={row} />
        ))}
      </div>
    </div>
  </RevealOnScroll>
);

const HubBubble: React.FC = () => (
  <div className="flex justify-center">
    <div className="w-full max-w-md rounded-2xl bg-slate-900 px-5 py-4 text-center text-white shadow-lg shadow-slate-900/10">
      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
        Shared context
      </span>
      <p className="mt-1 text-sm font-bold">{AI_VIDEO_HUB.label}</p>
      {AI_VIDEO_HUB.subtitle && (
        <p className="mt-0.5 text-[11px] leading-snug text-slate-300">
          {AI_VIDEO_HUB.subtitle}
        </p>
      )}
    </div>
  </div>
);

const LEGEND = [
  { swatch: "bg-white border-slate-200", label: "Pipeline step" },
  { swatch: "bg-slate-900 border-slate-900", label: "Generated artifact" },
  {
    swatch: "bg-white border-dashed border-slate-300",
    label: "Snippet handed to the next phase",
  },
];

const AiVideoProjectPage: React.FC<AiVideoProjectPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [characterPhase, scriptPhase, clipPhase, datasetPhase] =
    AI_VIDEO_PHASES;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-8 md:px-12 lg:px-16 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-8 transition-all group shrink-0"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <RevealOnScroll direction="up">
          <header className="mb-10">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              PolyU FCMS · AI Video Job
            </p>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI Lesson Video Pipeline
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed mt-2">
              An interactive, personalized lesson is generated from four phases:
              character definition, story &amp; script generation, safety
              guardrails, and branched clip rendering. Each phase hands a
              stable artifact to the next so visuals and narration stay
              consistent across every scene.
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {AI_VIDEO_STACK.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 bg-white rounded text-[10px] uppercase tracking-wider font-bold text-slate-500 border border-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>
        </RevealOnScroll>

        <section className="mb-16">
          <RevealOnScroll direction="up" delay={100}>
            <div className="mb-5 flex items-center gap-3">
              <Layers className="w-5 h-5 text-slate-900" />
              <h2 className="text-xl font-semibold text-slate-900">
                Pipeline Diagram
              </h2>
            </div>
          </RevealOnScroll>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50/60 p-4 md:p-8">
            <div className="space-y-3">
              <PhaseCard phase={characterPhase} />
              <VConnector dashed />
              <RevealOnScroll direction="up">
                <HubBubble />
              </RevealOnScroll>
              <VConnector />
              <PhaseCard phase={scriptPhase} />
              <VConnector />
              <PhaseCard phase={clipPhase} />
              <VConnector />
              <PhaseCard phase={datasetPhase} />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
              {LEGEND.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <span
                    className={`h-3 w-6 rounded-full border ${item.swatch}`}
                  />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <RevealOnScroll direction="up">
          <div className="flex flex-col items-center justify-center py-10 border-t border-slate-100">
            <p className="text-slate-400 font-mono text-[9px] mb-5 tracking-widest uppercase">
              Back to the rest of the portfolio
            </p>
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-black transition-all hover:scale-105 shadow-md shadow-slate-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Projects &amp; Experience
            </button>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default AiVideoProjectPage;
