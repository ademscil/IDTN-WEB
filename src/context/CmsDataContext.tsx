import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { PageContentData, FooterSettingsData, CmsProduct, CmsClient } from '../types/cms';

// Default Fallback Data (ensures 0ms instant render & offline resilience)
const defaultPages: Record<string, PageContentData> = {
  home: {
    seo: {
      id: {
        title: 'IDTN — Solusi Infrastruktur DWDM & Transmisi Optik Berkapasitas Tinggi Indonesia',
        description: 'PT Infinix Delapan Teknologi Nusantara (IDTN) menyediakan solusi transmisi optik DWDM berkecepatan multi-terabit untuk operator telekomunikasi, ISP, dan data center di Indonesia.',
        keywords: 'dwdm indonesia, transmisi optik, infrastruktur telekomunikasi, volga I, dci v2, jaringan fiber optik, t8 systems indonesia'
      },
      en: {
        title: 'IDTN — High-Capacity DWDM Optical Transport & Telecom Infrastructure Indonesia',
        description: 'PT Infinix Delapan Teknologi Nusantara (IDTN) provides multi-terabit DWDM optical transmission infrastructure for telecom operators, ISPs, and data centers across Indonesia.',
        keywords: 'dwdm indonesia, optical transport, telecom infrastructure, volga I, dci v2, optical fiber network, t8 systems indonesia'
      }
    },
    hero: {
      id: {
        badge: 'Penyedia Infrastruktur Telekomunikasi Optik Resmi',
        headline: 'Infrastruktur Transmisi Optik DWDM Berkapasitas Tinggi',
        subtitle: 'Menghubungkan operator, ISP, dan data center di seluruh Indonesia dengan platform transmisi DWDM berkecepatan multi-terabit dan keandalan tingkat operator (99.999% SLA).',
        cta_primary: 'Konsultasi Proyek',
        cta_secondary: 'Lihat Katalog Produk',
        metric_1_val: '800G',
        metric_1_lbl: 'Per Channel Optical Engine',
        metric_2_val: '48+',
        metric_2_lbl: 'DWDM Terabit Channels',
        metric_3_val: '99.999%',
        metric_3_lbl: 'Carrier-Grade Uptime SLA'
      },
      en: {
        badge: 'Official Optical Telecommunication Infrastructure Provider',
        headline: 'High-Capacity DWDM Optical Transmission Infrastructure',
        subtitle: 'Empowering telecom operators, ISPs, and data centers across Indonesia with multi-terabit DWDM transmission platforms and carrier-grade reliability (99.999% SLA).',
        cta_primary: 'Request Project Consultation',
        cta_secondary: 'Explore Product Catalog',
        metric_1_val: '800G',
        metric_1_lbl: 'Per Channel Optical Engine',
        metric_2_val: '48+',
        metric_2_lbl: 'DWDM Terabit Channels',
        metric_3_val: '99.999%',
        metric_3_lbl: 'Carrier-Grade Uptime SLA'
      }
    },
    sections: {
      id: {
        bottom_cta_badge: 'Siap Mengembangkan Infrastruktur Optik Anda?',
        bottom_cta_title: 'Bangun Jaringan DWDM Berkeandalan Tinggi Bersama IDTN',
        bottom_cta_desc: 'Tim rekayasa optik kami siap membantu perancangan link, perencanaan kapasitas multi-terabit, dan implementasi turnkey di seluruh Indonesia.'
      },
      en: {
        bottom_cta_badge: 'Ready to Scale Your Optical Infrastructure?',
        bottom_cta_title: 'Deploy High-Reliability DWDM Networks with IDTN',
        bottom_cta_desc: 'Our optical engineering team is prepared to assist with link design, multi-terabit capacity planning, and turnkey deployment across Indonesia.'
      }
    }
  },
  about: {
    seo: {
      id: {
        title: 'Tentang Kami — PT Infinix Delapan Teknologi Nusantara (IDTN)',
        description: 'Pelajari profil, sejarah, filosofi, serta dedikasi IDTN dalam menyediakan infrastruktur telekomunikasi optik berstandar dunia untuk Indonesia.',
        keywords: 'tentang idtn, profil perusahaan idtn, profil infinix delapan teknologi nusantara, t8 indonesia'
      },
      en: {
        title: 'About Us — PT Infinix Delapan Teknologi Nusantara (IDTN)',
        description: 'Learn about IDTN history, philosophy, and dedication to delivering world-class optical telecommunications infrastructure across Indonesia.',
        keywords: 'about idtn, idtn company profile, pt infinix delapan teknologi nusantara, t8 indonesia'
      }
    },
    hero: {
      id: {
        tag: 'Profil Perusahaan',
        title: 'Membangun Jalur Utama Komunikasi Optik Indonesia',
        subtitle: 'IDTN berdiri dengan visi memperkuat kedaulatan konektivitas digital Indonesia melalui sistem DWDM terdepan, handal, dan berkapasitas masif.'
      },
      en: {
        tag: 'Company Profile',
        title: 'Architecting Indonesia’s High-Capacity Optical Backbone',
        subtitle: 'IDTN was founded with the vision to strengthen Indonesia’s digital connectivity through high-density, reliable, and advanced DWDM optical platforms.'
      }
    },
    sections: {
      id: {
        etymology_title: 'Makna di Balik Nama IDTN',
        etymology_desc: 'Infinix (keberlanjutan tanpa batas), Delapan (simbol kelimpahan dan kesinambungan), Teknologi (keunggulan rekayasa optik), Nusantara (komitmen menyeluruh untuk Indonesia).'
      },
      en: {
        etymology_title: 'The Meaning Behind IDTN',
        etymology_desc: 'Infinix (infinite continuity), Delapan/Eight (symbol of abundance and connection), Teknologi (optical engineering excellence), Nusantara (unwavering commitment to Indonesia).'
      }
    }
  },
  product: {
    seo: {
      id: {
        title: 'Katalog Perangkat DWDM & Solusi Optik T8 — IDTN',
        description: 'Jajaran perangkat keras DWDM resmi T8 Systems: Volga I Telecom, Volga I DCI, DCI V2, OTDR Ramenka, dan NMS Titan berkecepatan 800G per channel.',
        keywords: 'perangkat dwdm, volga I telecom, volga I dci, dci v2, otdr ramenka, nms titan, t8 systems indonesia'
      },
      en: {
        title: 'T8 DWDM Systems & Optical Network Management Catalog — IDTN',
        description: 'Official T8 Systems hardware catalog: Volga I Telecom, Volga I DCI, DCI V2, Ramenka OTDR, and Titan NMS with up to 800G per channel optical performance.',
        keywords: 'dwdm hardware, volga I telecom, volga I dci, dci v2, otdr ramenka, nms titan, t8 systems indonesia'
      }
    },
    hero: {
      id: {
        tag: 'Jajaran Perangkat Keras Resmi T8',
        title: 'Sistem DWDM & Manajemen Jaringan Optik',
        subtitle: 'Platform perangkat keras DWDM berkecepatan tinggi yang teruji secara global, disuplai, disesuaikan, dan didukung penuh oleh IDTN di seluruh Indonesia.'
      },
      en: {
        tag: 'Official T8 Equipment Line',
        title: 'T8 DWDM Systems & Optical Network Management',
        subtitle: 'Globally proven, high-speed DWDM hardware and software platforms supplied, customized, and fully supported by IDTN across Indonesia.'
      }
    },
    sections: {
      id: { rfp_notice: 'Spesifikasi khusus dan penawaran tender RFP dapat dikonsultasikan langsung bersama tim teknis IDTN.' },
      en: { rfp_notice: 'Custom configurations and formal tender RFP quotations are available through our optical engineering team.' }
    }
  },
  client: {
    seo: {
      id: {
        title: 'Klien & Mitra Strategis — PT Infinix Delapan Teknologi Nusantara',
        description: 'Dipercaya oleh operator telekomunikasi terkemuka, penyedia layanan internet, dan operator data center terdepan di Indonesia.',
        keywords: 'klien idtn, mitra telekomunikasi, partner t8 indonesia, data center interconnect'
      },
      en: {
        title: 'Clients & Strategic Partners — PT Infinix Delapan Teknologi Nusantara',
        description: 'Trusted by Indonesia’s leading telecommunication operators, internet service providers, and hyperscale data centers.',
        keywords: 'idtn clients, telecom partners, t8 indonesia partner, data center interconnect'
      }
    },
    hero: {
      id: {
        tag: 'Kemitraan Terpercaya',
        title: 'Dipercaya oleh Pemimpin Industri Telekomunikasi & Data Center',
        subtitle: 'Mendukung tulang punggung optik nasional bersama penyedia jaringan dan infrastruktur digital terbesar di Indonesia.'
      },
      en: {
        tag: 'Trusted Partnerships',
        title: 'Trusted by Telecommunications & Data Center Leaders',
        subtitle: 'Empowering the national optical backbone alongside Indonesia’s prominent network providers and digital infrastructure leaders.'
      }
    },
    sections: { id: {}, en: {} }
  },
  contact: {
    seo: {
      id: {
        title: 'Hubungi Kami — Konsultasi Proyek & Penawaran DWDM IDTN',
        description: 'Hubungi tim ahli optik IDTN di Fatmawati City Center Jakarta Selatan untuk konsultasi desain link DWDM, pengadaan perangkat T8, dan penawaran teknis.',
        keywords: 'kontak idtn, kantor idtn fatmawati, rfp dwdm, konsultasi jaringan optik'
      },
      en: {
        title: 'Contact Us — Project Consultation & DWDM RFP Inquiry IDTN',
        description: 'Reach IDTN’s optical engineering team at Fatmawati City Center South Jakarta for DWDM link design, T8 hardware procurement, and RFP inquiries.',
        keywords: 'contact idtn, idtn office fatmawati, dwdm rfp, optical network consultation'
      }
    },
    hero: {
      id: {
        tag: 'Hubungi Tim Ahli Kami',
        title: 'Konsultasikan Kebutuhan Infrastruktur Optik Anda',
        subtitle: 'Teknisi rekayasa optik IDTN siap membantu mulai dari simulasi link optik, pengujian lab, hingga implementasi jaringan di lokasi Anda.'
      },
      en: {
        tag: 'Connect With Our Specialists',
        title: 'Consult Your Optical Infrastructure Requirements',
        subtitle: 'IDTN’s certified optical engineers are ready to assist with link simulations, laboratory testing, and turnkey field implementation.'
      }
    },
    sections: {
      id: {
        hours_label: 'Jam Layanan Operasional',
        hours_val: 'Senin – Jumat: 08:30 – 17:30 WIB'
      },
      en: {
        hours_label: 'Operating Hours',
        hours_val: 'Monday – Friday: 08:30 – 17:30 WIB'
      }
    }
  }
};

const defaultFooter: FooterSettingsData = {
  company_summary: {
    id: 'Penyedia infrastruktur telekomunikasi transmisi optik DWDM berkapasitas tinggi di Indonesia.',
    en: 'High-capacity DWDM optical transmission telecommunications infrastructure provider in Indonesia.'
  },
  philosophy_quote: {
    id: 'Bagaikan sungai yang bermuara ke lautan, IDTN menghubungkan data dan informasi ke seluruh dunia.',
    en: 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.'
  },
  copyright: {
    id: '© 2026 PT Infinix Delapan Teknologi Nusantara. Seluruh hak cipta dilindungi undang-undang.',
    en: '© 2026 PT Infinix Delapan Teknologi Nusantara. All rights reserved.'
  },
  address: {
    id: 'Fatmawati City Center, Ruko Soho Botany Garden Crystal No. 18, Jl. Fatmawati Raya, Cilandak Barat, Jakarta Selatan 12430, Indonesia',
    en: 'Fatmawati City Center, Ruko Soho Botany Garden Crystal No. 18, Jl. Fatmawati Raya, Cilandak Barat, Jakarta Selatan 12430, Indonesia'
  },
  contact: {
    email: 'info@idtn.co.id',
    phone: '+62 21 3192 8888',
    whatsapp: '+62 811 8888 8888',
    linkedin_url: 'https://linkedin.com/company/idtn',
    sdppi_status: {
      id: 'Sertifikasi SDPPI & Kepatuhan OSS',
      en: 'SDPPI & OSS Compliant'
    }
  }
};

const defaultProducts: CmsProduct[] = [
  {
    id: 1,
    slug: 'volga-telecom',
    name: 'DWDM System Volga I Telecom',
    category: 'Modular Telecom Platform',
    form_factor: '1U / 3U / 6U / 10U Chassis',
    capacity: 'Up to 27.2 Tbps per fiber pair (96 channels x 800G)',
    description: {
      id: 'Platform transmisi modular berkeandalan tinggi untuk tulang punggung optik telekomunikasi jarak jauh (LH/ULH) dan jaringan metro berkapasitas terabit.',
      en: 'High-reliability modular transmission platform designed for long-haul (LH/ULH) and metro optical backbones with terabit-scale capacity.'
    },
    specs: {
      'Wavelength Range': 'C-Band, Extended C-Band (96 Channels)',
      'Channel Data Rates': '100G, 200G, 400G, 800G per wavelength',
      'Optical Reach': 'Hingga 4,000+ km tanpa regenerasi optik elektrik',
      'Redundancy': 'Dual Power Supply AC/DC, Dual Control Card (1+1)',
      'ROADM Support': 'Colorless, Directionless, Contentionless (CDC-F)'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 1
  },
  {
    id: 2,
    slug: 'volga-dci',
    name: 'DWDM System Volga I DCI',
    category: 'Data Center Interconnect',
    form_factor: '1U Compact Appliance',
    capacity: 'Up to 6.4 Tbps per 1U appliance',
    description: {
      id: 'Solusi interkoneksi data center ringkas 1U dengan efisiensi daya maksimal, dirancang untuk interkoneksi point-to-point kampus dan antar fasilitas data center.',
      en: 'Compact 1U DCI solution delivering maximum power efficiency for campus and inter-facility data center connectivity.'
    },
    specs: {
      'Form Factor': '1U 19-inch rackmount (Kedalaman 450mm)',
      'Client Interfaces': '100GbE QSFP28, 400GbE QSFP-DD',
      'Line Interfaces': 'Coherent CFP2-DCO / QSFPDD',
      'Cooling & Airflow': 'Front-to-back airflow dengan smart fan modulation'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 2
  },
  {
    id: 3,
    slug: 'dci-v2',
    name: 'DWDM System DCI V2 (6.4 Tbps)',
    category: 'Next-Gen Ultra-High Density DCI',
    form_factor: '1U High-Density SFF',
    capacity: '6.4 Tbps throughput in a single rack unit',
    description: {
      id: 'Platform DCI generasi terbaru dengan optical engine berdensitas ekstrem untuk penyedia cloud, hyperscaler, dan operator IXP dengan latensi ultra rendah.',
      en: 'Next-generation DCI platform featuring extreme-density optical engines for cloud providers, hyperscalers, and IXPs.'
    },
    specs: {
      'Max Throughput': '6.4 Tbps bi-directional per 1U',
      'Modulation Format': 'QPSK, 8QAM, 16QAM, 64QAM adaptive',
      'Management': 'NETCONF/YANG, RESTCONF, SNMPv3, CLI'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 3
  },
  {
    id: 4,
    slug: 'ramenka-otdr',
    name: 'OTDR Monitoring System Ramenka',
    category: 'Fiber Health Monitoring',
    form_factor: '1U / 2U Monitoring Unit',
    capacity: 'Up to 128 fiber ports per chassis',
    description: {
      id: 'Sistem pemantauan integritas fisik kabel fiber optik secara otomatis dan terus menerus 24/7 tanpa mengganggu transmisi data aktif (in-service monitoring).',
      en: 'Automated 24/7 optical fiber health monitoring system detecting cuts, degradation, and intrusion without interrupting live data traffic.'
    },
    specs: {
      'Operating Wavelength': '1625 nm / 1650 nm (Out-of-band monitoring)',
      'Dynamic Range': 'Hingga 45 dB untuk deteksi jarak jauh (>150 km)',
      'Event Resolution': 'Akurasi deteksi lokasi putus kabel hingga satuan meter',
      'GIS Mapping': 'Integrasi otomatis ke peta koordinat GPS jalur kabel'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 4
  },
  {
    id: 5,
    slug: 'titan-fractal-nms',
    name: 'NMS Titan & Fractal Management System',
    category: 'Centralized Optical NMS',
    form_factor: 'Software Appliance (Server / Cloud)',
    capacity: 'Managing 10,000+ optical network elements',
    description: {
      id: 'Perangkat lunak manajemen jaringan terpadu untuk monitoring end-to-end, provisioning sirkuit otomatis, analisis performa sinyal (OSNR, BER), dan alarm waktu nyata.',
      en: 'Comprehensive optical network management suite for end-to-end provisioning, real-time telemetry, OSNR/BER analysis, and automated alarm correlation.'
    },
    specs: {
      'Architecture': 'High-Availability cluster with real-time replication',
      'Northbound API': 'RESTful API, SNMP traps, Kafka streaming',
      'Fault Management': 'Sub-second optical impairment detection'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 5
  }
];

const defaultClients: CmsClient[] = [
  { id: 1, name: 'PT Telekomunikasi Indonesia (Telkom)', category: 'Telecommunication Operator', logo_url: '/assets/clients/telkom.svg', is_partner: true, sort_order: 1 },
  { id: 2, name: 'Indosat Ooredoo Hutchison', category: 'Telecommunication Operator', logo_url: '/assets/clients/indosat.svg', is_partner: true, sort_order: 2 },
  { id: 3, name: 'XL Axiata', category: 'Telecommunication Operator', logo_url: '/assets/clients/xl.svg', is_partner: true, sort_order: 3 },
  { id: 4, name: 'Smartfren Telecom', category: 'Telecommunication Operator', logo_url: '/assets/clients/smartfren.svg', is_partner: true, sort_order: 4 },
  { id: 5, name: 'Moratelindo', category: 'Broadband & Infrastructure Provider', logo_url: '/assets/clients/moratelindo.svg', is_partner: true, sort_order: 5 },
  { id: 6, name: 'Biznet Networks', category: 'Internet Service Provider', logo_url: '/assets/clients/biznet.svg', is_partner: true, sort_order: 6 },
  { id: 7, name: 'Lintasarta', category: 'Enterprise & Cloud Solutions', logo_url: '/assets/clients/lintasarta.svg', is_partner: true, sort_order: 7 },
  { id: 8, name: 'DCI Indonesia', category: 'Hyperscale Data Center', logo_url: '/assets/clients/dci.svg', is_partner: true, sort_order: 8 }
];

interface CmsDataContextType {
  pages: Record<string, PageContentData>;
  footer: FooterSettingsData;
  products: CmsProduct[];
  clients: CmsClient[];
  isLoading: boolean;
  reloadContent: () => Promise<void>;
}

const CmsDataContext = createContext<CmsDataContextType | undefined>(undefined);

export const CmsDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<Record<string, PageContentData>>(defaultPages);
  const [footer, setFooter] = useState<FooterSettingsData>(defaultFooter);
  const [products, setProducts] = useState<CmsProduct[]>(defaultProducts);
  const [clients, setClients] = useState<CmsClient[]>(defaultClients);
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/public/content.php');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          if (json.pages && Object.keys(json.pages).length > 0) {
            setPages((prev) => ({ ...prev, ...json.pages }));
          }
          if (json.footer && json.footer.company_summary) {
            setFooter(json.footer);
          }
          if (json.products && json.products.length > 0) {
            setProducts(json.products);
          }
          if (json.clients && json.clients.length > 0) {
            setClients(json.clients);
          }
        }
      }
    } catch {
      // Offline fallback: keep default data seamlessly
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  return (
    <CmsDataContext.Provider
      value={{
        pages,
        footer,
        products,
        clients,
        isLoading,
        reloadContent: fetchContent
      }}
    >
      {children}
    </CmsDataContext.Provider>
  );
};

export const useCmsData = (): CmsDataContextType => {
  const context = useContext(CmsDataContext);
  if (!context) {
    throw new Error('useCmsData must be used within a CmsDataProvider');
  }
  return context;
};
