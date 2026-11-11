import React from 'react';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { GallerySection } from '../components/sections/GallerySection';
import { ClientsSection } from '../components/sections/ClientsSection';
import { Badge } from '../components/common/Badge';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-16">
      <div className="bg-gradient-to-b from-sky-50 via-white to-white py-14 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Badge variant="cyan">Rekam Jejak & Dokumentasi</Badge>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Portofolio Proyek & Galeri Kerja Lapangan
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Studi kasus implementasi transmisi DWDM pada koridor kereta cepat, interkoneksi data center, sistem navigasi bandara, dan dokumentasi penataan rak ODF standar industri.
          </p>
        </div>
      </div>

      <ProjectsSection />
      <GallerySection />
      <ClientsSection />
    </div>
  );
};
