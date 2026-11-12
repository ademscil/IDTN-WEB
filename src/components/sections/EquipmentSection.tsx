import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, Activity, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import dwdmData from '../../data/dwdm-tech.json';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';

export const EquipmentSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [selectedEqId, setSelectedEqId] = useState(dwdmData.equipmentCatalog[0].id);
  const activeEq = dwdmData.equipmentCatalog.find((e) => e.id === selectedEqId) || dwdmData.equipmentCatalog[0];

  const isEn = lang === 'en';

  const eqIcons: Record<string, React.ReactNode> = {
    'volga-telecom': <Server className="w-5 h-5 text-sky-600" />,
    'volga-dci': <Cpu className="w-5 h-5 text-sky-600" />,
    'otdr-ramenka': <Activity className="w-5 h-5 text-sky-600" />,
    'nms-titan': <ShieldCheck className="w-5 h-5 text-sky-600" />,
  };

  const eqImages: Record<string, { cardImg: string; coverImg: string; tag: string }> = {
    'volga-telecom': {
      cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_telecom_card.jpg`,
      coverImg: `${import.meta.env.BASE_URL}assets/t8/volga_telecom_cover.jpg`,
      tag: '[ Long haul / Metro ]',
    },
    'volga-dci': {
      cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_dci_card.jpg`,
      coverImg: `${import.meta.env.BASE_URL}assets/t8/volga_dci_cover.jpg`,
      tag: '[ Data Center Interconnect / Metro ]',
    },
    'otdr-ramenka': {
      cardImg: `${import.meta.env.BASE_URL}assets/t8/otdr_ramenka_card.png`,
      coverImg: `${import.meta.env.BASE_URL}assets/t8/otdr_ramenka_cover.png`,
      tag: '[ Optical Supervisory / OTDR 1625nm ]',
    },
    'nms-titan': {
      cardImg: `${import.meta.env.BASE_URL}assets/t8/nms_titan.png`,
      coverImg: `${import.meta.env.BASE_URL}assets/t8/nms_titan.png`,
      tag: '[ NMS Fractal / GUI Orchestration ]',
    },
  };

  const allProducts = [
    {
      id: 'volga-telecom',
      name: 'DWDM System Volga I Telecom',
      tag: '[ Long haul / Metro ]',
      desc: isEn
        ? 'Steady technological advancement of network infrastructure on a unified DWDM platform.'
        : 'Platform transmisi DWDM modular berkinerja tinggi untuk backbone jarak jauh dan metro.',
      img: `${import.meta.env.BASE_URL}assets/t8/volga_telecom_card.jpg`,
    },
    {
      id: 'volga-dci',
      name: 'DWDM System Volga I DCI',
      tag: '[ Data Center Interconnect ]',
      desc: isEn
        ? 'Ultra-dense 1U/2U modular platform engineered for high-bandwidth data center interconnects.'
        : 'Platform modular kompak hemat daya 1U/2U untuk interkoneksi hyperscale data center.',
      img: `${import.meta.env.BASE_URL}assets/t8/volga_dci_card.jpg`,
    },
    {
      id: 'dci-v2',
      name: 'DWDM System DCI V2',
      tag: '[ Next-Gen DCI ]',
      desc: isEn
        ? 'A new compact modular platform for data center interconnects, offering bandwidth up to 6.4 Tbps.'
        : 'Platform kompak modular generasi baru untuk DCI dengan kapasitas hingga 6.4 Tbps per unit.',
      img: `${import.meta.env.BASE_URL}assets/t8/volga_dci_v2_card.png`,
    },
    {
      id: 'otdr-ramenka',
      name: 'OTDR Monitoring System Ramenka',
      tag: '[ Fiber Health 24/7 ]',
      desc: isEn
        ? 'Automatic in-service optical line fiber monitoring system with 1-meter fault location accuracy.'
        : 'Sistem pemantauan serat optik otomatis in-service dengan akurasi lokasi putus hingga 1 meter.',
      img: `${import.meta.env.BASE_URL}assets/t8/otdr_ramenka_card.png`,
    },
  ];

  return (
    <section id="equipment" className="py-20 md:py-28 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="coral">{t('eq.badge')}</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t('eq.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            {t('eq.desc')}
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
          {/* Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-100">
                  {activeEq.category}
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {eqImages[activeEq.id]?.tag}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">
                {activeEq.name}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                {isEn ? activeEq.summary.replace('Sistem', 'High-performance optical system').replace('berkinerja tinggi', 'designed for high-reliability transport') : activeEq.summary}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
              <div>
                <p className="text-xs text-slate-400 font-medium">{t('eq.formFactor')}</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{activeEq.formFactor}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">{t('eq.capacity')}</p>
                <p className="text-sm font-bold text-sky-600 font-mono mt-0.5">{activeEq.capacity}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {t('eq.specs.title')}
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
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0284c7] hover:text-[#0369a1] transition-colors"
              >
                <span>{t('eq.requestBrochure')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Authentic T8 Product Image Card (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="w-full bg-gradient-to-b from-slate-50 to-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="relative w-full max-h-[340px] flex items-center justify-center overflow-hidden py-2">
                <img
                  src={eqImages[activeEq.id]?.cardImg || `${import.meta.env.BASE_URL}assets/t8/volga_telecom_card.jpg`}
                  alt={activeEq.name}
                  className="max-h-[300px] w-auto max-w-full object-contain rounded-xl drop-shadow-md hover:scale-102 transition-transform duration-300"
                />
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200/60 w-full flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">
                  {t('eq.officialHardware')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {t('eq.carrierReady')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* T8 Product Cards Row (matching t8.ru/en/ equipment catalog) */}
        <div className="pt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold">
              {isEn ? 'Hardware Showcase Catalog' : 'Katalog Perangkat Hardware T8'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => {
                  const targetId = prod.id === 'dci-v2' ? 'volga-dci' : prod.id;
                  setSelectedEqId(targetId);
                }}
                className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all cursor-pointer ${
                  selectedEqId === prod.id || (prod.id === 'dci-v2' && selectedEqId === 'volga-dci')
                    ? 'border-sky-500 ring-2 ring-sky-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="h-40 w-full flex items-center justify-center p-2 bg-slate-50 rounded-xl mb-4 overflow-hidden">
                    <img
                      src={prod.img}
                      alt={prod.name}
                      className="max-h-36 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-sky-700 font-bold block mb-1">
                    {prod.tag}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {prod.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                  <span>{isEn ? 'View Specifications' : 'Lihat Spesifikasi'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
