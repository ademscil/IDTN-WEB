import React from 'react';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import companyData from '../../data/company.json';
import { useLanguage } from '../../context';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <a href="#hero" className="bg-white p-2 rounded-lg inline-block">
              <img
                src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
                alt="IDTN Logo"
                className="h-9 w-auto object-contain"
              />
            </a>
            <p className="text-sm text-slate-300 leading-relaxed">
              {t('footer.desc')}
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

          {/* Col 2: Products & Systems */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              {t('footer.products')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System Volga I Telecom
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System Volga I DCI
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System DCI V2 (6.4 Tbps)
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  OTDR Monitoring System Ramenka
                </a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-sky-400 transition-colors">
                  NMS Titan & Fractal Management
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Ecosystem */}
          <div>
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              {t('footer.company')}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  {t('about.focus.title')}
                </a>
              </li>
              <li>
                <a href="#clients" className="hover:text-sky-400 transition-colors">
                  {t('nav.clients')}
                </a>
              </li>
              <li>
                <a
                  href="https://t8.ru/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-400 transition-colors inline-flex items-center gap-1 text-sky-400"
                >
                  <span>T8 Systems (Russia)</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold tracking-wider text-slate-200 uppercase mb-4">
              {t('footer.contact')}
            </h4>
            <div className="flex items-start gap-3 text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-1" />
              <p className="text-xs leading-relaxed">
                {companyData.headquarters.address}, {companyData.headquarters.city} {companyData.headquarters.postalCode}, {companyData.headquarters.country}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300 pt-1">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <a
                href={`mailto:${companyData.contact.officialEmail}`}
                className="text-xs hover:text-sky-400 transition-colors font-mono"
              >
                {companyData.contact.officialEmail}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <a
                href={`tel:${companyData.contact.phoneOffice.replace(/[^0-9+]/g, '')}`}
                className="text-xs hover:text-sky-400 transition-colors font-mono"
              >
                {companyData.contact.phoneOffice}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {companyData.legalName}. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <span>{companyData.headquarters.city}, {companyData.headquarters.country}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Partner Resmi T8 Systems</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
