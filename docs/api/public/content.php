<?php
/**
 * IDTN CMS - Consolidated Public Content Endpoint
 * PT Infinix Delapan Teknologi Nusantara
 * High-performance endpoint supplying dynamic CMS content to the landing page.
 */

require_once __DIR__ . '/../config.php';

try {
    $db = get_db();

    // 1. Fetch Pages & SEO
    $pages = [];
    $stmtPages = $db->query("SELECT * FROM page_contents");
    while ($row = $stmtPages->fetch()) {
        $pages[$row['page_key']] = [
            'seo' => [
                'id' => [
                    'title' => $row['seo_title_id'],
                    'description' => $row['seo_description_id'],
                    'keywords' => $row['seo_keywords_id']
                ],
                'en' => [
                    'title' => $row['seo_title_en'],
                    'description' => $row['seo_description_en'],
                    'keywords' => $row['seo_keywords_en']
                ]
            ],
            'hero' => [
                'id' => json_decode($row['hero_data_id'] ?? '{}', true),
                'en' => json_decode($row['hero_data_en'] ?? '{}', true)
            ],
            'sections' => [
                'id' => json_decode($row['sections_data_id'] ?? '{}', true),
                'en' => json_decode($row['sections_data_en'] ?? '{}', true)
            ],
            'updated_at' => $row['updated_at']
        ];
    }

    // 2. Fetch Footer Settings
    $footer = null;
    $stmtFooter = $db->query("SELECT * FROM footer_settings WHERE id = 1 LIMIT 1");
    if ($rowFooter = $stmtFooter->fetch()) {
        $footer = [
            'company_summary' => [
                'id' => $rowFooter['company_summary_id'],
                'en' => $rowFooter['company_summary_en']
            ],
            'philosophy_quote' => [
                'id' => $rowFooter['philosophy_quote_id'],
                'en' => $rowFooter['philosophy_quote_en']
            ],
            'copyright' => [
                'id' => $rowFooter['copyright_id'],
                'en' => $rowFooter['copyright_en']
            ],
            'address' => [
                'id' => $rowFooter['address_id'],
                'en' => $rowFooter['address_en']
            ],
            'contact' => [
                'email' => $rowFooter['email'],
                'phone' => $rowFooter['phone'],
                'whatsapp' => $rowFooter['whatsapp'],
                'linkedin_url' => $rowFooter['linkedin_url'],
                'sdppi_status' => [
                    'id' => $rowFooter['sdppi_status_id'],
                    'en' => $rowFooter['sdppi_status_en']
                ]
            ],
            'updated_at' => $rowFooter['updated_at']
        ];
    }

    // 3. Fetch Active Products
    $products = [];
    $stmtProducts = $db->query("SELECT * FROM products WHERE is_active = 1 ORDER BY sort_order ASC, id ASC");
    while ($row = $stmtProducts->fetch()) {
        $products[] = [
            'id' => (int)$row['id'],
            'slug' => $row['slug'],
            'name' => $row['name'],
            'category' => $row['category'],
            'form_factor' => $row['form_factor'],
            'capacity' => $row['capacity'],
            'description' => [
                'id' => $row['description_id'],
                'en' => $row['description_en']
            ],
            'specs' => json_decode($row['specs'] ?? '{}', true),
            'datasheet_url' => $row['datasheet_url'],
            'sort_order' => (int)$row['sort_order']
        ];
    }

    // 4. Fetch Active Clients
    $clients = [];
    $stmtClients = $db->query("SELECT * FROM clients WHERE is_active = 1 ORDER BY sort_order ASC, id ASC");
    while ($row = $stmtClients->fetch()) {
        $clients[] = [
            'id' => (int)$row['id'],
            'name' => $row['name'],
            'category' => $row['category'],
            'logo_url' => $row['logo_url'],
            'is_partner' => (bool)$row['is_partner'],
            'sort_order' => (int)$row['sort_order']
        ];
    }

    $response = [
        'success' => true,
        'timestamp' => time(),
        'pages' => $pages,
        'footer' => $footer,
        'products' => $products,
        'clients' => $clients
    ];

    $etag = md5(json_encode($response));
    header("ETag: \"$etag\"");
    header("Cache-Control: public, max-age=60, s-maxage=60");

    if (isset($_SERVER['HTTP_IF_NONE_MATCH']) && trim($_SERVER['HTTP_IF_NONE_MATCH'], '"') === $etag) {
        http_response_code(304);
        exit;
    }

    send_json($response);

} catch (Exception $e) {
    // If DB is offline or tables not yet created, return fallback notice
    send_json([
        'success' => false,
        'fallback' => true,
        'error' => $e->getMessage()
    ], 200);
}
