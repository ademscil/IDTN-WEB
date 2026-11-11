import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Server } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-white">
      {/* Decorative Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2">
              <Badge variant="cyan" className="py-1 px-3">
                <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
                <span>DWDM Developer & Infrastructure Provider</span>
              </Badge>
              <Badge variant="coral" className="py-1 px-3 hidden sm:inline-flex">
                <span>Partner Resmi T8 Systems</span>
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Jembatan Teknologi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0369a1] to-[#9f1b32]">
                Transmisi Optik DWDM
              </span>{' '}
              Nusantara ke Dunia
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              PT Infinix Delapan Teknologi Nusantara (IDTN) merancang, mengembangkan, dan menggelar infrastruktur DWDM multi-terabit berkeandalan tinggi untuk sektor transportasi nasional, operator telekomunikasi, dan interkoneksi data center di Indonesia.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#contact">
                <Button size="lg" variant="primary" className="gap-2 text-base px-7">
                  <span>Ajukan Penawaran Proyek (RFP)</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href="#dwdm">
                <Button size="lg" variant="outline" className="text-base px-6">
                  <span>Pelajari Cara Kerja DWDM</span>
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xs text-slate-500 font-medium">Kapasitas Maksimal</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">38.4 Tbps</p>
                <p className="text-[11px] text-sky-700">C+L Band Single Fiber</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Jangkauan Unregenerated</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">&gt; 1.500 km</p>
                <p className="text-[11px] text-emerald-700">Ultra Long-Haul</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Sertifikasi Legal</p>
                <p className="text-lg sm:text-xl font-bold text-slate-900 font-mono">SDPPI & ISO</p>
                <p className="text-[11px] text-slate-600">Kepatuhan Resmi 100%</p>
              </div>
            </div>
          </div>

          {/* Right Column: High-Tech Optical Graphic (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-sky-900/5">
              {/* Graphic Card Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-sky-50 text-sky-600">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Arsitektur Transmisi DWDM</h2>
                    <p className="text-[11px] text-slate-500 font-mono">Multi-Wavelength Optical Grid</p>
                  </div>
                </div>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>

              {/* Schematic Optical Flow SVG */}
              <div className="py-6">
                <svg viewBox="0 0 360 220" className="w-full h-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Channels In */}
                  <g>
                    <rect x="10" y="20" width="60" height="24" rx="4" fill="#0284c7" fillOpacity="0.1" stroke="#0284c7" strokeWidth="1.5" />
                    <text x="40" y="36" fill="#0284c7" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">λ1: 100G</text>

                    <rect x="10" y="60" width="60" height="24" rx="4" fill="#0369a1" fillOpacity="0.1" stroke="#0369a1" strokeWidth="1.5" />
                    <text x="40" y="76" fill="#0369a1" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">λ2: 400G</text>

                    <rect x="10" y="100" width="60" height="24" rx="4" fill="#9f1b32" fillOpacity="0.1" stroke="#9f1b32" strokeWidth="1.5" />
                    <text x="40" y="116" fill="#9f1b32" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">λ3: 400G</text>

                    <rect x="10" y="140" width="60" height="24" rx="4" fill="#16a34a" fillOpacity="0.1" stroke="#16a34a" strokeWidth="1.5" />
                    <text x="40" y="156" fill="#16a34a" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="monospace">λ4: 800G</text>
                  </g>

                  {/* Converging Lines */}
                  <path d="M70 32 L120 92" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 3" />
                  <path d="M70 72 L120 92" stroke="#0369a1" strokeWidth="2" />
                  <path d="M70 112 L120 92" stroke="#9f1b32" strokeWidth="2" />
                  <path d="M70 152 L120 92" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 3" />

                  {/* MUX Module */}
                  <rect x="120" y="65" width="45" height="55" rx="6" fill="#0f172a" />
                  <text x="142" y="96" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">MUX</text>

                  {/* Single Core Fiber */}
                  <line x1="165" y1="92" x2="235" y2="92" stroke="#0284c7" strokeWidth="4" />
                  <line x1="165" y1="92" x2="235" y2="92" stroke="#38bdf8" strokeWidth="2" strokeDasharray="6 4" className="animate-pulse" />

                  {/* EDFA / Raman Amplifier Symbol */}
                  <polygon points="190,82 210,92 190,102" fill="#9f1b32" />
                  <text x="200" y="118" fill="#9f1b32" fontSize="9" fontWeight="bold" textAnchor="middle">EDFA</text>

                  {/* DEMUX Module */}
                  <rect x="235" y="65" width="45" height="55" rx="6" fill="#0f172a" />
                  <text x="257" y="96" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">DEMUX</text>

                  {/* Diverging Lines */}
                  <path d="M280 92 L310 50" stroke="#0284c7" strokeWidth="2" />
                  <path d="M280 92 L310 92" stroke="#0369a1" strokeWidth="2" />
                  <path d="M280 92 L310 135" stroke="#9f1b32" strokeWidth="2" />

                  {/* Handover Points */}
                  <circle cx="320" cy="50" r="8" fill="#0284c7" />
                  <circle cx="320" cy="92" r="8" fill="#0369a1" />
                  <circle cx="320" cy="135" r="8" fill="#9f1b32" />

                  {/* Label */}
                  <rect x="70" y="190" width="220" height="24" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
                  <text x="180" y="206" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">
                    Single Optical Fiber Link (C+L Band)
                  </text>
                </svg>
              </div>

              {/* Graphic Card Footer Highlights */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Proteksi 1+1 Sub-50ms
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Ultra-Low Latency
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
