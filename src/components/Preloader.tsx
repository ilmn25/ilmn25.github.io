import React, { useState, useEffect, useRef } from "react";
import { PERSONAL_INFO } from "../constants";

// Only the above-the-fold hero image blocks the first paint. Every gallery
// image lazy-loads as the user scrolls.
const CRITICAL_ASSETS = [PERSONAL_INFO.avatar];
const MIN_DISPLAY_MS = 400; // keeps the intro animation from flashing
const MAX_LOAD_TIME = 6000; // never hold the page hostage for longer than this

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const hasTriggeredComplete = useRef(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const triggerComplete = () => {
      if (hasTriggeredComplete.current) return;
      hasTriggeredComplete.current = true;

      setProgress(100);

      const remaining = Math.max(
        0,
        MIN_DISPLAY_MS - (Date.now() - startedAt.current),
      );

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(onComplete, 600);
      }, remaining + 200);
    };

    const timeoutId = setTimeout(() => {
      if (!hasTriggeredComplete.current) {
        console.warn(
          `Preloader: critical assets timed out after ${MAX_LOAD_TIME / 1000} seconds. Proceeding to app.`,
        );
        triggerComplete();
      }
    }, MAX_LOAD_TIME);

    let loadedCount = 0;

    Promise.all(
      CRITICAL_ASSETS.map(
        (url) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            const handleDone = () => {
              loadedCount++;
              setProgress(
                Math.min(
                  Math.round((loadedCount / CRITICAL_ASSETS.length) * 100),
                  99,
                ),
              );
              resolve();
            };
            img.onload = handleDone;
            img.onerror = handleDone; // a failed image must not block the page
            img.src = url;
          }),
      ),
    ).then(() => {
      if (!hasTriggeredComplete.current) triggerComplete();
    });

    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <div className="flex flex-col items-center w-64">
        <div className="mb-10 relative flex items-center justify-center">
          <div className="absolute w-20 h-20 border border-slate-100 rounded-full"></div>
          <div
            className="absolute w-20 h-20 border border-slate-900 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: "0.8s" }}
          ></div>
          <span className="text-sm font-bold text-slate-900 font-mono tracking-tighter">
            {progress}%
          </span>
        </div>

        <div className="w-full text-center space-y-3">
          <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-slate-900 font-bold transition-all duration-300">
            {progress < 100 ? "Initializing" : "Ready"}
          </h2>
          <div className="w-full bg-slate-50 h-[1px] rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-900 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">
            {progress < 100 ? "Warming Up Assets" : "Loading Page"}
          </p>
        </div>
      </div>

      <div className="absolute bottom-10 text-[9px] font-mono text-slate-200 uppercase tracking-[0.3em]">
        illu's portfolio
      </div>
    </div>
  );
};

export default Preloader;
