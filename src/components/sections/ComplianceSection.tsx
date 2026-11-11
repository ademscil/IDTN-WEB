import React, { useState } from 'react';
import { ShieldCheck, Award, FileText, CheckCircle2, Eye } from 'lucide-react';
import complianceData from '../../data/compliance.json';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const ComplianceSection: React.FC = () => {
  const [activeModalItem, setActiveModalItem] = useState<(typeof complianceData)[0] | null>(null);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'sertifikasi':
        return <Award className="w-6 h-6 text-sky-600" />;
      case 'legalitas':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default:
        return <FileText className="w-6 h-6 text-[#9f1b32]" />;
    }
  };

  return (
    <section id="compliance" className="py-20 md:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="green">Tata Kelola & Kepatuhan Resmi</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Legalitas, Sertifikasi & Laporan Audit
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Kredibilitas mutlak bagi pemenuhan kualifikasi pengadaan B2B, audit tender operator telekomunikasi, dan jaminan kepatuhan hukum di Republik Indonesia.
          </p>
        </div>

        {/* Compliance Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complianceData.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 hover:bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-white group-hover:bg-sky-50 border border-slate-200/60 shadow-xs transition-colors">
                    {getIcon(item.category)}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-1">
                    No. Reg: {item.regNumber}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 truncate max-w-[170px]">
                  {item.issuingBody}
                </span>
                <button
                  onClick={() => setActiveModalItem(item)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Detail</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Preview */}
        {activeModalItem && (
          <Modal
            isOpen={!!activeModalItem}
            onClose={() => setActiveModalItem(null)}
            title={activeModalItem.title}
          >
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <p className="text-xs text-slate-400 font-medium">Instansi / Badan Penerbit</p>
                  <p className="text-sm font-bold text-slate-900">{activeModalItem.issuingBody}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400 font-medium">Status Verifikasi</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeModalItem.badge}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Nomor Registrasi Resmi</p>
                <p className="text-sm font-mono font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-100 inline-block mt-1">
                  {activeModalItem.regNumber}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-400 font-medium">Rincian Dokumen & Cakupan Kepatuhan</p>
                <p className="text-sm text-slate-700 mt-1 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {activeModalItem.details}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 text-xs text-slate-400 italic">
                * Dokumen fisik asli dan salinan legalisir tersedia untuk verifikasi langsung dalam proses pengadaan (procurement) resmi.
              </div>
            </div>
          </Modal>
        )}

      </div>
    </section>
  );
};
