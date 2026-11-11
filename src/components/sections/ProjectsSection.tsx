import React from 'react';
import { MapPin, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import projectsData from '../../data/projects.json';
import { Badge } from '../common/Badge';

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Portofolio & Rekam Jejak</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Proyek Implementasi Transmisi & Jaringan Optik
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Bukti nyata keandalan rekayasa DWDM IDTN dalam mendukung infrastruktur data center, perkeretaapian, navigasi penerbangan, dan pelabuhan maritim.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectsData.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1.5 font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                    {proj.sector}
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {proj.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {proj.year}
                    </span>
                  </div>
                </div>

                {/* Title & Scope */}
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {proj.scope}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                  {proj.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-center">
                      <p className="text-[11px] text-slate-500 truncate">{m.label}</p>
                      <p className="text-sm font-bold text-slate-900 font-mono mt-0.5 truncate">{m.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  Implementasi Sukses
                </span>
                <a href="#contact" className="inline-flex items-center gap-1 text-sky-600 hover:text-sky-800 font-bold">
                  <span>Konsultasi Skema Serupa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
