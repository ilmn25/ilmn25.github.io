import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import ResumeMenu from "./ResumeMenu";

// Added ScrollToTopProps interface to support optional className
interface ScrollToTopProps {
  className?: string;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top cordinate to 0
  // make scrolling smooth
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${className}`}>
      <div className="relative">
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          tabIndex={isVisible ? 0 : -1}
          className={`absolute right-0 bottom-0 p-3 bg-white hover:bg-slate-50 text-slate-900 rounded-full shadow-2xl border border-slate-200 transition-all duration-300 ease-out transform hover:-translate-y-1 active:scale-90 group ${isVisible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-75 pointer-events-none"}`}
        >
          <ChevronUp className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>

        <ResumeMenu
          side="top"
          align="right"
          rootClassName={`transition-transform duration-300 ease-out ${isVisible ? "-translate-x-[3.75rem]" : "translate-x-0"}`}
          triggerClassName="block p-3 bg-white hover:bg-slate-50 text-slate-900 rounded-full shadow-2xl border border-slate-200 group active:scale-90"
        />
      </div>
    </div>
  );
};

export default ScrollToTop;
