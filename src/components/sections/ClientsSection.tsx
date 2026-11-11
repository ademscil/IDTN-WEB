import React from 'react';
import { Handshake } from 'lucide-react';
import clientsData from '../../data/clients.json';
import { Badge } from '../common/Badge';

export const ClientsSection: React.FC = () => {
  return (
    <section id="clients" className="py-20 md:py-24 bg-slate-50/70 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="cyan">Ekosistem Kemitraan Strategis</Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Prinsipal Teknologi & Sektor Kemitraan
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Bersinergi bersama prinsipal perangkat optik global dan melayani institusi strategis di seluruh penjuru Indonesia.
          </p>
        </div>

        {/* Partners & Clients Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clientsData.map((client) => (
            <div
              key={client.id}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-sky-50 text-sky-700 inline-block">
                  <Handshake className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
                  {client.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {client.name}
                </h3>
                <p className="text-xs font-medium text-slate-500">
                  {client.role}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {client.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-600 font-semibold">
                <span>Mitra Terverifikasi</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
