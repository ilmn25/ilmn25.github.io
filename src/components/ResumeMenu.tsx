import React, { useEffect, useRef, useState } from "react";
import { ArrowUpRight, FileText } from "lucide-react";
import { PERSONAL_INFO } from "../constants";

interface ResumeMenuProps {
  triggerClassName: string;
  rootClassName?: string;
  side?: "top" | "bottom";
  align?: "left" | "right";
}

const ResumeMenu: React.FC<ResumeMenuProps> = ({
  triggerClassName,
  rootClassName = "",
  side = "top",
  align = "right",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const documents = [
    { id: "resume", label: "Resume", href: PERSONAL_INFO.social.resume },
    { id: "cv", label: "CV", href: PERSONAL_INFO.social.cv },
  ];

  return (
    <div className={`relative ${rootClassName}`} ref={rootRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Resume and CV"
        title="Resume / CV"
        className={triggerClassName}
      >
        <FileText className="w-6 h-6 transition-transform group-hover:scale-110" />
      </button>

      {isOpen && (
        <div
          className={`absolute z-50 w-48 animate-fade-in ${side === "top" ? "bottom-full mb-3" : "top-full mt-3"} ${align === "right" ? "right-0" : "left-0"}`}
        >
          <div className="bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-slate-200/60 p-1.5">
            {documents.map((doc, index) => (
              <a
                key={doc.id}
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`group/doc flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl hover:bg-slate-50 transition-colors ${index > 0 ? "mt-0.5" : ""}`}
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-400 group-hover/doc:text-slate-900 transition-colors" />
                  <span className="text-xs font-bold text-slate-900">
                    {doc.label}
                  </span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover/doc:text-slate-500 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeMenu;
