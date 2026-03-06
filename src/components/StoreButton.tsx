import React from "react";
import { Sparkles } from "lucide-react";

const StoreButton: React.FC = () => {
  return (
    <a
      href="https://ilmn25.github.io/store/"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-[100] group flex items-center gap-2 md:gap-3 bg-slate-900 text-white px-4 py-3 md:px-6 md:py-4 rounded-full shadow-2xl hover:bg-black transition-all duration-500 hover:scale-110 active:scale-95 hover:shadow-slate-400/20"
    >
      <div className="relative">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:rotate-12 text-white" />
        {/* Enhanced Blinking Light */}
        <span className="absolute -top-1 -right-1 flex h-2 w-2 md:h-2.5 md:w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 md:h-2.5 md:w-2.5 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        </span>
      </div>
      <span className="text-[10px] md:text-sm font-bold tracking-widest uppercase">
        ILMNNNNNNNN
      </span>

      {/* Decorative background glow */}
      <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
    </a>
  );
};

export default StoreButton;
