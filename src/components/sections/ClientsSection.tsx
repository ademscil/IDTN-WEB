import React from 'react';
import { Handshake, Building2, CheckCircle2 } from 'lucide-react';
import clientsData from '../../data/clients.json';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';
import { useCmsData } from '../../context/CmsDataContext';

interface ClientsSectionProps {
  showHeader?: boolean;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ showHeader = true }) => {
  const { lang, t } = useLanguage();
  const { clients } = useCmsData();
  const isEn = lang === 'en';

  return (
    <section
      id="clients"
      className={`bg-slate-50/70 border-b border-slate-100 ${
        showHeader ? 'py-12 sm:py-20 md:py-24' : 'pt-6 sm:pt-10 pb-12 sm:pb-20'
      }`}
    >
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${showHeader ? 'space-y-12 sm:space-y-16' : 'space-y-8 sm:space-y-12'}`}>
        
        {/* Section Header */}
        {showHeader && (
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <Badge variant="cyan">{t('clients.badge')}</Badge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t('clients.title')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600">
              {t('clients.desc')}
            </p>
          </div>
        )}

        {/* Strategic Sectors & Principal Overview */}
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider font-mono">
              {isEn ? 'Strategic Industry Segments' : 'Segmen Industri Strategis'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {clientsData.map((client) => (
              <div
                key={client.id}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-sky-50 text-sky-700 inline-block">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
                    {client.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {client.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600">
                    {client.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {isEn
                      ? client.description
                          .replace('Prinsipal resmi teknologi DWDM global asal Rusia yang bermitra strategis dengan IDTN di Indonesia.', 'Official Russian DWDM optical technology principal partnering strategically with IDTN across Indonesia.')
                          .replace('Sektor transportasi rel kereta api dengan kebutuhan transmisi data persinyalan dan telekomunikasi berkeandalan tinggi.', 'National railway transportation sector with mission-critical signaling and high-reliability operational communications.')
                          .replace('Pengembang dan pengelola fasilitas data center yang membutuhkan link interkoneksi berkapasitas ultra-besar dan latensi rendah.', 'Hyperscale data center operators requiring ultra-high-bandwidth, low-latency metro interconnects.')
                          .replace('Penyedia layanan jaringan telekomunikasi seluler dan pita lebar yang memerlukan ekspansi kapasitas transmisi serat optik.', 'National telecommunication service providers expanding long-haul optical fiber transmission capacity.')
                      : client.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span>{isEn ? 'Verified Strategic Partner' : 'Mitra Terverifikasi'}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Managed Clients & Partners Roster from CMS */}
        {clients && clients.length > 0 && (
          <div className="pt-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base sm:text-xl font-extrabold text-slate-900">
                  {isEn ? 'Enterprise Client & Partner Portfolio' : 'Portofolio Klien & Mitra Enterprise'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {isEn ? 'Leading telecommunications operators and data center networks powered by IDTN.' : 'Jaringan operator telekomunikasi dan data center terkemuka yang didukung oleh IDTN.'}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-100 text-xs font-mono font-bold self-start sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{clients.length} {isEn ? 'Entities Active' : 'Entitas Terdaftar'}</span>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {clients.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-xs hover:border-sky-400 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      {c.logo_url && !c.logo_url.endsWith('.svg') && !c.logo_url.endsWith('.png') ? (
                        <Building2 className="w-5 h-5 text-slate-400" />
                      ) : (
                        <Building2 className="w-5 h-5 text-sky-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 truncate">
                        {c.category}
                      </p>
                    </div>
                  </div>
                  {c.is_partner && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono font-semibold text-emerald-700">
                      <span>{isEn ? 'Verified Operator' : 'Operator Terverifikasi'}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
