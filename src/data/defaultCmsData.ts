import { PageContentData, FooterSettingsData, CmsProduct, CmsClient, PageSeo, CmsSectionValue } from '../types/cms';

// Default Fallback Data (ensures 0ms instant render & offline resilience)
export const defaultPages: Record<string, PageContentData> = {
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
        faq_badge: 'Pusat Informasi & FAQ DWDM',
        faq_title: 'Pertanyaan Umum Seputar Solusi DWDM Indonesia',
        faq_desc: 'Jawaban teknis resmi seputar teknologi Dense Wavelength Division Multiplexing, platform T8 Volga I, dan layanan infrastruktur optik PT IDTN.',
        faqs: [
          {
            id: 'faq-1',
            q: 'Apa itu DWDM (Dense Wavelength Division Multiplexing) dan bagaimana cara kerjanya?',
            a: 'Dense Wavelength Division Multiplexing (DWDM) adalah teknologi transmisi serat optik tercanggih yang mentransmisikan puluhan panjang gelombang cahaya (kanal optik) berkecepatan tinggi secara bersamaan melalui satu helai kabel serat optik tunggal. Beroperasi pada spektrum C+L Band (jendela 1550 nm), DWDM mampu melipatgandakan kapasitas throughput jaringan eksisting hingga 96 kali lipat tanpa perlu menggelar kabel fisik baru.'
          },
          {
            id: 'faq-2',
            q: 'Berapa kecepatan dan kapasitas maksimum platform DWDM T8 Volga I PT IDTN?',
            a: 'PT IDTN menghadirkan platform DWDM kelas carrier T8 Volga I yang mendukung kecepatan transmisi hingga 800 Gbps per panjang gelombang (lambda) dan kapasitas agregat total mencapai 38.4 Tbps per pasang serat optik pada spektrum C+L Band. Untuk kebutuhan Data Center Interconnect (DCI), unit modular kompak Volga I DCI V2 menyediakan throughput 6.4 Tbps per 2U sasis dengan proteksi enkripsi fisik Layer 1 AES-256.'
          },
          {
            id: 'faq-3',
            q: 'Bagaimana jangkauan implementasi proyek jaringan optik IDTN di Indonesia?',
            a: 'PT IDTN memiliki rekam jejak geografi proyek unik yang membentang 8.514,22 km melintasi kepulauan Indonesia dari Sabang sampai Merauke. Solusi turnkey kami mencakup koridor transmisi darat jalur kereta api nasional, rute backbone jarak jauh antar-kota, metropolitan loop operator telekomunikasi, hingga pendaratan kabel optik bawah laut.'
          },
          {
            id: 'faq-4',
            q: 'Bagaimana sistem IDTN menjamin keandalan jaringan bila terjadi putus kabel optik?',
            a: 'Sistem DWDM IDTN mengintegrasikan proteksi jalur optik 1+1 (Optical Line Protection / OLP) dengan kemampuan perpindahan jalur darurat otomatis dalam waktu kurang dari 50 milidetik (sub-50ms) guna menjamin SLA keandalan 99.999% (Five Nines). Dilengkapi sistem pemantauan otomatis 24 jam OTDR Ramenka yang menguji integritas kabel secara in-service pada 1625nm dan mendeteksi lokasi putus fisik dengan akurasi presisi hingga 1 meter.'
          },
          {
            id: 'faq-5',
            q: 'Bagaimana cara mengajukan konsultasi desain link atau penawaran RFP pengadaan DWDM?',
            a: 'Anda dapat mengajukan kebutuhan jaringan melalui formulir RFP online di https://idtn.co.id/contact, menghubungi tim rekayasa kami melalui email info@idtn.co.id, atau berkonsultasi langsung ke kantor pusat Fatmawati City Center Jakarta Selatan via WhatsApp resmi +62 811 8888 8888. Tim insinyur IDTN siap membantu perhitungan link budget, simulasi OSNR, dan penyusunan proposal pengadaan resmi.'
          }
        ],
        trust_metrics: [
          {
            title: '38.4 Tbps Throughput',
            subtitle: 'Kapasitas maksimal C+L band per serat optik'
          },
          {
            title: '> 1.500 km Jangkauan',
            subtitle: 'Transmisi optik jarak jauh tanpa regenerasi elektrik'
          },
          {
            title: '99.999% Keandalan (SLA)',
            subtitle: 'Carrier-grade reliability dengan switching sub-50ms'
          },
          {
            title: 'Resmi & Bersertifikasi',
            subtitle: 'Standar SDPPI Kominfo, ISO 9001 & ISO 27001'
          }
        ],
        overview_tag: 'Infrastruktur Transmisi Optik',
        overview_title: 'Fondasi Jaringan Berkecepatan Tinggi untuk Masa Depan Digital',
        overview_desc: 'Dari tautan transportasi nasional hingga interkoneksi pusat data, platform DWDM kami menghadirkan kapasitas multi-terabit dengan keandalan tanpa kompromi.',
        bottom_cta_badge: 'Siap Mengembangkan Infrastruktur Optik Anda?',
        bottom_cta_title: 'Bangun Jaringan DWDM Berkeandalan Tinggi Bersama IDTN',
        bottom_cta_desc: 'Tim rekayasa optik kami siap membantu perancangan link, perencanaan kapasitas multi-terabit, dan implementasi turnkey di seluruh Indonesia.'
      },
      en: {
        faq_badge: 'DWDM Knowledge Base & FAQ',
        faq_title: 'Frequently Asked Questions about DWDM Solutions',
        faq_desc: 'Authoritative technical answers to key questions about Dense Wavelength Division Multiplexing, T8 Volga I platform, and IDTN services.',
        faqs: [
          {
            id: 'faq-1',
            q: 'What is DWDM (Dense Wavelength Division Multiplexing) and how does it work?',
            a: 'Dense Wavelength Division Multiplexing (DWDM) is an advanced optical transport technology that transmits multiple high-speed light wavelengths (channels) simultaneously over a single strand of optical fiber. By operating in the 1550 nm C+L spectral bands, DWDM multiplies existing fiber optic bandwidth by up to 96 times without requiring costly civil works to lay new physical cables.'
          },
          {
            id: 'faq-2',
            q: 'What are the transmission speeds and maximum capacity of IDTN T8 Volga I?',
            a: 'PT IDTN deploys the carrier-grade T8 Volga I platform, which delivers up to 800 Gbps per wavelength and an aggregate capacity of up to 38.4 Tbps per fiber pair across C+L optical bands. For Data Center Interconnect (DCI), the Volga I DCI V2 platform provides 6.4 Tbps bidirectional throughput per compact 2U chassis with wire-speed Layer 1 AES-256 encryption.'
          },
          {
            id: 'faq-3',
            q: 'What is IDTN\'s geographic project reach across the Indonesian archipelago?',
            a: 'IDTN has an established unique deployment footprint spanning 8,514.22 km across Indonesia from Sabang in Aceh to Merauke in Papua. Our turnkey solutions cover inter-island subsea cable landings, long-haul terrestrial railway corridors, metropolitan telco rings, and regional hyperscale data center interconnections.'
          },
          {
            id: 'faq-4',
            q: 'How does IDTN protect network uptime against fiber cuts and degradation?',
            a: 'IDTN systems incorporate 1+1 Optical Line Protection (OLP) with ultra-fast automatic failover in under 50 milliseconds (sub-50ms switching) to guarantee 99.999% carrier-grade SLA. Additionally, our OTDR Ramenka monitoring system automatically diagnoses fiber integrity 24/7 in-service at 1625nm, pinpointing optical micro-bends and physical cut locations with +/- 1 meter accuracy.'
          },
          {
            id: 'faq-5',
            q: 'How can operators and enterprises request a link design or DWDM RFP quotation?',
            a: 'You can submit your network requirements through our official RFP portal at https://idtn.co.id/contact, email our engineering team at info@idtn.co.id, or reach our Jakarta headquarters at Fatmawati City Center via WhatsApp at +62 811 8888 8888. Our optical transport specialists provide link budget calculation, OSNR analysis, and turnkey deployment proposals.'
          }
        ],
        trust_metrics: [
          {
            title: '38.4 Tbps Throughput',
            subtitle: 'Maximum C+L band capacity per optical fiber pair'
          },
          {
            title: '> 1,500 km Reach',
            subtitle: 'Ultra-long haul transmission without electrical regeneration'
          },
          {
            title: '99.999% Reliability (SLA)',
            subtitle: 'Carrier-grade reliability with sub-50ms optical protection switching'
          },
          {
            title: 'Certified & Compliant',
            subtitle: 'SDPPI Kominfo certified, ISO 9001 & ISO 27001 compliant'
          }
        ],
        overview_tag: 'Optical Transport Infrastructure',
        overview_title: 'High-Speed Network Foundation for the Digital Future',
        overview_desc: 'From national transportation corridors to hyperscale data center interconnects, our DWDM platform delivers multi-terabit capacity with uncompromising reliability.',
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
        subtitle: 'IDTN berdiri dengan visi memperkuat kedaulatan konektivitas digital Indonesia melalui sistem DWDM terdepan, handal, dan berkapasitas masif.',
        company_profile_url: '/assets/docs/IDTN-Company-Profile-2026.pptx',
        company_profile_label: 'Unduh Profil Perusahaan (PPTX)'
      },
      en: {
        tag: 'Company Profile',
        title: 'Architecting Indonesia’s High-Capacity Optical Backbone',
        subtitle: 'IDTN was founded with the vision to strengthen Indonesia’s digital connectivity through high-density, reliable, and advanced DWDM optical platforms.',
        company_profile_url: '/assets/docs/IDTN-Company-Profile-2026.pptx',
        company_profile_label: 'Download Company Profile (PPTX)'
      }
    },
    sections: {
      id: {
        intro_lead: 'INTEGRATOR LENGKAP JARINGAN OPTIK DWDM DARI HILIR KE HULU',
        intro_desc: 'PT Infinix Delapan Teknologi Nusantara (IDTN) adalah pengembang dan penyedia infrastruktur DWDM terlengkap di Indonesia yang mengintegrasikan keunggulan teknologi DWDM Volga dan pemantauan kabel optik terdepan Ramenka untuk menghadirkan konektivitas berkapasitas masif yang teruji dan berkeandalan carrier-grade.',
        metric1_val: '8.514,22',
        metric1_unit: 'km',
        metric1_title: 'Jangkauan Tulang Punggung Nusantara',
        metric1_desc: 'Membentang dari Sabang hingga Merauke, menghubungkan seluruh koridor maritim dan daratan Indonesia.',
        metric2_val: '800',
        metric2_unit: 'Gbps',
        metric2_title: 'Kapasitas Transmisi per Gelombang',
        metric2_desc: 'Ditenagai mesin optik Volga untuk kapasitas multi-terabit siap masa depan.',
        metric3_val: 'R&D & Pelatihan',
        metric3_unit: '',
        metric3_title: 'Alih Teknologi & Laboratorium Optik',
        metric3_desc: 'Pusat inovasi dan pengembangan talenta telekomunikasi generasi penerus bangsa Indonesia.',
        philo_tag: 'FILOSOFI PERUSAHAAN',
        philo_headline: 'Bagaikan sungai yang bermuara ke lautan, IDTN menghubungkan data dan informasi ke seluruh dunia.',
        philo_subheadline: 'Sebagaimana sungai-sungai yang bermuara di lautan, IDTN menghubungkan aliran data dan informasi ke seluruh penjuru dunia.',
        philosophy_pillars: [
          { title: 'Bridge', desc: 'Menjembatani keunggulan teknologi optik global dengan kebutuhan riil infrastruktur Indonesia.' },
          { title: 'Intermediary', desc: 'Menghubungkan prinsipal teknologi, mitra integrator, dan pelanggan secara transparan dan terpercaya.' },
          { title: 'Pathway', desc: 'Membuka akses pita lebar agar data dan informasi strategis dapat mengalir bebas tanpa hambatan kapasitas.' },
          { title: 'Connector', desc: 'Menyatukan simpul jaringan dari pusat kota metropolitan hingga wilayah kepulauan terluar menuju panggung global.' }
        ],
        etymology_title: 'Makna di Balik Nama IDTN',
        etymology_cards: [
          { word: 'Infinix', meaning: 'Terinspirasi dari \'infinity\': semangat tanpa batas untuk terus berinovasi dan melayani ekosistem digital nasional.' },
          { word: 'Delapan', meaning: 'Angka 8 yang merefleksikan simbol tak terhingga (∞), melambangkan kesinambungan dan ketangguhan yang tiada henti.' },
          { word: 'Teknologi', meaning: 'Teknologi transmisi telekomunikasi kelas dunia yang dikembangkan dan diadaptasi khusus untuk Indonesia.' },
          { word: 'Nusantara', meaning: 'Berakar kuat di kepulauan Indonesia, menjadi jangkar kebanggaan yang menghubungkan tanah air ke pasar global.' }
        ],
        focus_title: 'FOKUS BISNIS STRATEGIS',
        two_pillars: [
          {
            title: 'DWDM Equipment Developer',
            desc: 'Mengembangkan dan mengadaptasi perangkat DWDM agar memenuhi regulasi nasional, kondisi geografis Indonesia, dan kebutuhan ekspansi operator.',
            points: [
              'Adaptasi perangkat sesuai standar SDPPI Kominfo',
              'R&D terintegrasi bersama talenta rekayasa Indonesia',
              'Alih teknologi nyata ke mitra dan operator lokal'
            ]
          },
          {
            title: 'DWDM Infrastructure Service Provider',
            desc: 'Merancang, menggelar, menguji, dan memelihara infrastruktur jaringan transmisi optik untuk koridor transportasi dan interkoneksi data center.',
            points: [
              'Perencanaan & survei link serat optik jarak jauh',
              'Instalasi, integrasi, dan commissioning end-to-end',
              'Pemantauan performa dan pemeliharaan preventif 24/7'
            ]
          }
        ],
        vision_title: 'Visi Kami',
        vision_statement: 'Menjadi arus utama yang menyatukan Nusantara dengan dunia, menghubungkan setiap data, informasi, dan peluang demi masa depan digital tanpa batas.',
        mission_title: 'Misi Strategis',
        mission_points: [
          'Membangun jalur transmisi data dan informasi berkapasitas tinggi bagi infrastruktur vital nasional (transportasi dan data center).',
          'Mengembangkan dan mengadaptasi teknologi DWDM bersama talenta terbaik Indonesia demi kemandirian teknologi bangsa.',
          'Melakukan alih teknologi dan pengetahuan rekayasa telekomunikasi secara berkelanjutan kepada mitra dan generasi penerus.'
        ]
      },
      en: {
        intro_lead: 'FULL-CYCLE DWDM OPTICAL NETWORK INTEGRATION PROVIDER',
        intro_desc: 'PT Infinix Delapan Teknologi Nusantara (IDTN) is the most comprehensive DWDM developer and infrastructure service provider in Indonesia, integrating world-class Volga DWDM transmission and Ramenka optical fiber monitoring platforms to deliver carrier-grade, battle-tested multi-terabit connectivity.',
        metric1_val: '8,514.22',
        metric1_unit: 'km',
        metric1_title: 'Sabang-to-Merauke Backbone Reach',
        metric1_desc: 'Spanning across the Indonesian archipelago, interconnecting maritime corridors and major economic islands.',
        metric2_val: '800',
        metric2_unit: 'Gbps',
        metric2_title: 'Per-Wavelength Transmission Capacity',
        metric2_desc: 'Powered by Volga optical engines for future-proof, multi-terabit capacity scalability.',
        metric3_val: 'R&D & Training',
        metric3_unit: '',
        metric3_title: 'Technology Transfer & Optical Lab',
        metric3_desc: 'Hub for indigenous telecommunications knowledge transfer and engineering talent empowerment.',
        philo_tag: 'CORPORATE PHILOSOPHY',
        philo_headline: 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
        philo_subheadline: 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
        philosophy_pillars: [
          { title: 'Bridge', desc: 'Bridging global optical excellence with practical Indonesian infrastructure needs.' },
          { title: 'Intermediary', desc: 'Connecting technology principals, system integrators, and telco clients transparently.' },
          { title: 'Pathway', desc: 'Opening high-bandwidth access so strategic data and information flows without bottlenecks.' },
          { title: 'Connector', desc: 'Uniting transport nodes from metropolitan centers to outer archipelagic islands to the global stage.' }
        ],
        etymology_title: 'The Meaning Behind IDTN',
        etymology_cards: [
          { word: 'Infinix', meaning: 'Inspired by "infinity": boundless spirit to continually innovate and empower the nation\'s digital ecosystem.' },
          { word: 'Delapan (Eight)', meaning: 'The number 8 symbolizes infinity (∞), reflecting uninterrupted continuity, resilience, and growth.' },
          { word: 'Teknologi (Technology)', meaning: 'World-class optical telecommunications transmission technology adapted specifically for Indonesian topology.' },
          { word: 'Nusantara', meaning: 'Deeply anchored in the Indonesian archipelago, serving as a proud anchor connecting our nation to global markets.' }
        ],
        focus_title: 'STRATEGIC BUSINESS FOCUS',
        two_pillars: [
          {
            title: 'DWDM Equipment Developer',
            desc: 'Developing and adapting DWDM equipment to meet national regulations, Indonesian geographic conditions, and operator expansion needs.',
            points: [
              'Equipment adaptation aligned with SDPPI Kominfo standards',
              'Integrated R&D with top Indonesian engineering talent',
              'Real technology transfer to local operators & partners'
            ]
          },
          {
            title: 'DWDM Infrastructure Service Provider',
            desc: 'Designing, deploying, testing, and maintaining long-haul optical fiber links for transportation corridors and data center interconnects.',
            points: [
              'Planning & long-haul optical link route surveys',
              'Turnkey end-to-end installation, integration & commissioning',
              '24/7 proactive link performance monitoring & preventive maintenance'
            ]
          }
        ],
        vision_title: 'Our Vision',
        vision_statement: 'To become the leading national optical telecommunications developer and provider, delivering ultra-high-speed DWDM connectivity across Nusantara to the global arena.',
        mission_title: 'Strategic Mission',
        mission_points: [
          'Accelerate the deployment of multi-terabit optical fiber networks in transportation and data center sectors.',
          'Deliver carrier-grade reliability with 99.999% SLA and high-speed protection switching.',
          'Foster indigenous technology capability in collaboration with global partners like T8 Systems.'
        ]
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
    sections: {
      id: {
        section_title: 'Segmen Industri Strategis',
        strategic_segments: [
          {
            id: 'partner-t8',
            name: 'T8 LLC',
            category: 'Global Technology Principal',
            role: 'Prinsipal Manufaktur & Riset Perangkat DWDM',
            description: 'Pengembang teknologi sistem transmisi optik DWDM Volga dan pemantauan kabel OTDR Ramenka kelas dunia.',
            status_badge: 'Mitra Terverifikasi',
            is_partner: true
          },
          {
            id: 'sector-telco',
            name: 'National Telecom Operators',
            category: 'Target Clients',
            role: 'Operator Jaringan Telekomunikasi & Seluler',
            description: 'Penyediaan perangkat DWDM backbone dan peningkatan kapasitas link transmisi antar-kota di Indonesia.',
            status_badge: 'Mitra Terverifikasi',
            is_partner: true
          },
          {
            id: 'sector-dci',
            name: 'Hyperscale Cloud & Data Centers',
            category: 'Target Clients',
            role: 'Penyedia Fasilitas Pusat Data & Cloud',
            description: 'Interkoneksi antar-data center (DCI) berkecepatan tinggi dengan latensi deterministik terendah.',
            status_badge: 'Mitra Terverifikasi',
            is_partner: true
          },
          {
            id: 'sector-transport',
            name: 'National Transportation Authorities',
            category: 'Target Clients',
            role: 'Otoritas Transportasi Udara, Kereta Api & Pelabuhan',
            description: 'Infrastruktur komunikasi optik berkeandalan 99.999% untuk mendukung sistem persinyalan dan operasional vital.',
            status_badge: 'Mitra Terverifikasi',
            is_partner: true
          }
        ]
      },
      en: {
        section_title: 'Strategic Industry Segments',
        strategic_segments: [
          {
            id: 'partner-t8',
            name: 'T8 LLC',
            category: 'Global Technology Principal',
            role: 'DWDM Equipment R&D & Manufacturing Principal',
            description: 'Developer of world-class Volga DWDM optical transport platforms and Ramenka fiber line monitoring systems.',
            status_badge: 'Verified Strategic Partner',
            is_partner: true
          },
          {
            id: 'sector-telco',
            name: 'National Telecom Operators',
            category: 'Target Clients',
            role: 'Telecom Network & Mobile Operators',
            description: 'Backbone DWDM systems deployment and inter-city long-haul optical transmission capacity upgrades across Indonesia.',
            status_badge: 'Verified Strategic Partner',
            is_partner: true
          },
          {
            id: 'sector-dci',
            name: 'Hyperscale Cloud & Data Centers',
            category: 'Target Clients',
            role: 'Data Center & Cloud Infrastructure Providers',
            description: 'High-density Data Center Interconnect (DCI) optical platforms with lowest deterministic latency.',
            status_badge: 'Verified Strategic Partner',
            is_partner: true
          },
          {
            id: 'sector-transport',
            name: 'National Transportation Authorities',
            category: 'Target Clients',
            role: 'Aviation, Railway & Port Transportation Authorities',
            description: 'Mission-critical 99.999% optical communication infrastructure supporting vital signaling and operations.',
            status_badge: 'Verified Strategic Partner',
            is_partner: true
          }
        ]
      }
    }
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

export const defaultFooter: FooterSettingsData = {
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

export const defaultProducts: CmsProduct[] = [
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
      id: 'Solusi transmisi optik densitas ultra-tinggi yang dioptimalkan untuk interkoneksi antar-data center (DCI) berkecepatan 100G/400G dengan efisiensi daya maksimal.',
      en: 'Ultra-high-density optical transmission appliance engineered for power-efficient 100G/400G data center interconnectivity.'
    },
    specs: {
      'Line Interface': 'Up to 8 x 400G / 4 x 800G coherent optical interfaces',
      'Client Interfaces': '32 x 100GbE QSFP28 or 8 x 400GbE QSFP-DD',
      'Power Consumption': 'Sub-0.15W per Gbps energy efficiency rating',
      'Form Factor': 'Ultra-compact 1U rack-mount with front-to-back airflow'
    },
    datasheet_url: '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
    sort_order: 2
  },
  {
    id: 3,
    slug: 'dci-v2',
    name: 'DWDM System DCI V2 (6.4 Tbps)',
    category: 'Next-Gen Interconnect',
    form_factor: '1U Compact High-Density',
    capacity: 'Up to 38.4 Tbps per fiber (Extended C+L Band)',
    description: {
      id: 'Generasi terbaru platform interkoneksi hyperscale dengan kapabilitas transmisi hingga 800G per lambda, latensi deterministik, dan enkripsi optik Layer-1 terintegrasi.',
      en: 'Next-generation hyperscale interconnect platform featuring up to 800G per wavelength, deterministic sub-millisecond latency, and integrated Layer-1 optical encryption.'
    },
    specs: {
      'Baud Rate': 'Up to 96 GBaud / 128 GBaud coherent digital signal processor',
      'Modulation': 'QPSK, 8QAM, 16QAM, 32QAM, 64QAM adaptive probabilistic shaping',
      'Security': 'Wire-speed AES-256 Layer 1 hardware encryption',
      'Telemetry': 'gRPC streaming telemetry and OpenConfig YANG model support'
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

export const defaultClients: CmsClient[] = [
  { id: 1, name: 'PT Telekomunikasi Indonesia (Telkom)', category: 'Telecommunication Operator', logo_url: '/assets/clients/telkom.svg', is_partner: true, sort_order: 1 },
  { id: 2, name: 'Indosat Ooredoo Hutchison', category: 'Telecommunication Operator', logo_url: '/assets/clients/indosat.svg', is_partner: true, sort_order: 2 },
  { id: 3, name: 'XL Axiata', category: 'Telecommunication Operator', logo_url: '/assets/clients/xl.svg', is_partner: true, sort_order: 3 },
  { id: 4, name: 'Smartfren Telecom', category: 'Telecommunication Operator', logo_url: '/assets/clients/smartfren.svg', is_partner: true, sort_order: 4 },
  { id: 5, name: 'Moratelindo', category: 'Broadband & Infrastructure Provider', logo_url: '/assets/clients/moratelindo.svg', is_partner: true, sort_order: 5 },
  { id: 6, name: 'Biznet Networks', category: 'Internet Service Provider', logo_url: '/assets/clients/biznet.svg', is_partner: true, sort_order: 6 },
  { id: 7, name: 'Lintasarta', category: 'Enterprise & Cloud Solutions', logo_url: '/assets/clients/lintasarta.svg', is_partner: true, sort_order: 7 },
  { id: 8, name: 'DCI Indonesia', category: 'Hyperscale Data Center', logo_url: '/assets/clients/dci.svg', is_partner: true, sort_order: 8 }
];

/**
 * Deeply merges a server page record on top of default page data.
 * Guarantees all sections and hero items exist even if database only has legacy or partial keys.
 */
export function mergePageWithDefaults(
  pageKey: string,
  pageData?: Partial<PageContentData> | null
): PageContentData {
  const def = defaultPages[pageKey] || {
    seo: {
      id: { title: '', description: '', keywords: '' },
      en: { title: '', description: '', keywords: '' }
    },
    hero: { id: {}, en: {} },
    sections: { id: {}, en: {} }
  };

  if (!pageData) return def;

  const rawAny = pageData as Record<string, unknown>;
  const rawSeoId = (pageData.seo?.id || {}) as Partial<PageSeo>;
  const rawSeoEn = (pageData.seo?.en || {}) as Partial<PageSeo>;

  const titleId = rawSeoId.title || (typeof rawAny.seo_title_id === 'string' ? rawAny.seo_title_id : '') || def.seo.id.title;
  const titleEn = rawSeoEn.title || (typeof rawAny.seo_title_en === 'string' ? rawAny.seo_title_en : '') || def.seo.en.title;
  const descId = rawSeoId.description || (typeof rawAny.seo_description_id === 'string' ? rawAny.seo_description_id : '') || def.seo.id.description;
  const descEn = rawSeoEn.description || (typeof rawAny.seo_description_en === 'string' ? rawAny.seo_description_en : '') || def.seo.en.description;
  const keyId = rawSeoId.keywords || (typeof rawAny.seo_keywords_id === 'string' ? rawAny.seo_keywords_id : '') || def.seo.id.keywords;
  const keyEn = rawSeoEn.keywords || (typeof rawAny.seo_keywords_en === 'string' ? rawAny.seo_keywords_en : '') || def.seo.en.keywords;

  const defSecId = def.sections?.id || {};
  const defSecEn = def.sections?.en || {};
  const inSecId = ((pageData.sections?.id && !Array.isArray(pageData.sections.id))
    ? pageData.sections.id
    : ((rawAny.sections_data_id && !Array.isArray(rawAny.sections_data_id)) ? rawAny.sections_data_id : {})) as Record<string, CmsSectionValue>;
  const inSecEn = ((pageData.sections?.en && !Array.isArray(pageData.sections.en))
    ? pageData.sections.en
    : ((rawAny.sections_data_en && !Array.isArray(rawAny.sections_data_en)) ? rawAny.sections_data_en : {})) as Record<string, CmsSectionValue>;

  const inHeroId = (pageData.hero?.id && typeof pageData.hero.id === 'object')
    ? pageData.hero.id
    : ((rawAny.hero_data_id && typeof rawAny.hero_data_id === 'object') ? (rawAny.hero_data_id as Record<string, string>) : {});
  const inHeroEn = (pageData.hero?.en && typeof pageData.hero.en === 'object')
    ? pageData.hero.en
    : ((rawAny.hero_data_en && typeof rawAny.hero_data_en === 'object') ? (rawAny.hero_data_en as Record<string, string>) : {});

  return {
    seo: {
      id: { title: titleId, description: descId, keywords: keyId },
      en: { title: titleEn, description: descEn, keywords: keyEn }
    },
    hero: {
      id: { ...(def.hero?.id || {}), ...inHeroId },
      en: { ...(def.hero?.en || {}), ...inHeroEn }
    },
    sections: {
      id: { ...defSecId, ...inSecId },
      en: { ...defSecEn, ...inSecEn }
    },
    updated_at: pageData.updated_at || (rawAny.updated_at as string) || def.updated_at
  };
}
