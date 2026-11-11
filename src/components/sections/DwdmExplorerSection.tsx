import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Layers, Zap, Network, ShieldCheck } from 'lucide-react';
import dwdmData from '../../data/dwdm-tech.json';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const DwdmExplorerSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const slides = dwdmData.interactiveSlides;
  const currentSlide = slides[activeStep];
  const touchStartX = useRef<number | null>(null);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Keyboard navigation when focused
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // swipe left -> next
    if (diff < -50) handlePrev(); // swipe right -> prev
    touchStartX.current = null;
  };

  const stageIcons = [
    <Layers className="w-5 h-5 text-sky-600" />,
    <Zap className="w-5 h-5 text-amber-500" />,
    <Network className="w-5 h-5 text-emerald-600" />,
    <ShieldCheck className="w-5 h-5 text-sky-600" />,
  ];

  return (
    <section
      id="dwdm"
      className="py-20 md:py-28 bg-white border-b border-slate-100 overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Eksplorasi Teknologi DWDM Interaktif"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="cyan">Teknologi DWDM Interaktif</Badge>
              <Badge variant="slate">Inspirasi Arsitektur T8 Systems</Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              DWDM Technology Explorer
            </h2>
            <p className="text-base text-slate-600 max-w-2xl">
              Telusuri setiap tahapan transmisi berkas cahaya spektral optik multi-terabit melalui presentasi slide modular interaktif di bawah ini.
            </p>
          </div>

          {/* Slide Deck Controller Bar (ala T8.ru) */}
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-200/80 shrink-0">
            <span className="font-mono text-sm font-bold text-slate-800 px-3 tracking-wider">
              {currentSlide.stepCode}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Tahap Sebelumnya"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200 transition-colors cursor-pointer"
                aria-label="Tahap Selanjutnya"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-sky-50/80 border-sky-400 shadow-xs'
                  : 'bg-white border-slate-200/80 hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-400">
                  {s.stepNumber}
                </span>
                {stageIcons[idx]}
              </div>
              <p className="text-xs sm:text-sm font-bold text-slate-900 mt-2 truncate">
                {s.title}
              </p>
            </button>
          ))}
        </div>

        {/* Interactive Slide Presentation Deck */}
        <div
          className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Subtle Glow & Watermark Number */}
          <div className="absolute top-4 right-8 font-mono text-8xl sm:text-9xl font-black text-white/5 select-none pointer-events-none">
            {currentSlide.stepNumber}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Text & Specs (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-md text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {currentSlide.subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {currentSlide.title}
                </h3>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Specs Table */}
              <div className="space-y-2.5 pt-4 border-t border-slate-800">
                <p className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Spesifikasi Teknis Tahapan:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSlide.specs.map((sp, idx) => (
                    <div key={idx} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
                      <p className="text-[11px] text-slate-400">{sp.name}</p>
                      <p className="text-xs sm:text-sm font-bold text-sky-400 font-mono mt-0.5">
                        {sp.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Action */}
              <div className="pt-2 flex items-center gap-4">
                <Button
                  size="sm"
                  variant="primary"
                  onClick={handleNext}
                  className="gap-2 text-xs"
                >
                  <span>Lanjut ke Tahap Berikutnya</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
                <span className="text-xs text-slate-400">
                  Gunakan tombol panah keyboard atau swipe di layar sentuh
                </span>
              </div>
            </div>

            {/* Interactive Schematic Diagram (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950/70 p-6 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[260px]">
              <div className="w-full text-center space-y-4">
                <div className="inline-block p-4 rounded-2xl bg-slate-900 border border-sky-500/30 shadow-lg shadow-sky-500/10">
                  {activeStep === 0 && (
                    <div className="space-y-2 text-center">
                      <Layers className="w-12 h-12 text-sky-400 mx-auto animate-bounce" />
                      <p className="text-xs font-mono font-bold text-sky-300">
                        Multiplexer (MUX) Unit
                      </p>
                      <p className="text-[11px] text-slate-400">
                        96 Channel Grid Aggregator
                      </p>
                    </div>
                  )}
                  {activeStep === 1 && (
                    <div className="space-y-2 text-center">
                      <Zap className="w-12 h-12 text-amber-400 mx-auto animate-pulse" />
                      <p className="text-xs font-mono font-bold text-amber-300">
                        EDFA / Raman Booster
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Pure Photonic Amplification
                      </p>
                    </div>
                  )}
                  {activeStep === 2 && (
                    <div className="space-y-2 text-center">
                      <Network className="w-12 h-12 text-emerald-400 mx-auto animate-pulse" />
                      <p className="text-xs font-mono font-bold text-emerald-300">
                        ROADM CDC-F & DEMUX
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Dynamic Wavelength Routing
                      </p>
                    </div>
                  )}
                  {activeStep === 3 && (
                    <div className="space-y-2 text-center">
                      <ShieldCheck className="w-12 h-12 text-sky-400 mx-auto" />
                      <p className="text-xs font-mono font-bold text-sky-300">
                        Client Handover & OLP 1+1
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Sub-50ms Auto Protection
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-slate-900/90 py-2 px-4 rounded-lg border border-slate-800 text-xs text-slate-400 font-mono">
                  Current Stage: <span className="text-white font-bold">{currentSlide.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
