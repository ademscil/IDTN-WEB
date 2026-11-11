import React from 'react';
import { Layers, Database, Network, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import solutionsData from '../../data/solutions.json';
import { Badge } from '../common/Badge';

export const SolutionsSection: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Layers: <Layers className="w-6 h-6 text-[#0284c7]" />,
    Database: <Database className="w-6 h-6 text-[#0284c7]" />,
    Network: <Network className="w-6 h-6 text-[#0284c7]" />,
    Activity: <Activity className="w-6 h-6 text-[#0284c7]" />,
  };

  return (
    <section id="solutions" className="py-20 md:py-28 bg-slate-50/60 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Katalog Solusi Terpadu</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Solusi Rekayasa Jaringan Telekomunikasi & DWDM
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Dari perencanaan link jarak jauh, transmisi DWDM berkapasitas multi-terabit, hingga automasi monitoring serat optik 24 jam nonstop.
          </p>
        </div>

        {/* 4 Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutionsData.map((sol) => (
            <div
              key={sol.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Header row */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-sky-50 border border-sky-100 group-hover:scale-110 transition-transform">
                    {iconMap[sol.icon] || <Layers className="w-6 h-6 text-[#0284c7]" />}
                  </div>
                  <span className="font-mono text-2xl font-black text-slate-200 group-hover:text-sky-600 transition-colors">
                    {sol.order}
                  </span>
                </div>

                {/* Titles */}
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                    {sol.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    {sol.overview}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Fitur & Kapabilitas
                  </p>
                  <ul className="space-y-2">
                    {sol.features.map((feat, fIdx) => (
                      <li key={fIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Specs Pills */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                  {sol.specs.map((sp, sIdx) => (
                    <div key={sIdx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-center">
                      <p className="text-[10px] text-slate-500 font-medium truncate">{sp.label}</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5 font-mono truncate">{sp.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#0369a1] group-hover:translate-x-1 transition-all"
                >
                  <span>Konsultasikan Kebutuhan Proyek Ini</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
