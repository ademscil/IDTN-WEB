import React from 'react';
import { DwdmExplorerSection } from '../components/sections/DwdmExplorerSection';
import { EquipmentSection } from '../components/sections/EquipmentSection';
import { Badge } from '../components/common/Badge';

export const TechnologyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="coral">Arsitektur Perangkat Resmi T8</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Teknologi DWDM & Lini Perangkat Optik T8
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Eksplorasi interaktif arsitektur transmisi Dense Wavelength Division Multiplexing dan katalog platform perangkat keras/lunak carrier-grade Volga & Ramenka.
          </p>
        </div>
      </div>

      <DwdmExplorerSection />
      <EquipmentSection />
    </div>
  );
};
