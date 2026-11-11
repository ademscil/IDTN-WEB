import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck } from 'lucide-react';
import companyData from '../../data/company.json';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="bg-white p-2 rounded-lg inline-block">
              <img
                src="/assets/brand/idtn-logo.jpg"
                alt="IDTN Logo"
                className="h-9 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {companyData.shortDescription}
            </p>
            <p className="text-xs text-sky-400 font-medium italic">
              "{companyData.philosophy.headline}"
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-800 text-emerald-400 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SDPPI & OSS Compliant</span>
              </span>
            </div>
          </div>

          {/* Col 2: Solutions & Technology */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              Solusi & Teknologi
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#dwdm" className="hover:text-sky-400 transition-colors">
                  DWDM Optical Transport (Volga I)
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-sky-400 transition-colors">
                  Data Center Interconnect (DCI)
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  OTDR Monitoring System (Ramenka)
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  Network Management (NMS Titan)
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-sky-400 transition-colors">
                  Turnkey Fiber Infrastructure OSP
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kredibilitas & Tata Kelola */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              Kredibilitas & Tata Kelola
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#compliance" className="hover:text-sky-400 transition-colors">
                  Sertifikasi ISO 9001:2015
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-sky-400 transition-colors">
                  Sertifikasi ISO 27001:2022
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-sky-400 transition-colors">
                  Standar SDPPI Kominfo RI
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-sky-400 transition-colors">
                  NIB OSS & KBLI 61100
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-sky-400 transition-colors">
                  Laporan Audit Keuangan (WTP)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Kantor & Kontak Resmi */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              Kantor Pusat & Kontak
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
                <span>
                  {companyData.headquarters.address}, {companyData.headquarters.city},{' '}
                  {companyData.headquarters.province} {companyData.headquarters.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${companyData.contact.officialEmail}`} className="hover:text-white transition-colors">
                  {companyData.contact.officialEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${companyData.contact.phoneOffice.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {companyData.contact.phoneOffice}
                </a>
              </div>
              <p className="text-xs text-slate-500 pt-1">
                Jam Operasional: {companyData.contact.workingHours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {companyData.foundedYear} {companyData.legalName}. Hak cipta dilindungi undang-undang.
          </p>
          <div className="flex items-center gap-6">
            <a href="#compliance" className="hover:text-slate-300 transition-colors">
              Legalitas Resmi
            </a>
            <a href="#contact" className="hover:text-slate-300 transition-colors">
              Kebijakan Privasi
            </a>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400">Partner Resmi T8 DWDM Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
