import React from 'react';
import { ComplianceSection } from '../components/sections/ComplianceSection';
import { Badge } from '../components/common/Badge';

export const CompliancePage: React.FC = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="green">Kepatuhan Hukum & Standar Kualitas</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Legalitas, Sertifikasi ISO & Laporan Audit
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Transparansi tata kelola korporat, sertifikasi ISO 9001, ISO 27001, sertifikasi perangkat SDPPI Kominfo, NIB OSS, dan opini audit keuangan WTP.
          </p>
        </div>
      </div>

      <ComplianceSection />
    </div>
  );
};
