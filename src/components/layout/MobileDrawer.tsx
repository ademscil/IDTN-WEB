import React, { useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { X, PhoneCall } from 'lucide-react';
import { Button } from '../common/Button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
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
    { label: 'Beranda', to: '/' },
    { label: 'Tentang Kami', to: '/about' },
    { label: 'Solusi Jaringan Optik', to: '/solutions' },
    { label: 'Teknologi DWDM & Perangkat T8', to: '/technology' },
    { label: 'Legalitas & Laporan Audit', to: '/compliance' },
    { label: 'Portofolio Proyek & Galeri', to: '/projects' },
    { label: 'Kontak & Pengajuan RFP', to: '/contact' },
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
            <Link to="/" onClick={onClose}>
              <img
                src={`${import.meta.env.BASE_URL}assets/brand/idtn-logo.jpg`}
                alt="IDTN Logo"
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
              aria-label="Tutup menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-50 text-[#0284c7] font-bold'
                      : 'text-slate-800 hover:bg-slate-50 hover:text-sky-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Footer CTA */}
        <div className="pt-6 border-t border-slate-100">
          <Link to="/contact" onClick={onClose} className="block w-full">
            <Button variant="primary" className="w-full gap-2 py-3">
              <PhoneCall className="w-4 h-4" />
              <span>Hubungi IDTN</span>
            </Button>
          </Link>
          <p className="mt-4 text-center text-xs text-slate-400">
            PT Infinix Delapan Teknologi Nusantara
          </p>
        </div>
      </div>
    </div>
  );
};
