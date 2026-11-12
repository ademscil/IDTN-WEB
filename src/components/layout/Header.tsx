import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';
import { useLanguage } from '../../context';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '#hero' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.equipment'), href: '#equipment' },
    { label: t('nav.clients'), href: '#clients' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/85 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer focus-visible:outline-sky-600">
            <img
              src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
              alt="PT Infinix Delapan Teknologi Nusantara (IDTN) Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#0284c7] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#0284c7] after:w-0 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Language Switcher & Mobile Hamburger */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Language Switcher (ID | EN) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-bold" title="Pilih Bahasa / Select Language">
              <button
                type="button"
                onClick={() => setLang('id')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'id'
                    ? 'bg-white text-[#0284c7] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="Bahasa Indonesia"
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  lang === 'en'
                    ? 'bg-white text-[#0284c7] shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <a href="#contact" className="hidden sm:inline-flex">
              <Button size="sm" variant="primary" className="gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>{t('nav.consultation')}</span>
              </Button>
            </a>

            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={t('nav.mobileMenu')}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
