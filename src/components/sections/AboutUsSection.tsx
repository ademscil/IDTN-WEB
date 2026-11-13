import React from 'react';
import { Target, Compass, CheckCircle2 } from 'lucide-react';
import companyData from '../../data/company.json';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';

export const AboutUsSection: React.FC = () => {
  const { lang, t } = useLanguage();

  const isEn = lang === 'en';

  const nameEtymology = isEn
    ? [
        { word: 'Infinix', meaning: 'Inspired by "infinity": boundless spirit to continually innovate and empower the nation\'s digital ecosystem.' },
        { word: 'Delapan (Eight)', meaning: 'The number 8 symbolizes infinity (∞), reflecting uninterrupted continuity, resilience, and growth.' },
        { word: 'Teknologi (Technology)', meaning: 'World-class optical telecommunications transmission technology adapted specifically for Indonesian topology.' },
        { word: 'Nusantara', meaning: 'Deeply anchored in the Indonesian archipelago, serving as a proud anchor connecting our nation to global markets.' },
      ]
    : companyData.nameEtymology;

  const twoPillars = isEn
    ? [
        {
          title: 'DWDM Equipment Developer',
          desc: 'Developing and adapting DWDM equipment to meet national regulations, Indonesian geographic conditions, and operator expansion needs.',
          points: [
            'Equipment adaptation aligned with SDPPI Kominfo standards',
            'Integrated R&D with top Indonesian engineering talent',
            'Real technology transfer to local operators & partners',
          ],
        },
        {
          title: 'DWDM Infrastructure Service Provider',
          desc: 'Designing, deploying, testing, and maintaining long-haul optical fiber links for transportation corridors and data center interconnects.',
          points: [
            'Planning & long-haul optical link route surveys',
            'Turnkey end-to-end installation, integration & commissioning',
            '24/7 proactive link performance monitoring & preventive maintenance',
          ],
        },
      ]
    : companyData.twoPillars;

  const philosophyPillars = isEn
    ? [
        { title: 'Bridge', desc: 'Bridging global optical excellence with practical Indonesian infrastructure needs.' },
        { title: 'Intermediary', desc: 'Connecting technology principals, system integrators, and telco clients transparently.' },
        { title: 'Pathway', desc: 'Opening high-bandwidth access so strategic data and information flows without bottlenecks.' },
        { title: 'Connector', desc: 'Uniting transport nodes from metropolitan centers to outer archipelagic islands to the global stage.' },
      ]
    : companyData.philosophy.pillars;

  return (
    <section id="about" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">{t('about.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('about.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('about.desc')}
          </p>
        </div>

        {/* T8-Style Distinctive Metrics Strip (Directly requested by Pak Andik) */}
        <div className="space-y-10 pt-2">
          <div className="max-w-4xl mx-auto text-center space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
              {t('about.metrics.lead')}
            </span>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium">
              {t('about.metrics.desc')}
            </p>
          </div>

          {/* Metric Columns (t8.ru style with clean divider borders and gradient large numbers) */}
          <div className="border-y border-slate-200/90 py-8 md:py-10 bg-slate-50/50 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              {/* Metric 1: Nusantara Geography (Sabang to Merauke 8.514,22 km) */}
              <div className="py-6 md:py-2 px-4 sm:px-8 text-center md:text-left space-y-2">
                <div className="flex items-baseline justify-center md:justify-start gap-1.5 font-extrabold tracking-tight text-[#4f3fc2]">
                  <span className="text-4xl sm:text-5xl lg:text-6xl">{isEn ? '8,514.22' : '8.514,22'}</span>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#4f3fc2]/85">km</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 pt-1">
                  {t('about.metric1.title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t('about.metric1.desc')}
                </p>
              </div>

              {/* Metric 2: 800 Gbps per wavelength */}
              <div className="py-6 md:py-2 px-4 sm:px-8 text-center md:text-left space-y-2">
                <div className="flex items-baseline justify-center md:justify-start gap-1.5 font-extrabold tracking-tight text-[#4f3fc2]">
                  <span className="text-4xl sm:text-5xl lg:text-6xl">800</span>
                  <span className="text-2xl sm:text-3xl font-semibold text-[#4f3fc2]/85">Gbps</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 pt-1">
                  {t('about.metric2.title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t('about.metric2.desc')}
                </p>
              </div>

              {/* Metric 3: R&D & Pelatihan / Transfer of Technology (replacing 650 spesialis per Pak Andik's guidance) */}
              <div className="py-6 md:py-2 px-4 sm:px-8 text-center md:text-left space-y-2">
                <div className="flex items-baseline justify-center md:justify-start gap-1 font-extrabold tracking-tight text-[#be185d]">
                  <span className="text-3xl sm:text-4xl lg:text-5xl leading-tight">{t('about.metric3.val')}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900 pt-1">
                  {t('about.metric3.title')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {t('about.metric3.desc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy & Name Etymology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Philosophy Banner (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-850 to-slate-800 text-white rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xl border border-slate-800">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                {t('about.philo.tag')}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-snug">
                "{t('about.philo.head')}"
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {t('about.philo.sub')}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-700/80 grid grid-cols-2 gap-4">
              {philosophyPillars.map((pillar, idx) => (
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
                {t('about.etymology.title')}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {nameEtymology.map((item, idx) => (
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

            {/* Business Focus Header & Two Business Pillars */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#9f1b32]"></span>
                <h3 className="text-base font-extrabold uppercase tracking-wider text-[#9f1b32]">
                  {t('about.focus.title')}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {twoPillars.map((pillar, idx) => (
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
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-sky-50/30 border border-sky-200/80 rounded-3xl p-8 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-sky-600 text-white shadow-sm">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('about.vision.title')}</h3>
            <p className="text-base text-slate-700 leading-relaxed italic">
              "{isEn ? 'To become the leading national optical telecommunications developer and provider, delivering ultra-high-speed DWDM connectivity across Nusantara to the global arena.' : companyData.vision}"
            </p>
          </div>

          {/* Mission */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50/50 border border-slate-200 rounded-3xl p-8 space-y-4">
            <div className="inline-flex p-3 rounded-2xl bg-slate-900 text-white shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">{t('about.mission.title')}</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {(isEn ? [
                'Accelerate the deployment of multi-terabit optical fiber networks in transportation and data center sectors.',
                'Deliver carrier-grade reliability with 99.999% SLA and high-speed protection switching.',
                'Foster indigenous technology capability in collaboration with global partners like T8 Systems.',
              ] : companyData.mission).map((m, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-2"></span>
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};
