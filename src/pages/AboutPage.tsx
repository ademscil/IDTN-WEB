import React from 'react';
import { Download } from 'lucide-react';
import { AboutUsSection } from '../components/sections/AboutUsSection';
import { Badge } from '../components/common/Badge';
import { useLanguage } from '../context';
import { useCmsData } from '../context/CmsDataContext';
import { usePageSeo } from '../hooks/usePageSeo';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const { pages } = useCmsData();
  const isEn = lang === 'en';

  // Dynamic SEO from CMS
  usePageSeo('about');

  const heroData: Record<string, string> = (pages.about?.hero?.[isEn ? 'en' : 'id'] || {}) as Record<string, string>;

  // Dynamic Company Profile Link from CMS
  const rawProfileUrl = heroData.company_profile_url || `${import.meta.env.BASE_URL}assets/docs/IDTN-Company-Profile-2026.pptx`;
  const companyProfileUrl = rawProfileUrl.startsWith('http') || rawProfileUrl.startsWith('/')
    ? rawProfileUrl
    : `${import.meta.env.BASE_URL}${rawProfileUrl.replace(/^\.?\//, '')}`;
  const companyProfileLabel = heroData.company_profile_label || (isEn ? 'Download Company Profile (PPTX)' : 'Unduh Profil Perusahaan (PPTX)');
  const downloadFileName = companyProfileUrl.split('/').pop() || 'IDTN-Company-Profile-2026.pptx';

  return (
    <div className="pt-20 sm:pt-28 pb-10 sm:pb-16">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-6 sm:py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 sm:space-y-4">
          <Badge variant="cyan" className="text-xs">
            {heroData.tag || t('page.about.badge')}
          </Badge>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {heroData.title || t('page.about.title')}
          </h1>
          <p className="text-xs sm:text-base lg:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {heroData.subtitle || t('page.about.desc')}
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href={companyProfileUrl}
              download={downloadFileName}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>{companyProfileLabel}</span>
            </a>
          </div>
        </div>
      </div>

      <AboutUsSection showHeader={false} />
    </div>
  );
};
