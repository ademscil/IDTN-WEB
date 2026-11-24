import React from 'react';
import { Activity, Shield, Award, Cpu } from 'lucide-react';
import { useLanguage } from '../../context';
import { useCmsData } from '../../context/CmsDataContext';
import { TrustMetric } from '../../types/cms';

export const TrustStripSection: React.FC = () => {
  const { lang } = useLanguage();
  const { pages } = useCmsData();
  const isEn = lang === 'en';

  const homeSec = (pages.home?.sections?.[isEn ? 'en' : 'id'] || {}) as Record<string, unknown>;

  const defaultMetrics = [
    {
      icon: Cpu,
      title: '38.4 Tbps Throughput',
      subtitle: isEn ? 'Maximum C+L band capacity per optical fiber pair' : 'Kapasitas maksimal C+L band per serat optik',
    },
    {
      icon: Activity,
      title: isEn ? '> 1,500 km Reach' : '> 1.500 km Jangkauan',
      subtitle: isEn ? 'Ultra-long haul transmission without electrical regeneration' : 'Transmisi optik jarak jauh tanpa regenerasi elektrik',
    },
    {
      icon: Shield,
      title: isEn ? '99.999% Reliability (SLA)' : '99.999% Keandalan (SLA)',
      subtitle: isEn ? 'Carrier-grade reliability with sub-50ms optical protection switching' : 'Carrier-grade reliability dengan switching sub-50ms',
    },
    {
      icon: Award,
      title: isEn ? 'Certified & Compliant' : 'Resmi & Bersertifikasi',
      subtitle: isEn ? 'SDPPI Kominfo certified, ISO 9001 & ISO 27001 compliant' : 'Standar SDPPI Kominfo, ISO 9001 & ISO 27001',
    },
  ];

  const icons = [Cpu, Activity, Shield, Award];

  const metrics = (Array.isArray(homeSec.trust_metrics) && homeSec.trust_metrics.length > 0)
    ? (homeSec.trust_metrics as TrustMetric[]).map((tm, idx) => ({
        icon: icons[idx % icons.length] || Cpu,
        title: tm.title,
        subtitle: tm.subtitle
      }))
    : defaultMetrics;

  return (
    <section className="bg-slate-900 text-white py-10 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-slate-800 text-sky-300 border border-slate-700 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-200 mt-0.5 font-normal">
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
