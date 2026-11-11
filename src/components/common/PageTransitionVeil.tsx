import React from 'react';

interface PageTransitionVeilProps {
  isTransitioning: boolean;
}

export const PageTransitionVeil: React.FC<PageTransitionVeilProps> = ({ isTransitioning }) => {
  return (
    <div
      className={`fixed inset-0 z-45 bg-white/90 backdrop-blur-xs transition-all duration-400 ease-in-out pointer-events-none flex items-center justify-center ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      <div className={`transition-all duration-300 transform ${isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 shadow-md border border-slate-200/60">
          <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping"></span>
          <span className="text-xs font-mono font-bold text-slate-700 tracking-wider uppercase">
            IDTN Transport
          </span>
        </div>
      </div>
    </div>
  );
};
