import React from 'react';
import { Handshake, Building2, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useLanguage } from '../../context';
import { useCmsData } from '../../context/CmsDataContext';
import { StrategicSegment, CmsSectionValue } from '../../types/cms';

interface ClientsSectionProps {
  showHeader?: boolean;
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({ showHeader = true }) => {
  const { lang, t } = useLanguage();
  const { clients, pages } = useCmsData();
  const isEn = lang === 'en';

  const clientSections: Record<string, CmsSectionValue> = (pages.client?.sections?.[isEn ? 'en' : 'id'] || {}) as Record<string, CmsSectionValue>;
  const sectionTitle = typeof clientSections.section_title === 'string' ? clientSections.section_title : (isEn ? 'Strategic Industry Segments' : 'Segmen Industri Strategis');
  const strategicSegments: StrategicSegment[] = Array.isArray(clientSections.strategic_segments) && clientSections.strategic_segments.length > 0
    ? (clientSections.strategic_segments as StrategicSegment[])
    : (isEn
        ? [
            {
              id: 'partner-t8',
              name: 'T8 LLC',
              category: 'Global Technology Principal',
              role: 'DWDM Equipment R&D & Manufacturing Principal',
              description: 'Developer of world-class Volga DWDM optical transport platforms and Ramenka fiber line monitoring systems.',
              status_badge: 'Verified Strategic Partner',
              is_partner: true
            },
            {
              id: 'sector-telco',
              name: 'National Telecom Operators',
              category: 'Target Clients',
              role: 'Telecom Network & Mobile Operators',
              description: 'Backbone DWDM systems deployment and inter-city long-haul optical transmission capacity upgrades across Indonesia.',
              status_badge: 'Verified Strategic Partner',
              is_partner: true
            },
            {
              id: 'sector-dci',
              name: 'Hyperscale Cloud & Data Centers',
              category: 'Target Clients',
              role: 'Data Center & Cloud Infrastructure Providers',
              description: 'High-density Data Center Interconnect (DCI) optical platforms with lowest deterministic latency.',
              status_badge: 'Verified Strategic Partner',
              is_partner: true
            },
            {
              id: 'sector-transport',
              name: 'National Transportation Authorities',
              category: 'Target Clients',
              role: 'Aviation, Railway & Port Transportation Authorities',
              description: 'Mission-critical 99.999% optical communication infrastructure supporting vital signaling and operations.',
              status_badge: 'Verified Strategic Partner',
              is_partner: true
            }
          ]
        : [
            {
              id: 'partner-t8',
              name: 'T8 LLC',
              category: 'Global Technology Principal',
              role: 'Prinsipal Manufaktur & Riset Perangkat DWDM',
              description: 'Pengembang teknologi sistem transmisi optik DWDM Volga dan pemantauan kabel OTDR Ramenka kelas dunia.',
              status_badge: 'Mitra Terverifikasi',
              is_partner: true
            },
            {
              id: 'sector-telco',
              name: 'National Telecom Operators',
              category: 'Target Clients',
              role: 'Operator Jaringan Telekomunikasi & Seluler',
              description: 'Penyediaan perangkat DWDM backbone dan peningkatan kapasitas link transmisi antar-kota di Indonesia.',
              status_badge: 'Mitra Terverifikasi',
              is_partner: true
            },
            {
              id: 'sector-dci',
              name: 'Hyperscale Cloud & Data Centers',
              category: 'Target Clients',
              role: 'Penyedia Fasilitas Pusat Data & Cloud',
              description: 'Interkoneksi antar-data center (DCI) berkecepatan tinggi dengan latensi deterministik terendah.',
              status_badge: 'Mitra Terverifikasi',
              is_partner: true
            },
            {
              id: 'sector-transport',
              name: 'National Transportation Authorities',
              category: 'Target Clients',
              role: 'Otoritas Transportasi Udara, Kereta Api & Pelabuhan',
              description: 'Infrastruktur komunikasi optik berkeandalan 99.999% untuk mendukung sistem persinyalan dan operasional vital.',
              status_badge: 'Mitra Terverifikasi',
              is_partner: true
            }
          ]);

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

        {/* Strategic Sectors & Principal Overview (Dynamic from CMS) */}
        <div className="space-y-4">
          <div className="text-left">
            <h3 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider font-mono">
              {sectionTitle}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {strategicSegments.map((segment) => (
              <div
                key={segment.id}
                className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:border-sky-300 hover:shadow-md transition-all text-left flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-sky-50 text-sky-700 inline-block">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider block">
                    {segment.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">
                    {segment.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600">
                    {segment.role}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {segment.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
                  <span>{segment.status_badge || (isEn ? 'Verified Strategic Partner' : 'Mitra Terverifikasi')}</span>
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
