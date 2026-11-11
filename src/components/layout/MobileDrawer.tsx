import React, { useEffect, useRef } from 'react';
import { X, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (href: string) => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, onNavigate }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

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
    { label: 'Beranda', href: '#hero' },
    { label: 'Tentang Kami', href: '#about' },
    { label: 'Solusi Jaringan Optik', href: '#solutions' },
    { label: 'Teknologi DWDM Explorer', href: '#dwdm' },
    { label: 'Perangkat T8', href: '#equipment' },
    { label: 'Legalitas & Laporan Audit', href: '#compliance' },
    { label: 'Portofolio Proyek', href: '#projects' },
    { label: 'Galeri Lapangan', href: '#gallery' },
    { label: 'Klien & Mitra', href: '#clients' },
    { label: 'Kontak & Konsultasi', href: '#contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    onClose();
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

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
            <img
              src="/assets/brand/idtn-logo.jpg"
              alt="IDTN Logo"
              className="h-8 w-auto object-contain"
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-800 hover:bg-sky-50 hover:text-sky-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-slate-100">
          <a
            href="#contact"
            onClick={(e) => handleLinkClick(e, '#contact')}
            className="block w-full"
          >
            <Button variant="primary" className="w-full gap-2 py-3">
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi IDTN</span>
            </Button>
          </a>
          <p className="mt-4 text-center text-xs text-slate-400">
            PT Infinix Delapan Teknologi Nusantara
          </p>
        </div>
      </div>
    </div>
  );
};
