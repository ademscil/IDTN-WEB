import React, { useState, useEffect } from 'react';

export const PagePreloader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 25) + 10;
      });
    }, 120);

    // Fade out after completion
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsVisible(false);
      }, 700); // Transition duration
    }, 850);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white transition-all duration-700 ease-out ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100'
      }`}
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center max-w-xs text-center px-6">
        {/* Logo Container with gentle pulse */}
        <div className="relative p-4 rounded-2xl bg-white shadow-xs mb-6">
          <img
            src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
            alt="IDTN Logo"
            className="h-12 sm:h-14 w-auto object-contain animate-pulse"
          />
        </div>

        {/* Progress bar (t8.ru style sleek line) */}
        <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#9f1b32] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Subtitle */}
        <p className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
          Menyiapkan Sistem Transmisi...
        </p>
      </div>
    </div>
  );
};
