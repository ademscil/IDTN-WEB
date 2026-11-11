import React from 'react';
import { InquiryFormSection } from '../components/sections/InquiryFormSection';
import { Badge } from '../components/common/Badge';

export const ContactPage: React.FC = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="cyan">Saluran Komunikasi Resmi</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Hubungi PT IDTN & Pengajuan Penawaran (RFP)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Tim ahli rekayasa DWDM dan akun teknis kami siap mendiskusikan kebutuhan arsitektur jaringan optik, jadwal tender, dan spesifikasi perangkat Anda.
          </p>
        </div>
      </div>

      <InquiryFormSection />
    </div>
  );
};
