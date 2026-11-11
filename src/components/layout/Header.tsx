import React, { useState, useEffect } from 'react';
import { Menu, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Beranda', href: '#hero' },
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Solusi', href: '#solutions' },
    { label: 'DWDM Explorer', href: '#dwdm' },
    { label: 'Perangkat T8', href: '#equipment' },
    { label: 'Legalitas & Audit', href: '#compliance' },
    { label: 'Proyek', href: '#projects' },
    { label: 'Galeri', href: '#gallery' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#hero" className="flex items-center gap-2 group cursor-pointer focus-visible:outline-sky-600">
            <img
              src="/assets/brand/idtn-logo.jpg"
              alt="PT Infinix Delapan Teknologi Nusantara (IDTN) Logo"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Navigasi Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs xl:text-sm font-semibold text-slate-700 hover:text-[#0284c7] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#0284c7] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:inline-flex">
              <Button size="sm" variant="primary" className="gap-2">
                <PhoneCall className="w-4 h-4" />
                <span>Konsultasi Proyek</span>
              </Button>
            </a>

            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Buka menu navigasi"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
