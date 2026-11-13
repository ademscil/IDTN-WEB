import React from 'react';
import { InquiryFormSection } from '../components/sections/InquiryFormSection';
import { Badge } from '../components/common/Badge';
import { useLanguage } from '../context';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="cyan">{t('page.contact.badge')}</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {t('page.contact.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {t('page.contact.desc')}
          </p>
        </div>
      </div>

      <InquiryFormSection showHeader={false} />
    </div>
  );
};
