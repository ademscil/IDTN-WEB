import React from 'react';
import { EquipmentSection } from '../components/sections/EquipmentSection';
import { Badge } from '../components/common/Badge';
import { useLanguage } from '../context';
import { useCmsData } from '../context/CmsDataContext';
import { usePageSeo } from '../hooks/usePageSeo';

export const EquipmentPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { pages } = useCmsData();
  const isEn = lang === 'en';

  // Dynamic SEO from CMS
  usePageSeo('product');

  const heroData: Record<string, string> = (pages.product?.hero?.[isEn ? 'en' : 'id'] || {}) as Record<string, string>;

  return (
    <div className="pt-20 sm:pt-28 pb-10 sm:pb-16">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-6 sm:py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <Badge variant="coral" className="text-xs">
            {heroData.tag || t('page.equipment.badge')}
          </Badge>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {heroData.title || t('page.equipment.title')}
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {heroData.subtitle || t('page.equipment.desc')}
          </p>
        </div>
      </div>

      <EquipmentSection showHeader={false} />
    </div>
  );
};
