import React from 'react';
import { Activity, Shield, Award, Cpu } from 'lucide-react';

export const TrustStripSection: React.FC = () => {
  const metrics = [
    {
      icon: Cpu,
      title: '38.4 Tbps Throughput',
      subtitle: 'Kapasitas maksimal C+L band per serat optik',
    },
    {
      icon: Activity,
      title: '> 1.500 km Jangkauan',
      subtitle: 'Transmisi optik jarak jauh tanpa regenerasi elektrik',
    },
    {
      icon: Shield,
      title: '99.999% Keandalan (SLA)',
      subtitle: 'Carrier-grade reliability dengan switching sub-50ms',
    },
    {
      icon: Award,
      title: 'Resmi & Bersertifikasi',
      subtitle: 'Standar SDPPI Kominfo, ISO 9001 & ISO 27001',
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-10 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-sky-400 border border-slate-700/60 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
