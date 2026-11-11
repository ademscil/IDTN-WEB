import React from 'react';
import { SolutionsSection } from '../components/sections/SolutionsSection';
import { Badge } from '../components/common/Badge';

export const SolutionsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="cyan">Solusi Telekomunikasi Terpadu</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Katalog Solusi Rekayasa Jaringan & DWDM
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Penyediaan link DWDM berkapasitas multi-terabit, interkoneksi data center (DCI) latensi ultra-rendah, penggelaran serat optik turnkey, dan automasi pemantauan OTDR 24/7.
          </p>
        </div>
      </div>

      <SolutionsSection />
    </div>
  );
};
