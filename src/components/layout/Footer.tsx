import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ShieldCheck, ArrowUpRight, MessageSquare } from 'lucide-react';
import companyData from '../../data/company.json';
import { useLanguage } from '../../context';
import { Modal } from '../common/Modal';

export const Footer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const isEn = lang === 'en';

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <Link to="/" className="bg-white p-2 rounded-lg inline-block">
              <img
                src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
                alt="IDTN Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>
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
                <Link to="/equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System Volga I Telecom
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System Volga I DCI
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-sky-400 transition-colors">
                  DWDM System DCI V2 (6.4 Tbps)
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-sky-400 transition-colors">
                  OTDR Monitoring System Ramenka
                </Link>
              </li>
              <li>
                <Link to="/equipment" className="hover:text-sky-400 transition-colors">
                  NMS Titan & Fractal Management
                </Link>
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
                <Link to="/about" className="hover:text-sky-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-400 transition-colors">
                  {t('about.focus.title')}
                </Link>
              </li>
              <li>
                <Link to="/clients" className="hover:text-sky-400 transition-colors">
                  {t('nav.clients')}
                </Link>
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
              <a
                href="https://maps.google.com/?q=Fatmawati+City+Center+Ruko+Soho+Botany+Garden+Crystal+Jakarta+Selatan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs leading-relaxed hover:text-sky-400 transition-colors"
                title="Buka lokasi di Google Maps"
              >
                {companyData.headquarters.address}, {companyData.headquarters.city} {companyData.headquarters.postalCode}, {companyData.headquarters.country}
              </a>
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
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${companyData.contact.whatsappHotline.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs hover:text-emerald-400 transition-colors font-mono"
              >
                {companyData.contact.whatsappHotline} (WhatsApp)
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {companyData.legalName}. {t('footer.rights')}
          </p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={() => setIsPrivacyOpen(true)}
              className="text-slate-400 hover:text-sky-400 transition-colors cursor-pointer underline underline-offset-2"
            >
              {isEn ? 'Privacy Notice & Data Protection' : 'Kebijakan Privasi & PDP'}
            </button>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>{companyData.headquarters.city}, {companyData.headquarters.country}</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>Partner Resmi T8 Systems</span>
          </div>
        </div>
      </div>

      {/* Privacy Notice Modal */}
      <Modal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title={isEn ? 'Privacy Notice & Data Protection' : 'Kebijakan Privasi & Perlindungan Data'}
      >
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
          <p>
            {isEn
              ? 'PT Infinix Delapan Teknologi Nusantara (IDTN) is committed to protecting your corporate and personal data in full compliance with Indonesian Law No. 27 of 2022 concerning Personal Data Protection (UU PDP).'
              : 'PT Infinix Delapan Teknologi Nusantara (IDTN) berkomitmen penuh melindungi kerahasiaan data korporat dan informasi kontak Anda sesuai dengan Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).'}
          </p>
          <h5 className="font-bold text-slate-900 pt-1">
            {isEn ? '1. Collection of Business Inquiry Information' : '1. Pengumpulan Informasi RFP & Konsultasi'}
          </h5>
          <p>
            {isEn
              ? 'Information provided via the Project Inquiry Form (including company name, professional email, phone number, and network requirements) is strictly utilized for technical optical transmission assessment, link design, and commercial RFP response.'
              : 'Informasi yang Anda sampaikan melalui formulir pengajuan RFP (nama, email perusahaan, nomor telepon, dan kebutuhan jaringan) semata-mata digunakan untuk evaluasi teknis arsitektur transmisi optik, perhitungan kapasitas, dan komunikasi resmi IDTN.'}
          </p>
          <h5 className="font-bold text-slate-900 pt-1">
            {isEn ? '2. Confidentiality & Third-Party Disclosure' : '2. Kerahasiaan & Non-Disclosure'}
          </h5>
          <p>
            {isEn
              ? 'IDTN does not sell, rent, or lease corporate inquiry data to third parties. Data is only shared with certified engineering personnel and principal equipment partners (T8 Systems) solely for link budgeting and equipment compatibility purposes.'
              : 'IDTN tidak menjual atau membagikan data pengajuan kepada pihak ketiga. Informasi teknis hanya diakses oleh tim insinyur tersertifikasi IDTN dan prinsipal T8 Systems demi keperluan kalkulasi kompatibilitas link dan pengadaan perangkat.'}
          </p>
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setIsPrivacyOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 cursor-pointer"
            >
              {isEn ? 'Understood' : 'Saya Mengerti'}
            </button>
          </div>
        </div>
      </Modal>
    </footer>
  );
};
