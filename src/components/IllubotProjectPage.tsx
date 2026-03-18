import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cpu,
  Database,
  Calendar,
  Terminal,
  Zap,
  Github,
  Puzzle,
  ZoomIn,
} from "lucide-react";
import RevealOnScroll from "./RevealOnScroll";
import {
  ILLUBOT_STRUCTURED_STACK,
  ILLUBOT_FEATURES,
  ILLUBOT_HIGHLIGHTS,
  ILLUBOT_GALLERY,
} from "../data/illubot";
import { PROJECTS } from "../constants";
import ImageViewer from "./ImageViewer";

interface IllubotProjectPageProps {
  onBack: () => void;
}

const IllubotProjectPage: React.FC<IllubotProjectPageProps> = ({ onBack }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = PROJECTS.find((p) => p.id === "illubot");

  const getIcon = (type: string) => {
    const props = { className: "w-5 h-5" };
    switch (type) {
      case "calendar":
        return <Calendar {...props} />;
      case "database":
        return <Database {...props} />;
      case "zap":
        return <Zap {...props} />;
      case "terminal":
        return <Terminal {...props} />;
      case "puzzle":
        return <Puzzle {...props} />;
      default:
        return <Cpu {...props} />;
    }
  };

  return (
    <>
      <div className="min-h-screen bg-white pt-24 pb-20 px-8 md:px-12 lg:px-16 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold mb-12 transition-all group shrink-0"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </button>

          <RevealOnScroll direction="up">
            <header className="mb-16">
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  illubot
                </h1>
                <div className="flex gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full uppercase tracking-widest">
                    AI Agent
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-900 text-white text-[9px] font-bold rounded-full uppercase tracking-widest">
                    MCP
                  </span>
                </div>
              </div>
              <p className="text-slate-500 text-sm md:text-base max-w-2xl leading-relaxed mb-6">
                A high-performance MCP AI agent Discord bot engineered for
                seamless task automation and persistent memory. It leverages
                Model Context Protocol (MCP) to bridge LLMs with real-world
                tools.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {ILLUBOT_HIGHLIGHTS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-slate-700"
                  >
                    <div className="w-1 h-1 rounded-full bg-slate-400 shrink-0" />
                    <span className="font-semibold text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </header>
          </RevealOnScroll>

          {/* Tech Stack Section with Cards */}
          <section className="mb-20">
            <RevealOnScroll direction="up">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Tech Stack
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ILLUBOT_STRUCTURED_STACK.map((item, i) => (
                <RevealOnScroll key={i} direction="up" delay={i * 50}>
                  <div className="p-5 rounded-2xl bg-white border border-slate-100 hover:border-slate-300 transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/5 h-full group">
                    <h3 className="text-slate-400 font-bold text-[10px] mb-3 uppercase tracking-widest group-hover:text-slate-900 transition-colors">
                      {item.category}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((tool, j) => (
                        <span
                          key={j}
                          className="px-2 py-0.5 bg-slate-50 rounded text-[10px] text-slate-600 border border-slate-100 font-bold"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <RevealOnScroll direction="up">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Core Capabilities
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ILLUBOT_FEATURES.map((feature, idx) => (
                <RevealOnScroll
                  key={idx}
                  direction={idx % 2 === 0 ? "left" : "right"}
                  delay={idx * 100}
                >
                  <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 h-full">
                    <div
                      className="aspect-[21/9] overflow-hidden bg-slate-100 cursor-zoom-in"
                      onClick={() => setSelectedImage(feature.image)}
                    >
                      <img
                        src={feature.image}
                        alt={feature.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-125 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-slate-50 rounded-xl text-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                          {getIcon(feature.iconType)}
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          <section className="mb-20">
            <RevealOnScroll direction="up">
              <h2 className="text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400 mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-slate-200"></span>
                Project Gallery
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ILLUBOT_GALLERY.map((img, i) => (
                <RevealOnScroll key={i} direction="up" delay={i * 50}>
                  <div
                    onClick={() => setSelectedImage(img)}
                    className="relative aspect-video rounded-xl overflow-hidden cursor-zoom-in group border border-slate-100 shadow-sm"
                  >
                    <img
                      src={img}
                      alt={`Gallery screenshot ${i + 1}`}
                      className="w-full h-full object-cover scale-110 transition-transform duration-700 group-hover:scale-125"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform">
                        <ZoomIn className="w-3.5 h-3.5 text-slate-900" />
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </section>

          <RevealOnScroll direction="up">
            <div className="flex flex-col items-center justify-center py-10 border-t border-slate-100">
              <p className="text-slate-400 font-mono text-[9px] mb-5 tracking-widest uppercase">
                Source Code & Documentation
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="https://github.com/ilmn25/260228"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-black transition-all hover:scale-105 shadow-xl shadow-slate-200"
                >
                  <Github className="w-4 h-4" />
                  View Repository
                </a>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      <ImageViewer src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};

export default IllubotProjectPage;
