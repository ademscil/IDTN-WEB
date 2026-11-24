<?php
/**
 * IDTN CMS - Database Auto-Installer & Initial Seeder
 * PT Infinix Delapan Teknologi Nusantara
 */

require_once __DIR__ . '/config.php';

$lockFile = __DIR__ . '/installed.lock';
if (file_exists($lockFile) && !isset($_GET['force'])) {
    send_json([
        'success' => false,
        'message' => 'Database sudah terinstal sebelumnya. Hapus file installed.lock jika ingin menginstal ulang.'
    ], 403);
}

try {
    $db = get_db();

    // 1. Table: admin_users
    $db->exec("CREATE TABLE IF NOT EXISTS admin_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        full_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 2. Table: page_contents
    $db->exec("CREATE TABLE IF NOT EXISTS page_contents (
        id INT AUTO_INCREMENT PRIMARY KEY,
        page_key VARCHAR(50) NOT NULL UNIQUE,
        seo_title_id VARCHAR(255) NOT NULL,
        seo_title_en VARCHAR(255) NOT NULL,
        seo_description_id TEXT,
        seo_description_en TEXT,
        seo_keywords_id TEXT,
        seo_keywords_en TEXT,
        hero_data_id JSON,
        hero_data_en JSON,
        sections_data_id JSON,
        sections_data_en JSON,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 3. Table: footer_settings
    $db->exec("CREATE TABLE IF NOT EXISTS footer_settings (
        id INT PRIMARY KEY,
        company_summary_id TEXT,
        company_summary_en TEXT,
        philosophy_quote_id TEXT,
        philosophy_quote_en TEXT,
        copyright_id VARCHAR(255),
        copyright_en VARCHAR(255),
        address_id TEXT,
        address_en TEXT,
        email VARCHAR(100),
        phone VARCHAR(50),
        whatsapp VARCHAR(50),
        linkedin_url VARCHAR(255),
        sdppi_status_id VARCHAR(100),
        sdppi_status_en VARCHAR(100),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 4. Table: products
    $db->exec("CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(100) NOT NULL UNIQUE,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        form_factor VARCHAR(50) NOT NULL,
        capacity VARCHAR(100) NOT NULL,
        description_id TEXT,
        description_en TEXT,
        specs JSON,
        datasheet_url VARCHAR(255),
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 5. Table: clients
    $db->exec("CREATE TABLE IF NOT EXISTS clients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        category VARCHAR(100) NOT NULL,
        logo_url VARCHAR(255) NOT NULL,
        is_partner TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 6. Table: inquiries
    $db->exec("CREATE TABLE IF NOT EXISTS inquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(100) NOT NULL,
        company VARCHAR(150) NOT NULL,
        work_email VARCHAR(100) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        solution_interest VARCHAR(100) NOT NULL,
        project_summary TEXT NOT NULL,
        status ENUM('unread', 'contacted', 'archived') DEFAULT 'unread',
        ip_address VARCHAR(45),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 7. Table: media_files
    $db->exec("CREATE TABLE IF NOT EXISTS media_files (
        id INT AUTO_INCREMENT PRIMARY KEY,
        original_name VARCHAR(255) NOT NULL,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        file_type VARCHAR(50) NOT NULL,
        file_size INT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // 8. Table: login_attempts
    $db->exec("CREATE TABLE IF NOT EXISTS login_attempts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        ip_address VARCHAR(45) NOT NULL,
        attempts INT DEFAULT 1,
        last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_ip (ip_address)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;");

    // ==========================================
    // SEED INITIAL DATA
    // ==========================================

    // Admin User
    $stmtAdmin = $db->prepare("SELECT id FROM admin_users WHERE email = ?");
    $stmtAdmin->execute(['admin@idtn.co.id']);
    if (!$stmtAdmin->fetch()) {
        $insertAdmin = $db->prepare("INSERT INTO admin_users (username, email, password_hash, full_name) VALUES (?, ?, ?, ?)");
        $passwordHash = password_hash('dataretrieve', PASSWORD_BCRYPT);
        $insertAdmin->execute(['admin', 'admin@idtn.co.id', $passwordHash, 'Administrator IDTN']);
    }

    // Footer Settings (Single record with ID = 1)
    $stmtFooter = $db->prepare("SELECT id FROM footer_settings WHERE id = 1");
    $stmtFooter->execute();
    if (!$stmtFooter->fetch()) {
        $insertFooter = $db->prepare("INSERT INTO footer_settings (
            id, company_summary_id, company_summary_en, philosophy_quote_id, philosophy_quote_en,
            copyright_id, copyright_en, address_id, address_en, email, phone, whatsapp, linkedin_url,
            sdppi_status_id, sdppi_status_en
        ) VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        
        $insertFooter->execute([
            'Penyedia infrastruktur telekomunikasi transmisi optik DWDM berkapasitas tinggi di Indonesia.',
            'High-capacity DWDM optical transmission telecommunications infrastructure provider in Indonesia.',
            'Bagaikan sungai yang bermuara ke lautan, IDTN menghubungkan data dan informasi ke seluruh dunia.',
            'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
            '© 2026 PT Infinix Delapan Teknologi Nusantara. Seluruh hak cipta dilindungi undang-undang.',
            '© 2026 PT Infinix Delapan Teknologi Nusantara. All rights reserved.',
            'Fatmawati City Center, Ruko Soho Botany Garden Crystal No. 18, Jl. Fatmawati Raya, Cilandak Barat, Jakarta Selatan 12430, Indonesia',
            'Fatmawati City Center, Ruko Soho Botany Garden Crystal No. 18, Jl. Fatmawati Raya, Cilandak Barat, Jakarta Selatan 12430, Indonesia',
            'info@idtn.co.id',
            '+62 21 3192 8888',
            '+62 811 8888 8888',
            'https://linkedin.com/company/idtn',
            'Sertifikasi SDPPI & Kepatuhan OSS',
            'SDPPI & OSS Compliant'
        ]);
    }

    // Page Contents & SEO
    $pagesData = [
        'home' => [
            'seo_title_id' => 'IDTN — Solusi Infrastruktur DWDM & Transmisi Optik Berkapasitas Tinggi Indonesia',
            'seo_title_en' => 'IDTN — High-Capacity DWDM Optical Transport & Telecom Infrastructure Indonesia',
            'seo_description_id' => 'PT Infinix Delapan Teknologi Nusantara (IDTN) menyediakan solusi transmisi optik DWDM berkecepatan multi-terabit untuk operator telekomunikasi, ISP, dan data center di Indonesia.',
            'seo_description_en' => 'PT Infinix Delapan Teknologi Nusantara (IDTN) provides multi-terabit DWDM optical transmission infrastructure for telecom operators, ISPs, and data centers across Indonesia.',
            'seo_keywords_id' => 'dwdm indonesia, transmisi optik, infrastruktur telekomunikasi, volga I, dci v2, jaringan fiber optik, t8 systems indonesia',
            'seo_keywords_en' => 'dwdm indonesia, optical transport, telecom infrastructure, volga I, dci v2, optical fiber network, t8 systems indonesia',
            'hero_data_id' => [
                'badge' => 'Penyedia Infrastruktur Telekomunikasi Optik Resmi',
                'headline' => 'Infrastruktur Transmisi Optik DWDM Berkapasitas Tinggi',
                'subtitle' => 'Menghubungkan operator, ISP, dan data center di seluruh Indonesia dengan platform transmisi DWDM berkecepatan multi-terabit dan keandalan tingkat operator (99.999% SLA).',
                'cta_primary' => 'Konsultasi Proyek',
                'cta_secondary' => 'Lihat Katalog Produk',
                'metric_1_val' => '800G',
                'metric_1_lbl' => 'Per Channel Optical Engine',
                'metric_2_val' => '48+',
                'metric_2_lbl' => 'DWDM Terabit Channels',
                'metric_3_val' => '99.999%',
                'metric_3_lbl' => 'Carrier-Grade Uptime SLA'
            ],
            'hero_data_en' => [
                'badge' => 'Official Optical Telecommunication Infrastructure Provider',
                'headline' => 'High-Capacity DWDM Optical Transmission Infrastructure',
                'subtitle' => 'Empowering telecom operators, ISPs, and data centers across Indonesia with multi-terabit DWDM transmission platforms and carrier-grade reliability (99.999% SLA).',
                'cta_primary' => 'Request Project Consultation',
                'cta_secondary' => 'Explore Product Catalog',
                'metric_1_val' => '800G',
                'metric_1_lbl' => 'Per Channel Optical Engine',
                'metric_2_val' => '48+',
                'metric_2_lbl' => 'DWDM Terabit Channels',
                'metric_3_val' => '99.999%',
                'metric_3_lbl' => 'Carrier-Grade Uptime SLA'
            ],
            'sections_data_id' => [
                'bottom_cta_badge' => 'Siap Mengembangkan Infrastruktur Optik Anda?',
                'bottom_cta_title' => 'Bangun Jaringan DWDM Berkeandalan Tinggi Bersama IDTN',
                'bottom_cta_desc' => 'Tim rekayasa optik kami siap membantu perancangan link, perencanaan kapasitas multi-terabit, dan implementasi turnkey di seluruh Indonesia.'
            ],
            'sections_data_en' => [
                'bottom_cta_badge' => 'Ready to Scale Your Optical Infrastructure?',
                'bottom_cta_title' => 'Deploy High-Reliability DWDM Networks with IDTN',
                'bottom_cta_desc' => 'Our optical engineering team is prepared to assist with link design, multi-terabit capacity planning, and turnkey deployment across Indonesia.'
            ]
        ],
        'about' => [
            'seo_title_id' => 'Tentang Kami — PT Infinix Delapan Teknologi Nusantara (IDTN)',
            'seo_title_en' => 'About Us — PT Infinix Delapan Teknologi Nusantara (IDTN)',
            'seo_description_id' => 'Pelajari profil, sejarah, filosofi, serta dedikasi IDTN dalam menyediakan infrastruktur telekomunikasi optik berstandar dunia untuk Indonesia.',
            'seo_description_en' => 'Learn about IDTN history, philosophy, and dedication to delivering world-class optical telecommunications infrastructure across Indonesia.',
            'seo_keywords_id' => 'tentang idtn, profil perusahaan idtn, profil infinix delapan teknologi nusantara, t8 indonesia',
            'seo_keywords_en' => 'about idtn, idtn company profile, pt infinix delapan teknologi nusantara, t8 indonesia',
            'hero_data_id' => [
                'tag' => 'Profil Perusahaan',
                'title' => 'Membangun Jalur Utama Komunikasi Optik Indonesia',
                'subtitle' => 'IDTN berdiri dengan visi memperkuat kedaulatan konektivitas digital Indonesia melalui sistem DWDM terdepan, handal, dan berkapasitas masif.',
                'company_profile_url' => '/assets/docs/IDTN-Company-Profile-2026.pptx',
                'company_profile_label' => 'Unduh Profil Perusahaan (PPTX)'
            ],
            'hero_data_en' => [
                'tag' => 'Company Profile',
                'title' => 'Architecting Indonesia’s High-Capacity Optical Backbone',
                'subtitle' => 'IDTN was founded with the vision to strengthen Indonesia’s digital connectivity through high-density, reliable, and advanced DWDM optical platforms.',
                'company_profile_url' => '/assets/docs/IDTN-Company-Profile-2026.pptx',
                'company_profile_label' => 'Download Company Profile (PPTX)'
            ],
            'sections_data_id' => [
                'intro_lead' => 'INTEGRATOR LENGKAP JARINGAN OPTIK DWDM DARI HILIR KE HULU',
                'intro_desc' => 'PT Infinix Delapan Teknologi Nusantara (IDTN) adalah pengembang dan penyedia infrastruktur DWDM terlengkap di Indonesia yang mengintegrasikan keunggulan teknologi DWDM Volga dan pemantauan kabel optik terdepan Ramenka untuk menghadirkan konektivitas berkapasitas masif yang teruji dan berkeandalan carrier-grade.',
                'metric1_val' => '8.514,22',
                'metric1_unit' => 'km',
                'metric1_title' => 'Jangkauan Tulang Punggung Nusantara',
                'metric1_desc' => 'Membentang dari Sabang hingga Merauke, menghubungkan seluruh koridor maritim dan daratan Indonesia.',
                'metric2_val' => '800',
                'metric2_unit' => 'Gbps',
                'metric2_title' => 'Kapasitas Transmisi per Gelombang',
                'metric2_desc' => 'Ditenagai mesin optik Volga untuk kapasitas multi-terabit siap masa depan.',
                'metric3_val' => 'R&D & Pelatihan',
                'metric3_unit' => '',
                'metric3_title' => 'Alih Teknologi & Laboratorium Optik',
                'metric3_desc' => 'Pusat inovasi dan pengembangan talenta telekomunikasi generasi penerus bangsa Indonesia.',
                'philo_tag' => 'FILOSOFI PERUSAHAAN',
                'philo_headline' => 'Bagaikan sungai yang bermuara ke lautan, IDTN menghubungkan data dan informasi ke seluruh dunia.',
                'philo_subheadline' => 'Sebagaimana sungai-sungai yang bermuara di lautan, IDTN menghubungkan aliran data dan informasi ke seluruh penjuru dunia.',
                'philosophy_pillars' => [
                    ['title' => 'Bridge', 'desc' => 'Menjembatani keunggulan teknologi optik global dengan kebutuhan riil infrastruktur Indonesia.'],
                    ['title' => 'Intermediary', 'desc' => 'Menghubungkan prinsipal teknologi, mitra integrator, dan pelanggan secara transparan dan terpercaya.'],
                    ['title' => 'Pathway', 'desc' => 'Membuka akses pita lebar agar data dan informasi strategis dapat mengalir bebas tanpa hambatan kapasitas.'],
                    ['title' => 'Connector', 'desc' => 'Menyatukan simpul jaringan dari pusat kota metropolitan hingga wilayah kepulauan terluar menuju panggung global.']
                ],
                'etymology_title' => 'Makna di Balik Nama IDTN',
                'etymology_cards' => [
                    ['word' => 'Infinix', 'meaning' => 'Terinspirasi dari \'infinity\': semangat tanpa batas untuk terus berinovasi dan melayani ekosistem digital nasional.'],
                    ['word' => 'Delapan', 'meaning' => 'Angka 8 yang merefleksikan simbol tak terhingga (∞), melambangkan kesinambungan dan ketangguhan yang tiada henti.'],
                    ['word' => 'Teknologi', 'meaning' => 'Teknologi transmisi telekomunikasi kelas dunia yang dikembangkan dan diadaptasi khusus untuk Indonesia.'],
                    ['word' => 'Nusantara', 'meaning' => 'Berakar kuat di kepulauan Indonesia, menjadi jangkar kebanggaan yang menghubungkan tanah air ke pasar global.']
                ],
                'focus_title' => 'FOKUS BISNIS STRATEGIS',
                'two_pillars' => [
                    [
                        'title' => 'DWDM Equipment Developer',
                        'desc' => 'Mengembangkan dan mengadaptasi perangkat DWDM agar memenuhi regulasi nasional, kondisi geografis Indonesia, dan kebutuhan ekspansi operator.',
                        'points' => [
                            'Adaptasi perangkat sesuai standar SDPPI Kominfo',
                            'R&D terintegrasi bersama talenta rekayasa Indonesia',
                            'Alih teknologi nyata ke mitra dan operator lokal'
                        ]
                    ],
                    [
                        'title' => 'DWDM Infrastructure Service Provider',
                        'desc' => 'Merancang, menggelar, menguji, dan memelihara infrastruktur jaringan transmisi optik untuk koridor transportasi dan interkoneksi data center.',
                        'points' => [
                            'Perencanaan & survei link serat optik jarak jauh',
                            'Instalasi, integrasi, dan commissioning end-to-end',
                            'Pemantauan performa dan pemeliharaan preventif 24/7'
                        ]
                    ]
                ],
                'vision_title' => 'Visi Kami',
                'vision_statement' => 'Menjadi arus utama yang menyatukan Nusantara dengan dunia, menghubungkan setiap data, informasi, dan peluang demi masa depan digital tanpa batas.',
                'mission_title' => 'Misi Strategis',
                'mission_points' => [
                    'Membangun jalur transmisi data dan informasi berkapasitas tinggi bagi infrastruktur vital nasional (transportasi dan data center).',
                    'Mengembangkan dan mengadaptasi teknologi DWDM bersama talenta terbaik Indonesia demi kemandirian teknologi bangsa.',
                    'Melakukan alih teknologi dan pengetahuan rekayasa telekomunikasi secara berkelanjutan kepada mitra dan generasi penerus.'
                ]
            ],
            'sections_data_en' => [
                'intro_lead' => 'FULL-CYCLE DWDM OPTICAL NETWORK INTEGRATION PROVIDER',
                'intro_desc' => 'PT Infinix Delapan Teknologi Nusantara (IDTN) is the most comprehensive DWDM developer and infrastructure service provider in Indonesia, integrating world-class Volga DWDM transmission and Ramenka optical fiber monitoring platforms to deliver carrier-grade, battle-tested multi-terabit connectivity.',
                'metric1_val' => '8,514.22',
                'metric1_unit' => 'km',
                'metric1_title' => 'Sabang-to-Merauke Backbone Reach',
                'metric1_desc' => 'Spanning across the Indonesian archipelago, interconnecting maritime corridors and major economic islands.',
                'metric2_val' => '800',
                'metric2_unit' => 'Gbps',
                'metric2_title' => 'Per-Wavelength Transmission Capacity',
                'metric2_desc' => 'Powered by Volga optical engines for future-proof, multi-terabit capacity scalability.',
                'metric3_val' => 'R&D & Training',
                'metric3_unit' => '',
                'metric3_title' => 'Technology Transfer & Optical Lab',
                'metric3_desc' => 'Hub for indigenous telecommunications knowledge transfer and engineering talent empowerment.',
                'philo_tag' => 'CORPORATE PHILOSOPHY',
                'philo_headline' => 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
                'philo_subheadline' => 'Like rivers that meet in the sea, IDTN connects data and information to the whole world.',
                'philosophy_pillars' => [
                    ['title' => 'Bridge', 'desc' => 'Bridging global optical excellence with practical Indonesian infrastructure needs.'],
                    ['title' => 'Intermediary', 'desc' => 'Connecting technology principals, system integrators, and telco clients transparently.'],
                    ['title' => 'Pathway', 'desc' => 'Opening high-bandwidth access so strategic data and information flows without bottlenecks.'],
                    ['title' => 'Connector', 'desc' => 'Uniting transport nodes from metropolitan centers to outer archipelagic islands to the global stage.']
                ],
                'etymology_title' => 'The Meaning Behind IDTN',
                'etymology_cards' => [
                    ['word' => 'Infinix', 'meaning' => 'Inspired by "infinity": boundless spirit to continually innovate and empower the nation\'s digital ecosystem.'],
                    ['word' => 'Delapan (Eight)', 'meaning' => 'The number 8 symbolizes infinity (∞), reflecting uninterrupted continuity, resilience, and growth.'],
                    ['word' => 'Teknologi (Technology)', 'meaning' => 'World-class optical telecommunications transmission technology adapted specifically for Indonesian topology.'],
                    ['word' => 'Nusantara', 'meaning' => 'Deeply anchored in the Indonesian archipelago, serving as a proud anchor connecting our nation to global markets.']
                ],
                'focus_title' => 'STRATEGIC BUSINESS FOCUS',
                'two_pillars' => [
                    [
                        'title' => 'DWDM Equipment Developer',
                        'desc' => 'Developing and adapting DWDM equipment to meet national regulations, Indonesian geographic conditions, and operator expansion needs.',
                        'points' => [
                            'Equipment adaptation aligned with SDPPI Kominfo standards',
                            'Integrated R&D with top Indonesian engineering talent',
                            'Real technology transfer to local operators & partners'
                        ]
                    ],
                    [
                        'title' => 'DWDM Infrastructure Service Provider',
                        'desc' => 'Designing, deploying, testing, and maintaining long-haul optical fiber links for transportation corridors and data center interconnects.',
                        'points' => [
                            'Planning & long-haul optical link route surveys',
                            'Turnkey end-to-end installation, integration & commissioning',
                            '24/7 proactive link performance monitoring & preventive maintenance'
                        ]
                    ]
                ],
                'vision_title' => 'Our Vision',
                'vision_statement' => 'To become the leading national optical telecommunications developer and provider, delivering ultra-high-speed DWDM connectivity across Nusantara to the global arena.',
                'mission_title' => 'Strategic Mission',
                'mission_points' => [
                    'Accelerate the deployment of multi-terabit optical fiber networks in transportation and data center sectors.',
                    'Deliver carrier-grade reliability with 99.999% SLA and high-speed protection switching.',
                    'Foster indigenous technology capability in collaboration with global partners like T8 Systems.'
                ]
            ]
        ],
        'product' => [
            'seo_title_id' => 'Katalog Perangkat DWDM & Solusi Optik T8 — IDTN',
            'seo_title_en' => 'T8 DWDM Systems & Optical Network Management Catalog — IDTN',
            'seo_description_id' => 'Jajaran perangkat keras DWDM resmi T8 Systems: Volga I Telecom, Volga I DCI, DCI V2, OTDR Ramenka, dan NMS Titan berkecepatan 800G per channel.',
            'seo_description_en' => 'Official T8 Systems hardware catalog: Volga I Telecom, Volga I DCI, DCI V2, Ramenka OTDR, and Titan NMS with up to 800G per channel optical performance.',
            'seo_keywords_id' => 'perangkat dwdm, volga I telecom, volga I dci, dci v2, otdr ramenka, nms titan, t8 systems indonesia',
            'seo_keywords_en' => 'dwdm hardware, volga I telecom, volga I dci, dci v2, otdr ramenka, nms titan, t8 systems indonesia',
            'hero_data_id' => [
                'tag' => 'Jajaran Perangkat Keras Resmi T8',
                'title' => 'Sistem DWDM & Manajemen Jaringan Optik',
                'subtitle' => 'Platform perangkat keras DWDM berkecepatan tinggi yang teruji secara global, disuplai, disesuaikan, dan didukung penuh oleh IDTN di seluruh Indonesia.'
            ],
            'hero_data_en' => [
                'tag' => 'Official T8 Equipment Line',
                'title' => 'T8 DWDM Systems & Optical Network Management',
                'subtitle' => 'Globally proven, high-speed DWDM hardware and software platforms supplied, customized, and fully supported by IDTN across Indonesia.'
            ],
            'sections_data_id' => ['rfp_notice' => 'Spesifikasi khusus dan penawaran tender RFP dapat dikonsultasikan langsung bersama tim teknis IDTN.'],
            'sections_data_en' => ['rfp_notice' => 'Custom configurations and formal tender RFP quotations are available through our optical engineering team.']
        ],
        'client' => [
            'seo_title_id' => 'Klien & Mitra Strategis — PT Infinix Delapan Teknologi Nusantara',
            'seo_title_en' => 'Clients & Strategic Partners — PT Infinix Delapan Teknologi Nusantara',
            'seo_description_id' => 'Dipercaya oleh operator telekomunikasi terkemuka, penyedia layanan internet, dan operator data center terdepan di Indonesia.',
            'seo_description_en' => 'Trusted by Indonesia’s leading telecommunication operators, internet service providers, and hyperscale data centers.',
            'seo_keywords_id' => 'klien idtn, mitra telekomunikasi, partner t8 indonesia, data center interconnect',
            'seo_keywords_en' => 'idtn clients, telecom partners, t8 indonesia partner, data center interconnect',
            'hero_data_id' => [
                'tag' => 'Kemitraan Terpercaya',
                'title' => 'Dipercaya oleh Pemimpin Industri Telekomunikasi & Data Center',
                'subtitle' => 'Mendukung tulang punggung optik nasional bersama penyedia jaringan dan infrastruktur digital terbesar di Indonesia.'
            ],
            'hero_data_en' => [
                'tag' => 'Trusted Partnerships',
                'title' => 'Trusted by Telecommunications & Data Center Leaders',
                'subtitle' => 'Empowering the national optical backbone alongside Indonesia’s prominent network providers and digital infrastructure leaders.'
            ],
            'sections_data_id' => [
                'section_title' => 'Segmen Industri Strategis',
                'strategic_segments' => [
                    [
                        'id' => 'partner-t8',
                        'name' => 'T8 LLC',
                        'category' => 'Global Technology Principal',
                        'role' => 'Prinsipal Manufaktur & Riset Perangkat DWDM',
                        'description' => 'Pengembang teknologi sistem transmisi optik DWDM Volga dan pemantauan kabel OTDR Ramenka kelas dunia.',
                        'status_badge' => 'Mitra Terverifikasi',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-telco',
                        'name' => 'National Telecom Operators',
                        'category' => 'Target Clients',
                        'role' => 'Operator Jaringan Telekomunikasi & Seluler',
                        'description' => 'Penyediaan perangkat DWDM backbone dan peningkatan kapasitas link transmisi antar-kota di Indonesia.',
                        'status_badge' => 'Mitra Terverifikasi',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-dci',
                        'name' => 'Hyperscale Cloud & Data Centers',
                        'category' => 'Target Clients',
                        'role' => 'Penyedia Fasilitas Pusat Data & Cloud',
                        'description' => 'Interkoneksi antar-data center (DCI) berkecepatan tinggi dengan latensi deterministik terendah.',
                        'status_badge' => 'Mitra Terverifikasi',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-transport',
                        'name' => 'National Transportation Authorities',
                        'category' => 'Target Clients',
                        'role' => 'Otoritas Transportasi Udara, Kereta Api & Pelabuhan',
                        'description' => 'Infrastruktur komunikasi optik berkeandalan 99.999% untuk mendukung sistem persinyalan dan operasional vital.',
                        'status_badge' => 'Mitra Terverifikasi',
                        'is_partner' => true
                    ]
                ]
            ],
            'sections_data_en' => [
                'section_title' => 'Strategic Industry Segments',
                'strategic_segments' => [
                    [
                        'id' => 'partner-t8',
                        'name' => 'T8 LLC',
                        'category' => 'Global Technology Principal',
                        'role' => 'DWDM Equipment R&D & Manufacturing Principal',
                        'description' => 'Developer of world-class Volga DWDM optical transport platforms and Ramenka fiber line monitoring systems.',
                        'status_badge' => 'Verified Strategic Partner',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-telco',
                        'name' => 'National Telecom Operators',
                        'category' => 'Target Clients',
                        'role' => 'Telecom Network & Mobile Operators',
                        'description' => 'Backbone DWDM systems deployment and inter-city long-haul optical transmission capacity upgrades across Indonesia.',
                        'status_badge' => 'Verified Strategic Partner',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-dci',
                        'name' => 'Hyperscale Cloud & Data Centers',
                        'category' => 'Target Clients',
                        'role' => 'Data Center & Cloud Infrastructure Providers',
                        'description' => 'High-density Data Center Interconnect (DCI) optical platforms with lowest deterministic latency.',
                        'status_badge' => 'Verified Strategic Partner',
                        'is_partner' => true
                    ],
                    [
                        'id' => 'sector-transport',
                        'name' => 'National Transportation Authorities',
                        'category' => 'Target Clients',
                        'role' => 'Aviation, Railway & Port Transportation Authorities',
                        'description' => 'Mission-critical 99.999% optical communication infrastructure supporting vital signaling and operations.',
                        'status_badge' => 'Verified Strategic Partner',
                        'is_partner' => true
                    ]
                ]
            ]
        ],
        'contact' => [
            'seo_title_id' => 'Hubungi Kami — Konsultasi Proyek & Penawaran DWDM IDTN',
            'seo_title_en' => 'Contact Us — Project Consultation & DWDM RFP Inquiry IDTN',
            'seo_description_id' => 'Hubungi tim ahli optik IDTN di Fatmawati City Center Jakarta Selatan untuk konsultasi desain link DWDM, pengadaan perangkat T8, dan penawaran teknis.',
            'seo_description_en' => 'Reach IDTN’s optical engineering team at Fatmawati City Center South Jakarta for DWDM link design, T8 hardware procurement, and RFP inquiries.',
            'seo_keywords_id' => 'kontak idtn, kantor idtn fatmawati, rfp dwdm, konsultasi jaringan optik',
            'seo_keywords_en' => 'contact idtn, idtn office fatmawati, dwdm rfp, optical network consultation',
            'hero_data_id' => [
                'tag' => 'Hubungi Tim Ahli Kami',
                'title' => 'Konsultasikan Kebutuhan Infrastruktur Optik Anda',
                'subtitle' => 'Teknisi rekayasa optik IDTN siap membantu mulai dari simulasi link optik, pengujian lab, hingga implementasi jaringan di lokasi Anda.'
            ],
            'hero_data_en' => [
                'tag' => 'Connect With Our Specialists',
                'title' => 'Consult Your Optical Infrastructure Requirements',
                'subtitle' => 'IDTN’s certified optical engineers are ready to assist with link simulations, laboratory testing, and turnkey field implementation.'
            ],
            'sections_data_id' => [
                'hours_label' => 'Jam Layanan Operasional',
                'hours_val' => 'Senin – Jumat: 08:30 – 17:30 WIB'
            ],
            'sections_data_en' => [
                'hours_label' => 'Operating Hours',
                'hours_val' => 'Monday – Friday: 08:30 – 17:30 WIB'
            ]
        ]
    ];

    $stmtPage = $db->prepare("INSERT INTO page_contents (
        page_key, seo_title_id, seo_title_en, seo_description_id, seo_description_en,
        seo_keywords_id, seo_keywords_en, hero_data_id, hero_data_en, sections_data_id, sections_data_en
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
        seo_title_id = VALUES(seo_title_id),
        seo_title_en = VALUES(seo_title_en),
        seo_description_id = VALUES(seo_description_id),
        seo_description_en = VALUES(seo_description_en),
        seo_keywords_id = VALUES(seo_keywords_id),
        seo_keywords_en = VALUES(seo_keywords_en),
        hero_data_id = VALUES(hero_data_id),
        hero_data_en = VALUES(hero_data_en),
        sections_data_id = VALUES(sections_data_id),
        sections_data_en = VALUES(sections_data_en),
        updated_at = NOW()");

    foreach ($pagesData as $key => $p) {
        $stmtPage->execute([
            $key,
            $p['seo_title_id'],
            $p['seo_title_en'],
            $p['seo_description_id'],
            $p['seo_description_en'],
            $p['seo_keywords_id'],
            $p['seo_keywords_en'],
            json_encode($p['hero_data_id']),
            json_encode($p['hero_data_en']),
            json_encode($p['sections_data_id']),
            json_encode($p['sections_data_en'])
        ]);
    }

    // Products Seeding
    $productsData = [
        [
            'slug' => 'volga-telecom',
            'name' => 'DWDM System Volga I Telecom',
            'category' => 'Modular Telecom Platform',
            'form_factor' => '1U / 3U / 6U / 10U Chassis',
            'capacity' => 'Up to 27.2 Tbps per fiber pair (96 channels x 800G)',
            'description_id' => 'Platform transmisi modular berkeandalan tinggi untuk tulang punggung optik telekomunikasi jarak jauh (LH/ULH) dan jaringan metro berkapasitas terabit.',
            'description_en' => 'High-reliability modular transmission platform designed for long-haul (LH/ULH) and metro optical backbones with terabit-scale capacity.',
            'specs' => [
                'Wavelength Range' => 'C-Band, Extended C-Band (96 Channels)',
                'Channel Data Rates' => '100G, 200G, 400G, 800G per wavelength',
                'Optical Reach' => 'Hingga 4,000+ km tanpa regenerasi optik elektrik',
                'Redundancy' => 'Dual Power Supply AC/DC, Dual Control Card (1+1)',
                'ROADM Support' => 'Colorless, Directionless, Contentionless (CDC-F)'
            ],
            'datasheet_url' => '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
            'sort_order' => 1
        ],
        [
            'slug' => 'volga-dci',
            'name' => 'DWDM System Volga I DCI',
            'category' => 'Data Center Interconnect',
            'form_factor' => '1U Compact Appliance',
            'capacity' => 'Up to 6.4 Tbps per 1U appliance',
            'description_id' => 'Solusi interkoneksi data center ringkas 1U dengan efisiensi daya maksimal, dirancang untuk interkoneksi point-to-point kampus dan antar fasilitas data center.',
            'description_en' => 'Compact 1U DCI solution delivering maximum power efficiency for campus and inter-facility data center connectivity.',
            'specs' => [
                'Form Factor' => '1U 19-inch rackmount (Kedalaman 450mm)',
                'Client Interfaces' => '100GbE QSFP28, 400GbE QSFP-DD',
                'Line Interfaces' => 'Coherent CFP2-DCO / QSFPDD',
                'Cooling & Airflow' => 'Front-to-back airflow dengan smart fan modulation'
            ],
            'datasheet_url' => '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
            'sort_order' => 2
        ],
        [
            'slug' => 'dci-v2',
            'name' => 'DWDM System DCI V2 (6.4 Tbps)',
            'category' => 'Next-Gen Ultra-High Density DCI',
            'form_factor' => '1U High-Density SFF',
            'capacity' => '6.4 Tbps throughput in a single rack unit',
            'description_id' => 'Platform DCI generasi terbaru dengan optical engine berdensitas ekstrem untuk penyedia cloud, hyperscaler, dan operator IXP dengan latensi ultra rendah.',
            'description_en' => 'Next-generation DCI platform featuring extreme-density optical engines for cloud providers, hyperscalers, and IXPs.',
            'specs' => [
                'Max Throughput' => '6.4 Tbps bi-directional per 1U',
                'Modulation Format' => 'QPSK, 8QAM, 16QAM, 64QAM adaptive',
                'Management' => 'NETCONF/YANG, RESTCONF, SNMPv3, CLI'
            ],
            'datasheet_url' => '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
            'sort_order' => 3
        ],
        [
            'slug' => 'ramenka-otdr',
            'name' => 'OTDR Monitoring System Ramenka',
            'category' => 'Fiber Health Monitoring',
            'form_factor' => '1U / 2U Monitoring Unit',
            'capacity' => 'Up to 128 fiber ports per chassis',
            'description_id' => 'Sistem pemantauan integritas fisik kabel fiber optik secara otomatis dan terus menerus 24/7 tanpa mengganggu transmisi data aktif (in-service monitoring).',
            'description_en' => 'Automated 24/7 optical fiber health monitoring system detecting cuts, degradation, and intrusion without interrupting live data traffic.',
            'specs' => [
                'Operating Wavelength' => '1625 nm / 1650 nm (Out-of-band monitoring)',
                'Dynamic Range' => 'Hingga 45 dB untuk deteksi jarak jauh (>150 km)',
                'Event Resolution' => 'Akurasi deteksi lokasi putus kabel hingga satuan meter',
                'GIS Mapping' => 'Integrasi otomatis ke peta koordinat GPS jalur kabel'
            ],
            'datasheet_url' => '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
            'sort_order' => 4
        ],
        [
            'slug' => 'titan-fractal-nms',
            'name' => 'NMS Titan & Fractal Management System',
            'category' => 'Centralized Optical NMS',
            'form_factor' => 'Software Appliance (Server / Cloud)',
            'capacity' => 'Managing 10,000+ optical network elements',
            'description_id' => 'Perangkat lunak manajemen jaringan terpadu untuk monitoring end-to-end, provisioning sirkuit otomatis, analisis performa sinyal (OSNR, BER), dan alarm waktu nyata.',
            'description_en' => 'Comprehensive optical network management suite for end-to-end provisioning, real-time telemetry, OSNR/BER analysis, and automated alarm correlation.',
            'specs' => [
                'Architecture' => 'High-Availability cluster with real-time replication',
                'Northbound API' => 'RESTful API, SNMP traps, Kafka streaming',
                'Fault Management' => 'Sub-second optical impairment detection'
            ],
            'datasheet_url' => '/assets/docs/IDTN-T8-Volga-I-Technical-Datasheet.pdf',
            'sort_order' => 5
        ]
    ];

    $stmtProd = $db->prepare("INSERT INTO products (
        slug, name, category, form_factor, capacity, description_id, description_en, specs, datasheet_url, sort_order, is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        category = VALUES(category),
        form_factor = VALUES(form_factor),
        capacity = VALUES(capacity),
        description_id = VALUES(description_id),
        description_en = VALUES(description_en),
        specs = VALUES(specs),
        datasheet_url = VALUES(datasheet_url),
        sort_order = VALUES(sort_order)");

    foreach ($productsData as $prod) {
        $stmtProd->execute([
            $prod['slug'],
            $prod['name'],
            $prod['category'],
            $prod['form_factor'],
            $prod['capacity'],
            $prod['description_id'],
            $prod['description_en'],
            json_encode($prod['specs']),
            $prod['datasheet_url'],
            $prod['sort_order']
        ]);
    }

    // Clients Seeding
    $clientsData = [
        ['name' => 'PT Telekomunikasi Indonesia (Telkom)', 'category' => 'Telecommunication Operator', 'logo_url' => '/assets/clients/telkom.svg', 'is_partner' => 1, 'sort_order' => 1],
        ['name' => 'Indosat Ooredoo Hutchison', 'category' => 'Telecommunication Operator', 'logo_url' => '/assets/clients/indosat.svg', 'is_partner' => 1, 'sort_order' => 2],
        ['name' => 'XL Axiata', 'category' => 'Telecommunication Operator', 'logo_url' => '/assets/clients/xl.svg', 'is_partner' => 1, 'sort_order' => 3],
        ['name' => 'Smartfren Telecom', 'category' => 'Telecommunication Operator', 'logo_url' => '/assets/clients/smartfren.svg', 'is_partner' => 1, 'sort_order' => 4],
        ['name' => 'Moratelindo', 'category' => 'Broadband & Infrastructure Provider', 'logo_url' => '/assets/clients/moratelindo.svg', 'is_partner' => 1, 'sort_order' => 5],
        ['name' => 'Biznet Networks', 'category' => 'Internet Service Provider', 'logo_url' => '/assets/clients/biznet.svg', 'is_partner' => 1, 'sort_order' => 6],
        ['name' => 'Lintasarta', 'category' => 'Enterprise & Cloud Solutions', 'logo_url' => '/assets/clients/lintasarta.svg', 'is_partner' => 1, 'sort_order' => 7],
        ['name' => 'DCI Indonesia', 'category' => 'Hyperscale Data Center', 'logo_url' => '/assets/clients/dci.svg', 'is_partner' => 1, 'sort_order' => 8]
    ];

    $stmtClient = $db->prepare("INSERT INTO clients (name, category, logo_url, is_partner, sort_order, is_active)
        VALUES (?, ?, ?, ?, ?, 1)
        ON DUPLICATE KEY UPDATE category = VALUES(category), is_partner = VALUES(is_partner)");

    foreach ($clientsData as $cli) {
        $stmtClient->execute([$cli['name'], $cli['category'], $cli['logo_url'], $cli['is_partner'], $cli['sort_order']]);
    }

    // Write lock file
    file_put_contents($lockFile, "Installed on " . date('Y-m-d H:i:s') . " by IDTN CMS Installer.\n");

    send_json([
        'success' => true,
        'message' => 'Instalasi Database IDTN CMS Berhasil! Seluruh tabel dan data awal (konten halaman, produk, klien, footer, akun admin) telah dibuat.',
        'admin_credentials' => [
            'email' => 'admin@idtn.co.id',
            'username' => 'admin',
            'default_password' => 'dataretrieve'
        ],
        'next_step' => 'Anda sekarang dapat login ke https://idtn.co.id/admin'
    ]);

} catch (Exception $e) {
    send_json([
        'success' => false,
        'error' => 'Gagal melakukan instalasi: ' . $e->getMessage()
    ], 500);
}
