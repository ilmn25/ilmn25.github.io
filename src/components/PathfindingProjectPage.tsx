import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  GitBranch,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import {
  PATHFINDING_FLOW,
  PATHFINDING_META,
  PATHFINDING_SECTIONS,
} from "../data/pathfinding";
import type {
  PathfindingCode,
  PathfindingSection,
  PathfindingTable,
} from "../data/pathfinding";

interface PathfindingProjectPageProps {
  onBack: () => void;
}

const PARTS = PATHFINDING_SECTIONS.reduce<
  { part: string; sections: PathfindingSection[] }[]
>((groups, section) => {
  const last = groups[groups.length - 1];
  if (last && last.part === section.part) last.sections.push(section);
  else groups.push({ part: section.part, sections: [section] });
  return groups;
}, []);

const CodeBlock: React.FC<{ block: PathfindingCode }> = ({ block }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(block.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard access can be denied; the excerpt is still readable.
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
          {block.caption}
        </span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-1.5 py-1 text-[10px] font-semibold text-slate-400 transition-colors hover:text-white"
        >
          {copied ? (
            <Check className="h-3 w-3" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-3.5">
        <code className="font-mono text-[11px] leading-relaxed text-slate-200">
          {block.code}
        </code>
      </pre>
    </div>
  );
};

const DataTable: React.FC<{ table: PathfindingTable }> = ({ table }) => (
  <div>
    {table.caption && (
      <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-slate-400">
        {table.caption}
      </p>
    )}
    <div className="overflow-x-auto rounded-2xl border border-slate-200">
      <table className="w-full min-w-[420px] border-collapse text-left">
        <thead>
          <tr className="bg-slate-50">
            {table.columns.map((column) => (
              <th
                key={column}
                className="px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, i) => (
            <tr
              key={row[0]}
              className={i % 2 === 1 ? "bg-slate-50/40" : "bg-white"}
            >
              {row.map((cell, j) => (
                <td
                  key={`${row[0]}-${j}`}
                  className={`px-4 py-2 text-xs leading-snug ${
                    j === 0
                      ? "font-mono text-[11px] font-semibold text-slate-900"
                      : "text-slate-600"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const PartDivider: React.FC<{ part: string }> = ({ part }) => (
  <div className="flex items-center gap-3">
    <span className="h-[1px] flex-1 bg-slate-200" />
    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-slate-400">
      {part}
    </span>
    <span className="h-[1px] flex-1 bg-slate-200" />
  </div>
);

const SectionBody: React.FC<{ section: PathfindingSection }> = ({
  section,
}) => (
  <RevealOnScroll direction="up">
    <section id={section.id} className="scroll-mt-28">
      <p className="mb-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
        {section.eyebrow}
      </p>
      <h2 className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
        {section.title}
      </h2>
      <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-500 md:text-sm">
        {section.summary}
      </p>

      {section.paragraphs?.map((paragraph) => (
        <p
          key={paragraph.slice(0, 40)}
          className="mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 md:text-[13px]"
        >
          {paragraph}
        </p>
      ))}

      {section.bullets && (
        <ul className="mt-4 space-y-2">
          {section.bullets.map((bullet) => (
            <li
              key={bullet.slice(0, 40)}
              className="flex max-w-2xl gap-2.5 text-xs leading-relaxed text-slate-600 md:text-[13px]"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      )}

      {section.code && (
        <div className="mt-4">
          <CodeBlock block={section.code} />
        </div>
      )}

      {section.table && (
        <div className="mt-4">
          <DataTable table={section.table} />
        </div>
      )}

      {section.note && (
        <div
          className={`mt-4 rounded-2xl border px-4 py-3 ${
            section.note.kind === "tradeoff"
              ? "border-amber-200 bg-amber-50/60"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <p
            className={`text-[11px] font-bold uppercase tracking-[0.12em] ${
              section.note.kind === "tradeoff"
                ? "text-amber-700"
                : "text-slate-500"
            }`}
          >
            {section.note.title}
          </p>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-600">
            {section.note.text}
          </p>
        </div>
      )}
    </section>
  </RevealOnScroll>
);

const PathfindingProjectPage: React.FC<PathfindingProjectPageProps> = ({
  onBack,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-white px-8 pt-24 pb-20 md:px-12 lg:px-16">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={onBack}
          className="group mb-8 flex shrink-0 items-center gap-2 font-medium text-slate-500 transition-all hover:text-slate-900"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Back to Morimori
        </button>

        <RevealOnScroll direction="up">
          <header className="mb-10">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
              {PATHFINDING_META.eyebrow}
            </p>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              {PATHFINDING_META.title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base">
              {PATHFINDING_META.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-1.5">
              {PATHFINDING_META.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500"
                >
                  {tech}
                </span>
              ))}
            </div>
          </header>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={80}>
          <div className="mb-12 rounded-[2rem] border border-slate-200 bg-slate-50/60 p-4 md:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
              {PATHFINDING_FLOW.map((stage, i) => (
                <React.Fragment key={stage.label}>
                  {i > 0 && (
                    <div className="flex items-center justify-center md:px-1">
                      <ArrowRight className="hidden h-3.5 w-3.5 shrink-0 text-slate-300 md:block" />
                      <ArrowRight className="h-3.5 w-3.5 rotate-90 text-slate-300 md:hidden" />
                    </div>
                  )}
                  <div className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-0.5 text-[13px] font-semibold leading-snug text-slate-900">
                      {stage.label}
                    </p>
                    <p className="text-[11px] leading-snug text-slate-500">
                      {stage.detail}
                    </p>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </RevealOnScroll>

        <div className="lg:grid lg:grid-cols-12 lg:gap-10">
          <aside className="mb-10 lg:col-span-3 lg:mb-0">
            <div className="lg:sticky lg:top-28">
              <p className="mb-3 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-slate-400">
                <span className="h-[1px] w-6 bg-slate-200" />
                Contents
              </p>
              <nav className="space-y-4 lg:space-y-5">
                {PARTS.map((group) => (
                  <div key={group.part}>
                    <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-300">
                      {group.part}
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 lg:flex-col lg:gap-y-1">
                      {group.sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="text-[11px] leading-snug text-slate-500 transition-colors hover:text-slate-900 md:text-xs"
                        >
                          <span className="mr-1.5 font-mono text-[9px] text-slate-300">
                            {section.eyebrow.split(" ")[0]}
                          </span>
                          {section.title}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          <div className="space-y-12 lg:col-span-9">
            {PATHFINDING_SECTIONS.map((section, i) => (
              <React.Fragment key={section.id}>
                {section.part !== PATHFINDING_SECTIONS[i - 1]?.part && (
                  <div className={i === 0 ? "" : "pt-2"}>
                    <PartDivider part={section.part} />
                  </div>
                )}
                <SectionBody section={section} />
              </React.Fragment>
            ))}
          </div>
        </div>

        <RevealOnScroll direction="up">
          <div className="mt-16 flex flex-col items-center justify-center border-t border-slate-100 py-10">
            <p className="mb-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-slate-400">
              <GitBranch className="h-3 w-3" />
              NavMap.cs · PathFind.cs · MapLoad.cs · World.cs
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={PATHFINDING_META.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-slate-200 transition-all hover:scale-105 hover:bg-black"
              >
                <Code2 className="h-3.5 w-3.5" />
                View Source
              </a>
              <button
                onClick={onBack}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2.5 text-xs font-semibold text-slate-900 transition-all hover:scale-105 hover:bg-slate-50"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Morimori
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default PathfindingProjectPage;
