import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, Activity, ShieldCheck, Cpu, ArrowRight, Download } from 'lucide-react';
import dwdmData from '../../data/dwdm-tech.json';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';
import { useCmsData } from '../../context/CmsDataContext';

interface EquipmentSectionProps {
  showHeader?: boolean;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ showHeader = true }) => {
  const { lang, t } = useLanguage();
  const { products } = useCmsData();
  const isEn = lang === 'en';

  // Normalize products from CMS or fall back to static catalog
  const productList = products && products.length > 0 ? products.map(p => ({
    id: p.slug,
    name: p.name,
    category: p.category,
    summary: isEn ? (p.description.en || p.description.id) : (p.description.id || p.description.en),
    formFactor: p.form_factor,
    capacity: p.capacity,
    features: p.specs && Object.keys(p.specs).length > 0
      ? Object.entries(p.specs).map(([k, v]) => `${k}: ${v}`)
      : ['High-capacity carrier-grade optical hardware', 'Hot-swappable linecards and redundant PSU', 'Ultra-low latency determinism'],
    datasheet_url: p.datasheet_url,
    sort_order: p.sort_order
  })) : dwdmData.equipmentCatalog.map(eq => ({
    id: eq.id,
    name: eq.name,
    category: eq.category,
    summary: eq.summary,
    formFactor: eq.formFactor,
    capacity: eq.capacity,
    features: eq.features,
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 1
  }));

  const [selectedEqId, setSelectedEqId] = useState<string>(productList[0]?.id || 'volga-telecom');
  const activeEq = productList.find((e) => e.id === selectedEqId) || productList[0];

  const getIcon = (id: string) => {
    if (id.includes('telecom')) return <Server className="w-5 h-5 text-sky-600" />;
    if (id.includes('dci')) return <Cpu className="w-5 h-5 text-sky-600" />;
    if (id.includes('otdr') || id.includes('ramenka')) return <Activity className="w-5 h-5 text-sky-600" />;
    if (id.includes('nms') || id.includes('titan')) return <ShieldCheck className="w-5 h-5 text-sky-600" />;
    return <Cpu className="w-5 h-5 text-sky-600" />;
  };

  const getImage = (id: string) => {
    if (id.includes('telecom')) {
      return {
        cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_telecom_card.jpg`,
        tag: '[ Long haul / Metro ]',
      };
    }
    if (id === 'volga-dci') {
      return {
        cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_dci_card.jpg`,
        tag: '[ Data Center Interconnect / Metro ]',
      };
    }
    if (id.includes('dci')) {
      return {
        cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_dci_v2_card.png`,
        tag: '[ Next-Gen DCI / 6.4 Tbps ]',
      };
    }
    if (id.includes('otdr') || id.includes('ramenka')) {
      return {
        cardImg: `${import.meta.env.BASE_URL}assets/t8/otdr_ramenka_card.png`,
        tag: '[ Optical Supervisory / OTDR 1625nm ]',
      };
    }
    if (id.includes('nms') || id.includes('titan')) {
      return {
        cardImg: `${import.meta.env.BASE_URL}assets/t8/nms_titan.png`,
        tag: '[ NMS Fractal / GUI Orchestration ]',
      };
    }
    return {
      cardImg: `${import.meta.env.BASE_URL}assets/t8/volga_telecom_card.jpg`,
      tag: '[ Hardware Catalog ]',
    };
  };

  const activeImg = getImage(activeEq.id);

  return (
    <section
      id="equipment"
      className={`bg-slate-50/70 border-b border-slate-100 ${
        showHeader ? 'py-12 sm:py-20 md:py-28' : 'pt-6 sm:pt-10 pb-12 sm:pb-20'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showHeader ? 'space-y-10 sm:space-y-16' : 'space-y-6 sm:space-y-10'}`}>
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <Badge variant="coral">{t('eq.badge')}</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('eq.title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              {t('eq.desc')}
            </p>
          </div>
        )}

        {/* Tab Buttons (Horizontal on Desktop, compact wrapping on Mobile) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {productList.map((eq) => (
            <button
              key={eq.id}
              onClick={() => setSelectedEqId(eq.id)}
              className={`flex items-center gap-1.5 sm:gap-2.5 px-3 py-2 sm:px-5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                selectedEqId === eq.id
                  ? 'bg-white border-sky-500 text-sky-700 shadow-md scale-102'
                  : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:border-slate-300'
              }`}
            >
              {getIcon(eq.id)}
              <span>{eq.name}</span>
            </button>
          ))}
        </div>

        {/* Selected Equipment Showcase Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-sky-100">
                  {activeEq.category}
                </span>
                <span className="text-[11px] sm:text-xs font-mono text-slate-600 font-semibold">
                  {activeImg.tag}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 mt-2 sm:mt-3">
                {activeEq.name}
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-600 mt-2 leading-relaxed">
                {activeEq.summary}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-y border-slate-100">
              <div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-semibold uppercase tracking-wider">{t('eq.formFactor')}</p>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                  {activeEq.formFactor}
                </p>
              </div>
              <div>
                <p className="text-[11px] sm:text-xs text-slate-600 font-semibold uppercase tracking-wider">{t('eq.capacity')}</p>
                <p className="text-xs sm:text-sm font-bold text-sky-600 font-mono mt-0.5">{activeEq.capacity}</p>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 sm:space-y-2.5">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-600">
                {t('eq.specs.title')}
              </p>
              <ul className="space-y-1.5 sm:space-y-2">
                {activeEq.features.map((feat, fIdx) => (
                  <li key={fIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2 sm:gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shrink-0 mt-1.5 sm:mt-2"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold text-[11px] sm:text-xs md:text-sm shadow-md transition-all hover:-translate-y-0.5 cursor-pointer text-center leading-snug"
              >
                <span>{t('eq.requestBrochure')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              </Link>
              {activeEq.datasheet_url && (
                <a
                  href={activeEq.datasheet_url.startsWith('http') ? activeEq.datasheet_url : `${import.meta.env.BASE_URL}${activeEq.datasheet_url.replace(/^\//, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-[11px] sm:text-xs md:text-sm transition-all cursor-pointer text-center"
                >
                  <Download className="w-3.5 h-3.5 text-sky-600" />
                  <span>Datasheet PDF</span>
                </a>
              )}
            </div>
          </div>

          {/* Authentic T8 Product Image Card (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            <div className="w-full bg-gradient-to-b from-slate-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-200/80 shadow-inner flex flex-col items-center justify-center text-center">
              <div className="relative w-full max-h-[300px] sm:max-h-[340px] flex items-center justify-center overflow-hidden py-2">
                <img
                  src={activeImg.cardImg}
                  alt={activeEq.name}
                  className="max-h-[220px] sm:max-h-[300px] w-auto max-w-full object-contain rounded-xl drop-shadow-md hover:scale-102 transition-transform duration-300"
                />
              </div>
              
              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-200/60 w-full flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between text-left sm:text-center">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-slate-700">
                  {t('eq.officialHardware')}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] sm:text-xs font-mono font-bold">
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
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              {isEn ? 'Hardware Showcase Catalog' : 'Katalog Perangkat Hardware T8'}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.slice(0, 4).map((prod) => {
              const pImg = getImage(prod.id);
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedEqId(prod.id)}
                  className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all cursor-pointer ${
                    selectedEqId === prod.id
                      ? 'border-sky-500 ring-2 ring-sky-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="h-40 w-full flex items-center justify-center p-2 bg-slate-50 rounded-xl mb-4 overflow-hidden">
                      <img
                        src={pImg.cardImg}
                        alt={prod.name}
                        className="max-h-36 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-[11px] font-mono text-sky-700 font-bold block mb-1">
                      {pImg.tag}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 line-clamp-2">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                      {prod.summary}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                    <span>{isEn ? 'View Specifications' : 'Lihat Spesifikasi'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
