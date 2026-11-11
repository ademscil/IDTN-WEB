import React from 'react';
import { Target, Compass, CheckCircle2, ChevronRight, Plane, Train, Ship, Database } from 'lucide-react';
import companyData from '../../data/company.json';
import { Badge } from '../common/Badge';

export const AboutUsSection: React.FC = () => {
  const sectorIcons: Record<string, React.ReactNode> = {
    Aviation: <Plane className="w-5 h-5 text-sky-600" />,
    Railway: <Train className="w-5 h-5 text-sky-600" />,
    Maritime: <Ship className="w-5 h-5 text-sky-600" />,
    Hyperscale: <Database className="w-5 h-5 text-sky-600" />,
  };

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Tentang PT IDTN</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Menghubungkan Potensi Nusantara dengan Dunia
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {companyData.aboutText}
          </p>
        </div>

        {/* Philosophy & Name Etymology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Philosophy Banner (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-lg">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Filosofi Perusahaan
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                "{companyData.philosophy.headline}"
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {companyData.philosophy.subheadline}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-700/80 grid grid-cols-2 gap-4">
              {companyData.philosophy.pillars.map((pillar, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-xs font-bold text-sky-400">{pillar.title}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Name Etymology & Two Pillars (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            {/* Etymology Grid */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Makna di Balik Nama IDTN
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {companyData.nameEtymology.map((item, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9f1b32]"></span>
                      {item.word}
                    </p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Business Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {companyData.twoPillars.map((pillar, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 font-mono font-bold text-sm flex items-center justify-center mb-3">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                    {pillar.desc}
                  </p>
                  <ul className="space-y-1.5">
                    {pillar.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-sky-50/30 border border-sky-200/80 rounded-3xl p-8 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-sky-600 text-white shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Visi IDTN</h3>
            <p className="text-base text-slate-700 leading-relaxed italic">
              "{companyData.vision}"
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50/50 border border-slate-200 rounded-3xl p-8 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-slate-900 text-white shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Misi IDTN</h3>
            <ul className="space-y-3">
              {companyData.mission.map((m, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                  <ChevronRight className="w-4 h-4 text-sky-600 shrink-0 mt-1" />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Application Sectors (Sektor Infrastruktur Vital) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge variant="coral">Penerapan Industri</Badge>
              <h3 className="text-2xl font-bold text-slate-900 mt-2">
                Dibangun untuk Infrastruktur Vital Indonesia
              </h3>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Solusi transmisi DWDM IDTN dirancang untuk ketahanan operasional tingkat tinggi pada sektor transportasi dan komputasi nasional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.applicationSectors.map((sector, idx) => (
              <div
                key={idx}
                className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="p-3 rounded-xl bg-white group-hover:bg-sky-50 border border-slate-200/60 inline-block mb-4 transition-colors">
                  {sectorIcons[sector.badge] || <Plane className="w-5 h-5 text-sky-600" />}
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">
                  {sector.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sector.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
