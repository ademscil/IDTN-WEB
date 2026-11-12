import React, { useEffect, useRef } from 'react';
import { X, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.equipment'), href: '#equipment' },
    { label: t('nav.clients'), href: '#clients' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs lg:hidden animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi mobile"
    >
      <div
        ref={drawerRef}
        className="w-4/5 max-w-sm h-full bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <a href="#hero" onClick={onClose}>
              <img
                src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
                alt="IDTN Logo"
                className="h-8 w-auto object-contain"
              />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Language Switcher in Mobile Drawer */}
          <div className="mt-5 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Language / Bahasa:</span>
            <div className="flex items-center bg-white p-0.5 rounded-lg border border-slate-200 text-xs font-bold shadow-2xs">
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-sky-600 text-white font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-sky-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-slate-100">
          <a href="#contact" onClick={onClose} className="block w-full">
            <Button variant="primary" className="w-full gap-2 py-3">
              <PhoneCall className="w-4 h-4" />
              <span>{t('nav.consultation')}</span>
            </Button>
          </a>
          <p className="text-[11px] text-slate-400 text-center mt-3 font-mono">
            PT Infinix Delapan Teknologi Nusantara
          </p>
        </div>
      </div>
    </div>
  );
};
