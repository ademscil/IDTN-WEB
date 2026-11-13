import React from 'react';
import { Download } from 'lucide-react';
import { AboutUsSection } from '../components/sections/AboutUsSection';
import { Badge } from '../components/common/Badge';
import { useLanguage } from '../context';

export const AboutPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const isEn = lang === 'en';

  return (
    <div className="pt-28 pb-16">
      {/* Page Header Banner */}
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="cyan">{t('page.about.badge')}</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('page.about.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('page.about.desc')}
          </p>
          <div className="pt-2 flex justify-center">
            <a
              href={`${import.meta.env.BASE_URL}assets/docs/IDTN-Company-Profile-2026.pdf`}
              download="IDTN-Company-Profile-2026.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs sm:text-sm font-bold shadow-md transition-all hover:-translate-y-0.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>{isEn ? 'Download Company Profile (PDF)' : 'Unduh Profil Perusahaan (PDF)'}</span>
            </a>
          </div>
        </div>
      </div>

      <AboutUsSection />
    </div>
  );
};
