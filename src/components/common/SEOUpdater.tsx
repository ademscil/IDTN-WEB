import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../context';

export const SEOUpdater: React.FC = () => {
  const location = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const isEn = lang === 'en';
    const path = location.pathname.replace(/\/+$/, '') || '/';

    let title = '';
    let description = '';

    switch (path) {
      case '/about':
        title = isEn
          ? 'About PT IDTN — Full-Cycle DWDM Optical Transmission | IDTN.co.id'
          : 'Tentang PT IDTN — Solusi Transmisi DWDM Nusantara | IDTN.co.id';
        description = isEn
          ? 'Learn about PT Infinix Delapan Teknologi Nusantara (IDTN.co.id), carrier-grade DWDM solutions provider with project footprint of 8,514 km Sabang to Merauke and T8 Systems partnership.'
          : 'Mengenal PT Infinix Delapan Teknologi Nusantara (IDTN.co.id), penyedia solusi DWDM berstandar internasional dengan jangkauan 8.514 km Sabang-Merauke bersama T8 Systems.';
        break;
      case '/equipment':
        title = isEn
          ? 'DWDM Equipment Catalog — Volga I Telecom, DCI V2 & OTDR | PT IDTN (IDTN.co.id)'
          : 'Katalog Perangkat DWDM T8 — Volga I Telecom, DCI V2 & OTDR | PT IDTN (IDTN.co.id)';
        description = isEn
          ? 'Official carrier-grade DWDM hardware catalog: Volga I Telecom (up to 38.4 Tbps), Volga I DCI & DCI V2 (6.4 Tbps per 2U), and OTDR Ramenka fiber monitoring.'
          : 'Katalog perangkat keras DWDM resmi: Volga I Telecom (hingga 38.4 Tbps), Volga I DCI & DCI V2 (6.4 Tbps per 2U), dan sistem monitoring serat optik OTDR Ramenka.';
        break;
      case '/clients':
        title = isEn
          ? 'Clients & Strategic Application Sectors — DWDM Transport | PT IDTN (IDTN.co.id)'
          : 'Klien & Sektor Industri Jaringan DWDM | PT IDTN (IDTN.co.id)';
        description = isEn
          ? 'Empowering telecommunication operators, hyperscale data centers, national railways, and aviation with carrier-grade DWDM transport infrastructure across Indonesia.'
          : 'Memberdayakan operator telekomunikasi, hyperscale data center, perkeretaapian nasional, dan maritim dengan infrastruktur transmisi optik DWDM berkecepatan tinggi.';
        break;
      case '/contact':
        title = isEn
          ? 'Contact Us — DWDM Project Consultation & Quotation | PT IDTN (IDTN.co.id)'
          : 'Hubungi Kami — Konsultasi Proyek & Layanan DWDM | PT IDTN (IDTN.co.id)';
        description = isEn
          ? 'Contact PT IDTN (IDTN.co.id) at Fatmawati City Center, Jakarta Selatan. Official consultation for turnkey DWDM deployment, equipment supply, and technical SLAs.'
          : 'Hubungi kantor pusat PT IDTN (IDTN.co.id) di Fatmawati City Center, Jakarta Selatan untuk konsultasi proyek DWDM, pengadaan hardware, dan dukungan teknis 24/7.';
        break;
      case '/':
      default:
        title = isEn
          ? 'DWDM Indonesia — High-Capacity Optical Transport Solutions | PT IDTN (IDTN.co.id)'
          : 'DWDM Indonesia — Solusi Transmisi Optik Berkapasitas Tinggi | PT IDTN (IDTN.co.id)';
        description = isEn
          ? 'PT IDTN (IDTN.co.id) delivers carrier-grade DWDM solutions in Indonesia in partnership with T8 Systems. Up to 800 Gbps per wavelength and 8,514 km nationwide project reach.'
          : 'PT IDTN (IDTN.co.id) adalah penyedia solusi DWDM (Dense Wavelength Division Multiplexing) dan infrastruktur transmisi optik berkapasitas tinggi di Indonesia bersama T8 Systems.';
        break;
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', description);
    }
  }, [location.pathname, lang]);

  return null;
};
