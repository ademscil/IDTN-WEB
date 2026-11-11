import React, { useState } from 'react';
import { Server, Activity, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import dwdmData from '../../data/dwdm-tech.json';
import { Badge } from '../common/Badge';

export const EquipmentSection: React.FC = () => {
  const [selectedEqId, setSelectedEqId] = useState(dwdmData.equipmentCatalog[0].id);
  const activeEq = dwdmData.equipmentCatalog.find((e) => e.id === selectedEqId) || dwdmData.equipmentCatalog[0];

  const eqIcons: Record<string, React.ReactNode> = {
    'volga-telecom': <Server className="w-5 h-5 text-sky-600" />,
    'volga-dci': <Cpu className="w-5 h-5 text-sky-600" />,
    'otdr-ramenka': <Activity className="w-5 h-5 text-sky-600" />,
    'nms-titan': <ShieldCheck className="w-5 h-5 text-sky-600" />,
  };

  return (
    <section id="equipment" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="coral">Lini Perangkat Resmi T8</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perangkat DWDM & Sistem Manajemen Optik T8
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Perangkat keras dan perangkat lunak transmisi DWDM berkecepatan tinggi teruji global yang dipasok, diadaptasi, dan didukung penuh oleh IDTN di Indonesia.
          </p>
        </div>

        {/* Tab Buttons (Horizontal on Desktop) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {dwdmData.equipmentCatalog.map((eq) => (
            <button
              key={eq.id}
              onClick={() => setSelectedEqId(eq.id)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                selectedEqId === eq.id
                  ? 'bg-white border-sky-500 text-sky-700 shadow-md scale-102'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              {eqIcons[eq.id]}
              <span>{eq.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Equipment Showcase Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                {activeEq.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                {activeEq.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {activeEq.summary}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-medium">Form Factor / Desain</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{activeEq.formFactor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Kapasitas Maksimal</p>
                <p className="text-sm font-bold text-sky-600 font-mono mt-0.5">{activeEq.capacity}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Keunggulan Spesifikasi:
              </p>
              <ul className="space-y-2">
                {activeEq.features.map((feat, fIdx) => (
                  <li key={fIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0 mt-2"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#0369a1] transition-colors"
              >
                <span>Minta Brosur Teknis / Data Sheet Resmi</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Graphic / Visual Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white text-center flex flex-col justify-center items-center min-h-[300px] border border-slate-700 shadow-inner">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs mb-4">
              <Server className="w-12 h-12 text-sky-400" />
            </div>
            <h4 className="text-lg font-bold text-white">{activeEq.name}</h4>
            <p className="text-xs text-slate-300 mt-1 max-w-xs">{activeEq.formFactor}</p>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Carrier-Grade Ready
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
