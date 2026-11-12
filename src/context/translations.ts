export type Language = 'id' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  id: {
    // Nav
    'nav.home': 'Beranda',
    'nav.about': 'Tentang Kami',
    'nav.equipment': 'Produk & Perangkat',
    'nav.clients': 'Klien & Mitra',
    'nav.contact': 'Hubungi Kami',
    'nav.consultation': 'Konsultasi Proyek',
    'nav.mobileMenu': 'Buka menu navigasi',

    // Hero
    'hero.badge.provider': 'DWDM Developer & Infrastructure Provider',
    'hero.badge.partner': 'Partner Resmi T8 Systems',
    'hero.title.lead': 'Jembatan Teknologi',
    'hero.title.highlight': 'Transmisi Optik DWDM',
    'hero.title.end': 'Nusantara ke Dunia',
    'hero.description': 'PT Infinix Delapan Teknologi Nusantara (IDTN) merancang, mengembangkan, dan menggelar infrastruktur DWDM multi-terabit berkeandalan tinggi untuk sektor transportasi nasional, operator telekomunikasi, dan interkoneksi data center di Indonesia.',
    'hero.cta.rfp': 'Ajukan Penawaran Proyek (RFP)',
    'hero.graphic.title': 'Platform Transmisi DWDM Carrier-Grade',
    'hero.graphic.subtitle': 'T8 Volga I & Multi-Terabit Optical Chassis',

    // Trust Strip
    'trust.label': 'Mitra Teknologi & Standar Industri Terpercaya',
    'trust.t8': 'Partner Resmi T8 Systems',
    'trust.sdppi': 'Kepatuhan Regulasi SDPPI',
    'trust.iso': 'Standar Mutu Telekomunikasi',
    'trust.telco': 'Carrier-Grade Ready 99.999%',

    // About Us
    'about.badge': 'Tentang PT IDTN',
    'about.title': 'Menghubungkan Potensi Nusantara dengan Dunia',
    'about.desc': 'PT Infinix Delapan Teknologi Nusantara (IDTN) adalah penyedia solusi telekomunikasi terpadu yang berfokus pada teknologi Dense Wavelength Division Multiplexing (DWDM) dan infrastruktur jaringan transmisi optik berkapasitas tinggi di Indonesia.',
    'about.philo.tag': 'Filosofi Perusahaan',
    'about.philo.head': 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
    'about.philo.sub': 'Sebagaimana sungai-sungai yang bermuara di lautan, IDTN menghubungkan aliran data dan informasi ke seluruh penjuru dunia.',
    'about.etymology.title': 'Makna di Balik Nama IDTN',
    'about.focus.title': 'Business Focus',
    'about.vision.title': 'Visi IDTN',
    'about.mission.title': 'Misi IDTN',

    // Equipment
    'eq.badge': 'Lini Perangkat Resmi T8',
    'eq.title': 'Perangkat DWDM & Sistem Manajemen Optik T8',
    'eq.desc': 'Perangkat keras dan perangkat lunak transmisi DWDM berkecepatan tinggi teruji global yang dipasok, diadaptasi, dan didukung penuh oleh IDTN di Indonesia.',
    'eq.specs.title': 'Keunggulan Spesifikasi:',
    'eq.formFactor': 'Form Factor / Desain',
    'eq.capacity': 'Kapasitas Maksimal',
    'eq.requestBrochure': 'Minta Brosur Teknis / Data Sheet Resmi',
    'eq.carrierReady': 'Carrier-Grade Ready',
    'eq.officialHardware': 'Official Hardware Chassis',

    // Clients
    'clients.badge': 'Portofolio & Ekosistem',
    'clients.title': 'Dipercaya Mitra Strategis Nasional',
    'clients.desc': 'Komitmen kami terbukti dalam mendukung tulang punggung transmisi optik berbagai sektor vital di Indonesia.',

    // Contact
    'contact.badge': 'Hubungi Kami',
    'contact.title': 'Konsultasikan Kebutuhan Infrastruktur Optik DWDM Anda',
    'contact.desc': 'Tim rekayasa optik IDTN siap mendiskusikan kebutuhan arsitektur link, survei rute, pengadaan perangkat T8, dan implementasi jaringan Anda.',
    'contact.form.name': 'Nama Lengkap *',
    'contact.form.email': 'Alamat Email Perusahaan *',
    'contact.form.phone': 'Nomor Telepon / WhatsApp *',
    'contact.form.org': 'Instansi / Perusahaan *',
    'contact.form.type': 'Jenis Kebutuhan Proyek *',
    'contact.form.msg': 'Rincian Kebutuhan atau Spesifikasi Link *',
    'contact.form.submit': 'Kirim Permintaan Konsultasi',
    'contact.form.submitting': 'Mengirimkan Permintaan...',
    'contact.form.success': 'Permintaan Anda telah kami terima! Tim teknis IDTN akan segera menghubungi Anda.',
    'contact.office.title': 'Kantor Operasional',
    'contact.office.address': 'Jalan Cikini Raya No. 79, Menteng, Jakarta Pusat 10330, Indonesia',

    // Footer
    'footer.desc': 'Penyedia infrastruktur telekomunikasi transmisi optik DWDM berkapasitas tinggi di Indonesia.',
    'footer.products': 'Perangkat & Sistem T8',
    'footer.company': 'Profil Perusahaan',
    'footer.contact': 'Kontak Resmi',
    'footer.rights': 'Seluruh hak cipta dilindungi undang-undang.',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.equipment': 'Products & Systems',
    'nav.clients': 'Clients & Partners',
    'nav.contact': 'Contact Us',
    'nav.consultation': 'Project Consultation',
    'nav.mobileMenu': 'Open navigation menu',

    // Hero
    'hero.badge.provider': 'DWDM Developer & Infrastructure Provider',
    'hero.badge.partner': 'Official Partner of T8 Systems',
    'hero.title.lead': 'Bridging DWDM Optical',
    'hero.title.highlight': 'Transmission Technology',
    'hero.title.end': 'from Nusantara to the World',
    'hero.description': 'PT Infinix Delapan Teknologi Nusantara (IDTN) designs, develops, and deploys high-reliability multi-terabit DWDM infrastructure for national transportation, telecom operators, and hyperscale data centers in Indonesia.',
    'hero.cta.rfp': 'Request Project Proposal (RFP)',
    'hero.graphic.title': 'Carrier-Grade DWDM Transmission Platform',
    'hero.graphic.subtitle': 'T8 Volga I & Multi-Terabit Optical Chassis',

    // Trust Strip
    'trust.label': 'Trusted Technology Partners & Industry Standards',
    'trust.t8': 'Official Partner of T8 Systems',
    'trust.sdppi': 'SDPPI Regulatory Compliance',
    'trust.iso': 'Telecommunications Quality Standards',
    'trust.telco': 'Carrier-Grade Ready 99.999%',

    // About Us
    'about.badge': 'About PT IDTN',
    'about.title': 'Connecting the Potential of Nusantara to the World',
    'about.desc': 'PT Infinix Delapan Teknologi Nusantara (IDTN) is an integrated telecommunications solutions provider specializing in Dense Wavelength Division Multiplexing (DWDM) technology and high-capacity optical transport infrastructure in Indonesia.',
    'about.philo.tag': 'Corporate Philosophy',
    'about.philo.head': 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
    'about.philo.sub': 'Just as rivers flow into the vast ocean, IDTN connects the stream of data and knowledge to every corner of the globe.',
    'about.etymology.title': 'The Meaning Behind the IDTN Name',
    'about.focus.title': 'Business Focus',
    'about.vision.title': 'IDTN Vision',
    'about.mission.title': 'IDTN Mission',

    // Equipment
    'eq.badge': 'Official T8 Equipment Line',
    'eq.title': 'T8 DWDM Systems & Optical Network Management',
    'eq.desc': 'Globally proven, high-speed DWDM hardware and software platforms supplied, customized, and fully supported by IDTN across Indonesia.',
    'eq.specs.title': 'Key Technical Specifications:',
    'eq.formFactor': 'Form Factor / Architecture',
    'eq.capacity': 'Maximum Capacity',
    'eq.requestBrochure': 'Request Technical Datasheet / Official Brochure',
    'eq.carrierReady': 'Carrier-Grade Ready',
    'eq.officialHardware': 'Official Hardware Chassis',

    // Clients
    'clients.badge': 'Portfolio & Ecosystem',
    'clients.title': 'Trusted by National Strategic Partners',
    'clients.desc': 'Our commitment is demonstrated by supporting the optical backbone of mission-critical sectors throughout Indonesia.',

    // Contact
    'contact.badge': 'Contact Us',
    'contact.title': 'Consult Your DWDM Optical Infrastructure Requirements',
    'contact.desc': 'IDTN optical engineering experts are available to consult on link architecture, route planning, T8 equipment procurement, and turnkey deployment.',
    'contact.form.name': 'Full Name *',
    'contact.form.email': 'Corporate Email Address *',
    'contact.form.phone': 'Phone Number / WhatsApp *',
    'contact.form.org': 'Organization / Company *',
    'contact.form.type': 'Project Scope / Requirement Type *',
    'contact.form.msg': 'Project Requirements or Link Specifications *',
    'contact.form.submit': 'Submit Consultation Request',
    'contact.form.submitting': 'Sending Request...',
    'contact.form.success': 'Your request has been received! An IDTN optical engineer will contact you shortly.',
    'contact.office.title': 'Operations Office',
    'contact.office.address': 'Jalan Cikini Raya No. 79, Menteng, Central Jakarta 10330, Indonesia',

    // Footer
    'footer.desc': 'High-capacity DWDM optical transmission telecommunications infrastructure provider in Indonesia.',
    'footer.products': 'T8 Products & Systems',
    'footer.company': 'Company Overview',
    'footer.contact': 'Official Contacts',
    'footer.rights': 'All rights reserved.',
  },
};
