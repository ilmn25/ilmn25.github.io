import React, { useState, useEffect, useRef } from "react";

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction: "left" | "right" | "up" | "scale";
  delay?: number;
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  direction,
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [, setIsTransitioning] = useState(() => !!(window as any).__isTransitioning);
  const ref = useRef<HTMLDivElement>(null);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    const handleTransition = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      const transitioning = customEvent.detail;
      setIsTransitioning(transitioning);

      if (!transitioning && isIntersectingRef.current) {
        setIsVisible(true);
      }
    };

    window.addEventListener("websitetransition", handleTransition as EventListener);
    return () => {
      window.removeEventListener("websitetransition", handleTransition as EventListener);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          const transitioning = !!(window as any).__isTransitioning;
          if (!transitioning) {
            setIsVisible(true);
          }
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-base reveal-${direction} ${isVisible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
};

export default RevealOnScroll;
