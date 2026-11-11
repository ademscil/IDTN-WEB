import React from 'react';
import { Camera, CheckCircle2 } from 'lucide-react';
import galleryData from '../../data/gallery.json';
import { Badge } from '../common/Badge';

export const GallerySection: React.FC = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="coral">Dokumentasi Kerja Lapangan</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeri Operasional & Standar Pengerjaan
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kerapian penataan rak, kepatuhan prosedur keselamatan kerja (K3), dan standarisasi pengujian optik presisi oleh tim teknis IDTN.
          </p>
        </div>

        {/* Gallery Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image / Graphic Container */}
              <div className="w-full aspect-video bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white relative overflow-hidden group">
                <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-xs mb-3 group-hover:scale-110 transition-transform">
                  <Camera className="w-8 h-8 text-sky-400" />
                </div>
                <span className="text-xs font-mono font-bold text-sky-300 uppercase tracking-widest">
                  Dokumentasi Teknis Lapangan
                </span>
                <p className="text-sm font-bold text-white mt-1 max-w-xs">
                  {item.title}
                </p>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-400 bg-black/40 px-2 py-0.5 rounded">
                  ISO 9001 Procedure
                </div>
              </div>

              {/* Text info */}
              <div className="pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Terverifikasi QA
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
